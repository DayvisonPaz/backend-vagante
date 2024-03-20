express  = require("express")
const app = express()
require('dotenv').config()
cors = require("cors")
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =`mongodb+srv://${process.env.U_DB}:${process.env.P_DB}@cluster0.3v8vfkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 3030;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let posts = []
const database = client.db('Blog');
const movies = database.collection('posts');

async function run() {
    try {
      
      // Query for a movie that has the title 'Back to the Future'
      const query = { };
      const movie = await movies.find(query);
      for await (const doc of movie) {
        posts.push(doc);
      }
    } finally {
        
      // Ensures that the client will close when you finish/error
      
    }
  }
run().catch(console.dir);
app.get("/posts",(req,res)=>{
    res.status(200).json({posts})
    })
app.get("/comments/:post",(req,res)=>{
 async function runC(){
  let cont = Number(req.params.post)
  
  const movie = await movies.findOne({ post:cont});
  comments = movie.comments
    res.status(200).json({comments})}
runC()}) 
app.post("/addcomment",(req,res)=>{
  async function runC(){
      
  const movie = await movies.findOne({ post:req.body.post});
  let comentarios = [...movie.comments , {'nome':req.body.nome,'comentario': req.body.comentario}]
  
    try {
      movies.updateOne({post:Number(req.body.post)}, {
        $set: {
          comments: comentarios
        },
      })
   } catch (e) {
      print (e);
   }
    movies.insertOne({comments:req.body})
      res.status(200)}
  runC()

  res.status(200).json({})
})
app.listen(PORT,console.log('noa ar'))