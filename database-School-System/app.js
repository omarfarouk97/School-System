const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const courseRoutes = require("./routes/course-routes");
const teacherRoutes = require("./routes/teacher-routes");
const { sendMessage } = require("./controllers/message-controller");

const app = express();

app.use(bodyParser.json());
app.use("/", courseRoutes);
app.use("/", teacherRoutes);
app.post("/chat", sendMessage);

// mongoose
//   .connect(
//     "mongodb+srv://coligoInternship:internship@cluster0.owz5w.mongodb.net/School?retryWrites=true&w=majority"
//   )
//   .then(() => {
//     app.listen(5000);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
