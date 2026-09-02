const express = require("express");
const router = express.Router();
var mysql = require("mysql2");
var util = require("util");
var fileupload = require("express-fileupload");
var session = require("express-session");
const path = require("path");


var conn = mysql.createConnection({
   host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});
router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
var exe = util.promisify(conn.query).bind(conn);
router.use(express.urlencoded({ extended: true }));
router.use(fileupload());

function session_check(req, res, next) {
  if (req.session.lid) {
    next();
  } else {
    res.redirect("/admin/login");
  }
}
// router.get("/", (req, res) => {
//   //   res.send("Admin");
//   var username = req.session.username;
//   res.render("admin/dashboard.ejs", { username: username });
// });
router.get("/", async (req, res) => {

  var username = req.session.username;

  var project = await exe("SELECT COUNT(*) AS total FROM project");
  var blog = await exe("SELECT COUNT(*) AS total FROM blog");
  var message = await exe("SELECT COUNT(*) AS total FROM contact_form");
  var service = await exe("SELECT COUNT(*) AS total FROM service");

  res.render("admin/dashboard.ejs", {
    username: username,
    projectCount: project[0].total,
    blogCount: blog[0].total,
    messageCount: message[0].total,
    serviceCount: service[0].total

  });

});
router.post("/home_save", async (req, res) => {

    var { name, description, old_image } = req.body;

    if (req.files && req.files.image) {

        var img = req.files.image;
        var imgname = Date.now() + img.name;

        var imgpath = path.join(__dirname, "../", "public", imgname);

        img.mv(imgpath, () => {});

    } else {

        var imgname = old_image;

    }

    var sql = `
        UPDATE home_update
        SET
            name=?,
            description=?,
            image=?
        WHERE id=1
    `;

    await exe(sql, [
        name,
        description,
        imgname
    ]);

    res.redirect("/admin/home_update");

});

router.get("/login", (req, res) => {
  res.render("admin/login.ejs");
});
router.post("/login_check", async (req, res) => {
  // res.send(req.body);
  var { username, password } = req.body;
  var sql = `select * from login where username=? and password = ?`;
  var data = await exe(sql, [username, password]);

  if (data[0]) {
    // res.send(data);
    req.session.lid = data[0].lid;
    req.session.username = data[0].username;
    res.redirect("/admin");
  } else {
    res.redirect("/admin/login");
  }
});
router.get("/forgot", (req, res) => {
  res.render("admin/forgot.ejs");
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
});
router.get("/skill_add", (req, res) => {
  res.render("admin/skill_add.ejs");
});
router.post("/skill_add_save", async (req, res) => {
  // res.send(req.body);
  var { tech_name, tech_per } = req.body;
  var sql = `insert into technical_skills (tech_name,tect_per)values(?,?)`;
  var data = await exe(sql, [tech_name, tech_per]);
  res.redirect("/admin/skill_add");
});
router.get("/skill_list", async (req, res) => {
  var sql = `select * from technical_skills `;
  var data = await exe(sql);
  // res.send(data);
    // console.log(data);

  res.render("admin/skill_list.ejs", { skill: data });
});
router.get("/skill_delete/:id", async (req, res) => {
  var id = req.params.id;
  var sql = `DELETE FROM technical_skills WHERE ts_id=?`;
  await exe(sql, [id]);
  res.redirect("/admin/skill_list");
});
router.get("/skill_edit/:id", async (req, res) => {
  var id = req.params.id;
  var sql = `SELECT * FROM technical_skills WHERE ts_id=?`;
  var data = await exe(sql, [id]);

  res.render("admin/skill_edit.ejs", {
    skill: data[0]
  });
});
router.post("/skill_update", async (req, res) => {
  var { id, tech_name, tech_per } = req.body;

  var sql = `UPDATE technical_skills SET tech_name=?, tect_per=? WHERE ts_id=?`;
  await exe(sql, [tech_name, tech_per, id]);

  res.redirect("/admin/skill_list");
});

