import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

// Important variables
let passwordsMatch = false;
let emailExist = false;
let users = [];

// Add static folder
app.use(express.static("public"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true}));

// Middleware function for registration
function register (req, res, next) {
  passwordsMatch = false;
  emailExist = false;

  const newName = req.body.name;
  const newPassword = req.body.password;
  const newEmail = req.body.email;

  // Check if passwords match
  if (newPassword === req.body.confirmation) {
    passwordsMatch = true;
  }

  // Check if email already exists
  users.forEach((item) => {
    if (item.email === newEmail) {
      emailExist = true;
    };
  });

  if (!emailExist && passwordsMatch) {
    const newUser = {
      name: newName,
      email: newEmail,
      password: newPassword
    };

    users.push(newUser);
    req.newUser = newUser;
  };

  next();
};

// middleware function for sign in
function signIn (req, res, next) {
  
  
  next();
}



// Navigation
app.get("/", (req, res) => {
  res.render("index.ejs", { status: "default", name: "default"});
});

app.get("/register", (req, res) => {
  res.render("register.ejs", { validated: "default"});
});

app.get("/sign-in", (req, res) => {
  res.render("signin.ejs");
});

// Register
app.post("/new-user", register, (req, res) => {

  if (emailExist) {
    res.render("register.ejs", { validated : "emailExists" });
  } else if (!passwordsMatch) {
    res.render("register.ejs", { validated : "passwordsNotMatch" });
  } else {
    res.render("index.ejs", {status : "registered", name: req.newUser.name});
  };

  
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});



