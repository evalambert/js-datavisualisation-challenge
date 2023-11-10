

///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TABLEAU 1  /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////
 // CRÉATION DIV + CANVAS //
///////////////////////////

// Création <DIV> #WRAPPER-CANVAS-ONE
const wrapperCanvasOne = document.createElement('div')
wrapperCanvasOne.id = 'wrapper-canvas-one'

// Insersion <DIV> #WRAPPER-CANVAS-ONE
const tableOne = document.getElementById('table1') 
tableOne.parentNode.insertBefore(wrapperCanvasOne, tableOne)

// Création + Insersion <CANVAS> #myChart-one
const canvasOne = document.createElement('canvas')
canvasOne.id = 'myChart-1'
wrapperCanvasOne.appendChild(canvasOne)


  /////////////////////////////////
 // EXTRACTION DONNÉES TABLEAUX //
/////////////////////////////////


//Extraction YEARS
const thElement = tableOne.querySelectorAll('tbody tr:nth-child(1) th')
const years = Array.from(thElement).slice(2).map(element => element.textContent.trim())

console.log(years)


// Extraction COUNTRIES
const rows = tableOne.querySelectorAll('tbody tr')
const countries = []

rows.forEach(row => {
  const countriesElements = row.querySelector('td')
  if (countriesElements) {
    countries.push(countriesElements.textContent.trim())
  }
})

console.log(countries)


// Extraction DATA-COUNTRIES
const dataCountries = []

rows.forEach(row => {
  const cells = Array.from(row.querySelectorAll('td'))
  const rowData = cells.slice(1).map(cell => parseFloat(cell.textContent.trim())) 
  dataCountries.push(rowData)
})

dataCountries.shift() 
console.log(dataCountries)




  /////////////////////////////////
 // GRAPHIQUE#1 CHART.JS /////////
/////////////////////////////////


const ctxOne = document.getElementById('myChart-1').getContext('2d')

  new Chart(ctxOne, {
    type: 'scatter',
    data: {
      labels: years,
      datasets: countries.map((country, index) => {
        return {
            label: country, 
            data: dataCountries[index],
        }
      }), 
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })



///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TABLEAU 2  /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////
 // CRÉATION DIV + CANVAS //
///////////////////////////


// Création <DIV> #WRAPPER-CANVAS-TWO
const wrapperCanvasTwo = document.createElement('div')
wrapperCanvasTwo.id = 'wrapper-canvas-two'

// Insersion <DIV> #WRAPPER-CANVAS-TWO
const tableTwo = document.getElementById('table2') 
tableTwo.parentNode.insertBefore(wrapperCanvasTwo, tableTwo) 

// Création + Insersion <CANVAS> #myChart-2
const canvasTwo = document.createElement('canvas')
canvasTwo.id = 'myChart-2'
wrapperCanvasTwo.appendChild(canvasTwo)


  ///////////////////////////////////
 // EXTRACTION DONNÉES TABLEAUX_2 //
///////////////////////////////////


let countriesTwo = []
let yearsTwo = []
let dataCountriesTwo =[]

const thElementTwo = table2.rows[0]
for (let i = 2; i < thElementTwo.cells.length; i++) {
    yearsTwo.push(thElementTwo.cells[i].textContent)
}

for (let j = 1; j < table2.rows.length; j++) {
    const row = table2.rows[j]
    countriesTwo.push(row.cells[1].textContent)

    const rowData = []
    for (let k = 2; k < row.cells.length; k++) {
        rowData.push(parseFloat(row.cells[k].textContent.replace(",", ".")))
    }
    dataCountriesTwo.push(rowData)
}


  /////////////////////////////////
 // GRAPHIQUE_2 CHART.JS /////////
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
})



///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// TABLEAU 3  /////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// Attendre que le document soit complètement chargé avant d'exécuter le code 
document.addEventListener('DOMContentLoaded', function() {
  
  // Création d'un tableau vide pour stocker les données du graphique
  var dataPoints = [];
  var chart; // Variable pour stocker l'instance du graphique



    /////////////////////////////
   // CRÉATION DIV + CANVAS_3 //
  /////////////////////////////


  // Création <DIV> #WRAPPER-CANVAS-THREE
  const wrapperCanvasThree = document.createElement('div');
  wrapperCanvasThree.id = 'wrapper-canvas-three';

  // Insersion <DIV> #WRAPPER-CANVAS-THREE
  const h1Element = document.getElementById('firstHeading');
  h1Element.parentNode.insertBefore(wrapperCanvasThree, h1Element);

  // Création + Insersion <CANVAS> #myChart-3
  const canvasThree = document.createElement('canvas');
  canvasThree.id = 'myChart-3';
  wrapperCanvasThree.appendChild(canvasThree);



     ///////////////////////////
    // FETCH //////////////////
   // EXTRACTION DONNÉES_3 ///
  ///////////////////////////


  // Étape 1 : Obtention des données initiales depuis une source JSON externe
  fetch("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json")
      .then(response => response.json())
      .then(data => {
          // Extraction des données JSON et création des dataPoints
          data.forEach(function(value) {
              dataPoints.push({ x: value[0], y: parseInt(value[1]) });
          });



            /////////////////////////////////
           // GRAPHIQUE_3 CHART.JS /////////
          /////////////////////////////////


          // Création du graphique initial avec les données initiales
          chart = new Chart(document.getElementById("myChart-3"), {
              type: 'line',
              data: {
                  datasets: [{
                      label: 'Données en temps réel',
                      data: dataPoints,
                      borderColor: 'blue',
                      fill: false
                  }]
              },
              options: {
                  scales: {
                      x: {
                          type: 'linear',
                          position: 'bottom'
                      },
                      y: {
                          beginAtZero: true
                      }
                  }
              }
          });

          // Appel de la fonction pour mettre à jour le graphique périodiquement
          updateChart();
      });



     ////////////////////////////
    // UPDATE //////////////////
   // MISE-À-JOUR DONNÉES /////
  ////////////////////////////


  function updateChart() {
      // Nouvelle requête fetch pour obtenir de nouvelles données depuis l'URL
      fetch("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + dataPoints[dataPoints.length - 1].y + "&length=1&type=json")
          .then(response => response.json())
          .then(data => {
              // Extraction des nouvelles données et ajout aux dataPoints
              data.forEach(function(value) {
                  dataPoints.push({ x: parseInt(value[0]), y: parseInt(value[1]) });
              });

              // Mise à jour du graphique
              chart.update();

              // Planification de la prochaine mise à jour après 1 seconde
              setTimeout(updateChart, 1000);
          });
  }

});
