
// GRAPHIQUE CHART.JS /////////////////////////////////////////
// const ctx = document.getElementById('myChart');

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['France', 'Portugal', 'Italie', 'Belgique', 'Espagne'],
//       datasets: [{
//         label: '2020',
//         data: [12, 19, 3, 5, 2, 3],
//         borderWidth: 1
//       }]
//     },
//     options: {
//       scales: {
//         y: {
//           beginAtZero: true
//         }
//       }
//     }
//   });







// Créez un élément <div> pour contenir le graphique
const canvasWrapper = document.createElement('div');
canvasWrapper.id = 'wrapper-canvas';
const tableOne = document.getElementById('table1'); 
tableOne.parentNode.insertBefore(canvasWrapper, tableOne); 

// Créez un élément <canvas> à l'intérieur de la <div>
const canvas = document.createElement('canvas');
canvas.id = 'myChart';
canvasWrapper.appendChild(canvas);

// Extraction des années depuis la première ligne du tableau
const yearsElements = tableOne.querySelectorAll('tbody tr:nth-child(1) th');
const years = Array.from(yearsElements).slice(2).map(element => element.textContent.trim());

console.log(years);

// Extraction des noms de pays
const rows = tableOne.querySelectorAll('tbody tr');
const countries = [];
rows.forEach(row => {
  const countriesElements = row.querySelector('td');
  if (countriesElements) {
    countries.push(countriesElements.textContent.trim());
  }
});

console.log(countries);

// Extraction des données des pays (sauf la première cellule)
const dataCountries = [];
rows.forEach(row => {
  const cells = Array.from(row.querySelectorAll('td'));
  const rowData = cells.slice(1).map(cell => parseFloat(cell.textContent.trim())); // Convertir en nombre si nécessaire
  dataCountries.push(rowData);
});

console.log(dataCountries);

// const tableOne = document.getElementById('table1')
// const rows = tableOne.querySelectorAll('tbody tr')


