(function(){

	angular
		.module('crud')
		.directive('autofocus', autofocusDirective);

	function autofocusDirective($timeout){
		return {
			restrict: 'A',
			link : function($scope, $element) {
				$timeout(function() {
					$element[0].focus();
				});
			}	
		}	
	}
	
}());