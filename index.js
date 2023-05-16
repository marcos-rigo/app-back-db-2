const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

const usersRoutes = require('./routes/usersRoutes');
const countryRoutes = require('./routes/countryRoutes');

const connnectDB = require('./config/db');

connnectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
 
app.use("/users", usersRoutes);
app.use("/countries", countryRoutes);


const PORT = process.env.PORT;
app.listen(PORT, ()=>{console.log(`Server linstening on PORT: ${PORT}...`);})