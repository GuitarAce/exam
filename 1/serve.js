const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'covid'
})
database.connect();

app.get('/ReaduserCovid', (req, res) => {
    database.query('SELECT * FROM user', (error, results, fields) => {
        if (error) throw error;

        let message = ""
        if (results === undefined || results.length == 0) {
            message = "User table is empty";
        } else {
            message = "Successfully retrieved all user";
        }
        return res.send({
            message: message
        });
    })
})

app.post('/AdduserCovid', (req, res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let address = req.body.address;

    if (!first_name || !last_name || !email || !address) {
        return res.status(400).send({
            error: true,
            message: "Please provide user first_name, last_name, email, and address."
        });
    } else {
        database.query('INSERT INTO user(first_name,last_name,email,address) VALUES (?, ?, ?, ?)', [first_name, last_name, email,address ], (error, results, fields) => {
            if (error) throw error;
            return res.send({
                message: "User successfully added"
            })
        })
    }
});

app.get('/GetuserCovid', (req, res) => {
    let id = req.params.id;

    if (!id) {
        return res.status(400).send({
            error: true,
            message: "Please provide user id"
        });
    } else {
        database.query("SELECT * FROM user WHERE id = ?", id, (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results === undefined || results.length == 0) {
                message = "User not found";
            } else {
                message = "Successfully retrieved user";
            }

            return res.send({
                message: message
            })
        })
    }
})

app.put('/UpdateuserCovid', (req, res) => {
    let id = req.body.id;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let address = req.body.address;

    if (!first_name || !last_name || !email || !address) {
        return res.status(400).send({
            error: true,
            message: 'Please provide user id, first_name, last_name, email and address.'
        });
    } else {
        database.query('UPDATE user SET first_name = ?,last_name = ?,email = ?,address = ? WHERE id = ?', [first_name, last_name, email,address, id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.changedRows === 0) {
                message = "User not found or data are same";
            } else {
                message = "User successfully updated";
            }

            return res.send({
                message: message
            })
        })
    }
})

app.delete('/DeleteuserCovid', (req, res) => {
    let id = req.body.id;

    if (!id) {
        return res.status(400).send({
            error: true,
            message: "Please provide user id"
        });
    } else {
        database.query('DELETE FROM user WHERE id = ?', [id], (error, results, fields) => {
            if (error) throw error;

            let message = "";
            if (results.affectedRows === 0) {
                message = "User not found";
            } else {
                message = "User successfully deleted";
            }

            return res.send({
                message: message
            })
        })
    }
})

app.listen(3000, () => {
    console.log('http://localhost:3000');
})

module.exports = app;