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

		vm.cars.push({
		  		"combustivel" : "Flex", 
		  		"imagem" : null, 
		  		"marca" : "Pegeout", 
		  		"modelo" : "208", 
		  		"placa" : "AAA-1111", 
		  		"valor" : "20000" 
		  	});

		vm.cars.push({
		  		"combustivel" : "Gasolina", 
		  		"imagem" : null, 
		  		"marca" : "Pegeout", 
		  		"modelo" : "207", 
		  		"placa" : "BBB-2222", 
		  		"valor" : "20000" 
		  	});

		vm.cars.push({
		  		"combustivel" : "Alcool", 
		  		"imagem" : null, 
		  		"marca" : "Honda", 
		  		"modelo" : "Civic", 
		  		"placa" : "CCC-3333", 
		  		"valor" : "20000" 
		  	});

		vm.cars.push({
		  		"combustivel" : "Flex", 
		  		"imagem" : null, 
		  		"marca" : "Ferrari", 
		  		"modelo" : "F40", 
		  		"placa" : "DDD-4444", 
		  		"valor" : "200000" 
		  	});

		vm.combustiveis = ["Gasolina", "Alcool", "Flex"];

		$scope.cars = vm.cars;
		$scope.combustiveis = vm.combustiveis;
	}

	function carListController($scope, $state) {
		var vm = this;

		vm.selected = [];
		vm.cars = $scope.cars;
		vm.totalPages = 0;

		vm.query = {
			text: '',
			order: 'placa',
			limit: 5,
			page: 1
		};

		vm.navigateToCreateCar = navigateToCreateCar;
		vm.findCars = findCars;
		vm.remove = remove;
		vm.update = update;

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

			vm.totalPages = Math.ceil(result.length / vm.query.limit);

			return result.subarray(start, end);
		}

		function navigateToCreateCar() {
			$state.go('cars.create');
		}

		function bindSearch() {
			$scope.$on('search-event', function(event, data){
				vm.query.text = data.text;
				findCars();
			});

			$scope.$on('pagination-event', function(event, data){
				vm.query.page = data.page;
				findCars();
			})
		}

		function remove() {
			if(vm.selected.length > 0){
				for(var j = 0; j < vm.selected.length; j++){
					var selected = vm.selected[j];
					if(selected){
						for(var i in $scope.cars){
							if(selected.placa == $scope.cars[i].placa){
								$scope.cars.removeAt(i);
								break;
							}
						}	
					}
				}

				vm.selected = [];
				findCars();
			}
		}

		function update() {
			if(vm.selected[0]){
				$state.go('cars.detail', {license: vm.selected[0].placa});
			}
		}
	}

	function carDetailController($stateParams, $state, $scope) {
		var vm = this;

		vm.current;
		vm.findByLicense = findByLicense;
		vm.cancel = cancel;
		vm.submit = submit;
		vm.cars = $scope.cars;
		vm.combustiveis = $scope.combustiveis;

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

		function cancel(){
			$state.go('cars.list');
		}

		function submit() {
			vm.current.placa = vm.current.placa.toUpperCase();

			for(var i in $scope.cars){
				if(vm.current.placa == $scope.cars[i].placa){
					$scope.cars[i] = vm.current;
					break;
				}
			}

			$state.go('cars.list');
		}
	}

	function carCreateController($scope, $state) {
		var vm = this;

		vm.current == {
			placa:""
		};

		vm.cancel = cancel;
		vm.combustiveis = $scope.combustiveis;

		vm.submit = submit;

		function submit() {
			vm.current.placa = vm.current.placa.toUpperCase();
			$scope.cars.push(vm.current);
			$state.go('cars.list');
		}

		function cancel(){
			$state.go('cars.list');
		}
	}	
	
}());