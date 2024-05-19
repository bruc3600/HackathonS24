<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Search Engine</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header>
        <h1>Job Search Engine</h1>
        <form method="GET" action="search.php">
            <div>
                <label for="location">Location:</label>
                <select id="location" name="location">
                    <option value="">All Locations</option>
                    <?php include 'get_locations.php'; ?>
                </select>
            </div>
            <div>
                <label for="job_type">Job Type:</label>
                <select id="job_type" name="job_type">
                    <option value="">All Job Types</option>
                    <?php include 'get_jobtypes.php'; ?>
                </select>
            </div>
            <div>
                <label for="salary_range">Salary Range:</label>
                <input type="text" id="salary_range" name="salary_range" placeholder="e.g. 30000-50000">
            </div>
            <button type="submit">Search</button>
        </form>
    </header>
    <main>
        <section id="search-results">
            <?php include 'search.php'; ?>
        </section>
    </main>
</body>
</html>
