const express = require("express")

const mongoose = require("mongoose")

const app = express()

app.use(express.json())

const connect = function()
{
    return mongoose.connect("mongodb://localhost:27017/library")
}

const systemSchema = mongoose.Schema(
    {
        name : {type : String , require : true}
    },
    {
        versionKey : false
    }
)

const system = mongoose.model("systems",systemSchema)

app.get("/systems",async function(req , res )
{
    console.log("getting")
    var data = await system.find().lean().exec()

    return res.send(data)
})

app.post("/systems",async function( req , res )
{
    var data = await system.create(req.body)

    return res.status(201).send({user : data})

})

const bookSchema = mongoose.Schema(
    {
        name : {type : String , require : true},
        body : {type : String , require : true},
        systemId : {type : mongoose.Schema.Types.ObjectId , ref : "system" , require : true }
    },
    {
        versionKey : false
    }
)

const book = mongoose.model("books",bookSchema)

const author = mongoose.Schema(
    {
        first_name : {type : String, require : true },
        last_name : {type : String , require : true },
    }
)

const rauthor = mongoose.model("authors",author)

app.get("/books", async function(req , res )
{
    var data = await book.find().lean().exec()

    return res.status(201).send({user : data})
}
)

app.post("/books",async function( req , res )
{
    var data = await book.create(req.body)

    return res.status(201).send({user : data})

})

app.get("/author", async function(req , res )
{
    var data = await rauthor.find().lean().exec()

    return res.status(201).send({user : data})
}
)

app.post("/author",async function( req , res )
{
    var data = await rauthor.create(req.body)

    return res.status(201).send({user : data})

})

app.listen(5000,async function()
{
    await connect()
    console.log("listening to server")  
})