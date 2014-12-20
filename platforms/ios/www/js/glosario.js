var app = angular.module('glosario',['ionic'])

app.controller('glosarioController', ['$scope', 'dataGlosario', function($scope, dataGlosario)
{
    $scope.maxLength = 100;
    dataGlosario.getGlosario().then(function(terminos){
        $scope.terminos = terminos.data;
    });
}]);

app.factory('dataGlosario',['$http', function($http)
{
    $http.defaults.useXDomain = true;
    $http.defaults.headers.common = 'Content-Type: application/json';

    delete $http.defaults.headers.common['X-Requested-With'];

    var urlService = 'http://apps.personeriacali.gov.co/api/glosary';
    var obj = {};

    obj.getGlosario =function(){
        return $http.get(urlService);
    }

    return obj;
}]);

//filtro para poner la primera letra en mayúscula
app.filter("capitalize", function(){
    return function(text) {
        if(text != null){
            return text.substring(0,1).toUpperCase()+text.substring(1);
        }
    }
})
