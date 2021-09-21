//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/todolistDB");

app.set('view engine', 'ejs');


const itemsSchema = new mongoose.Schema({
  name:String
});

const Item = new mongoose.model("item", itemsSchema);



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




const item1 = new Item ({
  name:"Welcome to your to do list"
});
const item2 = new Item ({
  name:"Hit the + button to add an item to your to-do-list"
});
const item3 = new Item ({
  name:"---- hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items:[itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){
  Item.find({}, function(err, foundItems){  
    if(foundItems.length===0){
      Item.insertMany(defaultItems, function(err){
        if (err){
          console.log(err);
        }else{
          console.log("sucessfully added to the database");
        }
      });
      res.redirect("/");
    }else{res.render("list", {listTitle:"today", newListItems:foundItems});}
  });
  
  
});

app.post("/", function(req, res){
 

  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({
    name:itemName
  })
  if (listName==="Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName}, function(err, foundList){ 
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);

    })
  }
  

});
app.post("/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName ==="Today"){
    Item.findByIdAndRemove(checkedItemId, function(err){
      if (!err){
        console.log("sucessfully delete the checked");
        res.redirect("/");
      }
     
    });
  }else{
    List.findOneAndUpdate({name:listName}, {$pull:{items:{id:checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }
  
});

app.get("/:customListName", function(req, res){
  const customListname = req.params.customListName;
  List.findOne({name:customListname}, function(err, foundList){
    if(!err){
      if (!foundList){
        const list = new List ({
          name:customListname,
          items:defaultItems
        })
        list.save();
        res.redirect("/"+customListname);
      }else{
        // show an existing list
        res.render("list", {listTitle:foundList.name, newListItems:foundList.items});
      }
    }
  })
 

});


app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
