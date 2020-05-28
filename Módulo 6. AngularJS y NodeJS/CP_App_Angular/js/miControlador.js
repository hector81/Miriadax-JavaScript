angular.module("EncuestaApp", [])
// Luego creamos los controladores// app viene del archivo miAplicacion
app.controller("TestController", function ($scope) {
	// inicializamos objetos scope
	$scope.userStatus = "";
	$scope.validanswers = 0;
	
	//objeto JavaScript questions con estructura llave : valor,
	$scope.questions = 
	[
		{
			id: 1,
			text: "¿En que fecha se aprobo por referendum la constitución española?", // ponemos el texto de la pregunta
			status: "", //iniciamos status o estado de la pregunta-respuesta
			validanswer : 2, // asignamos valor correcto respueta answers id
			answers: [{ // iniciamos respuesta con su id y su texto
					id: 1,
					text: "28 de Diciembre de 1978",
				},
				{
					id: 2,
					text: "6 de Diciembre de 1978",
				},
				{
					id: 3,
					text: "17 de Junio de 1977",
				},
				{
					id: 4,
					text: "30 de Noviembre de 1978",
				}
			]
		},
		{
			id: 2,
			text: "¿Qué presidente de Estados Unidos fue asesinado en 1901?",
			status: "",
			validanswer : 2,
			answers: [{
					id: 1,
					text: "James A. Garfield",
				},
				{
					id: 2,
					text: "William McKinley",
				},
				{
					id: 3,
					text: "Abraham Lincoln",
				},
				{
					id: 4,
					text: "	John F. Kennedy",
				}
			]
		},
		{
			id: 3,
			text: "¿Qué rey de España ejerció su reinado del 17 de mayo de 1886 al 14 de abril de 1931?",
			status: "",
			validanswer : 4,
			answers: [{
					id: 1,
					text: "Juan Carlos I",
				},
				{
					id: 2,
					text: "Amadeo I",
				},
				{
					id: 3,
					text: "Alfonso XII",
				},
				{
					id: 4,
					text: "Alfonso XIII",
				}
			]
		},
		{
			id: 4,
			text: "¿Cual es el nombre del presidente de EEUU que estuvo gobernando de 1974 a 1977?",
			status: "",
			validanswer : 2,
			answers: [{
					id: 1,
					text: "Jimmy Carter",
				},
				{
					id: 2,
					text: "Gerald Ford",
				},
				{
					id: 3,
					text: "Richard Nixon",
				},
				{
					id: 4,
					text: "Herbert Hoover",
				}
			]
		},
		{
			id: 5,
			text: "¿En que año murió el dirigente chino Mao Tse Tung?",
			status: "",
			validanswer : 4,
			answers: [{
					id: 1,
					text: "1973",
				},
				{
					id: 2,
					text: "1980",
				},
				{
					id: 3,
					text: "1975",
				},
				{
					id: 4,
					text: "1976",
				}
			]
		},
		{
			id: 6,
			text: "¿En que año nació Adolf Hitler​?",
			status: "",
			validanswer : 2,
			answers: [{
					id: 1,
					text: "1875",
				},
				{
					id: 2,
					text: "1889",
				},
				{
					id: 3,
					text: "1891",
				},
				{
					id: 4,
					text: "1895",
				}
			]
		},
		{
			id: 7,
			text: "¿En que año España se convirtió en Estado miembro de la UE?",
			status: "",
			validanswer : 2,
			answers: [{
					id: 1,
					text: "1984",
				},
				{
					id: 2,
					text: "1985",
				},
				{
					id: 3,
					text: "1986",
				},
				{
					id: 4,
					text: "1990",
				}
			]
		},
		{
			id: 8,
			text: "¿Qué país se retiró de la UE en 1985?",
			status: "",
			validanswer : 3,
			answers: [{
					id: 1,
					text: "Inglaterra",
				},
				{
					id: 2,
					text: "Suecia",
				},
				{
					id: 3,
					text: "Groenlandia",
				},
				{
					id: 4,
					text: "Noruega",
				}
			]
		},
		{
			id: 9,
			text: "¿En que año se disolvió la URSS?",
			status: "",
			validanswer : 3,
			answers: [{
					id: 1,
					text: "1989",
				},
				{
					id: 2,
					text: "1990",
				},
				{
					id: 3,
					text: "1991",
				},
				{
					id: 4,
					text: "1992",
				}
			]
		},
		{
			id: 10,
			text: "¿En que año murió Stalin?",
			status: "",
			validanswer : 4,
			answers: [{
					id: 1,
					text: "1951",
				},
				{
					id: 2,
					text: "1956",
				},
				{
					id: 3,
					text: "1952",
				},
				{
					id: 4,
					text: "1953",
				}
			]
		}
	];
	//fin objeto questions

	
	// objeto validación igual a funcion para validar las respuestas, correctas o no, a la que pasamos el objeto questions como parámetro
	$scope.validate = function(question){
		var respuestaUsuario = question.useranswer; // respuesta del usuario
		var respuestaCorrecta = question.validanswer; // respuesta correcta
		// si la respuesta es correcta, sumamos punto al objeto validanswers
		if(respuestaUsuario == respuestaCorrecta){
			$scope.validanswers++;
			question.status = "ok"; //ponemos estado a status
		}else{
			if(question.status == "ok" && $scope.validanswers > 0){
				$scope.validanswers--;
			}
			question.status = "error";
		}
		//cada vez que valide, modificara el estado del usuario, en este caso la imagen
		modificarCaraUsuario();
	};

	function modificarCaraUsuario() {
		var porcentajeRespuestasCorrectas = ($scope.validanswers / $scope.questions.length) * 100;

		if (porcentajeRespuestasCorrectas == 0) {
			$scope.userstatus = "cara_triste";
		} else if (porcentajeRespuestasCorrectas == 100) {
			$scope.userstatus = "cara_alegre";
		} else {
			$scope.userstatus = "cara_normal";
		}
	}
	
});