import express from "express"
import { initDatabase, db } from "./db.js"
import sequelize from "sequelize"
import client from "./redis.js"
const app = express();

app.get("/yr", (req, res, next) => {
    res.send("hahaha");
});

initDatabase();

app.get("/getUser", async (req, res, next) => {
    try {
        const searchTerm = 2;
        client.get(searchTerm, async (err, teacher) => {
            if (err) throw err;

            if (teacher) {
                res.status(200).send({
                    teacher: JSON.parse(teacher),
                    message: "data retrieved from the cache"
                });
            } else {
                const teacher = await db.query("SELECT * from teachers", {
                    type: sequelize.QueryTypes.SELECT,
                    raw: true,
                });
                client.setex(searchTerm, 10, JSON.stringify(teacher[0]));
                res.status(200).send({
                    teacher: teacher[0],
                    message: "data retrieved from the db"
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
});


export default app;