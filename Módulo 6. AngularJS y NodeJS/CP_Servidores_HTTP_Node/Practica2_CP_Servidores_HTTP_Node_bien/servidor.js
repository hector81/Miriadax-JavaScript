//Cargando los modulos HTTP requeridos para el programa o  las dependencias que necesitamos:
var express = require('express'); //express es el framework,
var http = require('http');  //http es el módulo del servidor para NodeJS.
var fs = require('fs');
var url = require('url');
var app = express();//esta es la aplicacion

//Le indicamos a express en que puerto vamos a estar escuchando:
app.set('port', process.env.PORT || 8080);
//process.env.PORT es una variable de entorno, si no está configurada para guardar el puerto en que debe correr la aplicación, entonces toma el 8080.
//Le indicamos la direccion de la url
app.use(express.static(__dirname+ '/'));

//Enviamos la peticion por GET
app.get('/', (request, response)=>{
    response.sendFile(__dirname+'/index.html');
});

app.get('/datos',(request, response)=>{
    response.send('Datos de respuesta: ');
    
});

//Por último creamos e iniciamos el servidor:
//Una vez tengamos nuestro servidor lanzado vemos que lo hemos puesto a escuchar en el puerto 8080 por lo que un cliente desde el navegador podría acceder a él de esta manera:
//http://127.0.0.1:8080/index.html
http.createServer(app).listen(app.get('port'), function(){
	// Poner un mensaje en la consola
	console.log('Servidor funcionando en ' + app.get('port')); // Escuchar al puerto 8080
});   


		

