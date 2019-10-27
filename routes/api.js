var express = require('express');
var router = express.Router();
var { Client } = require('pg');
var conString = "postgres://postgres:postgres@localhost:5432/ins_alfresco";


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('api', { title: 'API de MicroServicios - Proceso de inscripción modelado en Alfresco ECM' });
});

//================================== SOLICITUDES ===============================

router.get('/solicitudes', function (req, res) {
  var query = "SELECT * FROM alfresco_ins.solicitud";
  var client = new Client({
    connectionString: conString,
  });
  client.connect();
  client.query(query)
  .then(resBd => {
    client.end();
    res.send(resBd.rows);
  }).catch(e => {
    client.end();
    console.error(e.stack);
    res.send({error:e.stack});
  });
});

router.get('/solicitudes/:correo', function (req, res) {
  var query = "SELECT * FROM alfresco_ins.solicitud WHERE correo = $1";
  console.log('Parametros', req.params);
  var {correo} = req.params
  var respuesta = { valido:false,estado:0};
  var client = new Client({
    connectionString: conString,
  });
  client.connect();
  client.query(query,[correo])
  .then(resBd => {
    client.end();
    if(resBd.rows.length > 0){
      respuesta.valido=true;
      respuesta.estado=resBd.rows[0].estado;
      res.send(respuesta);
    }else{
        res.send(respuesta);
    }
  }).catch(e => {
    client.end();
    res.send(respuesta);
    console.error(e.stack)
  });
});

//=================================== CATALOGOS ================================

router.get('/catalogos', function (req, res) {
  var query = "SELECT * FROM alfresco_ins.catalogo WHERE tipo = 1 ";
  var client = new Client({
    connectionString: conString,
  });
  client.connect();
  client.query(query)
  .then(resBd => {
    client.end();
    res.send(resBd.rows);
  }).catch(e => {
    client.end();
    console.error(e.stack)
    res.send({error:e.stack});
  });
});

router.get('/catalogos/datos/:id', function (req, res) {
  var query = "SELECT * FROM alfresco_ins.catalogo WHERE tipo = 2 AND catalogo_codigo = $1";
  var {id} = req.params
  var client = new Client({
    connectionString: conString,
  });
  client.connect();
  client.query(query,[id])
  .then(resBd => {
    client.end();
    res.send(resBd.rows);
  }).catch(e => {
    client.end();
    console.error(e.stack)
    res.send({error:e.stack});
  });
});

//=================================== ESTUDIANTES ==============================

router.get('/estudiantes', function (req, res) {
  var query = "SELECT * FROM alfresco_ins.estudiante";
  var client = new Client({
    connectionString: conString,
  });
  client.connect();
  client.query(query)
  .then(resBd => {
    client.end();
    console.log(resBd.rows[0]);
    res.send(resBd.rows);
  }).catch(e => {
    client.end();
    console.error(e.stack);
    res.send({error:e.stack});
  });
});



module.exports = router;
