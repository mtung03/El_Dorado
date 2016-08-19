/* sign_in.js */

var PortalApp = angular.module("Portal", ['ngSanitize']);

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