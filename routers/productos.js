import dotenv from 'dotenv';
import {Router} from 'express';
import mysql from 'mysql2';
const appProductos = Router();
dotenv.config();

let con = undefined;

appProductos.use((req,res,next)=>{
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

appProductos.get("/",(req,res)=>{
    con.query(`
    SELECT productos.*, SUM(inventarios.cantidad) AS Total FROM productos INNER JOIN inventarios ON productos.id = inventarios.id_producto GROUP BY productos.id ORDER BY Total DESC`,
      (error,result)=>{
        if(error){
            console.log(error);
            res.status(500).send("Connection error");
        }else(
            res.status(200).send(result)
        )
    })
});


export default appProductos;
