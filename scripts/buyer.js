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

        console.log("after make" + $scope.vendorOptions);

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

        console.log($scope.vendorChoices);

        $scope.createProject = function() {
                var projectData = "projectName=" + $sanitize($scope.projectName) + "&description=" + $sanitize($scope.description);
                for (var i = 0; i < $scope.vendorChoices.length; i++) {
                        projectData += "&vendorChoices=" + $sanitize($scope.vendorChoices[i]);
                } 
                console.log($scope.vendorChoices);
                console.log(projectData);
        }
});