

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TABLEAU 1  /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////
 // CRÉATION DIV + CANVAS //
///////////////////////////

// Création <DIV> #WRAPPER-CANVAS-ONE
const wrapperCanvasOne = document.createElement('div');
wrapperCanvasOne.id = 'wrapper-canvas-one';

// Insersion <DIV> #WRAPPER-CANVAS-ONE
const tableOne = document.getElementById('table1'); 
tableOne.parentNode.insertBefore(wrapperCanvasOne, tableOne); 

// Création <CANVAS>
const canvasOne = document.createElement('canvas');
canvasOne.id = 'myChart';
wrapperCanvasOne.appendChild(canvasOne);


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
 // GRAPHIQUE#1 CHART.JS /////////
/////////////////////////////////


const ctxOne = document.getElementById('myChart').getContext('2d')

  new Chart(ctxOne, {
    type: 'scatter',
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



///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TABLEAU 2  /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////
 // CRÉATION DIV + CANVAS //
///////////////////////////


// Création <DIV> #WRAPPER-CANVAS-TWO
const wrapperCanvasTwo = document.createElement('div');
wrapperCanvasTwo.id = 'wrapper-canvas-two';

// Insersion <DIV> #WRAPPER-CANVAS-TWO
const tableTwo = document.getElementById('table2'); 
tableTwo.parentNode.insertBefore(wrapperCanvasTwo, tableTwo); 

// Création <CANVAS>
const canvasTwo = document.createElement('canvas');
canvasTwo.id = 'myChart-2';
wrapperCanvasTwo.appendChild(canvasTwo);


  /////////////////////////////////
 // EXTRACTION DONNÉES TABLEAUX //
/////////////////////////////////


let countriesTwo = [];
let yearsTwo = [];
let dataCountriesTwo =[];

const thElementTwo = table2.rows[0];
for (let i = 2; i < thElementTwo.cells.length; i++) {
    yearsTwo.push(thElementTwo.cells[i].textContent);
}

for (let j = 1; j < table2.rows.length; j++) {
    const row = table2.rows[j];
    countriesTwo.push(row.cells[1].textContent);

    const rowData = [];
    for (let k = 2; k < row.cells.length; k++) {
        rowData.push(parseFloat(row.cells[k].textContent.replace(",", ".")));
    }
    dataCountriesTwo.push(rowData);
}


  /////////////////////////////////
 // GRAPHIQUE#1 CHART.JS /////////
/////////////////////////////////


const ctxTwo = document.getElementById('myChart-2').getContext('2d')

new Chart(ctxTwo, {
  type: 'bar',
  data: {
      labels: countriesTwo,
      datasets: yearsTwo.map((year, index) => ({
          label: year,
          data: dataCountriesTwo.map(row => row[index]),
          borderWidth: 1
      }))
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});

