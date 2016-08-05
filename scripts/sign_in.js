/* sign_in.js */

var PortalApp = angular.module("Portal", ['ngSanitize']);

PortalApp.controller("SignInController", function($scope, $http, $sanitize) {
        $scope.username = "";
        $scope.password = "";
        $scope.verify = function() {
                console.log("username "+ $sanitize($scope.username));
                console.log("password "+ $sanitize($scope.password));
                if ($scope.username == "maxtung" && $scope.password == "secret") {
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

PortalApp.controller("AccountRequestController", function($scope, $http, $sanitize) {
        $scope.accountName = "";
        $scope.companyName = "";
        $scope.buyerAccount = 1;
        $scope.email = "";

        $scope.sendAccountRequest = function() {
                var data = "accountName=" + $sanitize($scope.accountName) + "&companyName=" + $sanitize($scope.companyName) + "&buyerAccount=" + $sanitize($scope.buyerAccount) + "&email=" + $sanitize($scope.email);
                console.log(data);
                // var req = {
                //         method: "POST",
                //         url: /* insert here */,
                //         data: data
                // }
        }

        $scope.keypressRequest = function(keyEvent) {
                if(keyEvent.which === 13) {
                        $scope.sendAccountRequest();
                }
        }
});