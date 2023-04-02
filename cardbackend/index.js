const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("./mongodb/connect.js");
const cookieParser = require("cookie-parser");

//global Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//custom made routes

app.use("/sample", require("./routes/sampleroute.js"));
app.use("/auth", require("./routes/authRoutes.js"));
app.use("/bucket", require("./routes/bucketRoute.js"));
app.use("/card", require("./routes/cardRoute.js"));

function startServer() {
  try {
    const PORT = 3000;
    const link = "mongodb://localhost/Collector";
    connectDb(link);
    app.listen(PORT, () => {
      console.log("Server is Started at PORT:", PORT);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
