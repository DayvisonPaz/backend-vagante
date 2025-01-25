express  = require("express")
const app = express()
require('dotenv').config()
cors = require("cors")
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri =`mongodb+srv://${process.env.UDB}:${process.env.PDB}@cluster0.3v8vfkh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(process.env.UDB, process.env.PDB)
const PORT = process.env.PORT || 3030;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let postsVagante = []
let postsTechno = []
const database = client.db('Blog');
const techPosts = database.collection('postTechno');
const vagantePosts = database.collection('postVagante');

async function run() {
    try {
      
      // Query for a vagante that has the title 'Back to the Future'
      const query = { };
      const vagante = await vagantePosts.find(query);
      const techno = await techPosts.find(query);
      for await (const doc of techno) { 
        postsTechno.push(doc);
      }
      for await (const doc of vagante) {
        postsVagante.push(doc);
      }
    } finally {
        
      // Ensures that the client will close when you finish/error
      
    }
  }
run().catch(console.dir);
app.get("/posts/:channel",(req,res)=>{
  console.log(postsTechno,postsVagante);
    if( req.params.channel === 'techno') {
      res.status(200).json({postsTechno})
    }if(req.params.channel === 'vagante'  )  {
      res.status(200).json({postsVagante})
    }
    })
app.get("/comments/:channel/:post",(req,res)=>{
 async function runC(){
  let cont = Number(req.params.post)
  if(req.params.channel === 'techno') {
    const techno = await techPosts.findOne({ post:cont});
  comments = techno.comments
    res.status(200).json({comments})}if(channel === 'vagante'  ) {
  const vagante = await vagantePosts.findOne({ post:cont});
  comments = vagante.comments
    res.status(200).json({comments})}}
runC()}) 
app.post("/addcomment/:channel",(req,res)=>{
  async function runC(){
      if(req.params.channel === 'vagante') { 
        const vagante = await vagantePosts.findOne({ post:req.body.post});
      let comentarios = [...vagante.comments , {'nome':req.body.nome,'comentario': req.body.comentario}]
      
        try {
          vagantePosts.updateOne({post:Number(req.body.post)}, {
            $set: {
              comments: comentarios
            },
          })
       } catch (e) {
          print (e); 
       }
        vagantePosts.insertOne({comments:req.body})
          res.status(200)}
          else{
            const techno = await techPosts.findOne({ post:req.body.post});
            let comentarios = [...techno.comments , {'nome':req.body.nome,'comentario': req.body.comentario}]
            
              try {
                techPosts.updateOne({post:Number(req.body.post)}, {
                  $set: {
                    comments: comentarios
                  },
                })
             } catch (e) {
                print (e); 
             }
              techPosts.insertOne({comments:req.body})
                res.status(200)}
            runC()
          
            res.status(200).json({})
          }
      runC()
    
      res.status(200).json({})}
 
)
app.listen(PORT,console.log('no ar'))