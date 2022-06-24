// Fill out statistics select with available coins in wallet
const walletCoinsSelect = $('.statistics-select');
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
    let coinid = $('.statistics-select option:selected').text().toLowerCase();

    if (coinid == '') {
        return;
    }

    const url1 = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=eur&from=${time.oneDay}&to=${currentTime}`;
    const url2 = `https://api.coingecko.com/api/v3/coins/${coinid}?market_data=true`;

    fetch(url1)
        .then(data => data.json())
        .then(parsedData => {
            createGraph(parsedData, coinid);
            // changeTimeInterval(url1, coinid);
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
    const btcCanvas = $("#chart")[0].getContext('2d');
    // Chart needs to be destroyed to present a new one
    let chartStatus = Chart.getChart(btcCanvas);
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    // Global options for Chart.js
    Chart.defaults.font.family = 'Lato';
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
            backgroundColor: 'rgb(14,110,253, 0.2)',
            borderColor: 'rgb(14,110,253)',
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
    $('.current-price').html(`${formatCurrency(data.market_data.current_price.eur)}`);

    let priceChange = data.market_data.price_change_percentage_24h
    $('.price-change').html(`${priceChange}%`);

    // Change price color depending on 24h change in percentage
    if (priceChange < 0) {
        $('.price-change').css("color", "red");
    } else {
        $('.price-change').css("color", "green");
    }

    $('.24-high').html(`${formatCurrency(data.market_data.high_24h.eur)}`);
    $('.24-low').html(`${formatCurrency(data.market_data.low_24h.eur)}`);
}

const changeTimeInterval = () => {

}

$('.fifteenMinutes').click(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    let coinid = $('.statistics-select option:selected').text().toLowerCase();
    const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=eur&from=${time.fifteenMinutes}&to=${currentTime}`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            createGraph(parsedData, coinid);
        })
        .catch(err => console.error(err))
});

$('.oneHour').click(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    let coinid = $('.statistics-select option:selected').text().toLowerCase();
    const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=eur&from=${time.oneHour}&to=${currentTime}`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            createGraph(parsedData, coinid);
        })
        .catch(err => console.error(err))
});

$('.oneDay').click(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    let coinid = $('.statistics-select option:selected').text().toLowerCase();
    const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=eur&from=${time.oneDay}&to=${currentTime}`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            createGraph(parsedData, coinid);
        })
        .catch(err => console.error(err))
});

$('.oneWeek').click(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    let coinid = $('.statistics-select option:selected').text().toLowerCase();
    const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=eur&from=${time.oneWeek}&to=${currentTime}`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            createGraph(parsedData, coinid);
        })
        .catch(err => console.error(err))
});

$('.oneMonth').click(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    let coinid = $('.statistics-select option:selected').text().toLowerCase();
    const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=eur&from=${time.oneMonth}&to=${currentTime}`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            createGraph(parsedData, coinid);
        })
        .catch(err => console.error(err))
});

$('.oneYear').click(() => {
    const currentTime = Math.floor(Date.now() / 1000);
    let coinid = $('.statistics-select option:selected').text().toLowerCase();
    const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=eur&from=${time.oneYear}&to=${currentTime}`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            createGraph(parsedData, coinid);
        })
        .catch(err => console.error(err))
});

// Load Coin data and change on select option
$(() => {
    loadStatisticsData();
    $('.statistics-select').change(loadStatisticsData);
});