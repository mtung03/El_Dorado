/* sign_in.js */

// var request = new XMLHttpRequest();

// request.open("GET", "data/accounts.json", true);



// function verify() {
//         var uName = document.getElementById("username_input");
//         var pWord = document.getElementById("password_input");

//         var accountData = request.responseText;
//         console.log(accountData);
//         var accounts = JSON.parse(accountData);

//         console.log(accounts[uName] == pWord);
//         console.log(uName.value);
//         console.log(pWord.value);
// }

var PortalApp = angular.module("Portal", []);

PortalApp.controller("SignInController", function($scope) {
        $scope.username = "";
        $scope.password = "";
        $scope.verify = function() {
                console.log("username "+ $scope.username);
                console.log("password "+ $scope.password);
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