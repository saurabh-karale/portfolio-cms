var express = require("express");
var fileupload = require("express-fileupload");

var app = express();
const webroutes = require("./routes/website");
const adminroutes = require("./routes/admin");

app.use("/", webroutes);
app.use("/admin", adminroutes);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.set("view engine", "ejs");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});