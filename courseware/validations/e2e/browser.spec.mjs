// Tier 3: browser E2E smoke tests. For every browser demo (index.html) and
// every browser activity solution/, load the page against the real http-server
// (and json-server for the fetch demo) and assert it runs without any uncaught
// page error or console error. Pages that render a button we can safely drive
// (the geolocation demo's #locate) are clicked so their async path is exercised.
//
// This is a smoke/E2E harness: it verifies each page LOADS AND RUNS cleanly,
// not every behavioral detail. Content-level behavior belongs in the demo/doc.
import { test, expect } from '@playwright/test';
import { join } from 'node:path';
import {
  DEMOS_DIR,
  ACTIVITIES_DIR,
  demoFolders,
  activityFolders,
  classify,
} from '../lib/discover.mjs';

// Build the list of browser pages to exercise, as courseware-relative URLs.
function browserTargets() {
  const targets = [];

  for (const name of demoFolders()) {
    if (classify(join(DEMOS_DIR, name)) === 'browser') {
      targets.push({ label: `demo ${name}`, url: `/demos/${name}/index.html` });
    }
  }

  for (const name of activityFolders()) {
    if (classify(join(ACTIVITIES_DIR, name, 'solution')) === 'browser') {
      targets.push({
        label: `activity ${name} · solution`,
        url: `/activities/${name}/solution/index.html`,
      });
    }
  }

  return targets;
}

for (const t of browserTargets()) {
  test(`${t.label} loads and runs without errors`, async ({ page }) => {
    const problems = [];
    page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') problems.push(`console.error: ${msg.text()}`);
    });

    await page.goto(t.url, { waitUntil: 'networkidle' });

    // If the page exposes the geolocation button, click it to drive the async
    // getCurrentPosition path (permission + position are granted via config).
    const locate = page.locator('#locate');
    if (await locate.count()) {
      await locate.click();
      await page.waitForTimeout(500);
    }

    // Let any queued microtasks / fetch callbacks settle.
    await page.waitForTimeout(300);

    expect(problems, `${t.label} reported runtime errors:\n${problems.join('\n')}`).toEqual([]);

    // Sanity: the document actually parsed and has a <body>.
    await expect(page.locator('body')).toBeAttached();
  });
}
