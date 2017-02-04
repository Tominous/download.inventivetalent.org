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
}])

downloadApp.controller("downloadController", ["$scope", "$location", "$routeParams", "$http", "$timeout", function ($scope, $location, $routeParams, $http, $timeout) {
    console.log($routeParams)
    $scope.download = {
        params: $routeParams,
        provider: {
            friendlyName: "",
            urlFormat: ""
        },
        url: {
            direct: "",
            adfly: "",
            donate: ""
        },
        go: {
            direct: function () {
                window.location = $scope.download.url.direct;
            },
            adfly: function () {
                window.location = $scope.download.url.adfly;
            },
            donate: function () {
                window.location = $scope.download.url.donate;
            }
        },
        donateAmount: 1
    };
    if (!$scope.download.params.version) {
        $scope.download.params.version = "latest";
    }
    $scope.providers = {
        "GitHub": {
            keys: [
                "gh",
                "github"
            ],
            urlFormat: "https://github.com/InventivetalentDev/:project/releases/:version"
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

    $scope.showDownloadModal = function () {
        $("#downloadModal").modal("show")
    }

    // Generate URLs
    $timeout(function () {
        $scope.download.url.direct = $scope.download.provider.urlFormat
            .replace(":project", $scope.download.params.project)
            .replace(":version", $scope.download.params.version);

        $scope.download.url.donate = "https://download.inventivetalent.org/external/paypal/go?url=" + $scope.download.url.direct + "&amount=" + $scope.download.donateAmount;

        console.log("Generating adfly link...");
        $http({
            url: "/external/adfly/make.php?url=" + $scope.download.url.direct
        }).then(function (response) {
            $timeout(function () {
                $scope.download.url.adfly = response.data.shortened;
            });
        })
    }, 1000);
}]);