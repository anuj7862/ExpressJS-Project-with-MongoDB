var mongoose = require('mongoose');

mongoose.connect("mongodb+srv://anujtiwarimnnit:12344321@cluster1.vqkbc8y.mongodb.net/userdb?retryWrites=true&w=majority")
.then( () =>
    {console.log("db is connected")
}).catch (() => {
    console.log("db not connected");
  })
;

// mongoose.connect("mongodb://localhost:27017/mongodb2").then(() => console.log("db connected"))
// .catch(() => console.log("db not connected"));

const schema = mongoose.Schema({
    createdby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
        required: true,
    },
    image: String,
    likes: {
        type: Number,
        default: 0
    },
    tags: [{
        type: String,
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("post", schema);