router.get("/experience_add", (req, res) => {
  res.render("admin/experience_add.ejs");
});
router.post("/experience_add_save", async (req, res) => {
  // res.send(req.body);
  var { exp_duration, exp_position, exp_company, exp_desc } = req.body;
  var sql = `insert into experience (exp_duration,exp_position,exp_company,exp_desc)values(?,?,?,?)`;
  var data = await exe(sql, [
    exp_duration,
    exp_position,
    exp_company,
    exp_desc,
  ]);
  res.redirect("/admin/experience_add");
});
router.get("/experience_list", async (req, res) => {
  var sql = `select * from experience `;
  var data = await exe(sql);
  // res.send(data);
  // console.log(data);
  res.render("admin/experience_list.ejs", { experience: data });
});
router.get("/experience_delete/:id", async (req, res) => {
  var id = req.params.id;

  var sql = `DELETE FROM experience WHERE eid=?`;
  await exe(sql, [id]);

  res.redirect("/admin/experience_list");
});

router.get("/experience_edit/:id", async (req, res) => {
  var id = req.params.id;

  var sql = `SELECT * FROM experience WHERE eid=?`;
  var data = await exe(sql, [id]);

  res.render("admin/experience_edit.ejs", {
    experience: data[0]
  });
});

router.post("/experience_update", async (req, res) => {
  var { id, exp_duration, exp_position, exp_company, exp_desc } = req.body;

  var sql = `UPDATE experience SET exp_duration=?, exp_position=?, exp_company=?, exp_desc=? WHERE eid=?`;

  await exe(sql, [
    exp_duration,
    exp_position,
    exp_company,
    exp_desc,
    id
  ]);

  res.redirect("/admin/experience_list");
});

router.get("/education_add", (req, res) => {
  res.render("admin/education_add.ejs");
});
router.post("/education_add_save", async (req, res) => {
  // res.send(req.body);
  var { edu_duration, edu_position, edu_company } = req.body;
  var sql = `insert into education (edu_duration, edu_position,edu_company)values(?,?,?)`;
  var data = await exe(sql, [edu_duration, edu_position, edu_company]);
  res.redirect("/admin/education_add");
});
router.get("/education_list", async (req, res) => {
  var sql = `select * from education `;
  var data = await exe(sql);
  // res.send(data);
  
  res.render("admin/education_list.ejs", { education: data });
});
router.get("/education_delete/:id", async (req, res) => {
  var id = req.params.id;

  var sql = `DELETE FROM education WHERE eid=?`;
  await exe(sql, [id]);

  res.redirect("/admin/education_list");
});

router.get("/education_edit/:id", async (req, res) => {
  var id = req.params.id;

  var sql = `SELECT * FROM education WHERE eid=?`;
  var data = await exe(sql, [id]);

  res.render("admin/education_edit.ejs", {
    education: data[0]
  });
});

router.post("/education_update", async (req, res) => {
  var { id, edu_duration, edu_position, edu_company } = req.body;

  var sql = `UPDATE education SET edu_duration=?, edu_position=?, edu_company=? WHERE eid=?`;

  await exe(sql, [
    edu_duration,
    edu_position,
    edu_company,
    id
  ]);

  res.redirect("/admin/education_list");
});

router.get("/service_add", (req, res) => {
  res.render("admin/service_add.ejs");
});
router.post("/service_add_save", async (req, res) => {
  // res.send(req.body);
  var { ser_logo, ser_position, ser_desc } = req.body;
  var sql = `insert into service (ser_logo, ser_position,ser_desc)values(?,?,?)`;
  var data = await exe(sql, [ser_logo, ser_position, ser_desc]);
  res.redirect("/admin/service_add");
});
router.get("/service_list", async (req, res) => {
  var sql = `select * from service `;
  var data = await exe(sql);
  // res.send(data);
  res.render("admin/service_list.ejs", { service: data });
});
router.get("/service_edit/:id", async (req, res) => {

    var id = req.params.id;

    var sql = "SELECT * FROM service WHERE sid=?";

    var data = await exe(sql, [id]);

    res.render("admin/service_edit", {
        service: data[0]
    });

});
router.post("/service_update", async (req, res) => {

    var { sid, ser_logo, ser_position, ser_desc } = req.body;

    var sql = `
        UPDATE service
        SET
            ser_logo=?,
            ser_position=?,
            ser_desc=?
        WHERE sid=?
    `;

    await exe(sql, [
        ser_logo,
        ser_position,
        ser_desc,
        sid
    ]);

    res.redirect("/admin/service_list");

});
router.get("/service_delete/:id", async (req, res) => {

    var id = req.params.id;

    var sql = "DELETE FROM service WHERE sid=?";

    await exe(sql, [id]);

    res.redirect("/admin/service_list");

});

