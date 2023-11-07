
window.onload = function() {
    // Création d'un tableau pour stocker les données du graphique
    var dataPoints = [];
    var chart; // Variable pour stocker le graphique

    // Étape 1 : Obtention des données initiales depuis une source JSON externe
    $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=10&length=10&type=json", function(data) {  
        // Extraction des données JSON et création des dataPoints
        $.each(data, function(key, value){
            dataPoints.push({x: value[0], y: parseInt(value[1])});
        });

        // Création du graphique initial avec les données initiales
        chart = new CanvasJS.Chart("chartContainer", {
            title: {
                text: "Graphique en temps réel avec des dataPoints depuis une source JSON externe"
            },
            data: [{
                type: "line",
                dataPoints: dataPoints,
            }]
        });

        // Rendu du graphique initial
        chart.render();

        // Appel de la fonction pour mettre à jour le graphique périodiquement
        updateChart();
    });

    // Étape 2 : Mise à jour périodique du graphique
    function updateChart() {
        // Requête AJAX pour obtenir de nouvelles données depuis l'URL
        $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dataPoints.length + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json", function(data) {
            // Extraction des nouvelles données et ajout aux dataPoints
            $.each(data, function(key, value) {
                dataPoints.push({
                    x: parseInt(value[0]),
                    y: parseInt(value[1])
                });
            });

            // Mise à jour du graphique
            chart.render();

            // Planification de la prochaine mise à jour après 1 seconde
            setTimeout(function() {
                updateChart();
            }, 1000);
        });
    }
}
