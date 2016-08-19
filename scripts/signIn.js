PortalApp.controller("SignInController", function($scope, $http, $sanitize) {
        $scope.username = "";
        $scope.password = "";

        $scope.validAccounts = {};

        $http({
                method: 'GET',
                url: "/data/accounts.json"
        }).then(function success(response) {
                $scope.validAccounts = response.data;
        }, function error(response) {
                console.log("ERROR");
        });
        
        $scope.verify = function() {
                console.log("username "+ $sanitize($scope.username));
                console.log("password "+ $sanitize($scope.password));

                if ($scope.password == $scope.validAccounts[$scope.username]) {
                        console.log("signed in!");
                } else {
                        console.log("invalid!");
                }
        }
        $scope.keypressCredentials = function(keyEvent) {
                if (keyEvent.which === 13) {
                        $scope.verify();
                }
        }

});