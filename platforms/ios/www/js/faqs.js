var app = angular.module('faq',['ionic'])

app.controller('faqController', ['$scope', 'dataFaq', function($scope, dataFaq)
{
    $scope.maxLength = 100;

    dataFaq.getFaqs().then(function(terminos){
        $scope.faqs = terminos.data;
    });

}]);

app.factory('dataFaq',['$http', function($http)
{
    $http.defaults.useXDomain = true;
    $http.defaults.headers.common = 'Content-Type: application/json';

    delete $http.defaults.headers.common['X-Requested-With'];

    var urlService = 'http://apps.personeriacali.gov.co/api/faqs';
    var obj = {};

    obj.getFaqs =function(){
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

app.run(function($ionicPlatform, $ionicPopup) {
    $ionicPlatform.ready(function() {
        if(window.Connection) {
            if(navigator.connection.type == Connection.NONE) {
                $ionicPopup.confirm({
                    title: "Internet Disconnected",
                    content: "The internet is disconnected on your device."
                })
                .then(function(result) {
                    if(!result) {
                        ionic.Platform.exitApp();
                    }
                });
            }
        }
    });
});