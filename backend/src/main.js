const express = require('express')
const cors = require('cors')
const mysql = require("./mysql");
const {response} = require("express");
var bodyParser = require('body-parser')
const app = express()
const port = 5000


var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({extended: false})
//最前
app.use(cors()) // Use this after the variable declaration


app.get('/Login', (req, res) => {
    res.send('Hello World!')
})

app.get('/test', (req, res) => {
    console.log('12311')
    console.log(req.query.ID)
    res.status(200).json({
        name: 'william',
        age: 18,
        email: mysql.loginSelectByEmail()
    })
})
app.get('/test1', (req, res) => {
    mysql.loginSelectByEmail()
        .then(res1 => {
            // console.log(res1)
            res.status(200).json({
                name: 'william',
                age: 18,
                phone: 18287888888,
                email: res1
            })
        })
        .catch(err => {
            console.log(err)
        })
    // console.log(mysql.dbConnect1())
})


app.post('/login', jsonParser, (req, res) => {
    // console.log(req.body.email)
    mysql.loginSelectByEmail(req.body.email)
        .then(res1 => {
            console.log(res1.userNum)
            console.log(res1.password)
            console.log(res1.firstName)
            //statusCode 1: success, 0: error
            if (res1.password === req.body.pw) {
                res.status(200).json({
                    fname: res1.firstName,
                    uid: res1.userNum,
                    statusCode: 1
                })
                console.log(res1)
            } else {
                res.status(200).json({
                    uid: res1.userNum,
                    statusCode: 0
                })
                console.log("error")
            }
        })
        .catch(err => {
            console.log(err)
        })
})

app.post('/register', jsonParser, (req, res) => {
    mysql.registerInsert(req.body.lastName, req.body.firstName, req.body.firstPd, req.body.birth, req.body.email, req.body.phoneNumber, req.body.gender).then(res1 => {
        console.log(res1)
        res.status(200).json({
            error: res1
        })
    })
})

app.post('/initHomePost', jsonParser, (req, res) => {
    console.log(req.body.uid)
    res.status(200).json({
        mountains: {
            mountain1: {mountain: "Mount Kosciuszko", city: "Canberra", state: "NSW"},
            mountain2: {mountain: "Cradle Mountain", city: "Tasmania", state: "TAS"},
            mountain3: {mountain: "Bluff Knoll", city: "Sterling ridge", state: "WA"}
        }
    })
})

app.post('/initDetailPost', jsonParser, (req, res) => {
    console.log(req.body.uid)
    res.status(200).json({
        lat:-34.42036296539061,
        lng:150.8968482112078
    })
})
//最后
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})