// Activity: Dynamic import(), Load Tools on Demand (solution)

const numbers = [2, 4, 6];

// The tools to run are decided at runtime, so we load each module ON DEMAND
// with dynamic import() rather than a static import at the top of the file.
const tools = ['total', 'average'];

for (const name of tools) {
  const mod = await import(`./${name}.js`);
  console.log(`${name}: ${mod.default(numbers)}`);
}
