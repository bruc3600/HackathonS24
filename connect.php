<?php
require 'vendor/autoload.php';

function getMongoClient() {
    $client = new MongoDB\Client("mongodb+srv://bruceandrew11:HackathonDBTest@cluster0.m6ptqli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    return $client->job_database;
}
?>
