// Activity: Generics and Utility Types (solution)
// Run with: npx tsx index.ts

// --- Task 1: a generic function ---
// Returns the first element, or null when the array is empty. Works with any T.
function firstOrNull<T>(items: T[]): T | null {
  return items.length > 0 ? items[0] : null;
}

console.log(firstOrNull([10, 20, 30]));
console.log(firstOrNull<string>([]));

// --- Task 2: a constrained generic ---
// T must have a `name: string`, so we can safely read item.name.
function pluckNames<T extends { name: string }>(items: T[]): string[] {
  return items.map((item) => item.name);
}

const teams = [
  { name: "Falcons", city: "Atlanta" },
  { name: "Jets", city: "New York" },
];
console.log(pluckNames(teams));

// --- Task 3: a generic class Stack<T> ---
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  get size(): number {
    return this.items.length;
  }
}

const stack = new Stack<number>();
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

// --- Task 4: Partial<T> for a patch-style update ---
// `changes` may carry any subset of Task's fields.
function patchTask(task: Task, changes: Partial<Task>): Task {
  return { ...task, ...changes };
}

const original: Task = { id: 1, title: "Write report", done: false, priority: 2 };
const finished = patchTask(original, { done: true });
console.log("done?", finished.done);

// --- Task 5: Pick and Omit derive smaller shapes ---
type TaskSummary = Pick<Task, "id" | "title">;
type NewTask = Omit<Task, "id">;

const summary: TaskSummary = { id: 1, title: "Write report" };
const draft: NewTask = { title: "Book venue", done: false, priority: 1 };
console.log("summary:", summary);
console.log("draft title:", draft.title);

// --- Task 6: Record<Keys, Value> for a lookup table ---
type Status = "todo" | "doing" | "done";
const counts: Record<Status, number> = {
  todo: 4,
  doing: 2,
  done: 7,
};
console.log("doing count:", counts.doing);
