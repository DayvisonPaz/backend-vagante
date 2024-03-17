express  = require("express")
const app = express()
require('dotenv').config()

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =`mongodb+srv://${process.env.U_DB}:${process.env.P_DB}@cluster0.3v8vfkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let posts = []
async function run() {
    try {
      const database = client.db('Blog');
      const movies = database.collection('posts');
      // Query for a movie that has the title 'Back to the Future'
      const query = { };
      const movie = await movies.find(query);
      for await (const doc of movie) {
        
        posts.push(doc);
      }
    } finally {
        console.log(posts);
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
run().catch(console.dir);
app.get("/posts",(req,res)=>{
    res.status(200).json({posts})
    })


app.listen(PORT,console.log("server no ar"))