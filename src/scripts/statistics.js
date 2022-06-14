// Fill out statistics select with available coins in wallet
const coinsForm = document.querySelector('#available-coins-select');
for (const key in localStorage) {
    // Skip built-in properties like length, setItem, etc.
    if (localStorage.hasOwnProperty(key)) {
        const newOption = document.createElement('option');
        newOption.textContent = key;
        coinsForm.append(newOption);
    }
}

// Load Coin data and change on select option
$(() => {
    loadGraphData();
    $('#available-coins-select').change(loadGraphData);
});

// Fetch data from coingecko api
const loadGraphData = () => {
    const coinid = $('#available-coins-select option:selected').text().toLowerCase();
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${coinid}&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`;
    fetch(url, {
        Accept: 'application/json',
        method: 'GET',
    })
        .then(data => data.json())
        .then(parsedData => {
            createGraph(parsedData);
            printCoinStatistics(parsedData[0]);
        })
        .catch(err => console.error(err));
}

// Setting graph chart with Chart.js using data from coingecko api
const createGraph = (data) => {
    const btcCanvas = document.getElementById('btcCanvas').getContext('2d');

    // Chart needs to be destroyed to present a new one
    let chartStatus = Chart.getChart(btcCanvas);
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    // Global options for Chart.js
    Chart.defaults.font.family = 'Nunito';
    Chart.defaults.borderColor = 'rgba(70, 70, 70, 0.5)';

    // Get coin exchanges from last 7 days (100 entries)
    let btcPrices = [];
    data[0].sparkline_in_7d.price.forEach(element => btcPrices.push(element));
    let dataLabels = [];
    for (let i = 0; i < btcPrices.length; i++) {
        dataLabels.push('');
    }

    // Chart.js stuff
    const btcData = {
        labels: dataLabels,
        datasets: [{
            label: data[0].symbol.toUpperCase(),
            borderWidth: 1.5,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: btcPrices,
        }]
    };

    const btcConfig = {
        type: 'line',
        data: btcData,
        options: {
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            elements: {
                point: {
                    radius: 1.5
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        },
    };

    new Chart(
        btcCanvas,
        btcConfig
    );
}

// Print coin statistics in table below the graph chart
const printCoinStatistics = (data) => {
    document.getElementById('current-price').innerHTML = `${formatCurrency(data.current_price)}`;

    let priceChange = data.price_change_percentage_24h
    document.getElementById('price-change').innerHTML = `${priceChange}%`;

    // Change price color depending on 24h change in percentage
    if (priceChange < 0) {
        document.getElementById('price-change').style.color = 'red'
    } else {
        document.getElementById('price-change').style.color = 'green'
    }

    document.getElementById('price-high').innerHTML = `${formatCurrency(data.high_24h)}`;
    document.getElementById('price-low').innerHTML = `${formatCurrency(data.low_24h)}`;
}