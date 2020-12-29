const { json } = require('express');
const express = require('express')
const app = express()
const hbs = require('hbs');
const mysql = require ('mysql');

const conexion = mysql.createConnection({
  multipleStatements: true,
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


//Add zeros to time formats
function addZero(x, n) {
  while (x.toString().length < n) {
    x = "0" + x;
  }
  return x;
}

function getDateTime() {
  let d = new Date();

  // Current date
  let year = d.getFullYear();
  let month = addZero(d.getMonth()+1, 2); 
  let date = addZero(d.getDate(), 2);

  // Curren time
  var hour = addZero(d.getHours(), 2);
  var minute = addZero(d.getMinutes(), 2);
  var second = addZero(d.getSeconds(), 2);
  //var mlsecs = addZero(d.getMilliseconds(), 3);

  // yyyy-mm-dd HH:MM:SS:ssss format
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}
console.log(`fechga ${getDateTime()}`);
const datetime1 = '2020-12-26 00:00';
const datetime2 = getDateTime();

//
//variables para clasificacion keywords
var sumClasificacion ;
var sumClasificacion1 ;

//variables para clasificacion basekeywords
var sumClasificacionComp ;
var sumClasificacionComp1 ;
//variables para moduloskeywords
var sumModulos ;
var sumModulos1 ;
//variables para modulo clasificacion infaltable
var mayorInfaltable;
var mayorNoPermitida;
var mayorRecomendacion;

//var querys

var basekeywordsQuery = "SELECT * FROM basekeywords;";
var grabacionesDEQuery =" SELECT * FROM grabacionesdetailend WHERE grabacionesdetailend.loadAt >= '2020-12-26 00:00';";
var bgQuery= basekeywordsQuery+grabacionesDEQuery;
console.log("query",bgQuery)

//var radar
var basekeywordsArray;
var grabacionesDEArray;
//const llaves = new Object();

var clasificacionDict = {};
var clasificacionDict2 = {}; 
var clasificacionDictModulos = {};
var clasificacionDictModulos2 = {};
var clasModulDict = {};
var clasificacionRadar={};
var clasPorcRadar={};

//query clasificacion

conexion.query(`SELECT * FROM grabacionesdetailend WHERE grabacionesdetailend.loadAt >= '${datetime1}';`, function(err,results,fields){
  if (err) throw err;
 
 // var clasificacionDict = {}
 //console.log("resu",results.length)
 
  //grabacionesDEArray=results;
  //console.log("grab",grabacionesDEArray.length)
  for(var i=0; i< results.length; i++){
      //console.log(results[i].permitida);
    let permitidaVal =  results[i].permitida;
    if(!(permitidaVal in clasificacionDict)){
      clasificacionDict[permitidaVal] = 1;
       
    } else{
      clasificacionDict[permitidaVal] += 1;
    }
    
  }
  //valor que se muestra en la primera grafica de clasificacion "de Infaltable"
  
   sumClasificacion1 = Object.values(clasificacionDict);
   sumClasificacion = 0;

  sumClasificacion1.forEach (function(sum){
    sumClasificacion += sum
  })
  //modulos
  for(var i=0; i< results.length; i++){
  //console.log(results[i].clasificacion);
  let permitidaVal1 =  results[i].clasificacion;
  if(!(permitidaVal1 in clasificacionDictModulos)){
    clasificacionDictModulos[permitidaVal1] = 1;
     
  } else{
    clasificacionDictModulos[permitidaVal1] += 1;
  }
  
  }

  
  sumModulos1 = Object.values(clasificacionDictModulos);
  sumModulos = 0;

  sumModulos1.forEach (function(sum){
    sumModulos += sum
  })

 
});


//basekeywords






conexion.query(`SELECT * FROM basekeywords;`, function(err,results,fields){
  if (err) throw err;
 
 // var clasificacionDict = {}
  for(var i=0; i< results.length; i++){
    //  console.log(results[i].permitida);
    let permitidaVal =  results[i].permitida;
    if(!(permitidaVal in clasificacionDict2)){
      clasificacionDict2[permitidaVal] = 1;
       
    } else{
      clasificacionDict2[permitidaVal] += 1;
    }
    
  }

  sumClasificacionComp1 = Object.values(clasificacionDict2);
  sumClasificacionComp = 0;

  sumClasificacionComp1.forEach (function(sum){
    sumClasificacionComp += sum
  })
  //modulos comparacion
  for(var i=0; i< results.length; i++){
    //  console.log(results[i].permitida);
    let permitidaVal =  results[i].clasificacion;
    if(!(permitidaVal in clasificacionDictModulos2)){
      clasificacionDictModulos2[permitidaVal] = 1;
       
    } else{
      clasificacionDictModulos2[permitidaVal] += 1;
    }
    
  }
  

  sumModulosComp1 = Object.values(clasificacionDictModulos2);
  sumModulosComp = 0;

  sumModulosComp1.forEach (function(sum){
    sumModulosComp += sum
  })

  
  
});


//end Basekeywords

// grafica radar

conexion.query(bgQuery, function(err,results){
 
  if(err) throw err;
  if(!err){
    basekeywordsArray=results[0];
    grabacionesDEArray= results[1];

    //console.log("result 0",basekeywordsArray.length);
    //console.log("Graba", grabacionesDEArray.length)

    for (var i=0; i<basekeywordsArray.length; i++) {
      basekeywordsArray[i]['count'] = 0;
    }
    // populate
    for (var i=0; i<basekeywordsArray.length; i++) {
      //console.log(basekeywordsArray[i]);
      for (var j=0; j<grabacionesDEArray.length; j++) {
        //console.log(grabacionesDEArray[j])
        if (basekeywordsArray[i].keyword === grabacionesDEArray[j].key) {
          //console.log("comp")
          basekeywordsArray[i]['count'] = 1;
          break;
        }
      }
    }
  }
  //diccionario

  for(var i=0; i< basekeywordsArray.length; i++){

    let permitidaVal =  basekeywordsArray[i].permitida;//infaltable,no permitida, recomendacion 
    let clasificationVal = basekeywordsArray[i].clasificacion;//venta,saludo,cierre,producto....
    if(!(permitidaVal in clasificacionRadar)){
      clasificacionRadar[permitidaVal]={};
    }

    if(!(clasificationVal in clasificacionRadar[permitidaVal])){
      (clasificacionRadar[permitidaVal])[clasificationVal]={};
      ((clasificacionRadar[permitidaVal])[clasificationVal])['possible']=1;
      ((clasificacionRadar[permitidaVal])[clasificationVal])['found']=0;
      
    } 
    else{
      ((clasificacionRadar[permitidaVal])[clasificationVal])['possible']+=1;
      
    }

  }

  for(var i=0; i< basekeywordsArray.length; i++){

    let permitidaVal =  basekeywordsArray[i].permitida;//infaltable,no permitida, recomendacion 
    let clasificationVal = basekeywordsArray[i].clasificacion;//venta,saludo,cierre,producto....
    let countVal = basekeywordsArray[i].count;
    
    ((clasificacionRadar[permitidaVal])[clasificationVal])['found']+=countVal;
  }
  
  for(var key in clasificacionRadar){//key = permitidaVal
    let dictTemp = clasificacionRadar[key];//key2 ClasificationVal
    for( var key2 in dictTemp){
      let dictTemp2 = dictTemp[key2];
      //console.log(dictTemp2);
      let porcentaje = dictTemp2['found']*100/dictTemp2['possible'];
      //console.log(porcentaje);
      ((clasificacionRadar[key])[key2])['porcentaje']=porcentaje;

    }
  }
  //extraer listas de porcentaje
  //clasPorcRadar
  for(var key in clasificacionRadar){//key = permitidaVal
    let dictTemp = clasificacionRadar[key];//key2 ClasificationVal
    let lista = [];
    for( var key2 in dictTemp){
      let dictTemp2 = dictTemp[key2];
      //console.log(dictTemp2);
      let porcentaje = dictTemp2['porcentaje'];
      lista.push(porcentaje);
      //console.log(porcentaje);
      clasPorcRadar[key]=lista;

    }
  }

  console.log("prueba enviar",clasPorcRadar['Infaltable']);


  //end diccionario
  
  console.log("clas Radar",clasPorcRadar)
  //console.log(basekeywordsArray);
});

//modulos por clasificacion

conexion.query(`SELECT * FROM grabacionesdetailend WHERE permitida IS NOT NULL AND clasificacion IS NOT NULL AND grabacionesdetailend.loadAt >= '${datetime1}';`, function(err,results,fields){
  if (err) throw err;
 
  for(var i=0; i< results.length; i++){

    let permitidaVal =  results[i].permitida;//infaltable,no permitida, recomendacion 
    let clasificationVal = results[i].clasificacion;//venta,saludo,cierre,producto....
    if(!(permitidaVal in clasModulDict)){
      clasModulDict[permitidaVal]={};
    }

    if(!(clasificationVal in clasModulDict[permitidaVal])){
      (clasModulDict[permitidaVal])[clasificationVal]=1;
      
    } else{
      (clasModulDict[permitidaVal])[clasificationVal]+=1;
      
    }

  }
  //infaltable
  mayorInfaltable = Object.values(clasModulDict["Infaltable"]) ;
  mayorInfaltable.sort((a, b) => b - a); // For descending sort
  
  //no permitida
  mayorNoPermitida = Object.values(clasModulDict["No permitida"]) ;
  mayorNoPermitida.sort((a, b) => b - a);
  
  //recomendacion
  mayorRecomendacion = Object.values(clasModulDict["Recomendación"]) ;
  mayorRecomendacion.sort((a, b) => b - a);
  //console.log(clasModulDict)
  
  
});

//end modulos por clasificacion


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
      
      
      //clasificacion keywords
      sumClasificacion:sumClasificacion,
      sumClasifiacionInfaltable:sumClasificacion1[0],
      clasificationValues: Object.keys(clasificacionDict).map(function (key) { return clasificacionDict[key]; }),
      //comparacion de clasificacion
      sumClasificacionComp:sumClasificacionComp,
      sumClasificacionCompInfaltable:sumClasificacionComp1[0],
      clasificationCompValues: Object.keys(clasificacionDict2).map(function (key) { return clasificacionDict2[key]; }),
      //modulos keywords
      sumModulos:sumModulos,
      sumModulosMayor:sumModulos1[4],
      modulosValues: Object.keys(clasificacionDictModulos).map(function (key) { return clasificacionDictModulos[key]; }),
      //modulos Comparacion
      sumModulosComp:sumModulosComp,
      sumModulosMayorComp:sumModulosComp1[2],
      modulosValuesComp: Object.keys(clasificacionDictModulos2).map(function (key) { return clasificacionDictModulos2[key]; }),
      //Modulos por clasificacion
      infaltableModClas:mayorInfaltable,
      noPermitidaModClas:mayorNoPermitida,
      recomendacionModClas:mayorRecomendacion,
      //radar
      infaltableRadar: clasPorcRadar['Infaltable'],
      noPermitidaRadar:clasPorcRadar['No permitida'],
      recomendacionRadar:clasPorcRadar['Recomendación'],
      /*sumGrupos:[grupos.infaltable+grupos.noPermitida+grupos.recomendacion],
      gruposInfaltable:[grupos.infaltable],
      modulosCierre:[modulos.cierre],
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
      despedida : [despedida.infaltable,despedida.noPermitida,despedida.recomendacion],*/

  });
  
})

app.get('/basekeywords', function (req, res) {
    
    res.render('basekeywords',{
        
       
    });
  })

  app.get('/todo', function (req, res) {
    
    res.render('todo',{
        todo:[todo]
       
    });
  })
 
app.listen(port, ()=>{
    console.log(`escuchando por el puerto ${port}`);
})

