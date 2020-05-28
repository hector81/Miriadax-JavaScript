angular.module('cliente',[])
    .controller('controller',['$scope', '$http', (s, h)=>{
		s.response;
        s.enviarPeticionCliente = ()=>{
            let config = 
                {
                    method:'GET',
                    url:'/datos'
                };
            h(config)
                .then(
                    function succesCallback(data){
                        console.log(data);
						var texto = JSON.stringify(data);
						document.getElementById("datos").innerHTML = texto; 						
                    },
                    function errorCallback(error){
                        console.log(error);
                    }

                );
        };
    }]);
	