const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FruitsDB');

const fruitsSchema = new mongoose.Schema({
    name: String,
    rating:Number, 
    review: String, 
});

const Fruit = mongoose.model("Fruit", fruitsSchema);

const fruit = new Fruit({
    name: "Apple", 
    rating: 7,
    review:"Solid for a fruit"
});
const banana = new Fruit({
    name:"banana", 
    rating:9.8,
    review:"Awesome fruits"

});

const avacado = new Fruit({
    name:"Avocado", 
    rating:9.8,
    review:"Good compliment for food"

});

// Fruit.insertMany([banana, avacado], function(err){
//     if (err){
//         console.log(err);
//     } else{
//         console.log("sucessfully");
//     }
   
// });
// fruit.save().then(() => console.log('imelala iyoo'));

const personSchema = new mongoose.Schema({
    name: String, 
    age: Number

});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name:"John", 
    age: 37
});

person.save().then(() =>console.log("Imelala iyoooo kama kawa"))


Fruit.find(function (err, fruits) {
    if (err){
        console.log(err);
    }else{
        console.log(fruits);
        fruits.forEach(function(fruit){
            console.log(fruits);
        })
    }
});
