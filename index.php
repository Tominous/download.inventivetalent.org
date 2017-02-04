<!DOCTYPE html>
<html ng-app="downloadApp" ng-controller="parentController">
<head>
    <title>Download</title>

    <link href="/css/bootstrap.min.css" rel="stylesheet">

    <meta name=viewport content="width=device-width, initial-scale=1">
    <base href="/">

    <style>
        .centered {
            position: fixed;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }
    </style>
</head>
<body>

<div class="container">
    <div ng-view>
        <div class="centered">
            <h1>Loading Download...</h1>
        </div>
    </div>
</div>


<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.1/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js" integrity="sha384-k+Qp/8rZxoiiYGVjOBiZwkEp5yv6clgl2EmwNaE1oUMlfmEYgCWazxf4CyxfZiWG" crossorigin="anonymous"></script>

<script src="js/script.js"></script>

</body>
</html>