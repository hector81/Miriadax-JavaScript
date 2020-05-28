//Caso práctico -- Programa para contar las líneas de un fichero con NodeJS.
//1. Cree un fichero input.txt en el servidor, relleno con los siguientes datos:
//“Hola caracola \nHola caracola \nHola caracola \nHola caracola”
//2. Cuente las líneas de dicho fichero y devuélvalas por consola (usamos \n para diferenciar el salto de línea dentro del fichero).
//3. Copie el contenido de este fichero input.txt a otro que crearemos y llamaremos output.txt y borre el fichero input.txt.
/****************************************************************************************/
/** VARIABLES **/
//Cargando los modulos HTTP requeridos para el programa o  las dependencias que necesitamos:
var readline = require('readline');
var fs = require('fs');
var url = require('url');
var http = require('http');  //http es el módulo del servidor para NodeJS.
//__dirname es la ruta actual
var file_input = __dirname + '\\texto\\input.txt';
var file_output = __dirname + '\\texto\\output.txt';

/** FUNCIONES **/
function operar_con_LineasFichero(){
	//Esto es para leer el contenido del archivo
	fs.readFile(file_input, {encoding: 'utf8'}, (error,datos) => {
		if (error)
			console.log(error);
		else
			var lector = readline.createInterface({ //esto es para leer por linea
				input: fs.createReadStream(file_input)
			});
			var contador = 0;
			var array_Lineas_Multiples = [];
			///////////////
			// esto es como un bucle que recorre linea por linea
			lector.on("line", linea => { // esto es como un bucle que recorre linea por linea
				var lineaRecorrida = linea.toString();
				if(lineaRecorrida.indexOf("\\n") == -1){ //si no tiene salto linea
					console.log("Linea " + (contador+1) + " = " + lineaRecorrida);
					array_Lineas_Multiples[contador] = lineaRecorrida + "\n";
					contador++;
				}else{ //si tiene \n que es salto de linea, entonces nos dará varias lineas
					arrayLinea = lineaRecorrida.split("\\n"); // lo transformamos en un array por el salto de linea y lo recorremos
					for(var i = 0 ; i< arrayLinea.length ; i++){
						linea_con_salto = arrayLinea[i];
						console.log("Linea " + (contador+1) + " = " + linea_con_salto);
						array_Lineas_Multiples[contador] = linea_con_salto + "\n";
						contador++;
					}
				}
				//AQUI escribimos en el otro archivo
				//recorro el array para acumular las lineas y ponerlas en un solo string
				var lineaAcumulada = "";
				for(var i = 0 ; i< array_Lineas_Multiples.length ; i++){
					lineaAcumulada += array_Lineas_Multiples[i];
				}
				//Escribo las lineas
				fs.writeFile(file_output, lineaAcumulada, error => {
					if (error)
						console.log(error);
					else
						var lin = linea.toString();
						if(lin.indexOf("\\n") == -1){ //si no tiene salto linea
							console.log('Linea añadida a output.txt');
						}else{ //si tiene \n que es salto de linea, entonces nos dará varias lineas
							console.log('Lineas de una linea añadidas a output.txt porque tenían un salto de linea');
						}
						
				});			
			});
			///////////////////////////////////////////
			//Aqui borro el archivo input
			fs.unlink(file_input, (error) => {
				if (!error) {
					console.info('Archivo input.txt borrado');
				} else if (error) {
					console.error("Error ocurrido mientras se borraba archivo");
				} else {
				  callback('Error borrando archivo');
				}
			});
			////////////
	});
	
}


/** OPERACIONES **/

operar_con_LineasFichero();
//borrar();
//fs.unlink('/texto/input.txt');

