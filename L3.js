let firstName = "Sourabh";
let a = 5;
let b = 2;
console.log(`Hey my name is ${firstName} and sum is ${a + b}`);

//importing the whole code doesn't store it somewhere
// require("./temp1"); //.js is the default extention
// sum(a, b); //cant access the sum function of temp1 this way

let { name: fullName, sum: addition } = require("./temp1");

//new way of importing or ES modules are
// import func, { fname, lname } from "./temp1.js";
// console.log(`Hey my name is ${fname + lname}`);
console.log(`Hey my name is ${fullName}`);
addition(a, b);