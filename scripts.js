document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
});

const slider = document.getElementById('salary-range-filter');
const output = document.getElementById('salary-range-value');

slider.addEventListener('input', function(){
    output.textContent = `${slider.value}`;
});

document.getElementById('filter-button').addEventListener('click', applyFilters);

function applyFilters() {
    const location = document.getElementById('location-filter').value;
    const jobType = document.getElementById('job-type-filter').value;
    const salaryRange = document.getElementById('salary-range-filter').value;
    const [minSalary, maxSalary] = [0, 200000]; // Example range; adjust as needed

    fetch(`/jobs?location=${location}&job_type=${jobType}&min_salary=${minSalary}&max_salary=${maxSalary}`)
        .then(response => response.json())
        .then(data => {
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = '';

            data.forEach(job => {
                const jobElement = document.createElement('div');
                jobElement.className = 'job-listing';
                jobElement.innerHTML = `
                    <h3>${job.title}</h3>
                    <p>Company: ${job.company_id}</p>
                    <p>Location: ${job.location_id}</p>
                    <p>Salary: ${job.wage}</p>
                    <p>Type: ${job.job_type_id}</p>
                    <p>Posted on: ${new Date(job.posting_date).toLocaleDateString()}</p>
                `;
                searchResults.appendChild(jobElement);
            });
        })
        .catch(error => console.error('Error fetching jobs:', error));
}

function populateFilters() {
    fetch('/locations')
        .then(response => response.json())
        .then(locations => {
            const locationFilter = document.getElementById('location-filter');
            locations.forEach(location => {
                const option = document.createElement('option');
                option.value = location['_id'];
                option.textContent = `${location.city}, ${location.state}, ${location.country}`;
                locationFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching locations:', error));

    fetch('/job_types')
        .then(response => response.json())
        .then(jobTypes => {
            const jobTypeFilter = document.getElementById('job-type-filter');
            jobTypes.forEach(jobType => {
                const option = document.createElement('option');
                option.value = jobType['_id'];
                option.textContent = jobType.type;
                jobTypeFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching job types:', error));
}
