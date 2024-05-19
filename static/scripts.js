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
    //const locationOption = document.getElementById('option');
    const jobType = document.getElementById('job-type-filter').value;
    //const location = 'Waterloo';
  
    console.log(`Applying filters: Location=${location}, JobType=${jobType}`);
  
    fetch(`/JobDB?Locations=${location}&JobTypes=${jobType}`)
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
          jobElement.className = 'Jobs';
          jobElement.innerHTML = `
            <h3>${Job.title}</h3>
            <p>Company ID: ${Job.company_id}</p>
            <p>Location ID: ${Job.location_id}</p>
            <p>Salary: ${Job.wage}</p>
            <p>Type ID: ${Job.job_type_id}</p>
            <p>Posted on: ${new Date(Job.posting_date).toLocaleDateString()}</p>
          `;
          searchResults.appendChild(jobElement);
        });
      })
      .catch(error => console.error('Error fetching jobs:', error));
  }
  
  function populateFilters() {
    fetch('http://127.0.0.1:5000/Locations')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(Locations => {
        console.log('Locations data:', Locations);
        const locationFilter = document.getElementById('location-filter');
        Locations.forEach(location => {
          const option = document.createElement('option');
          option.value = Locations._id;
          option.textContent = `${JobDB.Locations.city}, ${JobDB.Locations.state}, ${JobDB.Locations.country}`;
          locationFilter.appendChild(option.value);
        });
      })
      .catch(error => console.error('Error fetching locations:', error));
  
    fetch('/JobTypes')
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
          option.value = JobTypes._id;
          option.textContent = JobTypes.type;
          jobTypeFilter.appendChild(option);
        });
      })
      .catch(error => console.error('Error fetching job types:', error));
  }
  
