const express = require("express");
const connectDB = require("./config/db");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

// Nhap khau routers

const posts = require("./routes/posts");

// khoi dong app
const app = express();

// Khoi dong handle bar

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Khoi dong body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Khởi động metjhod override
app.use(methodOverride("_method"));

// Khoi dong express  middleware
app.use(express.json());

// Ket noi database mongodb
connectDB();

// Mot so router co ban co the dua vao file rieng trong folder router

app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));

// Mang router vao su dung

app.use("/posts", posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server khoi fdfdong ${PORT}`));
