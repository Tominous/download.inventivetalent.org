<?php

$provider = $_REQUEST["provider"];
$project = $_REQUEST["project"];
$version = $_REQUEST["version"];

header("Location: https://download.inventivetalent.org/$provider/$project/$version/donationCancel");
