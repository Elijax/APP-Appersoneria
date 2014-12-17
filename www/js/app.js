// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform,$ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.confirm({
                title: "Sin conexion a internet:",
                content: "Su dispositivo no cuenta con conexión a internet, la aplicación se cerrará.."
            })
            .then(function(result) {
                if(!result) {
                    ionic.Platform.exitApp();
                }
            });
        }
    }
  });
})
