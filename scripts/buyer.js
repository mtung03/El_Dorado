PortalApp.controller("BuyerController", function($scope, $http, $window, $sanitize) {
    $scope.hideProjects = false;
    $scope.hideMailbox  = true;
    $scope.hideRatings  = true;
    $scope.emails = [];

    $scope.mailbox = {};

    $window.onload = function () {
        checkAuth();
    };

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
        url: "/data/exampleProjects.json"
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

    $scope.vendorOptions = [];

    $http({
        method: "GET",
        url: "/data/vendors.json"
    }).then(function success(response) {
        $scope.vendors = response.data;
        console.log("got vendors");
        $scope.vendorOptions = makeVendorOptions();
        console.log($scope.vendorOptions);
    }, function error(response) {
        console.log("could not find vendors");
    });

    $scope.projectName = "";
    $scope.description = "";

    function makeVendorOptions() {
        var options = [];
        for (i = 0; i < $scope.vendors.length; i++) {
            var option = $scope.vendors[i];
            option["selected"] = false;
            options.push(option);
        }
        return options;
    };

    // selected vendors
    $scope.vendorChoices = [];

    // helper method to get selected vendors
    $scope.selectedVendors = function selectedVendors() {
        return filterFilter($scope.vendorOptions, { selected: true });
    };

    // watch vendors for changes
    $scope.$watch('vendorOptions|filter:{selected:true}', function (nv) {
        $scope.vendorChoices = nv.map(function (vendor) {
            return vendor.title;
        });
        console.log("ok");
    }, true);


    $scope.createProject = function() {
        var projectData = "projectName=" + $sanitize($scope.projectName) + "&description=" + $sanitize($scope.description);
        for (var i = 0; i < $scope.vendorChoices.length; i++) {
            projectData += "&vendorChoices=" + $sanitize($scope.vendorChoices[i]);
        }
    }

///////////////////////////// GMAIL STUFF ///////////////////////////////////
/***************************************************************************/

    // Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com

    /* Gotten by Max */
    var CLIENT_ID = '701859890180-pu9670n6bb2jh4fjpoirla81t8rim83j.apps.googleusercontent.com';

    var SCOPES = ['https://www.googleapis.com/auth/gmail.modify'];

    var LABEL_NAME = 'El_Dorado';

    /**
     * Check if current user has authorized this application.
    */
    function checkAuth() {
        console.log("checkAuth");
        gapi.auth.authorize(
        {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': false
        }, handleAuthResult);
    }

    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    function handleAuthResult(authResult) {
        console.log(authResult);

        if (authResult && !authResult.error) {
            loadGmailApi();
        } else {
            console.log("not authorized");
        }
    }


    /**
     * Load Gmail API client library. List messages once client library
     * is loaded.
     */
    function loadGmailApi() {
        gapi.client.load('gmail', 'v1', getLabelId);
    }


    /**
     * Print all Labels in the authorized user's inbox. If no labels
     * are found an appropriate message is printed.
     */

    function listMessagesWithLabel(labelId) {
        console.log(labelId);
        var request = gapi.client.gmail.users.messages.list({
            'userId': 'me',
            'labelIds': labelId
        });

        request.execute(function(resp) {
            var messages = resp.messages;

            var messageIds = [];
            if (messages && messages.length > 0) {
                for (i = 0; i < messages.length; i++) {
                    messageIds.push(messages[i].id);
                }
            } else {
                $scope.emails.push('No Messages found.');
            }
            displayMessages(messageIds);
        });
    }

    function getLabelId() {
        var request = gapi.client.gmail.users.labels.list({
            'userId':'me'
        });

        request.execute(function(resp) {
            var labels = resp.labels;
            console.log(labels);

            if (labels && labels.length > 0) {
                var labelId = '';
                for (i = 0; i < labels.length; i++) {
                    if (labels[i].name == LABEL_NAME) {
                        console.log("found");
                        labelId = labels[i].id;
                        break;
                    }
                }
                if (labelId == '') {
                    var request = gapi.client.gmail.users.labels.create({
                        'userId': 'me',
                        'label': {
                            'name': LABEL_NAME
                        }
                    });
                    var res = request.execute();
                    console.log("res");
                    console.log(res);
                    /* create label */
                } else {
                    listMessagesWithLabel(labelId);
                }
            }
        });
        console.log("going back");
    }

    function displayMessages(ids) {
        console.log("displaying");
        for (i = 0; i < ids.length; i++) {
            var request = gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': ids[i]
            });
            request.execute(function(resp) {
                for (i = 0; i < resp.payload.headers.length; i++) {
                    if (resp.payload.headers[i].name == 'Subject') {
                        $scope.emails.push(resp.payload.headers[i].value);
                        break;
                    }
                }
            });
        }
    }
});
