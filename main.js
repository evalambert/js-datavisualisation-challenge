// // Créez un élément <div> + attribuer id 
// const canvasWrapper = document.createElement('div');
// canvasWrapper.id = 'wrapper-canvas'

// // Selectioner le tableau + Insérez la <div> avant le tableau
// const table = document.getElementById('table1')
// table.parentNode.insertBefore(canvasWrapper, table)

// // Créez un élément <canvas>  + Insérer à l'interieur de la <div>
// const canvas = document.createElement('canvas')
// canvas.id = 'myChart'
// canvasWrapper.appendChild(canvas)


// const ctx = document.getElementById('myChart');

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//       datasets: [{
//         label: '# of Votes',
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





// Récupérez le tableau
const tableau = document.getElementById("table1");

// Initialisez des tableaux vides pour les étiquettes et les données
const labels = [];
const data = [];

// Parcourez les lignes du tableau à partir de la deuxième ligne (index 1)
for (let i = 1; i < tableau.rows.length; i++) {
    const row = tableau.rows[i];
    const country = row.cells[1].textContent;
    const values = [];

    // Parcourez les cellules de données (à partir de la troisième cellule, index 2)
    for (let j = 2; j < row.cells.length; j++) {
        const value = parseFloat(row.cells[j].textContent.replace(",", ".")); // Convertissez la virgule en point pour les nombres
        values.push(value);
    }

    labels.push(country);
    data.push(values);
}

// Créez un tableau de jeux de données pour Chart.js
const datasets = data.map((values, index) => ({
    label: labels[index],
    data: values,
    backgroundColor: getRandomColor(), // Fonction pour générer une couleur aléatoire
}));

// Créez un graphique à barres
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: datasets,
    },
    options: {
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    },
});

// Fonction pour générer une couleur aléatoire
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


