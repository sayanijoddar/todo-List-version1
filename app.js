const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

var items = ["Buy veggies", "Cook lunch", "Eat lunch"];

app.set('view engine', 'ejs');


//load the home route
app.get("/", function(req, res){
    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month:"long"
    };

    var day = today.toLocaleDateString("en-IN", options);
    //console.log(day);

    res.render('list', {whichDay: day, newlyAddedItems: items});
});


//handling new items post request
app.post("/", function(req, res){
    var item = req.body.newItem;
    items.push(item);
    res.redirect("/");
});


app.listen(3000, function(){
    console.log("Server running on port 3000");
});