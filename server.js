const express = require('express');
// const mongoDBClient = require('mongodb').MongoClient
const mongoose = require("mongoose")
const budgetModel = require("./models/budget_schema")
let url = 'mongodb://localhost:27017/part1';
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());

app.use('/', express.static('public'));

app.get('/budget', (req, res) => {
    // res.json(budget);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to the database")
        budgetModel.find({})
                .then((data)=>{
                    console.log(data)
                    res.json(data)
                    mongoose.connection.close()
                })
                .catch((connectionError)=>{
                    console.log(connectionError)
                })
            })
            .catch((connectionError) => {
                console.log(connectionError)
            })
});


app.post('/addBudget', (req, res) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("connected to the database")

        let budgetData = new budgetModel({
            title: req.body.title, 
            budget: req.body.budget, 
            color: req.body.color
        });

        console.log(budgetData.title)
        console.log(budgetData.budget)
        console.log(budgetData.color)

        budgetModel.insertMany(budgetData)
                .then((data)=>{
                    res.json(data)
                    console.log(data)
                    mongoose.connection.close()
                })
                .catch((connectionError)=>{
                    console.log(connectionError)
                })
            })
            .catch((connectionError) => {
                console.log(connectionError)
            })
});





app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
