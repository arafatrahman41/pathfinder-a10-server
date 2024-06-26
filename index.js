const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.SECRET_KEY}:${process.env.SECRET_PASS}@cluster0.4sum6zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const spotCollection = client.db("spotDB").collection('spot');
    // read
    app.get("/touristSpot", async(req, res) => {
      const result = await spotCollection.find().toArray();
      res.send(result)
    })

    // single read
    app.get("/touristSpot/:id", async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await spotCollection.findOne(query);
      res.send(result)
    })

    // create
    app.post("/touristSpot", async (req, res) => {
      const newSpot = req.body;
      console.log(newSpot);
      const result = await spotCollection.insertOne(newSpot);
      res.send(result)
    })

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Starting the pathfinder')
})

app.listen(port, ()=> {
    console.log(`Port Starting on ${port}`);
})