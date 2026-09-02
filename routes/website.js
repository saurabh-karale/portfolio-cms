const express = require("express");
const router = express.Router();
var mysql = require("mysql2");
var util = require("util");

var conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});
var exe = util.promisify(conn.query).bind(conn);
router.use(express.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  var sql = "SELECT * FROM home_update WHERE id=1";

  var data = await exe(sql);

  res.render("website/index", {
    home: data[0],
  });
});
router.get("/about", async (req, res) => {
  var sql = " select * from about_update";
  var data = await exe(sql);
  // res.send(data);
  res.render("website/about.ejs", { data: data });
});
router.get("/resume", async (req, res) => {
  var sql = "SELECT * FROM technical_skills";
  var skill = await exe(sql);

  var sql1 = "SELECT * FROM experience";
  var experience = await exe(sql1);

  var sql2 = "SELECT * FROM education";
  var education = await exe(sql2);

  res.render("website/resume.ejs", {
    skill: skill,
    experience: experience,
    education: education,
  });
});
router.get("/services", async (req, res) => {
  var sql = " select * from service";
  var data = await exe(sql);
  // res.send(data);
  res.render("website/services.ejs", { data: data });
});
router.get("/portfolio", async (req, res) => {
  var sql = "SELECT * FROM project";

  var project = await exe(sql);

  res.render("website/portfolio.ejs", {
    project: project,
  });
});
router.get("/testimonial", async (req, res) => {
  var sql = "SELECT * FROM testimonials";

  var testimonials = await exe(sql);

  res.render("website/testimonial.ejs", {
    testimonials: testimonials,
  });
});
router.get("/blog", async (req, res) => {
  var sql = "SELECT * FROM blog";

  var blog = await exe(sql);

  res.render("website/blog", {
    blog: blog,
  });
});
router.get("/contact", async (req, res) => {
  var sql = " select * from contact";
  var contact = await exe(sql);
  res.render("website/contact.ejs", { contact: contact[0] });
});
router.post("/contact_form_save", async (req, res) => {
  var { full_name, email, subject, message } = req.body;

  var sql =
    "INSERT INTO contact_form (c_name, c_email, c_subject, c_message) VALUES (?, ?, ?, ?)";

  var data = await exe(sql, [full_name, email, subject, message]);

  res.redirect("/contact");
});

module.exports = router;
