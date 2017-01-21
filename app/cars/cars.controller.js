(function(){
	'use strict';

	angular
		.module('crud')
		.controller('CarParentController', carParentController)
		.controller('CarListController', carListController)
		.controller('CarDetailController', carDetailController)
		.controller('CarCreateController', carCreateController);

	function carParentController($scope) {
		var vm = this;
	  
	  	vm.cars = [ 
		  	{
		  		"combustivel" : "Flex", 
		  		"imagem" : null, 
		  		"marca" : "Volkswagem", 
		  		"modelo" : "Gol", 
		  		"placa" : "FFF-5498", 
		  		"valor" : "20000" 
		  	},{ 
		  		"combustivel" : "Gasolina", 
		  		"imagem" : null, 
		  		"marca" : "Volkswagem", 
		  		"modelo" : "Fox", 
		  		"placa" : "FOX-4125", 
		  		"valor" : "20000" 
		  	},{ 
		  		"combustivel" : "Alcool", 
		  		"imagem" : "http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg", 
		  		"marca" : "Volkswagen", 
		  		"modelo" : "Fusca", 
		  		"placa" : "PAI-4121", 
		  		"valor" : "20000"
		  	}];

		$scope.cars = vm.cars;
	}

	function carListController($scope, $state) {
		var vm = this;

		vm.selected = [];
		vm.cars = $scope.cars;

		vm.query = {
			order: 'placa',
			limit: 5,
			page: 1
		};

		vm.navigateToCreateCar = navigateToCreateCar;

		function navigateToCreateCar() {
			$state.go('cars.create');
		}
	}

	function carDetailController($stateParams, $state) {
		var vm = this;

		vm.current;
		vm.findByLicense = findByLicense;

		activate();

		function activate() {
			if($stateParams.license){
				vm.current = findByLicense($stateParams.license);
			}

			if(!vm.current) {
				$state.go('cars.list');
			}
		}

		function findByLicense(license) {
			for(var i in vm.cars){
				var currentCar = vm.cars[i];
				if(currentCar && currentCar.placa == license) {
					return currentCar;
				}
			}
		}
	}

	function carCreateController($scope, $state) {
		var vm = this;

		vm.current == {
			placa:""
		};

		vm.submit = submit;

		function submit() {
			vm.current.placa = vm.current.placa.toUpperCase();
			$scope.cars.push(vm.current);
			$state.go('cars.list');
		}
	}	
	
}());