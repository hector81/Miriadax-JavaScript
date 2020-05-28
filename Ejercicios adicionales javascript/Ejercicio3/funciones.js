//variable global array de objetos JSON
var arrayUsuariosJson = [];

//nada mas cargar la ventana
window.onload = cargarEventos;
function cargarEventos(){
	//asignamos eventos con addEventListener
	//estos son para las validaciones para avisos de error
	document.getElementById("email1").addEventListener("blur", validarEmail, false);
	document.getElementById("presupuesto").addEventListener("blur", validar_limite_presupuesto, false);
	document.getElementById("envio").addEventListener("blur", validar_forma_envio, false);
	//estos son para los botones
	//document.getElementById("formulario").addEventListener("submit", validar, false);
	document.getElementById("procesar").addEventListener("click", validar, false);
	document.getElementById("buscar").addEventListener("click", buscar_envio, false);
	document.getElementById("mostrar").addEventListener("click", mostrar_datos, false);
	//generamos limite aleatorio
	generarMaximoAleatorio();
}//fin funcion


//funcion donde validamos campos
function validar(eventopordefecto){
    var nombre = document.getElementById("nombre").value;
	var email = document.getElementById("email1").value;
	var limite = document.getElementById("limite").value;
	var presupuesto = document.getElementById("presupuesto").value;
	/*esto es para el select*/
	var envio;
	var numero_envio_elegido = document.getElementById("envio");
	envio = numero_envio_elegido.options[numero_envio_elegido.selectedIndex].value;
	
	var confirmacion = confirm("¿Desea enviar el formulario ?");
	//Validamos cada uno de los apartados con llamadas a sus funciones correspondientes.
    if (nombre == "" || email == "" || limite == "" || presupuesto == "" || envio == "" || confirmacion == false) {
        alert("Hay campos vacíos");
        eventopordefecto.preventDefault();//cancelamos el evento del envio por defecto asginado al boton procesar
        return false;//Salimos de la función devolviendo false y cancelamos el evento del envio por defecto
    }else{
		if(!validarEmail()){
			alert("En campo email tiene errores.");
			eventopordefecto.preventDefault();//cancelamos el evento del envio por defecto asginado al boton procesar
			return false;//Salimos de la función devolviendo false y cancelamos el evento del envio por defecto
		}else if(!validar_forma_envio() ){
			alert("La forma de envío debe estar vacía.");
			eventopordefecto.preventDefault();//cancelamos el evento del envio por defecto asginado al boton procesar
			return false;//Salimos de la función devolviendo false y cancelamos el evento del envio por defecto
		}else if(!validar_limite_presupuesto() ){
			alert("El presupuesto o está vacío o es inferior al doble del límite.");
			eventopordefecto.preventDefault();//cancelamos el evento del envio por defecto asginado al boton procesar
			return false;//Salimos de la función devolviendo false y cancelamos el evento del envio por defecto
		}else{
			alert("Todo los datos están correctos. Usuario introducido correctamente");
			//creamos un objeto JSON usuario y lo introducimos en el array del JSON
			var usuario_introducido = crear_usuario_json(nombre,email,limite,presupuesto, envio);
			arrayUsuariosJson.push(usuario_introducido); 
			//agreagamos a almacenamiento interno localStorage el array de json
			alert("El número de usuarios introducidos es de " + arrayUsuariosJson.length);
			return true;
		}
	}
}//fin funcion

//funcion crear_usuario_json
function crear_usuario_json(nombre,email,limite,presupuesto, envio){
	var usuarioJSON = {
		nombre : nombre,
		email : email,
		limite : limite,
		presupuesto : presupuesto,
		envio : envio
	}
	return usuarioJSON;
}//fin funcion



//generamos numero aleatorio entre 300 y 1000
function generarMaximoAleatorio(){
	var minimo = 300;
	var maximo = 1000;
	var limiteAleatorio = parseInt(Math.random()*(maximo-minimo)+minimo);
	document.getElementById("limite").value = limiteAleatorio;
	document.getElementById("presupuesto").value = (limiteAleatorio*2)+1;
}//fin funcion

