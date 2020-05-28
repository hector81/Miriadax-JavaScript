var app = angular.module("myApp", []);
// Luego creamos los controladores. En este caso “miControlador.js”:
app.controller("miControlador", function($scope){
	$scope.nombre= "Fernando";
	$scope.apellidos= "Gil";
});