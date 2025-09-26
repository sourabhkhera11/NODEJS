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

//Q2
const num = 21;
if (num > 0) console.log("Positive");
else if (num < 0) console.log("Negative");
else console.log("Zero");

//ternary version
console.log(num > 0 ? "Positive" : num < 0 ? "Negative" : "Zero");
