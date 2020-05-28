//RECIBIENDO POST
//También podemos recibir requests de tipo POST de la siguiente manera:
app.post('/users', function(request, response){
	 var username = request.body.username;
	 response.send('¡Hola, ' + username + '!');
});
//Antes de correr este código debemos agregar bodyParser fuera del método, porque express no parsea el cuerpo del request por defecto:
app.use(express.bodyParser());