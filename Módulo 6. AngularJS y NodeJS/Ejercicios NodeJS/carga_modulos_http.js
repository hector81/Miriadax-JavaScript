//para crear un servidor HTTP en NodeJS necesitamos la carga del módulo http pero, aparte, podemos necesitar la carga de otros módulos de node
// como el de filesystem y el de url (ambos en el ejemplo inferior). El primero serviría para buscar en el sistema de ficheros la página a
// devolver con la petición y el segundo para coger la url del envío de nuestro cliente

//Carga de los módulos requeridos para el programa
var http = require('http');
var fs = require('fs');
var url = require('url');
//Creación del servidor
http.createServer(function(request, response){
	// Cogemos el path que nos ha entrado por la request
	var pathname = url.parse(request.url).pathname;
	// Leemos el fichero requerido para que sea enviado
	fs.readFile(pathname.substr(1), function(err, data){
		if(err){
			console.log(err);
			// Página no encontrada
			// HTTP Status: 404 : NOT FOUND
			// Content Type: text/plain
			response.writeHead(404, {'Content-Type': 'text/html'});
		}else{
			// Página encontrada
			// HTTP Status: 200 : OK
			// Content Type: text/plain
			response.writeHead(200, {'Content-Type': 'text/html'});
			// Damos la respuesta a nuestra petición
			response.write(data.toString());
		}
		// Enviamos la respuesta
		response.end();
	});
}).listen(8081);

//Una vez tengamos nuestro servidor lanzado vemos que lo hemos puesto a escuchar en el puerto 8081 por lo que un cliente desde el navegador podría acceder a él de esta manera:
//http://127.0.0.1:8081/index.htm