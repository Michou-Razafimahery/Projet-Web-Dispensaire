const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "toavina",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));  

app.get("/", (req, res) => {
    const sqlInsert = "INSERT INTO contact_db (firstname, lastname, age, disease, contact, prescription) VALUES ('John', 'Weak', '21', 'headacke', '0324567867', 'paracetamol')"
    db.query(sqlInsert , (error, result) => {
        console.log("errror", error);
        console.log("result", result);
        
    });
});


app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.get("/api/seePresc", (req, res) => {
    const sqlGet = "SELECT id,disease FROM contact_db";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});


app.post("/api/post", (req, res) => {
    const {firstname, lastname, age, disease, contact, prescription} = req.body;
    const sqlInsert = "INSERT INTO contact_db (firstname, lastname, age, disease, contact, prescription) VALUES (?, ?, ?, ?, ?, ?)"
    db.query(sqlInsert, [firstname, lastname, age, disease, contact, prescription], (error, result) => {
        if(error) {
            console.log(error);
        }
    })
})

app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?"
    db.query(sqlRemove, id, (error, result) => {
        if(error) {
            console.log(error);
        }
    })
})

app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, age, disease, contact, prescription } = req.body;
    const sqlUpdate = "UPDATE contact_db SET firstname=?, lastname=?, age=?, disease=?, contact = ?, prescription = ?, WHERE id = ?";
    db.query(sqlUpdate, [firstname, lastname, age, disease, contact, prescription, id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.get("/", (req, res) => {
    /*const sqlInsert = "INSERT INTO contact_db (firstname, lastname, age, disease, contact) VALUES ('ARISON', 'Toavina', '12', 'Head', 'izy@gmail.com')"
     db.query(sqlInsert, (error, result) =>{
         console.log("error", error),
         console.log("result", result),
         res.send("hello express"); 
     });*/
           
 })

app.listen(5000, () => {
    console.log("server is running on port 5000!");
})