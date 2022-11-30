const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()
// middleware
app.use (cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7isjbqc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
        try{
            const watchListCollection =client.db('lastWatch').collection('watchList')
            app.get('/watchComName', async(req,res)=>{
                const query ={}
                const options = await watchListCollection.find(query).toArray()
                res.send(options)
            })
        }
        finally{

        }
}

run().catch(console.log)

app.get('/',async(req, res)=>{
    res.send('last watch server is running')
})

app.listen(port, ()=> console.log(`last watch running on ${port}`))


