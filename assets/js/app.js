(function(){
	
	String.prototype.replaceAt=function(index, character) {
		return this.substr(0, index) + character + this.substr(index+character.length);
	}
	
	String.prototype.removeAt=function(index) {
		return this.substr(0, index) + this.substr(index + 1, this.length);
	}

	var app = angular.module('crud', ['md.data.table', 'ngMaterial', 'ngResource']);
	
	app.filter('comma2decimal', [
		function() {
			return function(input, size) {
				var ret = (input) ? input.toString().replace(",",".") : null;
				
				if(ret.lastIndexOf(".") == ret.length - (size + 1)){
					ret = ret.replaceAt(ret.length - (size + 1), ",");
				}
				
				return ret;
			};
		}]);
		
	app.filter('licenseCar', [
		function() {
			return function(input) {
				var ret = input || "",
					index = input.indexOf("-");
				
				if(index > -1){
					ret = input.removeAt(index);
				}
				
				return ret;
			};
		}]);
		
	app.directive('mySearch', function() {
	  return {
		restrict: 'E',
		templateUrl: 'assets/directives/my-search/my-search.html'
	  };
	});
	
	app.controller('carController', ['$scope', function ($scope) {
	  'use strict';

	  $scope.selected = [];

	  $scope.query = {
		order: 'placa',
		limit: 5,
		page: 1
	  };
	  
	  $scope.cars = [ { "combustivel" : "Flex", "imagem" : null, "marca" : "Volkswagem", "modelo" : "Gol", "placa" : "FFF-5498", "valor" : "20000" },
					  { "combustivel" : "Gasolina", "imagem" : null, "marca" : "Volkswagem", "modelo" : "Fox", "placa" : "FOX-4125", "valor" : "20000" },
					  { "combustivel" : "Alcool", "imagem" : "http://carros.ig.com.br/fotos/2010/290_193/Fusca2_290_193.jpg", "marca" : "Volkswagen", "modelo" : "Fusca", "placa" : "PAI-4121", "valor" : "20000"}
					];

	}]);
	
}());