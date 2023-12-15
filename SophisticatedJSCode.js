/* 
  Filename: SophisticatedJSCode.js
  Content: Example of a sophisticated, elaborate, and complex JavaScript code 
*/

// Complex class representing a Person
class Person {
  constructor(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }
  
  sayHello() {
    console.log(`Hello, my name is ${this.name}. Nice to meet you!`);
  }
  
  getBirthYear() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.age;
  }
  
  static greet() {
    console.log("Welcome to our website!");
  }
}

// Derived class from Person representing a Student
class Student extends Person {
  constructor(name, age, address, school) {
    super(name, age, address);
    this.school = school;
  }
  
  getSchoolName() {
    console.log(`I study at ${this.school}`);
  }
  
  static greet() {
    console.log("Welcome, student! Enjoy your learning journey!");
  }
}

// Third class representing a Book
class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
  }
  
  getTitleAndAuthor() {
    console.log(`The book "${this.title}" was written by ${this.author}`);
  }
}

// Example usage of the classes

// Create a Person object
const person = new Person("John Doe", 35, "123 Main St");
person.sayHello();
console.log(`I was born in ${person.getBirthYear()}`);

// Create a Student object
const student = new Student("Jane Smith", 20, "456 Elm St", "University of Example");
student.sayHello();
student.getSchoolName();

// Create a Book object
const book = new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925);
book.getTitleAndAuthor();

// Static method calls
Person.greet();
Student.greet();
