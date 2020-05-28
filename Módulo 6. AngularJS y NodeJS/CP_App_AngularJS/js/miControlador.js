angular.module("filtroApp", [])
// Luego creamos los controladores// app viene del archivo miAplicacion
app.controller("controlador_filtrar_contenido", function ($scope) {
	//objeto JSON JavaScript questions con estructura llave : valor,
	$scope.listaAmigos = [
		{
			"id": 1,
			"nombre": "JOHN",
			"edad": 25
		}, {
			"id": 2,
			"nombre": "JESSIE",
			"edad": 30
		}, {
			"id": 3,
			"nombre": "JOHANNA",
			"edad": 28
		}, {
			"id": 4,
			"nombre": "JOY",
			"edad": 15
		}, {
			"id": 5,
			"nombre": "MARY",
			"edad": 28
		}, {
			"id": 6,
			"nombre": "PETER",
			"edad": 95
		}, {
			"id": 7,
			"nombre": "SEBASTIAN",
			"edad": 50
		}, {
			"id": 8,
			"nombre": "ERIKA",
			"edad": 27
		}, {
			"id": 9,
			"nombre": "PATRICK",
			"edad": 40
		}, {
			"id": 10,
			"nombre": "SAMANTHA",
			"edad": 60
		}
	];	
});




