(function(){
	'use strict';

	angular
		.module('crud')
		.controller('CarParentController', carParentController)
		.controller('CarListController', carListController)
		.controller('CarDetailController', carDetailController);

	function carParentController() {
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

		vm.getCars = getCars;

		function getCars() {
			return vm.cars;
		}
	}

	function carListController() {
		var vm = this;

		carParentController.apply(vm, arguments)

		vm.selected = [];

		vm.query = {
			order: 'placa',
			limit: 5,
			page: 1
		};
	}

	function carDetailController($stateParams, $state) {
		var vm = this;

		carParentController.apply(vm, arguments)

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
	
}());