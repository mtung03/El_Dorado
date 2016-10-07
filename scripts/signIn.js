.controller("SignInController", function($scope, $http, $sanitize, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
        username = "",
        password = ""
    };
    $scope.hideError = true;
    $scope.errorMessage = "Invalid Password";

    /* move cursor to first field */
    document.getElementsByTagName('input')[0].focus(); 

    $scope.validAccounts = {};

    $scope.verify = function (credentials) {
        AuthService.login(credentials).then(function (user) {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);
        }, function () {
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        });
    };
/*
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
        $scope.errorMessage = "Account does not exist";
        $scope.hideError = false;
        console.log("account does not exist");
        } else if ($scope.password == account.password) {
        console.log("signed in!");
        if (account.accountType == 1) { // redirect if logged in
            window.location.href = "/views/buyerDash.html";
        } else {
            window.location.href = "/views/sellerDash.html";
        }
        } else {
        $scope.errorMessage = "Invalid Password";
        $scope.hideError = false;
        console.log("invalid!");
        }
    }
*/
    $scope.keypressCredentials = function(keyEvent) {
        if (keyEvent.which === 13) {
            $scope.verify();
        }
    }

})

.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
})

.factory('AuthService', function ($http, Session) {
    var authService = {};

    authService.login = function (credentials) {
        return $http
            .post('/login', credentials)
            .then(function (res) {
                Session.create(res.data.id, res.data.user.id, res.data.user.role);
                return res.data.user;
            });
    };

    authService.isAuthenticated = function () {
        return !!Session.userId;
    };

    authService.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    return authService;
})
.service('Session', function () {
    this.create = function (sessionId, userId, userRole) {
        this.id = sessionId;
        this.userId = userId;
        this.userRole = userRole;
    };
    this.destroy = function () {
        this.id = null;
        this.userId = null;
        this.userRole = null;
    };
})