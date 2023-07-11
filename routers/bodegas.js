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
                res.status(200).send(data);
            }
        }
    )
})

appBodegas.post('/', (req, res)=>{
    const {id, nombre,estado,id_responsable,created_at,updated_at} = req.body;
    con.query(
        /*sql*/`SELECT id FROM users WHERE id = ?`,
        [id_responsable],
        (err,data)=>{
            if(err){
                res.status(513).send("no se puedo socio");
            }else if(data.length === 0){
                res.status(513).send("no se puedo socio, el usuario no existe")
            }else{
                con.query(
                    /*sql*/`INSERT INTO bodegas(id, nombre, id_responsable,  estado, created_at, updated_at) VALUES (?,?,?,?,?,?)`,
                    [id, nombre, id_responsable, estado, created_at, updated_at],
                    (err,data)=>{
                        if(err){
                            console.log(err);
                            res.status(520).send("dsfdsf")
                        }else{
                            console.log(data);
                            res.status(200).send("usuario guardado")
                        }
                    }
                )
            }
        }
    )
})


export default appBodegas;
