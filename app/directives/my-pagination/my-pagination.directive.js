(function(){

	angular
		.module('crud')
		.directive('myPagination', myPaginationDirective);

	function myPaginationDirective(){
		return {
			restrict: 'E',
			templateUrl: 'app/directives/my-pagination/my-pagination.directive.html',
			controller: myPaginationController,
			controllerAs: 'vm',
			bindToController: true,
			scope: {
				currentPage: "=?bind"
			}
	  	}

	  	function myPaginationController($rootScope, $attrs){
	  		var vm = this;

	  		vm.itemClick = itemClick;
	  		vm.previousClick = previousClick;
	  		vm.nextClick = nextClick;

	  		activate();

	  		function activate() {
	  			loadObserves();
	  		}

	  		function loadObserves() {
	  			$attrs.$observe('myPage', function(value) {
			        vm.currentPage = value;
			    });

			    $attrs.$observe('myTotalPages', function(value) {
			        vm.totalPages = value;
			        loadPages();
			    });
	  		}

	  		function loadPages() {
	  			vm.pages = [];
	  			if(vm.totalPages) {
	  				for(var i = 1; i <= vm.totalPages; i++){
	  					vm.pages.push({index: i});
	  				}
	  			}
	  		}

	  		function itemClick($event){
	  			vm.currentPage = $event.target.attributes['data-index'].value;
	  			dispatchEvent();
	  		}

	  		function previousClick() {
	  			if(vm.currentPage > 1){
	  				vm.currentPage--; 
	  			}
	  			dispatchEvent();	
	  		}

	  		function nextClick() {
	  			if(vm.currentPage < 2){
	  				vm.currentPage++; 
	  			}
	  			dispatchEvent();	
	  		}

	  		function dispatchEvent() {
	  			$rootScope.$broadcast('pagination-event', {page: vm.currentPage});
	  		}
	  	}	
	}
	
}());