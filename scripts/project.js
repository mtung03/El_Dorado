PortalApp.controller("BuyerProjectController", function($scope, $http, $sanitize) {
    $scope.project = {};
    $http({
            method: 'GET',
            url: "/data/exampleProjects.json"
    }).then(function success(response) {
            $scope.project = response.data;
    }, function error(response) {
            console.log("ERROR");
    });
});