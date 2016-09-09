PortalApp.controller("BuyerProjectController", function($scope, $http, $sanitize) {
    $scope.project = {};
    $scope.sortBy = ["name", true];
    $scope.symbols = {false:"v", true:"^"};

    $http({
            method: 'GET',
            url: "/data/exampleProjects.json"
    }).then(function success(response) {
            $scope.project = response.data[0];
            sortItems();
    }, function error(response) {
            console.log("ERROR");
    });

    $scope.setNameSort = function() {
        $scope.sortBy[0] = "name";
        $scope.project.items = sortItems();
    }

    $scope.toggleNameSort = function() {
        if ($scope.sortByName) $scope.sortBy[1] = !$scope.sortBy[1];
        console.log("toggling");
        $scope.project.items = sortItems();
    }

    $scope.setDescriptionSort = function() {
        $scope.sortBy[0] = "description";
        $scope.project.items = sortItems();
    }
    $scope.toggleDescriptionSort = function() {
        if ($scope.sortByDescription) $scope.sortBy[1] = !$scope.sortBy[1];
        $scope.project.items = sortItems();
    }

    $scope.setCountSort = function() {
        $scope.sortBy[0] = "count";
        $scope.project.items = sortItems();
    }
    $scope.toggleCountSort = function() {
        if ($scope.sortByCount) $scope.sortBy[1] = !$scope.sortBy[1];
        $scope.project.items = sortItems();
    }
    function sortItems() {
        console.log("sorting");
        $scope.sortByName = ($scope.sortBy[0] == "name");
        $scope.sortByDescription = ($scope.sortBy[0] == "description");
        $scope.sortByCount = ($scope.sortBy[0] == "count");

        return $scope.project.items.sort(itemOrder);
    }

    function itemOrder(a, b) {
        if ($scope.sortBy[1]) {
            return a[$scope.sortBy[0]] > b[$scope.sortBy[0]];
        } else {
            return a[$scope.sortBy[0]] < b[$scope.sortBy[0]];
        }
    }


});