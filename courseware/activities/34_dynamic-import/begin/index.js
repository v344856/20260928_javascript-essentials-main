// Activity: Dynamic import(), Load Tools on Demand

const numbers = [2, 4, 6];

// The tools to run are decided at runtime, so we load each module ON DEMAND
// with dynamic import() rather than a static import at the top of the file.
const tools = ['total', 'average'];

// TODO Task 3: Loop over `tools`. For each `name`:
//   - await import(`./${name}.js`) into a variable `mod`.
//   - Call its default export (`mod.default`) with `numbers`.
//   - Log `<name>: <result>`.
//
// Expected:
//   total: 12
//   average: 4