router.get("/project_add", (req, res) => {
  res.render("admin/project_add.ejs");
});
router.post("/project_add_save", async (req, res) => {

    var { pro_logo, pro_name, pro_position } = req.body;

    var img = req.files.pro_img;
    var imgname = Date.now() + img.name;

    var imgpath = path.join(__dirname, "../", "public", imgname);

    img.mv(imgpath, (err) => {});

    var sql = `
        INSERT INTO project
        (pro_logo, pro_name, pro_position, pro_img)
        VALUES (?,?,?,?)
    `;

    await exe(sql, [
        pro_logo,
        pro_name,
        pro_position,
        imgname
    ]);

    res.redirect("/admin/project_list");

});
router.get("/project_list", async (req, res) => {
  var sql = `select * from project `;
  var data = await exe(sql);
  // res.send(data);
  res.render("admin/project_list.ejs", { project: data });
});

router.get("/project_edit/:id", async (req, res) => {

    var id = req.params.id;

    var sql = "SELECT * FROM project WHERE pid=?";

    var data = await exe(sql, [id]);

    res.render("admin/project_edit.ejs", {
        project: data[0]
    });

});

router.post("/project_update", async (req, res) => {

     var {
    pid,
    pro_logo,
    pro_name,
    pro_position,
    old_img
  } = req.body;

  var imgname = old_img;

  if (req.files && req.files.pro_img) {

    var img = req.files.pro_img;

    imgname = Date.now() + img.name;

    var imgpath = path.join(__dirname, "../public", imgname);

    await img.mv(imgpath);

  }

  var sql = `
    UPDATE project
    SET
      pro_logo=?,
      pro_name=?,
      pro_position=?,
      pro_img=?
    WHERE pid=?
  `;

  await exe(sql, [
    pro_logo,
    pro_name,
    pro_position,
    imgname,
    pid
  ]);

  res.redirect("/admin/project_list");

});
router.get("/project_delete/:id", async (req, res) => {

    var id = req.params.id;

    var sql = "DELETE FROM project WHERE pid=?";

    await exe(sql, [id]);

    res.redirect("/admin/project_list");

});

router.get("/testimonials_add", (req, res) => {
  res.render("admin/testimonials_add.ejs");
});
router.post("/testimonials_add_save", async (req, res) => {
  // res.send(req.body);
  var { test_star, test_desc, test_img, test_name, test_position } = req.body;
  var sql = `insert into testimonials (test_star, test_desc, test_img, test_name,test_position)values(?,?,?,?,?)`;
  var data = await exe(sql, [
    test_star,
    test_desc,
    test_img,
    test_name,
    test_position,
  ]);
  res.redirect("/admin/testimonials_add");
});
router.get("/testimonials_list", async (req, res) => {
  var sql = `select * from testimonials `;
  var data = await exe(sql);
  // res.send(data);
  res.render("admin/testimonials_list.ejs", { testimonials: data });
});
router.get("/testimonials_add", (req, res) => {
    res.render("admin/testimonials_add.ejs");
});

