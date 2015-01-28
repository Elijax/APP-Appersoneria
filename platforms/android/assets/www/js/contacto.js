var app = angular.module('contacto',['ionic']);

 app.config(['$httpProvider', function($httpProvider) {
     $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

     $httpProvider.defaults.headers.post = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
    };
}]);

app.controller('contactoController', ['$scope', 'dataMessages', 'dataDepartamentos','dataMunicipios', '$http', function($scope, dataMessages, dataDepartamentos, dataMunicipios, $http)
{
    
    $scope.addMessage = function(msg) {
        return $http({
            url: 'http://apps.personeriacali.gov.co/create/message',
            method:'POST',
            data: $.param(msg),
            dataType:'json',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data)
        {
            if(data.status =='200')
            {
                alert('El Mensaje fue enviado con exito');
                window.location.replace("index.html");
            }
            else
            {
                alert('Hubo un error al enviar el mensaje, por favor verifique los datos ingresados...');
            }
        }).error(function()
        {
            alert('El mensaje no se pudo enviar por problemas de conectividad...');
        });
    };

    $scope.getMessages = function(msg)
    {
        dataMessages.getMessages(msg.nit).then(function(terminos){
            $scope.messages = terminos.data;
        });
    }


    $scope.getMunicipios = function(msg){
        dataMunicipios.getMunicipios(msg).then(function(terminos){
            $scope.municipios = terminos.data;
        });
    }

    dataDepartamentos.getDepartamentos().then(function(terminos){
        $scope.departamentos = terminos.data;
    });


}]);

app.factory('dataMessages',['$http', function($http)
{
    $http.defaults.useXDomain = true;
    $http.defaults.headers.common = 'Content-Type: application/json';

    delete $http.defaults.headers.common['X-Requested-With'];

    var urlService = 'http://apps.personeriacali.gov.co/api/messages/';
    var obj = {};

    obj.getMessages =function(nit){
        return $http.get(urlService+nit);
    }
    return obj;
}]);

app.factory('dataDepartamentos',['$http', function($http) {
    $http.defaults.useXDomain = true;
    $http.defaults.headers.common = 'Content-Type: application/json';

    delete $http.defaults.headers.common['X-Requested-With'];

    var urlService = 'http://apps.personeriacali.gov.co/api/dept';
    var obj = {};

    obj.getDepartamentos =function(){
        return $http.get(urlService);
    }
    return obj;

}]);

app.factory('dataMunicipios',['$http', function( $http) {
    $http.defaults.useXDomain = true;
    $http.defaults.headers.common = 'Content-Type: application/json';

    delete $http.defaults.headers.common['X-Requested-With'];

    var urlService = 'http://apps.personeriacali.gov.co/api/mun/';
    var obj = {};

    obj.getMunicipios =function(id){
        return $http.get(urlService+id.departamento);
    }
    return obj;

}]);

//filtro para poner la primera letra en mayúscula
app.filter("state", function(){
    return function(text) {
        if(text != 0){
            return 'Pendiente de respuesta';
        }
        return 'Resuelto';
    }
})

