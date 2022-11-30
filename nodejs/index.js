const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const { MongoClient } = require("mongodb");
const uri = "mongodb://root:example@localhost:27017/";
const client = new MongoClient(uri);

app.get("/", async (req, res) => {
  res.send("Hello World!");
});

app.post("/review", async (req, res) => {
  try {
    const database = client.db("ugc");
    const reviews = database.collection("productReview");
    const review = req.body;
    const result = await reviews.insertOne(review);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("insert review failed.");
  }
});

app.get("/reviews", async (req, res) => {
  try {
    const database = client.db("ugc");
    const reviews = database.collection("productReview");
    console.log(req.query);
    let limit = req.query.limit || 10;
    const list = await reviews.find().limit(parseInt(limit)).toArray();
    console.log(list);
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).send("find review failed.");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
