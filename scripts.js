document.addEventListener('DOMContentLoaded', () => {
    populateFilters();
  });
  
  const slider = document.getElementById('salary-range-filter');
  const output = document.getElementById('salary-range-value');
  
  slider.addEventListener('input', function() {
    output.textContent = `${slider.value} - 200000`;
  });
  
  document.getElementById('filter-button').addEventListener('click', applyFilters);
  
  function applyFilters() {
    const location = document.getElementById('location-filter').value;
    const jobType = document.getElementById('job-type-filter').value;
    const salaryRange = document.getElementById('salary-range-filter').value;
    const minSalary = 0;
    const maxSalary = salaryRange;
  
    console.log(`Applying filters: Location=${location}, JobType=${jobType}, SalaryRange=${minSalary}-${maxSalary}`);
  
    fetch(`/JobDB?location=${location}&job_type_id=${jobType}&min_salary=${minSalary}&max_salary=${maxSalary}`)
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
            <p>Company ID: ${job.company_id}</p>
            <p>Location ID: ${job.location_id}</p>
            <p>Salary: ${job.wage}</p>
            <p>Type ID: ${job.job_type_id}</p>
            <p>Posted on: ${new Date(job.posting_date).toLocaleDateString()}</p>
          `;
          searchResults.appendChild(jobElement);
        });
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }
  
  function populateFilters() {
    fetch('/locations')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(locations => {
        console.log('Locations data:', locations);
        const locationFilter = document.getElementById('location-filter');
        locations.forEach(location => {
          const option = document.createElement('option');
          option.value = location._id;
          option.textContent = `${location.city}, ${location.state}, ${location.country}`;
          locationFilter.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching locations:', error));
  
    fetch('/jobtypes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jobTypes => {
        console.log('Job types data:', jobTypes);
        const jobTypeFilter = document.getElementById('job-type-filter');
        jobTypes.forEach(jobType => {
          const option = document.createElement('option');
          option.value = jobType._id;
          option.textContent = jobType.type;
          jobTypeFilter.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching job types:', error));
  }
  
