const slider = document.getElementById('salary-range-filter');
const output = document.getElementById('salary-range-value');

slider.addEventListener('input', function(){
    output.textContent = `${slider.value}`;
});

function applyFilters(){
    console.log(`Applying filters with salary range: ${slider.value} - 200000`);
}

