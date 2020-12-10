const express = require('express')
const app = express()
const hbs = require('hbs');
const mysql = require ('mysql');

const conexion = mysql.createConnection({
  host: '158.177.191.183',
  user:'aplicacion',
  password: 'IQxf0IvYC8y2',
  database:'isabanorte'
})

conexion.connect(function(err){
  if(err){
    throw err;
  }else{
    console.log('conexion exitosa a  bd mysql');
  }
});
const datetime1 = '2020-11-24 00:00';
const datetime2 = '2020-12-07 00:00';
const grupos = new Object();
const modulos = new Object();
const infaltable = new Object();
const noPermitida = new Object();
const recomendacion = new Object();
const saludo = new Object();
const producto = new Object();
const venta = new Object();
const validacion = new Object();
const cierre = new Object();
const despedida = new Object();

//grupos queries
//infaltable
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  grupos.infaltable = results[0].cnt;

})
//no permitida
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  grupos.noPermitida = results[0].cnt;

})
//recomendacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  grupos.recomendacion = results[0].cnt;

})
//END grupos queries


//Modulos queries
//saludo
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.clasificacion = 'saludo' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  modulos.saludo = results[0].cnt;

})
//producto
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.clasificacion = 'producto' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  modulos.producto = results[0].cnt;

})
//venta
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.clasificacion = 'venta' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  modulos.venta = results[0].cnt;

})
//validacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.clasificacion = 'validación' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  modulos.validacion = results[0].cnt;

})
//cierre
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.clasificacion = 'cierre' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  modulos.cierre = results[0].cnt;

})
//despedida
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.clasificacion = 'despedida' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  modulos.despedida = results[0].cnt;

})
//END modulos queries

//Infaltable queries
//saludo
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'saludo' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  infaltable.saludo = results[0].cnt;

})
//producto
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'producto' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  infaltable.producto = results[0].cnt;

})
//venta
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'venta' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  infaltable.venta = results[0].cnt;

})
//validacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'validación' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  infaltable.validacion = results[0].cnt;

})
//cierre
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'cierre' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  infaltable.cierre = results[0].cnt;

})
//despedida
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'despedida' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  infaltable.despedida = results[0].cnt;

})
//END infaltable queries


//noPermitida queries
//saludo
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'saludo' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  noPermitida.saludo = results[0].cnt;

})
//producto
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'producto' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  noPermitida.producto = results[0].cnt;

})
//venta
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'venta' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  noPermitida.venta = results[0].cnt;

})
//validacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'validación' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  noPermitida.validacion = results[0].cnt;

})
//cierre
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'cierre' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  noPermitida.cierre = results[0].cnt;

})
//despedida
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'despedida' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  noPermitida.despedida = results[0].cnt;

})
//END noPermitida queries


//recomendacion queries
//saludo
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'saludo' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  recomendacion.saludo = results[0].cnt;

})
//producto
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'producto' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  recomendacion.producto = results[0].cnt;

})
//venta
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'venta' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  recomendacion.venta = results[0].cnt;

})
//validacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'validación' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  recomendacion.validacion = results[0].cnt;

})
//cierre
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'cierre' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  recomendacion.cierre = results[0].cnt;

})
//despedida
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'despedida' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  recomendacion.despedida = results[0].cnt;

})
//END recomendacion queries



//saludo queries
//infaltable
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'saludo' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  saludo.infaltable = results[0].cnt;

})
//noPermitido
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'saludo' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  saludo.noPermitida = results[0].cnt;

})
//Recomendacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'saludo' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  saludo.recomendacion= results[0].cnt;

})
//END saludo 3.1


//producto queries 3.2
//infaltable
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'producto' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  producto.infaltable = results[0].cnt;

})
//noPermitido
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'producto' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  producto.noPermitida = results[0].cnt;

})
//Recomendacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'producto' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  producto.recomendacion= results[0].cnt;

})
//END producto 3.2


//venta queries 3.3
//infaltable
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'venta' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  venta.infaltable = results[0].cnt;

})
//noPermitido
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'venta' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  venta.noPermitida = results[0].cnt;

})
//Recomendacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'venta' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  venta.recomendacion= results[0].cnt;

})
//END venta 3.3


//validacion queries 3.4
//infaltable
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'validación' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  validacion.infaltable = results[0].cnt;

})
//noPermitido
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'validación' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  validacion.noPermitida = results[0].cnt;

})
//Recomendacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'validación' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  validacion.recomendacion= results[0].cnt;

})
//END validacion 3.4

//cierre queries 3.5
//infaltable
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'cierre' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  cierre.infaltable = results[0].cnt;

})
//noPermitido
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'cierre' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  cierre.noPermitida = results[0].cnt;

})
//Recomendacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'cierre' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  cierre.recomendacion= results[0].cnt;

})
//END cierre 3.5

//despedida queries 3.6
//infaltable
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Infaltable' AND grabacionesdetailend.clasificacion = 'despedida' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  despedida.infaltable = results[0].cnt;

})
//noPermitido
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'No permitida' AND grabacionesdetailend.clasificacion = 'despedida' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  despedida.noPermitida = results[0].cnt;

})
//Recomendacion
conexion.query(`SELECT count(*) as cnt FROM grabacionesdetailend WHERE grabacionesdetailend.permitida = 'Recomendación' AND grabacionesdetailend.clasificacion = 'despedida' AND grabacionesdetailend.loadAt >= '${datetime1}' AND grabacionesdetailend.loadAt <= '${datetime2}' ORDER BY loadAt DESC;`, function(err,results,fields){
  if (err) throw err;
  console.log(results[0].cnt);
  despedida.recomendacion= results[0].cnt;

})
//END despedida 3.6
conexion.end();

const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
//express hbs
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs'); 

require('./hbs/helpers');
app.get('/', function (req, res) {
  //res.send('Hello World')
  

    
    
   
  res.render('home',{
      
      
      grupos:[grupos.infaltable,grupos.noPermitida,grupos.recomendacion],
      modulos: [modulos.saludo,modulos.producto,modulos.venta,modulos.validacion,modulos.cierre,modulos.despedida],
      infaltable : [infaltable.saludo,infaltable.producto,infaltable.venta,infaltable.validacion,infaltable.cierre,infaltable.despedida],
      noPermitida : [noPermitida.saludo,noPermitida.producto,noPermitida.venta,noPermitida.validacion,noPermitida.cierre,noPermitida.despedida],
      recomendacion : [recomendacion.saludo,recomendacion.producto,recomendacion.venta,recomendacion.validacion,recomendacion.cierre,recomendacion.despedida],
      saludo : [saludo.infaltable,saludo.noPermitida,saludo.recomendacion],
      producto : [producto.infaltable,producto.noPermitida,producto.recomendacion],
      venta : [venta.infaltable,venta.noPermitida,venta.recomendacion],
      validacion : [validacion.infaltable,validacion.noPermitida,validacion.recomendacion],
      cierre : [cierre.infaltable,cierre.noPermitida,cierre.recomendacion],
      despedida : [despedida.infaltable,despedida.noPermitida,despedida.recomendacion],

  });
  
})

app.get('/about', function (req, res) {
    //res.send('Hello World')
    
    res.render('about',{
        
       
    });
  })
 
app.listen(port, ()=>{
    console.log(`escuchando por el puerto ${port}`);
})