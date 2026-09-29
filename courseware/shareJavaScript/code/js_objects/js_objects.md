# JavaScript Object Literals

## Learning Objectives

Learners will be able to:

1. Create object literals
2. Add, update, and delete properties
3. Use Object.values() and Object.entries()
4. Freeze and check immutability
5. Copy and merge objects using the spread operator
6. Loop through objects using for...in and Object.entries()

## Object Literal Basics

```javascript
const user = {
  name: "Stefan",
  age: 29,
  city: "Toronto",
};
```

### Add

```javascript
user.country = "Canada";
```

### Update

```javascript
user.age = 18;
```

### Delete

```javascript
delete user.city;
```

## Common Object Methods

### Object.value()

Returns an array of value values

```javascript
Object.values(user);
```

### Object.entries()

Return key/value pairs

```javascript
Object.entries(user);
```

### Object.freeze()

Locks the object

````javascript
Object.freeze(user)
````

### Object.isFrozen()

```javascript
Object.isFrozen(user); // true
```

## Spread Operator for Objects

The spread operator (...) allows you to:

1. Copy objects
2. Merge objects
3. Add or override properties immutably

### Copy an Object

```javascript
const copy = { ...user };
```

### Merging Objects

```javascript
const extra = { hobby: "Cycling", city: "Montreal" };

const merged = { ...user, ...extra };
```

**\*Result** If user.city existed, it get overwritten by Montreal

### Adding Properties with Spread

```javascript
const updated = { ...user, status: "Active" };
```

Spread is essential for immutable updates, especially in React and modern JS patterns.

## Looping Over Objects

### for..in Loop

```javascript
const product = {
  id: 101,
  name: "Laptop",
  price: 1200,
};

for (const key in product) {
  console.log(key, product[key]);
}

/* Outptut
id 101
name Laptop
price 1200
*/
```

### Looping with Object.entries()

More modern and cleaner.

```javascript
for (const [key, value] of Object.entries(product)) {
  console.log(key, value);
}
//Same output, but easier to work with
```