router.post("/testimonials_add_save", async (req, res) => {

     var {
        test_star,
        test_desc,
        test_name,
        test_position
    } = req.body;

    var img = req.files.test_img;

    var imgname = Date.now() + img.name;

    var imgpath = path.join(
        __dirname,
        "../",
        "public",
        imgname
    );

    await img.mv(imgpath);

    var sql = `
        INSERT INTO testimonials
        (test_star, test_desc, test_img, test_name, test_position)
        VALUES (?, ?, ?, ?, ?)
    `;

    await exe(sql, [
        test_star,
        test_desc,
        imgname,
        test_name,
        test_position
    ]);

    res.redirect("/admin/testimonials_list");

});
router.get("/testimonials_edit/:id", async (req,res)=>{

    var id = req.params.id;

    var sql = "SELECT * FROM testimonials WHERE id=?";

    var data = await exe(sql, [id]);

    res.render("admin/testimonials_edit.ejs", {
        testimonials: data[0]
    });

});
router.post("/testimonials_update", async (req, res) => {

       var {
        id,
        test_star,
        test_desc,
        test_name,
        test_position,
        old_img
    } = req.body;

    // सुरुवातीला जुनी image ठेव
    var imgname = old_img;

    // नवीन image select केली असेल तरच
    // नवीन image save कर
    if (req.files && req.files.test_img) {

        var img = req.files.test_img;

        imgname = Date.now() + img.name;

        var imgpath = path.join(
            __dirname,
            "../",
            "public",
            imgname
        );

        await img.mv(imgpath);
    }

    var sql = `
        UPDATE testimonials
        SET
            test_star=?,
            test_desc=?,
            test_img=?,
            test_name=?,
            test_position=?
        WHERE id=?
    `;

    await exe(sql, [
        test_star,
        test_desc,
        imgname,
        test_name,
        test_position,
        id
    ]);

    res.redirect("/admin/testimonials_list");


});
router.get("/testimonials_delete/:id", async(req,res)=>{

    var id=req.params.id;

    var sql="DELETE FROM testimonials WHERE id=?";

    await exe(sql,[id]);

    res.redirect("/admin/testimonials_list");

});

router.get("/blog_add", (req, res) => {
  res.render("admin/blog_add.ejs");
});
router.post("/blog_add_save", async (req, res) => {
  // res.send(req.body);
  var { blog_img, blog_date, blog_name, blog_desc } = req.body;
  var sql = `insert into blog (blog_img, blog_date,blog_name,blog_desc)values(?,?,?,?)`;
  var data = await exe(sql, [blog_img, blog_date, blog_name, blog_desc]);
  res.redirect("/admin/blog_add");
});
router.get("/blog_list", async (req, res) => {
  var sql = `select * from blog `;
  var data = await exe(sql);
  // res.send(data);
  res.render("admin/blog_list.ejs", { blog: data });
});
router.post("/blog_add_save", async (req, res) => {

    var { blog_date, blog_name, blog_desc } = req.body;

    var img = req.files.blog_img;
    var imgname = Date.now() + img.name;

    var imgpath = path.join(__dirname, "../", "public", imgname);

    img.mv(imgpath, (err) => {});

    var sql = `
        INSERT INTO blog
        (blog_img, blog_date, blog_name, blog_desc)
        VALUES (?,?,?,?)
    `;

    await exe(sql, [
        imgname,
        blog_date,
        blog_name,
        blog_desc
    ]);

    res.redirect("/admin/blog_list");

});
router.get("/blog_edit/:id", async (req, res) => {

    var id = req.params.id;

    var sql = "SELECT * FROM blog WHERE id=?";

    var data = await exe(sql, [id]);

    res.render("admin/blog_edit.ejs", {
        blog: data[0]
    });

});
router.post("/blog_update", async (req, res) => {

    var { id, blog_date, blog_name, blog_desc, old_img } = req.body;

    if (req.files && req.files.blog_img) {

        var img = req.files.blog_img;
        var imgname = Date.now() + img.name;

        var imgpath = path.join(__dirname, "../", "public", imgname);

        img.mv(imgpath, () => {});

    } else {

        var imgname = old_img;

    }

    var sql = `
        UPDATE blog
        SET
            blog_img=?,
            blog_date=?,
            blog_name=?,
            blog_desc=?
        WHERE id=?
    `;

  await exe(sql, [
    imgname,
    blog_date,
    blog_name,
    blog_desc,
    id
]);
    res.redirect("/admin/blog_list");

});
router.get("/blog_delete/:id", async(req,res)=>{

    var id=req.params.id;

    var sql="DELETE FROM blog WHERE bid=?";

    await exe(sql,[id]);

    res.redirect("/admin/blog_list");

});


router.get("/settings", async (req, res) => {
  var sql = `select * from contact `;
  var data = await exe(sql);
  var sql1 = `select * from social `;
  var data1 = await exe(sql1);
  res.render("admin/settings.ejs", { data: data[0], data1: data1[0] });
});

