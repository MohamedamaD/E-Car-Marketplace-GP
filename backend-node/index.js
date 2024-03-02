const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const showroomRoutes = require("./routes/showroomRoutes");
const carRoutes = require("./routes/carRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const locationsRoutes = require("./routes/locationsRoutes");

const buyerRoutes = require("./routes/buyerRoutes");
const sellerRoutes = require("./routes/sellerRoutes");
const showroomOwnerRoutes = require("./routes/showroomOwnerRoutes");

const connectDB = require("./db/config");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/user", userRoutes);
app.use("/showrooms", showroomRoutes);
app.use("/cars", carRoutes);
app.use("/locations", locationsRoutes);
app.use("/media", mediaRoutes);

app.use("/buyer", buyerRoutes);
app.use("/seller", sellerRoutes);
app.use("/showroom-owner", showroomOwnerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
