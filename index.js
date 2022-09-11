const express = require("express");
const cors = require("cors");
require("dotenv").config();
const auth = require("./routes/auth.routes");
const postRoute = require("./routes/blog.routes");
const jobRoute = require("./routes/job.routes");
const mentorRoute = require("./routes/mentor.routes");
const auctionRoute = require("./routes/auction.routes");
const investorRoute = require("./routes/inauth.routes");
const verifyAuthentication = require("./middlewares/auth.middleware");

const app = express();
const connectToDB = require("./db/db");
const url = process.env.DB_URL;

connectToDB(url);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Data fetched successfully.",
    response: "Welcome!",
  });
});

app.use("/auth", auth);
app.use("/invauth", investorRoute);
app.use("/api/blogs", postRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/mentor", mentorRoute);
app.use("/api/auction", auctionRoute);
app.use(verifyAuthentication);

// app.use("/api/categories", categoryRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port 3001`));
