<?php
require 'connect.php';
$db = getMongoClient();

$jobTypes = $db->jobtypes->find();
foreach ($jobTypes as $jobType) {
    echo "<option value=\"" . htmlspecialchars($jobType['type']) . "\">" . htmlspecialchars($jobType['type']) . "</option>";
}
?>
