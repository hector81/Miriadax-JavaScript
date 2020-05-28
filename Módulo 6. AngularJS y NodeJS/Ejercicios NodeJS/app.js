//Empezamos, escribiendo las dependencias que necesitamos:
var express = require('express'); //express es el framework,
var http = require('http');  //http es el módulo del servidor para NodeJS.

//Ahora creamos nuestra aplicación:
var app = express();

//Le indicamos a express en que puerto vamos a estar escuchando:
app.set('port', process.env.PORT || 3000);
//process.env.PORT es una variable de entorno, si no está configurada para guardar el puerto en que debe correr la aplicación, entonces toma el 3000.

//Por último creamos e iniciamos el servidor:
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});







