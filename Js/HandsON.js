// //Q1
// let a = 10;
// let b = 20;
// console.log(`Sum =${a + b}`);
// console.log(`Diff =${a - b}`);
// console.log(`Product =${a * b}`);
// console.log(`Quotient =${a / b}`);
// console.log(`Remainder =${a % b}`);

// let secret = Symbol("id Secret key");
// //Another way of doing this
// let results = {
//   sum: a + b,
//   diff: a - b,
//   mul: a * b,
//   quo: a / b,
//   rem: a % b,
//   singleLine: () => {
//     console.log(`${sum},${diff},${quo},${rem} `);
//   },
//   value: undefined,
//   value2: null,
//   [secret]: "Hello",
// };
// console.log(results);
// console.log(typeof results);
// let js = JSON.stringify(results);
// console.log(js);
// console.log(typeof js);

// //Q2
// const num = 21;
// if (num > 0) console.log("Positive");
// else if (num < 0) console.log("Negative");
// else console.log("Zero");

// //ternary version
// console.log(num > 0 ? "Positive" : num < 0 ? "Negative" : "Zero");

// //Q3
// let index = 5;
// let sum = 0;
// for (let i = 1; i <= index; i++) {
//   sum += i;
// }
// console.log(`Sum of first ${index} natural number is= ${sum}`);
// console.log(`Sum = ${(index * (index + 1)) / 2}`);

// for loop in async program
// ouput will be 66666 because var is functional scope
// till the time settimeout is running loops finish its execution
// And i is poining to 6
// for (var i = 0; i <= 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }
// for loop in async program
// ouput will be 012345 because let is block scope
// till the time settimeout is running loops finish its execution
// And for each iteration -> its block scope -> register new block level value
// for (let i = 0; i <= 5; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, i * 1000);
// }

//Q4
// let ar = [2, 5, 7, 10, 13];
// let odd = [];
// let even = [];
// //traversing
// for (let i = 0; i < ar.length; i++) {
//   if (ar[i] % 2 == 0) even.push(ar[i]);
//   else odd.push(ar[i]);
// }
// console.log(`Even= ${even}`);
// console.log(`Odd= ${odd}`);
// //for of method
// odd = [];
// even = [];
// for (let item of ar) {
//   if (item % 2 == 0) even.push(item);
//   else odd.push(item);
// }
// console.log(`Even= ${even}`);
// console.log(`Odd= ${odd}`);
// //filter method
// let e = ar.filter((ele) => {
//   return ele % 2 == 0;
// });
// let o = ar.filter((ele) => {
//   return ele % 2 != 0;
// });
// console.log(`Even= ${e}`);
// console.log(`Odd= ${o}`);

//Q6
// let separateEvenOdd = (array) => {
//   const result = {
//     odd: array.filter((ele) => ele % 2 != 0),
//     even: array.filter((ele) => ele % 2 === 0),
//   };
//   return result;
// };
// let ar = [2, 5, 7, 10, 13];
// let result = separateEvenOdd(ar);
// console.log(result);

// //Q7
// let student = {
//   name: "Sourabh",
//   age: 21,
//   marks: [95, 95, 84, 72, 76],
// };
// let avgMarks = (marks) => {
//   let avg =
//     marks.reduce((acm, cur) => {
//       return acm + cur;
//     }) / marks.length;
//   return avg;
// };
// console.log(`Avg marks are ${avgMarks(student.marks)}`);

// //Q8
// let func = (num1, num2, calb) => {
//   const result = calb(num1, num2);
//   return result;
// };
// let sum = (num1, num2) => {
//   return num1 + num2;
// };
// console.log(func(2, 3, sum));

// //Q9
// //setTimeout
// setTimeout(() => {
//   console.log("Hello!");
// }, 2000);

// console.log("Your time to defuse the bomb has been started!");
// let bomb = setTimeout(() => {
//   console.log("BOMB 👹");
// }, 5000);
// let clear = setTimeout(() => {
//   clearTimeout(bomb);
// }, 6000);
// //setInterval
// let count = 1;
// let intID = setInterval(() => {
//   console.log(count);
//   count++;
//   if (count > 5) clearInterval(intID);
// }, 1000);

// // Q10
// //base level
// let fakeFetch = (data, delay) => {
//   return new Promise((res, rej) => {
//     let decision = data ?? false;
//     if (data === decision) decision = true;
//     if (decision) {
//       setTimeout(() => {
//         res(data);
//       }, delay);
//     } else {
//       let er = new Error("No data present sorry!");
//       rej(er);
//     }
//   });
// };
// const data = {
//   name: "Sourabh",
//   age: 21,
//   marks: [95, 95, 84, 76, 74],
// };
// const delay = 2000;
// fakeFetch(data, delay)
//   .then((userData) => {
//     console.log(`${userData.name}'s data successfully fetched!`);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
//improved level
// let fakeFetch = (data, delay) => {
//   return new Promise((res, rej) => {
//     //null and undefined in type cohersion will result into null
//     if (data != null) {
//       setTimeout(() => {
//         //Direct data means object should not be sent over internet
//         res(JSON.stringify(data));
//       }, delay);
//     } else {
//       let er = new Error("No data present sorry!");
//       rej(er);
//     }
//   });
// };
// const data = {
//   name: "Sourabh",
//   age: 21,
//   marks: [95, 95, 84, 76, 74],
// };
// const delay = 2000;
// //.then .catch leader can easily be replaced by async await
// (async () => {
//   try {
//     let result = await fakeFetch(data, delay);
//     console.log(`${result}`);
//   } catch (err) {
//     console.log(err.message);
//   }
// })();

//Q11
// (async () => {
//   try {
//     let str = await fetch("https://jsonplaceholder.typicode.com/users/1");
//     console.log(str);
//     let data = await str.json();
//     console.log(
//       `Name: ${data.name} , email: ${data.email}, City: ${data.address.city}`
//     );
//   } catch (er) {
//     console.log(er.message);
//   }
// })();

// //use of JSON.parse()
// //Synchronous : only work when string is already in memory
// let s = '{"name":"Sourabh", "age":21}';
// let o = JSON.parse(s);
// console.log(o.name);

// //Q12 (explicit binding of this )
// //remember here we cant use the arrow function as they dont have its own this substitution we have to create its own function
// function getAverage() {
//   let marks = this?.marks;
//   let a =
//     marks.reduce((acc, cur) => {
//       return acc + cur;
//     }) / marks.length;
//   return a;
// }
// let isPassed = (avg) => {
//   return avg >= 40 ? "Pass" : "Fail";
// };

// let student = {
//   name: "Sourabh",
//   age: 22,
//   marks: [95, 95, 84, 74, 76],
// };
// let avgM = getAverage.call(student);
// let status = isPassed(avgM);
// console.log(`Avg marks= ${avgM} and status = ${status}`);

//Q13 Reversing a string
//built in method (String doesn't have built in method but array has )
//reverse of an array
//reverse is done in place means ar reference store the reverse value
// let ar = [1, 2, 3, 4, 5];
// console.log(ar.reverse());
// console.log(ar);

let s = "javascript";
//reverse a string (Built in way)
let ar = s.split("");
ar.reverse();
s = ar.join("");
console.log(s);
//iterative way
let ns = "";
for (let i = s.length - 1; i >= 0; i--) {
  ns += s[i];
}
console.log(ns);
