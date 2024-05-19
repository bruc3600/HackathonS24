document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
});

const slider = document.getElementById('salary-range-filter');
const output = document.getElementById('salary-range-value');

slider.addEventListener('input', function(){
    output.textContent = `${slider.value} - 200000`;
});

document.getElementById('filter-button').addEventListener('click', applyFilters);
        
        function applyFilters() {
            const location = document.getElementById('location-filter').value;
            const jobType = document.getElementById('job-type-filter').value;
            const salaryRange = document.getElementById('salary-range-filter').value;
            const [minSalary, maxSalary] = [0, 200000]; // Example range; adjust as needed

    fetch(`/jobs?location=${location}&job_type=${jobType}&min_salary=${minSalary}&max_salary=${maxSalary}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Jobs data:', data);
            const searchResults = document.getElementById('search-results');
            searchResults.innerHTML = '';

                    data.forEach(job => {
                        const jobElement = document.createElement('div');
                        jobElement.className = 'job-listing';
                        jobElement.innerHTML = `
                            <h3>${job.title}</h3>
                            <p>${job.company}</p>
                            <p>${job.location}</p>
                            <p>Salary: ${job.salary}</p>
                        `;
                        searchResults.appendChild(jobElement);
                    });
                })
                .catch(error => console.error('Error fetching jobs:', error));
        }