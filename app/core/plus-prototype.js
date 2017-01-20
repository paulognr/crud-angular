(function(){
	
	String.prototype.replaceAt=function(index, character) {
		return this.substr(0, index) + character + this.substr(index+character.length);
	}
	
	String.prototype.removeAt=function(index) {
		return this.substr(0, index) + this.substr(index + 1, this.length);
	}

}());