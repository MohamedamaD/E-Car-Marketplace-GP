const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const showroomRoutes = require("./routes/showroomRoutes");
const carRoutes = require("./routes/carRoutes");
const mediaRoutes = require("./routes/mediaRoutes");

const connectDB = require("./db/config");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/user", userRoutes);
app.use("/showrooms", showroomRoutes);
app.use("/cars", carRoutes);
app.use("/media", mediaRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
