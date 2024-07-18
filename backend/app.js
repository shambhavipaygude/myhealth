const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const session = require('express-session');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());

app.set("view engine", "ejs");

// Session middleware
app.use(session({
  secret: 'mdjz uyte obfy eojg', // Replace with a secret key for your app
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if you're using HTTPS
}));

// MySQL database connection configuration
const dbConfig = {
  host: '127.0.0.1',
  port: 3308, // Ensure the correct port is specified here
  user: 'root',
  password: 'shambhavisql',
  database: 'mydb',
};

let connection;

// Connect to MySQL
mysql.createConnection(dbConfig)
  .then((conn) => {
    connection = conn;
    console.log("MySQL Connected");
  })
  .catch((err) => {
    console.error("Error connecting to MySQL:", err);
    process.exit(1); // Exit the process if unable to connect to the database
  });

// Example route to test MySQL connection
app.get('/testdb', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
    res.send(`The solution is: ${rows[0].solution}`);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Error executing query");
  }
});

// Example root route
app.get('/', (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.use(authRoutes);
