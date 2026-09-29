# 19. Concurrent Promises

This demo runs three independent async steps two ways, sequentially (await one, then the next) and concurrently (start them all, then wait for the group with `Promise.all`), and prints the elapsed time of each, so you can watch concurrency turn a *sum* of delays into just the *slowest* one. It then shows `Promise.allSettled` (which never short-circuits, even when one promise rejects) and `Promise.race` (first to settle wins).

## Run

```bash
node index.js
```

This folder is its own project: run `npm install` once,
then `npm run lint` and `npm run format` use the ESLint and Prettier setup taught in
[Module 01 · Linters and Formatters](../../docs/Module-01-Getting-Started/03-linters-and-formatters.md).

## What it demonstrates

- `Promise.all` starts independent promises together and resolves with an **ordered** array of their results (listed order, not finish order).
- Sequential awaiting costs the **sum** of the delays; concurrent `Promise.all` costs only the **slowest**.
- `Promise.allSettled` waits for every promise and reports each outcome (`fulfilled` / `rejected`), so one failure doesn't sink the rest.
- `Promise.race` settles as soon as the first promise settles.
- Contrast with the strictly one-after-another style of demo 17 (`promises`) and demo 18 (`async-await`).

## Related reading

- [JavaScript Promises](../../docs/Module-05-Asynchronous-JavaScript/03-js-promises.md)
- Diagram: [Sequential vs Concurrent](../../diagrams/png/sequential-vs-concurrent.png)
- Diagram: [The Event Loop](../../diagrams/png/event-loop.png)
