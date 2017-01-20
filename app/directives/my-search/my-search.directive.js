(function(){

	angular
		.module('crud')
		.directive('mySearch', mySearchDirective);

	function mySearchDirective(){
		return {
			restrict: 'E',
			templateUrl: 'app/directives/my-search/my-search.directive.html'
	  	}	
	}
	
}());