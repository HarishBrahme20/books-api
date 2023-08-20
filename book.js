const mongoose = require('mongoose');

mongoose.model("Book",{
    // Title,author,numberOfPages,publisher
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    numberOfPages:{
        type:Number,
        require:false
    },
    publisher:{
        type:String,
        require:false
    }
})