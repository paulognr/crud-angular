(function(){
	
	String.prototype.replaceAt=function(index, character) {
		return this.substr(0, index) + character + this.substr(index+character.length);
	}
	
	String.prototype.removeAt=function(index) {
		return this.substr(0, index) + this.substr(index + 1, this.length);
	}

	Array.prototype.removeAt=function(index) {
		return this.splice(index, 1);
	}

	Array.prototype.subarray=function(start,end){
		if(!end) { 
			end=-1;
		} 
		var newArray = clone(this);
		return newArray.slice(start, end);
	}

	function clone(obj) {
	    if (null == obj || "object" != typeof obj) return obj;
	    
	    var copy = obj.constructor();
	    for (var attr in obj) {
	        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
	    }
    	return copy;
	}

}());