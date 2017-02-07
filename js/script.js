var downloadApp = angular.module("downloadApp", ["ngRoute"]);


downloadApp.config(function ($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "empty.html"
        })
        .when("/:provider/:project", {redirectTo: "/:provider/:project/latest"})
        .when("/:provider/:project/:version/:meta?", {
            templateUrl: "download.html",
            controller: "downloadController"
        });

    $locationProvider.html5Mode(true);
});

downloadApp.controller("parentController", ["$scope", function ($scope) {
    $scope.pageTitle = "Download";
}])

downloadApp.controller("downloadController", ["$scope", "$location", "$routeParams", "$http", "$timeout", function ($scope, $location, $routeParams, $http, $timeout) {
    console.log($routeParams)
    $scope.download = {
        params: $routeParams,
        provider: {
            friendlyName: undefined,
            urlFormat: undefined
        },
        url: {
            direct: "",
            adfly: "",
            donate: ""
        },
        go: {
            direct: function () {
                window.location = $scope.download.url.direct();
            },
            adfly: function () {
                window.location = $scope.download.url.adfly();
            },
            donate: function () {
                window.location = $scope.download.url.donate();
            }
        },
        donateAmount: 1
    };
    if (!$scope.download.params.version) {
        $scope.download.params.version = "latest";
    }
    $scope.$watch("download.donateAmount", function (val, old) {
        $scope.download.donateAmount = parseFloat(val);
        console.log($scope.download.donateAmount)
    })
    $scope.providers = {
        "GitHub": {
            keys: [
                "gh",
                "github"
            ],
            urlFormat: "https://github.com/InventivetalentDev/:project/releases/:version"
        },
        "InventiveDownloads": {
            keys: [
                "idl"
            ],
            urlFormat: "https://dl.inventivetalent.org/plugin/?plugin=:project&version=:version"
        }
    };
    $.each($scope.providers, function (friendlyName, provider) {
        $.each(provider.keys, function (index, key) {
            if (key === $scope.download.params.provider) {
                $scope.download.provider.friendlyName = friendlyName;
                $scope.download.provider.urlFormat = provider.urlFormat;
            }
        })
    });
    console.info("Download Provider is " + $scope.download.provider.friendlyName);
    if (!$scope.download.provider.friendlyName || !$scope.download.provider.urlFormat) {
        alert("Unknown Download Provider");
    }

    $scope.showDownloadModal = function () {
        $("#downloadModal").modal("show")
    }

    // Generate URLs
    $timeout(function () {
        // update title
        $scope.pageTitle = "Download " + $scope.download.params.project + " " + $scope.download.params.version;
        console.log($scope.pageTitle);

        $scope.download.url.direct = function () {
            return $scope.download.provider.urlFormat
                .replace(":project", $scope.download.params.project)
                .replace(":version", $scope.download.params.version);
        };

        $scope.download.url.donate = function () {
            return "https://download.inventivetalent.org/external/paypal/go?url=" + btoa($scope.download.url.direct()) +
                "&amount=" + $scope.download.donateAmount +
                "&i_provider=" + $scope.download.params.provider +
                "&i_project=" + $scope.download.params.project +
                "&i_version=" + $scope.download.params.version;
        };

        console.log("Generating adfly link...");
        $http({
            url: "/external/adfly/make.php?url=" + btoa($scope.download.url.direct())
        }).then(function (response) {
            $timeout(function () {
                $scope.download.url.adfly = function () {
                    return response.data.shortened;
                };
            });
        })
    }, 500);

    $scope.submitIssue = function () {
        var url = "https://github.com/InventivetalentDev/download.inventivetalent.org/issues/new?title=";
        url += encodeURI("Download Issue (" + window.location + ")");
        window.open(url, "_blank");
    };
}]);