/* Use EventEmitter para crear una variable que nos escuche los eventos open, close
y newListener que nos sacaran por consola cuando hemos encendido, apagado o
vinculado un nuevo evento a nuestra radio con los datos de nuestro objeto radio
visto anteriormente.
Debemos ser capaces de emitir esos eventos en este orden:
	-El evento open -->  Nada más lanzar nuestra aplicación.
	-El evento close -->  Al cabo de unos cinco segundos.
Aparte, esta aplicación debe estar en dos ficheros, siendo uno el módulo requerido
para el otro. */
/****************************************************************************************/
/** VARIABLES **/
//Cargando los modulos HTTP requeridos para el programa o  las dependencias que necesitamos:
var events = require('events');
//este será el evento eventEmitter
var eventEmitter = new events.EventEmitter();
var freno = 6000; 
var segundos = 0; 
var intervalo = 1000; 
//OBJETO JSON llamado desde funcion de otro modulo
var station = require('./stationJSON.js');
var radioM = new station();//pasamos objeto json a objeto
/** OPERACIONES **/
// Solo hace esto una vez con un solo bucle y agregando un oyente único
eventEmitter.once('newListener', (event, listener) => {
	if (event === 'open') {
		//creamos intervalos
		var intervalo_emision = setInterval(() => { 
			segundos += intervalo; 
			console.log("Escuchando " + radioM.name + " , en la frecuencia : " + radioM.freq + " . Ha pasado " + ((segundos/1000)) + " segundos");
			if(segundos == 5000 ){//si lleva emitiendo 5 segundos
				//cancelamos el evento
				eventEmitter.on('close', ()=>{//eliminar un detector de eventos
					console.log('Cancelando el evento');
					eventEmitter.removeListener('open',listener);//Elimina un escucha para el evento especificado
				});
				eventEmitter.emit('close');
			}		
		}, intervalo); 
		//paramos y limpiamos intervalos si llega al freno que son 5 segundos
		setTimeout(() => { 
			clearInterval(intervalo_emision); 
			console.log('Apagando la radio después de 5 segundos'); 
		}, freno); 
	}
});

//Ahora llamamos al evento
eventEmitter.on('open', () => {
	console.log('Encendiendo la radio');
});
eventEmitter.emit('open'); //con esto corremos el evento