//el valor del presupuesto debe ser superior al doble del límite
function validar_limite_presupuesto(){
	var limite = document.getElementById("limite").value;
	var presupuesto = document.getElementById("presupuesto").value;
	if(presupuesto > (limite*2)){
		//el presupuesto es el doble o mas que el limite y esta correcto
		document.getElementById("presupuesto").className="";
		//aqui utilizo jquery para ocultar el error si se ha producido
		$('#error_presupuesto').hide();
		return true;
	}else{
		//document.getElementById("presupuesto").focus();
		document.getElementById("error_presupuesto").innerHTML = "El valor del presupuesto debe ser superior al doble del límite";//pongo un span debajo con el error para avisar
		$('#error_presupuesto').show();//aqui utilizo jquery para enseñar el error si se ha producido
		return false;
	}
}//fin funcion

//validar el email mediante patron
function validarEmail() {
	var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	//var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
	var email = document.getElementById("email1").value
	if (!(patron.test(email))){//error, no es valido porque no cumple el patron
		//email se pone en focus
		//document.getElementById("email1").focus();
		document.getElementById("error_email").innerHTML = "El formato de email no es correcto";//pongo un span debajo con el error para avisar
		$('#error_email').show();//aqui utilizo jquery para enseñar el error si se ha producido
		return false;
	}else{
		//el email es correcto
		document.getElementById("email1").className="";
		//aqui utilizo jquery para ocultar el error si se ha producido
		$('#error_email').hide();		
		return true;
	}	
}//fin funcion

//validar forma de envio seleccionada
function validar_forma_envio() {
    var	numero_envio_elegido = document.getElementById("envio").selectedIndex;
	// Comprueba que no está vacia
	if (numero_envio_elegido == null || numero_envio_elegido == "" ){
		//resalta el focus para ver el error en pantalla formulario
		//document.getElementById("envio").focus();
		document.getElementById("error_envio").innerHTML = "Debes elegir una forma de envio";//pongo un span debajo con el error para avisar
		$('#error_envio').show();//aqui utilizo jquery para enseñar el error si se ha producido
		return false;
	}else{
		//si hay alguna forma de envio seleccionada
		document.getElementById("envio").className="";
		//aqui utilizo jquery para ocultar el error si se ha producido
		$('#error_envio').hide();
		return true;
	}	
}//fin funcion

//funcion buscar_envio
function buscar_envio(){
	var email2 = document.getElementById("email2").value;
	var usuario_mostrar_datos = "";
	var comprobar = false;
	for (var i=0; i< arrayUsuariosJson.length; i++){//recorremos el array json de usuarios
		var usuarioJSON = arrayUsuariosJson[i];
		if(email2 == usuarioJSON.email){
			comprobar = true;
			usuario_mostrar_datos += "Usuario " + (i+1) + "\n";
			usuario_mostrar_datos += "Nombre: " + usuarioJSON.nombre + " .Email: " + usuarioJSON.email + " .Límite: " + usuarioJSON.limite + " .Presupuesto: " + usuarioJSON.presupuesto +  " .Envío: " + usuarioJSON.presupuesto + "\n";//si hay coincidencia mostramos sus datos
		}
	}
	//si hay coincidencia
	if(comprobar == true){
		alert(usuario_mostrar_datos);	
		return true;
	}else{
		alert("No hay ningún usuario con ese correo electrónico o Email");
		return false;
	}
}//fin funcion

//funcion mostrar_datos
function mostrar_datos(){
	var resumen_usuarios = "Mostrando los datos de todos los usuarios:\n";
	for (var i=0; i< arrayUsuariosJson.length; i++){//recorremos el array json de usuarios
		var usuarioJSON = arrayUsuariosJson[i];
		resumen_usuarios += "Usuario " + (i+1) + "\n";
		resumen_usuarios += "Nombre: " + usuarioJSON.nombre + " .Email: " + usuarioJSON.email + " .Límite: " + usuarioJSON.limite + " .Presupuesto: " + usuarioJSON.presupuesto +  " .Envío: " + usuarioJSON.presupuesto + "\n";// mostramos sus datos
	}	
	alert(resumen_usuarios);
	return true;	
}//fin funcion
	
		
		
