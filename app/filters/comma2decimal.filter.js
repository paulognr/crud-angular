(function(){

	angular
		.module('crud')
		.filter('comma2decimal', comma2decimalFilter);

	function comma2decimalFilter() {
		return function(input, size) {
			var ret = (input) ? input.toString().replace(",",".") : "";
			
			if(ret.lastIndexOf(".") == ret.length - (size + 1)){
				ret = ret.replaceAt(ret.length - (size + 1), ",");
			}
			
			return ret;
		};
	}
	
}());