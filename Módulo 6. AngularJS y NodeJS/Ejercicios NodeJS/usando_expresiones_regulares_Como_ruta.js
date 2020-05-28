app.get(/\/personal\/(\d*)\/?(edit)?/, function(request, response){
	 var message = 'el perfil del empleado #' + request.params[0];
	 if (request.params[1] === 'edit'){
		message = 'Editando ' + message;
	 }else{
		message = 'Viendo ' + message;
	 }
	 response.send(message);
});