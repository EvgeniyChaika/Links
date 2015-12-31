/**
 * Created by user on 16.12.15.
 */
var helloApp = angular.module('helloApp', ["ngRoute"]);

helloApp.config(
    function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'homeController'
            })
            .when('/home', {
                templateUrl: 'home.html',
                controller: 'homeController'
            })
            .when('/hello-world', {
                templateUrl: 'hello_world.html',
                controller: 'helloWorldController'
            })
            .when('/data', {
                templateUrl: 'data.html',
                controller: 'dataController'
            })
            .when('/vk', {
                templateUrl: 'vk.html',
                controller: 'vkController'
            })
            .when('/forms', {
                templateUrl: 'forms.html',
                controller: 'formsController'
            })
            .otherwise({
                redirectTo: '/'
            });

    });

helloApp.controller('homeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

}]);
helloApp.controller('helloWorldController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

}]);
helloApp.controller('vkController', ['$scope', '$http', '$location',
    function ($scope, $http, $location) {

    $scope.parseText = function (txt) {

        var str = txt.split("/");
        var target = str[str.length - 1];

        $http({
            method: 'GET',
            url: "http://api.vkontakte.ru/method/users.get?uids=" + target + "&fields=photo_max_orig,status"
        }).then(function successCallback(response) {
            //var res = JSON.stringify(response);
            $scope.result = response.data.response[0];
            console.log($scope.result);
            // var json = JSON.stringify($scope.result);
            //console.log(json);

        }, function errorCallback(response) {
            console.log("bad response" + response.message);
            // console.log(response);

        });
    };


}]);
helloApp.controller('dataController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.hideText = function (t) {
        console.log("Click!");
        t.text = "";
    };

    $http.get('data.json').success(function (response) {
        $scope.data = response;
        console.log($scope.data);
        console.log($scope.data[0].text);
    })
}]);

helloApp.controller('formsController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.getForm = function () {
        console.log("getForm!");
        $http.get('types.json').success(function (response) {
            $scope.types = response;
        })
    };
    $scope.onSubmit = function () {
        $http.post('www.google.com/registerMePleaseBro', $scope.types)
            .success(function (response) {
                console.log('Google hacked!', response, $scope.types);
            })
            .error(function (response) {
                console.log('Ah, crap!', response, $scope.types);
            });
    }
}]);