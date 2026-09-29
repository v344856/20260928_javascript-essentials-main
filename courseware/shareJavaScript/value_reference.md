# Value vs Reference in JavaScript

## Learning Objectives

By the end of this session, learners will be able to:

- Distinguish between value types and reference types
- Predict how JavaScript stores and copies different data types
- Understand why modifying one object affects another
- Apply correct techniques to avoid accidental mutations

## Value Types and Reference Types

JavaScript stores data in two fundamentally different ways:

- Value Types (Primitive Types) → stored directly
- Reference Types (Objects) → stored by reference

### Value Types (Primitives)

1. number
2. string
3. boolean
4. null
5. undefined
6. symbol
7. biginit

#### Key Behavior

When you copy a promitive, you get a new independent value

```javascript
let a = 10;
let b = a; // b gets a COPY of the value 10

b = 20;

console.log(a); // 10
console.log(b); // 20
```

- Changing b **does not affect** a
- They live in seperate memeory locations

### Reference Types (Objects)

They are stored **by reference**, not by value

1. object
2. array
3. function

#### Key Behavior

- When you copy an object, you copy the reference, not the actual object
- Both variables point to the **same memory location**

```javascript
let person1 = { name: "Edna" };
let person2 = person1; // person2 gets the SAME reference

person2.name = "Stefan";

console.log(person1.name); // "Stefan"
console.log(person2.name); // "Stefan"
```

Both variables reflect the change because they point ot the **same object**

## How to Copy Objects Without Sharing References

### Shallow Copy

```javasript
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1 };

obj2.a = 99;

console.log(obj1.a); // 1
console.log(obj2.a); // 99
```

### Deep Copy

```javascript
let original = { a: 1, nested: { x: 10 } };
let copy = structuredClone(original);

copy.nested.x = 999;

console.log(original.nested.x); // 10
console.log(copy.nested.x); // 999
```

## Common Mistakes

❌ Assuming objects behave like primitives<br>
❌ Forgetting that arrays are references<br>
❌ Mutating shared objects inside functions<br>
❌ Returning objects from functions without cloning<br>

## Summary

- Values types are copied
- Reference types are shared
- Understanding this prevents accidental mutations and unpredictable bugs

## Terminologies

- A **reference** in JavaScript is an internal pointer to an object’s location in memory, not the actual value. You dont see the raw address, but you work the reference everytime you use objects, arrays of functions
