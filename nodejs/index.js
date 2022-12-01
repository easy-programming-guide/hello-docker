const express = require("express");
require("dotenv").config();

const app = express();
const port = 3000;
app.use(express.json());

const { MongoClient } = require("mongodb");
const uri =
  process.env.MONGODB_URI || "mongodb://root:example@localhost:27017/";
const client = new MongoClient(uri);
const database = client.db("ugc");
const reviewCollection = database.collection("productReview");

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.post("/review", async (req, res) => {
  try {
    const review = req.body;
    const result = await reviewCollection.insertOne(review);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("insert review failed.");
  }
});

app.get("/reviews", async (req, res) => {
  try {
    let limit = req.query.limit || 10;
    const list = await reviewCollection.find().limit(parseInt(limit)).toArray();
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).send("find review failed.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
