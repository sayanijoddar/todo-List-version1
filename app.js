const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = ["Buy veggies", "Cook lunch", "Eat lunch"];
let workItems = [];

app.set('view engine', 'ejs');


//load the home route
app.get("/", function (req, res) {
    let day = date.getDate();
    res.render('list', { listType: day, newlyAddedItems: items });
});


//handling new items post request
app.post("/", function (req, res) {
    let item = req.body.newItem;

    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
    
});


app.get("/work", function (req, res) {
    res.render('list', { listType: "Work", newlyAddedItems: workItems });
});

app.post("/work", function (req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});


app.get("/about", function(req, res){
    res.render("about");
});

app.listen(3000, function () {
    console.log("Server running on port 3000");
});