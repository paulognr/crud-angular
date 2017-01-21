(function(){

	angular
		.module('crud')
		.config(routeConfig);

	function routeConfig($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/cars/list');
		
		$stateProvider
			.state('cars', {
				abstract: true,
				url: '/cars',
				template: '<ui-view>',
				controller: 'CarParentController',
				controllerAs: 'vm'
			})
			.state('cars.list', {
				url: '/list',
				templateUrl: 'app/cars/cars.html',
				controller: 'CarListController',
				controllerAs: 'vm'
			})
			.state('cars.detail', {
				url: '/:license',
				templateUrl: 'app/cars/car.html',
				controller: 'CarDetailController',
				controllerAs: 'vm'
			});
	}	
	
}());