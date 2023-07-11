import dotenv from 'dotenv';
import {Router} from 'express';
import mysql from 'mysql2';
const appBodegas = Router();
dotenv.config();

let con = undefined;

appBodegas.use((req,res,next)=>{
    try{
        con = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: process.env.DB_PORT
        });
        next();
    }catch(error){
        res.status(200).send("No conecta bro");
    }
});

appBodegas.get('/', (req, res) => {
    con.query(
        /*sql*/`SELECT * FROM bodegas ORDER BY nombre ASC`,
        (err,data)=>{
            if(err){
                console.log(err);
                res.status(400).send(err);
            }else{
                console.log(data);
                res.status(200).send(data);
            }
        }
    )
})

export default appBodegas;
