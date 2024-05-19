<?php
require 'connect.php';
$db = getMongoClient();

$location = isset($_GET['location']) ? $_GET['location'] : '';
$jobType = isset($_GET['job_type']) ? $_GET['job_type'] : '';
$salaryRange = isset($_GET['salary_range']) ? explode('-', $_GET['salary_range']) : [0, 200000];

$query = [];
if ($location) {
    $query['location.city'] = $location;
}
if ($jobType) {
    $query['job_type.type'] = $jobType;
}
if ($salaryRange) {
    $query['wage'] = ['$gte' => (float)$salaryRange[0], '$lte' => (float)$salaryRange[1]];
}

$jobs = $db->jobs->find($query);

foreach ($jobs as $job) {
    echo "<div class='job'>";
    echo "<h3>" . htmlspecialchars($job['title']) . "</h3>";
    echo "<p>" . htmlspecialchars($job['description']) . "</p>";
    echo "<p>Company: " . htmlspecialchars($job['company']['name']) . "</p>";
    echo "<p>Location: " . htmlspecialchars($job['location']['city']) . "</p>";
    echo "<p>Wage: $" . htmlspecialchars($job['wage']) . "</p>";
    echo "<p>Start Date: " . htmlspecialchars($job['start_date']) . "</p>";
    echo "</div>";
}
?>

