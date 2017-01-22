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
			text: '',
			order: 'placa',
			limit: 5,
			page: 1
		};

		vm.navigateToCreateCar = navigateToCreateCar;
		vm.findCars = findCars;

		activate();

		function activate() {
			bindSearch();
		}

		function findCars() {
			var start = (vm.query.page - 1) * vm.query.limit,
				end = start + vm.query.limit,
				result = [];

			if(vm.query.text.trim().length > 0){
				result = vm.cars.filter(function(car){
					if(car.combustivel.toLowerCase().indexOf(vm.query.text.toLowerCase()) > -1 
							|| car.marca.toLowerCase().indexOf(vm.query.text.toLowerCase()) > -1){
						return car;
					}
				});
			} else {
				result = vm.cars;
			}

			result.sort(function(a,b) {
				return (a[vm.query.order] > b[vm.query.order]) ? 1 : ((b[vm.query.order] > a[vm.query.order]) ? -1 : 0);
			}); 

			return result.subarray(start, end);
		}

		function navigateToCreateCar() {
			$state.go('cars.create');
		}

		function bindSearch() {
			$scope.$on('search-event', function(event, data){
				vm.query.text = data.text;
				findCars();
			})
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