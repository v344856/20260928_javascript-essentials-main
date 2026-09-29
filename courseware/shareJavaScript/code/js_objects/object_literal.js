const user = {
  name: "Stefan",
  age: 29,
  city: "Toronto",
};

console.log(user);
// Output: { name: 'Stefan', age: 29, city: 'Toronto' }

user.country = "Canada";
console.log("Add ", user)
// Output: Add  { name: 'Stefan', age: 29, city: 'Toronto', country: 'Canada' }

user.age =18;
console.log("Update a property: ", user);
// Output: Update a property:  { name: 'Stefan', age: 18, city: 'Toronto', country: 'Canada' }

delete user.city;
console.log("Delete the user.city: " , user);
// Output: Delete the user.city:  { name: 'Stefan', age: 18, country: 'Canada' }


// Common Object Methods
console.log(Object.values(user))
// Output: [ 'Stefan', 18, 'Canada' ]

console.log(Object.entries(user));
// Output: [ [ 'name', 'Stefan' ], [ 'age', 18 ], [ 'country', 'Canada' ] ]

Object.freeze(user);

console.log(Object.isFrozen(user));