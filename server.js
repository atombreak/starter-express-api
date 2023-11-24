import express from "express";
import cors from "cors";
import main_route from "./app/routes/ussd.routes.js";
import dotenv from 'dotenv';

dotenv.config();
// import verification_route from "./app/routes/verify.routes.js"
// import mongoose from "mongoose";
// import { DB_CONFIG } from "./app/config/db.config.js";

const app = express();

var corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log(req.body);
    console.log(req.query);
    //console.log(process.env.LIPILA_TOKEN);
    next(); // Call next to pass control to the next middleware or route handler
});

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Zipezemo USSD application." });
});

app.use("/api/ussd", main_route);
//app.use("/verify/ussd", verification_route)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}.`);
});