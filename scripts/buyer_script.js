// buyer script

PortalApp.controller("BuyerController", function($scope, $http, $sanitize) {
        $scope.hideProjects = false;
        $scope.hideMailbox  = true;
        $scope.hideRatings  = true;

        $scope.selectProjectTab = function() {
                console.log("proj");
                $scope.hideProjects = false;
                $scope.hideMailbox  = true;
                $scope.hideRatings  = true;
        }

        $scope.selectMailboxTab = function() {
                console.log("mail");
                $scope.hideProjects = true;
                $scope.hideMailbox  = false;
                $scope.hideRatings  = true;
        }

        $scope.selectRatingsTab = function() {
                console.log("rate");
                $scope.hideProjects = true;
                $scope.hideMailbox  = true;
                $scope.hideRatings  = false;
        }
});();