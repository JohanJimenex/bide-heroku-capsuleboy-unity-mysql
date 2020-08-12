const express = require('express');
const app = express();
const mysql = require('mysql');

app.use(express.urlencoded({ extended: false }))//Se usa para poder aceptar desde los fomularios los datos que envia
app.use(express.json());//para entender json

app.set('puerto', process.env.PORT || 2323);

//Iniciar el servidor.
app.listen(app.get('puerto'), () => {
  console.log('servidor en puerto: ' + app.get('puerto'));
});
//datos de la bd de mysql en clever cloud
// const connection = mysql.createConnection({
//   host: 'bbsrlurro88etfdnmjgs-mysql.services.clever-cloud.com',
//   user: 'um1ioakavsbwu5ar',
//   password: 'qkkf9sZsKvoAZXW6YwUL',
//   database: 'bbsrlurro88etfdnmjgs'
// });

//datos en 000webhost.com
// const connection = mysql.createConnection({
//   host: 'databases.000webhost.com',
//   user: 'id13590587_mangugames',
//   password: '&1Na{j%drs]Y0/s2',
//   database: 'id13590587_capsuleboydb'
// });

// datos en local



app.get('/', (req, res) => {
  
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'scorecapsule'
  });
  
  connection.connect();

  //Consulta
  connection.query("SELECT * FROM scorecapsule ORDER BY record DESC;", (error, resultado, detallesTabla) => {//funtion anonima con un callback que devuelve 3 variables
    if (error) console.log(error.sqlMessage);
    res.send(resultado);

    connection.end();

  });

});

//Agregar insertar datos
app.post('/', async (req, res) => {

  let body = req.body;

  await connection.query('INSERT INTO scorecapsule set ?', [body]);

  res.end();

  // let query = req.query;

  // console.log(param);
  // console.log(query);
  // console.log("xxx " + body);

  // await connection.query("INSERT INTO scorecapsule VALUES ('Company Inc', 8)");


  // var sql = "INSERT INTO scorecapsule VALUES ('Company Inc', 8)";

  // connection.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log("1 record inserted");
  // });

});

