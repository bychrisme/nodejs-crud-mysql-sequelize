import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './app/models';
import * as dotenv from 'dotenv';
import TutorialRoutes from './app/routes/tutorial.routes';

dotenv.config();

const app = express();


var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// tutorials routes
app.use("/api/tutorials", TutorialRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});