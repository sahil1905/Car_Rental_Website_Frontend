const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const port = 8080; 

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.engine("ejs", require("ejs").__express);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "vyom",
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/return", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.get("/register", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/contact", function (req, res) {
  res.redirect('cont.html')
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;

  // Query the database to check if the email and password match
  connection.query(
    "SELECT * FROM regisdetails WHERE email = ? AND pass = ?",
    [email, password],
    function (err, results) {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 1) {
        res.sendFile(__dirname + "/header.html");
      } else {
        res.redirect("/?error=Invalid email or password");
      }
    }
  );
});

app.post("/reg", function (req, res) {
  const { username, mobile, email, password } = req.body;

  // Query the database to check if the email and password match
  connection.query(
    "INSERT INTO REGISDETAILS (username, mobile, email, pass) VALUES (?, ?, ?, ?)",
    [username, mobile, email, password],

    function (err, results) {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).send("Internal Server Error");
      } else {
        res.sendFile(__dirname + "/login.html")
      }
      // Login successful - redirect to a success page (header.html in this case)
    }
  );
});

app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
