PortalApp.controller("SellerController", function($scope, $http, $sanitize) {
        $scope.hideMailbox  = false;
        $scope.hideTemplates  = true;

        $scope.selectMailboxTab = function() {
                $("#templateTab").removeClass("selected");
                $("#mailTab").addClass("selected");
                $scope.hideMailbox  = false;
                $scope.hideTemplates  = true;
        }

        $scope.selectTemplateTab = function() {
                $("#mailTab").removeClass("selected");
                $("#templateTab").addClass("selected");
                $scope.hideMailbox  = true;
                $scope.hideTemplates  = false;
        }
});