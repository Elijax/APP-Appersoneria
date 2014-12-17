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

app.controller('contactoController', ['$scope', 'dataMessages','$http', function($scope, dataMessages, $http)
{
    $scope.addMessage = function(msg) {
        return $http({
            url:'http://apps.personeriacali.gov.co/create/message',
            method:'POST',
            data: $.param(msg),
            headers: {'Content-Type': 'application/json'}
        }).success(function(data)
        {
            if(data.status =='200')
            {
                alert('El Mensaje fue enviado con exito');
            }
            else
            {
                alert('Hubo un error al enviar el mensaje');
            }
        }).error(function()
        {
            alert('Hubo un error al enviar el mensaje, verifica los datos');
        });
    };

    $scope.getMessages = function(msg)
    {
        dataMessages.getMessages(msg.nit).then(function(terminos){
            console.log(terminos.data);
            $scope.messages = terminos.data;
        });
    }
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

//filtro para poner la primera letra en mayúscula
app.filter("state", function(){
    return function(text) {
        if(text != 0){
            return 'Pendiente de respuesta';
        }
        return 'Resuelto';
    }
})