router.post("/contact_save", async (req, res) => {
  // res.send(req.body);
  // res.send(req.files);
  var { email, phone, address, map, old_logo } = req.body;
  if (req.files) {
    var img = req.files.logo;
    var imgname = Date.now() + img.name;
    var imgpath = path.join(__dirname, "../", "public", imgname);
    img.mv(imgpath, (err) => {});
    // res.send(imgpath);
  } else {
    var imgname = old_logo;
  }
  var sql =
    "update contact set email = ? ,phone = ? , address = ? , map = ? , logo = ? where cid=1  ";
  var data = await exe(sql, [email, phone, address, map, imgname]);
  // res.send("done");
  res.redirect("/admin/settings");
});

router.post("/social_save", async (req, res) => {
  var { facebook, twitter, instagram, linkedin, github, youtube } = req.body;
  var sql =
    " update social set  facebook =?, twitter =?,instagram =?,linkedin =?,github =?,youtube =? where sid = 1";
  var data = await exe(sql, [
    facebook,
    twitter,
    instagram,
    linkedin,
    github,
    youtube,
  ]);
  res.redirect("/admin/settings");
  //  res.send('done');
});

router.get("/home_update", async (req, res) => {
  var sql = `select * from home_update `;
  var data = await exe(sql);
  res.render("admin/home_update.ejs", { data: data[0] });
});
router.post("/home_save", async (req, res) => {
  // res.send(req.body);
  // res.send(req.files);
  var { name, description, old_image } = req.body;
  if (req.files) {
    var img = req.files.image;
    var imgname = Date.now() + img.name;
    var imgpath = path.join(__dirname, "../", "public", imgname);
    img.mv(imgpath, (err) => {});
    // res.send(imgpath);
  } else {
    var imgname = old_image;
  }
  var sql =
    " update home_update set name = ? ,description = ? , image = ? where id=1 ";
  var data = await exe(sql, [name, description, imgname]);
  // res.send("Done");
  res.redirect("/admin/home_update");
});

router.get("/about_update", async (req, res) => {
  // res.send("done")
  var sql = `select * from about_update `;
  var data = await exe(sql);
  res.render("admin/about_update.ejs", { data: data[0] });
});
router.post("/about_save", async (req, res) => {
  // res.send(req.body);
  // res.send(req.files);
  var {
    title,
    subtitle,
    position,
    position_desc,
    old_image,
    name,
    email,
    location,
    freelance,
    projects_completed,
    happy_clients,
    awards_won,
    years_experience,
  } = req.body;
  if (req.files) {
    var img = req.files.image;
    var imgname = Date.now() + img.name;
    var imgpath = path.join(__dirname, "../", "public", imgname);
    img.mv(imgpath, (err) => {});
    // res.send(imgpath);
  } else {
    var imgname = old_image;
  }
  var sql =
    " update about_update set title = ?, subtitle = ?,position = ?,position_desc = ?,image = ?,name = ?,email = ?,location = ?,freelance = ?,projects_completed = ?,happy_clients = ?,awards_won = ?,years_experience = ? where id=1 ";
  var data = await exe(sql, [
    title,
    subtitle,
    position,
    position_desc,
    imgname,
    name,
    email,
    location,
    freelance,
    projects_completed,
    happy_clients,
    awards_won,
    years_experience,
  ]);
  // res.send("Done");
  res.redirect("/admin/about_update");
});

router.get("/contact_list", async (req, res) => {

    var sql = "SELECT * FROM contact_form";
    var contact = await exe(sql);

    res.render("admin/contact_list", {
        contact: contact
    });

});
router.get("/contact_edit/:id", async (req, res) => {

    var id = req.params.id;

    var sql = "SELECT * FROM contact_form WHERE cid=?";

    var data = await exe(sql, [id]);

    res.render("admin/contact_edit", {
        contact: data[0]
    });

});
router.post("/contact_update", async (req, res) => {

    var { cid, full_name, email, subject, message } = req.body;

    var sql = `
        UPDATE contact_form
        SET c_name=?,
            c_email=?,
            c_subject=?,
            c_message=?
        WHERE cid=?
    `;

    await exe(sql, [
        full_name,
        email,
        subject,
        message,
        cid
    ]);

    res.redirect("/admin/contact_list");

});
router.get("/contact_delete/:id", async (req, res) => {

    var id = req.params.id;

    var sql = "DELETE FROM contact_form WHERE cid=?";

    await exe(sql, [id]);

    res.redirect("/admin/contact_list");

});

module.exports = router;
