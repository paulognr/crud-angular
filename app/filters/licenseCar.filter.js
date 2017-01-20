(function(){

	angular
		.module('crud')
		.filter('licenseCar', licenseCarFilter);

	function licenseCarFilter(){
		return function(input) {
			var ret = input || "",
				index = input.indexOf("-");
			
			if(index > -1){
				ret = input.removeAt(index);
			}
			
			return ret;
		};
	}
	
}());