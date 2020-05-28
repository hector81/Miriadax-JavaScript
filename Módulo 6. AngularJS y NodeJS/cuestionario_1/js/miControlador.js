app.controller("myCtrl", function($scope){
	$scope.questions = [
		{ 
			id: 1,
			text: "Â¿CuÃ¡ndo fue el descubrimiento de AmÃ©rica?",
			validanswer : 2,
			useranswer: null,
			status: "",
			answers: [
				{ text: 1392, id: 1 },
				{ text: 1492, id: 2 },
				{ text: 1490, id: 3 }		
			]
		},
		{ 
			id: 2, 
			text: "Â¿QuiÃ©n descubriÃ³ la vacuna contra la viruela?",
			validanswer: 3,
			useranswer: null,
			status: "",
			answers: [
				{ text: "Francisco Javier Balmis", id: 1 },
				{ text: "Luis Pasteur", id: 2 },
				{ text: "Edward Jenner", id: 3 }
			]
		},
		{ 
			id: 3,
			text: "QuiÃ©n realizÃ³ la primera llamada con un telÃ©fono mÃ³vil?",
			validanswer: 1,
			useranswer: null,
			status: "",
			answers: [
				{ text: "Martin Cooper", id: 1 },
				{ text: "John Mitchell", id: 2 },
				{ text: "Eric Tigersted", id: 3 }
			]
		}
	];
	
	$scope.userstatus = "";
	$scope.validanswers = 0;

	$scope.validate = function(question) {
		if (question.validanswer == question.useranswer) {
			$scope.validanswers++;
			question.status = "ok";
		} else {
			if (question.status == "ok" && $scope.validanswers > 0) {
				$scope.validanswers--;
			}
			question.status = "error";
		}

		updateUserStatus();
	};

	function updateUserStatus() {
		var avgvalidanswers = ($scope.validanswers / $scope.questions.length) * 100;

		if (avgvalidanswers == 0) {
			$scope.userstatus = "reprobado";
		} else if (avgvalidanswers == 100) {
			$scope.userstatus = "excelente";
		} else {
			$scope.userstatus = "minimo";
		}
	}
});