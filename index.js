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

  const newPassword = req.body.password;
  const newEmail = req.body.email;

  if (newPassword === req.body.confirmation) {
    passwordsMatch = true;
  }

  users.forEach((item) => {
    if (item.email === newEmail) {
      emailExist = true;
    };
  });

  if (!emailExist && passwordsMatch) {
    const newUser = {
      email: newEmail,
      password: newPassword
    };

    users.push(newUser);
    console.log(users)
  };

  next();
};



// Navigation
app.get("/", (req, res) => {
  res.render("index.ejs");
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
    res.redirect("/");
  };

  
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});



