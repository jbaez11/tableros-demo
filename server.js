const express = require('express')
const app = express()
const hbs = require('hbs');

const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/public'));
//express hbs
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs'); 

require('./hbs/helpers');
app.get('/', function (req, res) {
  //res.send('Hello World')
  
  res.render('home',{
      infaltable: 'Infaltable',
      infaltables : [20,3,4,5,6,5]   
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