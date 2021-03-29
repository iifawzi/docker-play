import Sequelize from "sequelize"
const db = new Sequelize("eduction", "root","rootroot",
    { 
        dialect: "mysql", 
        host: "database",
        define:{
            charset: "utf8",
            collate: "utf8_general_ci",
        }}
);

const initDatabase = async ()=>{
    try {
        // await db.sync({force:true}); // to force the tables to update " when ( add / delete / update ) models" `
        await db.sync();
        console.log("Database Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

export {
    db, 
    initDatabase,
}