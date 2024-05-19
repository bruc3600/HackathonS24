<?php
require 'connect.php';
$db = getMongoClient();

$locations = $db->locations->find();
foreach ($locations as $location) {
    echo "<option value=\"" . htmlspecialchars($location['city']) . "\">" . htmlspecialchars($location['city']) . "</option>";
}
?>
