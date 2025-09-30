//sourabhkhera
//jpRByHDn3cvc8l9o
require("dotenv").config();
// console.log(process.env);

const { MongoClient } = require("mongodb");
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbname = "Test";
async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbname);
  const collection = db.collection("User");

  // the following code examples can be pasted here...
  //Create
  //   const insertResult = await collection.insertOne({
  //     name: "Abhinav",
  //     age: 21,
  //     city: "UP",
  //     Country: "India",
  //   });
  //   console.log(insertResult);

  //read(All the data available)
  /* const findResult = await collection.find({}).toArray();
  console.log(findResult); */
  //read particular
  /* const findSourabh = await collection.findOne({ Name: "Sourabh" });
  console.log(findSourabh); */

  //update the field
  /*  const updateAge = await collection.updateOne(
    { Name: "Sourabh" },
    { $set: { Age: 22 } }
  );
  console.log(updateAge); */

  //Delete the field
  const del = await collection.deleteOne({ name: "Abhinav" });
  console.log(del);

  return "done.";
}
main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
