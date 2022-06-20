const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let items = ["Buy veggies", "Cook lunch", "Eat lunch"];

app.set('view engine', 'ejs');


//load the home route
app.get("/", function(req, res){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month:"long"
    };

    let day = today.toLocaleDateString("en-IN", options);
    //console.log(day);

    res.render('list', {whichDay: day, newlyAddedItems: items});
});


//handling new items post request
app.post("/", function(req, res){
    let item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});


app.listen(3000, function(){
    console.log("Server running on port 3000");
});