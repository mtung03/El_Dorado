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

                var account = $scope.validAccounts[$scope.username];

                if (account == undefined) {
                        console.log("account does not exist");
                } else if ($scope.password == account.password) {
                        console.log("signed in!");
                        if (account.accountType == 1) { // redirect if logged in
                                window.location.href = "buyerDash.html";
                        } else {
                                window.location.href = "sellerDash.html";
                        }
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