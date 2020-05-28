//PRÁCTICA 2
//Cree ahora un cliente http de Node para nuestro servidor anterior
//y que nos devuelva por consola el fichero que queremos obtener.

//Cargando los modulos HTTP requeridos para el programa o  las dependencias que necesitamos:
var express = require('express'); //express es el framework,
var http = require('http');  //http es el módulo del servidor para NodeJS.
var url = require('url');
var port = 8080;
 
//Ahora creamos nuestra aplicación:
var app = express();
// all environments
//process.env.PORT es una variable de entorno, si no está configurada para guardar el puerto en que debe correr la aplicación, entonces toma el 3000.
app.set('port', process.env.PORT || 3000);//Le indicamos a express en que puerto vamos a estar escuchando como cliente
 
//creamos servidor
var servidor = http.createServer();// devuelve una nueva instancia de la http.Serverclase.
servidor.on('request', function(request, response ,error) {
	if(error){
		console.log(error);
		// Página no encontrada
		// HTTP Status: 404 : NOT FOUND
		// Content Type: text/plain    , 'content-length': '1000' seria el numero de caracteres permitidos en el html, en este caso le pongo 1000
		response.writeHead(404, {'content-Type': 'text/html', 'content-length': '1000','connection': 'keep-alive' ,'accept': '/'});//Cabeceras del mensaje HTTP
		response.write('<!doctype html><html><head></head><body><h1>Error interno</h1></body></html>');
	}else{ //si hay respuesta a la peticion
		// Cogemos el path y el objeto url que nos ha entrado por la peticion para ver el nombre del fichero
		var objetourl = url.parse(request.url);
		var ruta = objetourl.pathname;
		// esto aparecera por consola
		//console.log(request.method);
		//console.log(request.headers);		
		//console.log(request.url);
		console.log('Archivo = ' + ruta);
		console.log('Express server escuchando en el puerto ' + app.get('port'));
		
		//esto aparecera en el html (http://127.0.0.1:8080/index.html) despues de recargar
		response.writeHead(200, {'content-Type': 'text/html', 'content-length': '1000','connection': 'keep-alive' ,'accept': '/'});//Cabeceras del mensaje HTTP
		response.write('<!doctype html><html><head><title>Cliente Node.js</title></head><body><h1>Cliente Node.js</h1>');
		response.write('<p>Archivo llamado = ' + ruta + '</p>');
		response.write('<p>Express server escuchando en el puerto ' + app.get('port') + '</p>');
		response.write('</body></html>');
		
		/////////////////////////CLIENTE////////////////////////////////////////////
		
		//parametros de la URL

		var q = url.parse(request.url, true);
		var protocol = (q.protocol == "http") ? require('http') : require('https');
		var options = {
			path:  q.pathname,
			host: q.hostname,
			port: q.port,
			method: 'GET'
		};
		
		//Creamos cliente HTTP peticion///////////////////////////////////////////////////////
		 var cliente_http_req = http.request(options, function(res) {
			console.log('STATUS: ' + res.statusCode); //respuesta a a la peticion status
			console.log('HEADERS: ' + JSON.stringify(res.headers)); //respuesta a a la peticion HEADER
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				console.log('BODY: ' + chunk);
			});
		});

		cliente_http_req.on('error', function(e) {
			console.log('Problemas con la request : ' + e.message);
		});

		//Escribimos los datos para solicitar el cuerpo
		cliente_http_req.write('CUERPO O BODY DEL ARCHIVO HTML');
		cliente_http_req.write('data\n');
		cliente_http_req.end();
		
		 //FIN CLIENTE ////////////////////////////////////////////////////////////
	}
	//finalizamos respuesta
	response.end();
		
	
});
//Navegamos en el servidor que le asignamos
servidor.listen(port);
console.log('Navegando en la dirección = http://127.0.0.1:' + port); ///http://127.0.0.1:8080/index.html


// Ejecutar con node cliente.js
//INFORMACION SACADA DE :
// https://nodejs.dev/making-http-requests-with-nodejs
// https://stackoverflow.com/questions/17829782/node-js-request-directly-to-url-with-options-http-or-https/17829887

