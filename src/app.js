const express = require("express");//routing our project
const path = require("path");//easy way to wirk in directory
const app = express();//stored express function
const hbs = require("hbs");//storing js template 
require("./db/conn");// connecting with database and js
const Register = require("./models/registers");//importing register collection
const port = process.env.PORT || 3000;//port number where project will be displayed
// console.log(path.join(__dirname, "../public"));
//storing path in variable
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
//use and set...one of the first thing to run
app.use(express.json());//parsing data
app.use(express.urlencoded({extended:false}));//parsing data
app.use(express.static(static_path));//accessing style 
app.set("view engine", "hbs");//using hbs  
app.set("views", template_path);// set path to access views directory from any directory
hbs.registerPartials(partials_path);//templates reuse through partials
//handling request to target location 
app.get("/", (req, res) => {
    res.render("index");
    });
app.get("/register", (req, res) => {
    res.render("register");
    });
app.get("/login",(req,res) => {
        res.render("login");
    })
//handling the post request
app.post("/register", async (req, res) => {
    try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    //defining instance of the model
    if(password === cpassword){
        const registerEmployee = new Register({
            firstname : req.body.firstname,
            lastname  : req.body.lastname,
            email     : req.body.email,
            gender    : req.body.gender,
            phone     : req.body.phone,
            age       : req.body.age,
            password  : password,
            confirmpassword: cpassword
        })
        const registered = await registerEmployee.save();//instance of our collection to db
            res.status(201).render("index");//rendering index page
    }else{
        res.send("passwords are not matching")
    }
    } catch (error) {
        res.status(400).send(error);
    }
});
//starting the server
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})
