import express from 'express';
import appBodegas from "./routers/bodegas.js";
import appProductos from "./routers/productos.js";

const app = express();

app.use(express.json());

app.use("/bodegas", appBodegas);
app.use("/productos", appProductos);

const config = {
    host: '127.12.11.1',
    port: 4610
}

app.listen(config, ()=>{
    console.log(`Server running at http://${config.host}:${config.port}`)
})