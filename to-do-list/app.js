const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

console.log(date());

const app = express();
let items = ["buy food", "cook food", "eat food"];
let workItems = [];

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function (req, res) {
    let day = date();
    res.render("list", {
        listTitle: day, 
        newItems:items
    });
});

app.post("/", function(req, res){
    let item = req.body.newItem;
    if (req.body.list ==="work"){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/"); 
    }
});

app.get("/work", function(req, res){
    res.render("list", {listTitle:"worklist", newItems:workItems});
});
app.post("/", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
    
});


app.listen(2000, function () {
    console.log("server started at port 2000");
});