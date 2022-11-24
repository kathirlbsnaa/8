var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/ex8',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/regis_form",(req,res)=>{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var pic = req.body.file;
    var age = req.body.age;
    var problem = req.body.pro;
    

    var data = {
        "fname": fname,
        "lname": lname,
        "email" : email,
        "picture" : pic,
        "Age" : age,
        "problem" : problem,
        
       
    }

    db.collection('regform').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("register saved Successfully");
    });

    return res.redirect('success.html')

})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
        
    })
    return res.redirect('register.html');
}).listen(8000);


console.log("Listening on PORT 8000");
