const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const cors = require('cors');

const routes = require('./routes')
const dbOptions = require('./conexion');

const app = express()
app.set('port', process.env.PORT || 9000)


// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors());
app.use(express.static('../public'))

// routes -------------------------------------------
app.get('/', (req, res) => {
    res.sendFile(__dirname + '../public/index.html')
})
app.use('/users', routes)

// server running -----------------------------------
app.listen(app.get('port'), () => {
    console.log('server running on port', app.get('port'))
})