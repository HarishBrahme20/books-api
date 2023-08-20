//load express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//load mongoose
app.use(bodyParser.json());
const mongoose =require("mongoose");
require('./book')
const Book = mongoose.model("Book");

async function connectToDatabase() {
    try {
      await mongoose.connect('mongodb://localhost/bookservice', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to the database!');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
    }
  }
  
  connectToDatabase();
app.get('/',(req,res)=>{
    res.send("this is our main end point");
})


app.post('/books',(req,res)=>{
  console.log(req.body);
  var newBook={
    title:req.body.title,
    author:req.body.author,
    numberOfPages:req.body.numberOfPages,
    publisher:req.body.publisher
  }
  var book = new Book(newBook);
  book.save().then(()=>{
    console.log("New Book created")
    res.send(book);
  }).catch((e)=>{
    console.log(e)
  })
   
})

app.get("/books",(req,res)=>{
  Book.find().then((books)=>{
    res.json(books);
  }).catch((err)=>{
    console.log(err);
  })
})

app.get("/book/:id",async(req,res)=>{
  let docId=req.params.id;
  console.log(docId);
  let book = await Book.findById(docId);
  res.send(book);
})
app.delete("removeBookbyId/:id",(req,res)=>{
  const Id = req.params.id;
    Book.findByIdAndRemove(Id).then(()=>{
      res.send("record delete successfully");
    }).catch((err)=>{
      console.log(err);
    })
})
app.listen(4545,()=>{
    console.log("server is running on 4545 port");
})