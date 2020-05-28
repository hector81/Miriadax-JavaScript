//Cargando los modulos HTTP requeridos para el programa o  las dependencias que necesitamos:
var express = require('express'); //express es el framework,
var http = require('http');  //http es el módulo del servidor para NodeJS.
var fs = require('fs');
var url = require('url');

 //Creación del servidor de peticiones HTTP. En la función function(request, response) configuramos una respuesta HTTP para todas las peticiones
var server = http.createServer(function(request, response){ //request seria el pedido y response la respuesta
	// Cogemos el path y el objeto url que nos ha entrado por la request
	var objetourl = url.parse(request.url);
	// ruta del navegador y nombre del fichero concatenado con nuestro dominio
	var ruta = 'html/' + objetourl.pathname; 
	// Leemos el fichero requerido para que sea enviado
	fs.readFile(ruta, function(err, data){
		if(err){
			console.log(err);
			// Página no encontrada
			// HTTP Status: 404 : NOT FOUND
			// Content Type: text/plain    , 'content-length': '1000' seria el numero de caracteres permitidos en el html, en este caso le pongo 1000
			response.writeHead(404, {'content-Type': 'text/html', 'content-length': '1000','connection': 'keep-alive' ,'accept': '/'});//Cabeceras del mensaje HTTP
			response.write('<!doctype html><html><head></head><body><h1>Error interno</h1></body></html>');
		}else{
			// Página encontrada
			console.log("Peticion Recibida.");
			// HTTP Status: 200 : OK
			// Content Type: text/plain
			response.writeHead(200, {'content-Type': 'text/html', 'content-length': '1000','connection': 'keep-alive' ,'accept': '/'});//Cabeceras del mensaje HTTP
			// Damos la respuesta a nuestra petición
			response.write(data); //esto seria el html
		}
		// Enviamos la respuesta
		response.end();
	});
});
 
// Escuchar al puerto 8080
server.listen(8080);
 //Una vez tengamos nuestro servidor lanzado vemos que lo hemos puesto a escuchar en el puerto 8080 por lo que un cliente desde el navegador podría acceder a él de esta manera:
//http://127.0.0.1:8080/index.htm
// Poner un mensaje en la consola
console.log("Servidor funcionando en http://localhost:8080/");


//para crear un servidor HTTP en NodeJS necesitamos la carga del módulo http pero, aparte, podemos necesitar la carga de otros módulos de node
// como el de filesystem y el de url (ambos en el ejemplo inferior). El primero serviría para buscar en el sistema de ficheros la página a
// devolver con la petición y el segundo para coger la url del envío de nuestro cliente
