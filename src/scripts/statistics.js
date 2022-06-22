// Fill out statistics select with available coins in wallet
const walletCoinsSelect = $('#available-coins-select');
for (const key in localStorage) {
    // Skip built-in properties like length, setItem, etc.
    if (localStorage.hasOwnProperty(key)) {
        const newOption = $('<option></option>');
        newOption.html(capitalizeWord(key));
        walletCoinsSelect.append(newOption);
    }
}

// Fetch data from coingecko api
const loadStatisticsData = () => {
    // Ova treba da se sredi dinamicki za 1h, 24h, 1w, 1m i 1y
    const currentTime = Math.floor(Date.now() / 1000);
    const yesterdayTime = Math.floor(Date.now() / 1000) - 86400;
    const coinid = $('#available-coins-select option:selected').text().toLowerCase();

    if (coinid == '') {
        return;
    }

    const url1 = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=eur&from=${yesterdayTime}&to=${currentTime}`;
    const url2 = `https://api.coingecko.com/api/v3/coins/${coinid}?market_data=true`;

    fetch(url1)
        .then(data => data.json())
        .then(parsedData => {
            createGraph(parsedData, coinid);
        })
        .catch(err => console.error(err));

    fetch(url2)
        .then(data => data.json())
        .then(parsedData => {
            printCoinStatistics(parsedData);
        })
        .catch(err => console.error(err));
}

// Setting graph chart with Chart.js using data from coingecko api
const createGraph = (data, coinName) => {
    const btcCanvas = $("#btcCanvas")[0].getContext('2d');
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
    data.prices.forEach(element => btcPrices.push(element));
    let dataLabels = [];
    for (let i = 0; i < btcPrices.length; i++) {
        dataLabels.push('');
    }

    // Chart.js stuff
    const btcData = {
        labels: dataLabels,
        datasets: [{
            label: capitalizeWord(coinName),
            borderWidth: 1.5,
            backgroundColor: 'rgb(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.4,
            fill: true,
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
                    radius: 0
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
    $('#current-price').html(`${formatCurrency(data.market_data.current_price.eur)}`);

    let priceChange = data.market_data.price_change_percentage_24h
    $('#price-change').html(`${priceChange}%`);

    // Change price color depending on 24h change in percentage
    if (priceChange < 0) {
        $('#price-change').css("color", "red");
    } else {
        $('#price-change').css("color", "green");
    }

    $('#price-high').html(`${formatCurrency(data.market_data.high_24h.eur)}`);
    $('#price-low').html(`${formatCurrency(data.market_data.low_24h.eur)}`);
}

// Load Coin data and change on select option
$(() => {
    loadStatisticsData();
    $('#available-coins-select').change(loadStatisticsData);
});