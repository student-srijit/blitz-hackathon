const express = require("express");
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const app = express();
const port = 3000;

// Paths for templates and public files
const templatePath = path.join(__dirname, "../templates");
const staticPath = path.join(__dirname, "../public");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticPath));

// Setting up Handlebars and views directory
app.set("view engine", "hbs");
app.set("views", templatePath);

// Routes

// Home route
app.get("/", (req, res) => {
  res.render("home"); // Render home page after successful login/signup
});

// Signup route (GET) - Renders the signup form
app.get("/signup", (req, res) => {
  res.render("signup"); // Render the signup page
});

// Signup route (POST) - Handles the signup form submission
app.post("/signup", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      password: req.body.password,
    };

    await collection.insertMany([data]); // Save user data to the database
    res.render("home"); // Redirect to home after successful signup
  } catch (error) {
    res.render("signup", {
      error: "Error creating account. Please try again.", // Error if signup fails
    });
  }
});

// Login route (GET) - Renders the login form
app.get("/login", (req, res) => {
  res.render("login"); // Render the login page
});

// Login route (POST) - Handles the login form submission
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });

    if (check && check.password === req.body.password) {
      res.render("home"); // Redirect to home after successful login
    } else {
      res.render("login", { error: "Incorrect password!" }); // Error if login fails
    }
  } catch {
    res.render("login", { error: "Incorrect details!" }); // Error if no account found
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
