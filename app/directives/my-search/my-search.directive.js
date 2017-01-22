(function(){

	angular
		.module('crud')
		.directive('mySearch', mySearchDirective);

	function mySearchDirective(){
		return {
			restrict: 'E',
			templateUrl: 'app/directives/my-search/my-search.directive.html',
			controller: mySearchController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				text: "=?bind"
			}
	  	}

	  	function mySearchController($rootScope){
	  		var vm = this;

	  		vm.search = search;

			function search() {
				$rootScope.$broadcast('search-event', {text: vm.text});
		  	}

	  	}	
	}
	
}());