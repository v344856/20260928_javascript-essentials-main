// Activity: Generics and Utility Types
// Complete each TODO. Run with: npx tsx index.ts

// --- Task 1: a generic function ---
// TODO Task 1: add a type parameter <T> so `items` is T[] and the function
// returns `T | null` (the first element, or null when the array is empty).
function firstOrNull(items) {
  return items.length > 0 ? items[0] : null;
}

console.log(firstOrNull([10, 20, 30]));
// Once firstOrNull is generic, this call needs an explicit type argument -
// an empty array gives TypeScript nothing to infer from.
console.log(firstOrNull([]));

// --- Task 2: a constrained generic ---
// TODO Task 2: constrain T with `extends { name: string }` so item.name is
// safe to read. Return string[] (the names).
function pluckNames(items) {
  return items.map((item) => item.name);
}

const teams = [
  { name: "Falcons", city: "Atlanta" },
  { name: "Jets", city: "New York" },
];
console.log(pluckNames(teams));

// --- Task 3: a generic class Stack<T> ---
// TODO Task 3: make Stack generic over T. `items` should be T[], `push` takes a
// T, `pop` returns `T | undefined`, and `size` returns the item count.
class Stack {
  private items = [];

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  get size() {
    return this.items.length;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("popped:", stack.pop());
console.log("size:", stack.size);

// --- The domain type the utility types transform ---
interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: number;
}

// TODO Task 4: type `changes` as Partial<Task> so a caller can supply only
// the fields that changed, then spread changes over task.
function patchTask(task: Task, changes): Task {
  return { ...task, ...changes };
}

const original: Task = { id: 1, title: "Write report", done: false, priority: 2 };
const finished = patchTask(original, { done: true });
console.log("done?", finished.done);

// TODO Task 5: derive TaskSummary with Pick<Task, "id" | "title"> and
// NewTask with Omit<Task, "id">, then build one value of each.
// type TaskSummary = ...
// type NewTask = ...

// const summary: TaskSummary = { id: 1, title: "Write report" };
// const draft: NewTask = { title: "Book venue", done: false, priority: 1 };
// console.log("summary:", summary);
// console.log("draft title:", draft.title);

// TODO Task 6: declare type Status = "todo" | "doing" | "done" and a
// counts: Record<Status, number> with todo 4, doing 2, done 7.

// console.log("doing count:", counts.doing);
