

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TABLEAU 1  /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////
 // CRÉATION DIV + CANVAS //
///////////////////////////

// Création <div> #wrapper-canvas
const wrapperCanvas = document.createElement('div');
wrapperCanvas.id = 'wrapper-canvas';

// Insersion <div> #wrapper-canvas
const tableOne = document.getElementById('table1'); 
tableOne.parentNode.insertBefore(wrapperCanvas, tableOne); 

// Création <canvas>
const canvas = document.createElement('canvas');
canvas.id = 'myChart';
wrapperCanvas.appendChild(canvas);


  /////////////////////////////////
 // EXTRACTION DONNÉES TABLEAUX //
/////////////////////////////////


//Extraction YEARS
const thElement = tableOne.querySelectorAll('tbody tr:nth-child(1) th');
const years = Array.from(thElement).slice(2).map(element => element.textContent.trim());

console.log(years);


// Extraction COUNTRIES
const rows = tableOne.querySelectorAll('tbody tr');
const countries = [];

rows.forEach(row => {
  const countriesElements = row.querySelector('td');
  if (countriesElements) {
    countries.push(countriesElements.textContent.trim());
  }
});

console.log(countries);


// Extraction DATA-COUNTRIES
const dataCountries = [];

rows.forEach(row => {
  const cells = Array.from(row.querySelectorAll('td'));
  const rowData = cells.slice(1).map(cell => parseFloat(cell.textContent.trim())); 
  dataCountries.push(rowData);
});

dataCountries.shift(); 
console.log(dataCountries);




  /////////////////////////////////
 // GRAPHIQUE CHART.JS////////////
/////////////////////////////////


const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: years,
      datasets: countries.map((country, index) => {
        return {
            label: country, 
            data: dataCountries[index],
        };
      }), 
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });




