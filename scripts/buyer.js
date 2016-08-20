PortalApp.controller("BuyerController", function($scope, $http, $sanitize) {
        $scope.hideProjects = false;
        $scope.hideMailbox  = true;
        $scope.hideRatings  = true;

        $scope.mailbox = {};

        $http({
                method: 'GET',
                url: "/data/exampleMessages.json"
        }).then(function success(response) {
                $scope.mailbox = response.data;
        }, function error(response) {
                console.log("ERROR");
        });

        $scope.projects = [];

        $http({
                method: "GET",
                url: "/data/exampleProjectList.json"
        }).then(function success(response) {
                $scope.projects = response.data;
        }, function error(response) {
                console.log("could not find projects");
        });


        $scope.selectProjectTab = function() {
                $("#mailTab, #ratingsTab").removeClass("selected");
                $("#projectTab").addClass("selected");
                $scope.hideProjects = false;
                $scope.hideMailbox  = true;
                $scope.hideRatings  = true;
        }

        $scope.selectMailboxTab = function() {
                $("#projectTab, #ratingsTab").removeClass("selected");
                $("#mailTab").addClass("selected");
                $scope.hideProjects = true;
                $scope.hideMailbox  = false;
                $scope.hideRatings  = true;
        }

        $scope.selectRatingsTab = function() {
                $("#mailTab, #projectTab").removeClass("selected");
                $("#ratingsTab").addClass("selected");
                $scope.hideProjects = true;
                $scope.hideMailbox  = true;
                $scope.hideRatings  = false;
        }
});