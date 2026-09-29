// class_static.js

class Example {
  static greet() {
    return "Hello!";
  }
}

console.log(Example.greet()); // ✔️ works
console.log(new Example().greet()); // ❌ error