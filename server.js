// Depencies imports...
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

// Port from .env
const port = process.env.PORT || 3500;

// Routes imports...
const root = require("./routes/root");
const register = require("./routes/register");
const auth = require("./routes/auth");
const employees = require("./routes/api/employees");
const refresh = require("./routes/refresh");

app.use(cors(corsOptions));

// Custom middleware logger...
app.use(logger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//
app.use(cookieParser());

// include static files...
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", root);
app.use("/register", register);
app.use("/auth", auth);
app.use("/refresh", refresh);

app.use(verifyJWT);
app.use("/employees", employees);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(port, () => console.log("Server running on port:", port));
