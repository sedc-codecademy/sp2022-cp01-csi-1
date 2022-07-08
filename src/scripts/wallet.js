//#region Wallet section
// Get price for bitcoin
const fetchBtcValue = () => {
    fetch('https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true')
        .then(data => data.json())
        .then(parsedData => populateAssetsTable(parsedData))
        .catch(err => console.error(err));
}

// Get and print coin data for your wallet
const populateAssetsTable = (btc) => {
    const coinsTable = $('.assets-table tbody').empty();
    const btcPrice = btc.market_data.current_price.usd;
    const btcCanvas = $("#simulator-chart")[0].getContext('2d');
    const coinsDb = JSON.parse(localStorage.getItem('coinsDb')) || [];
    let walletEstimatedValue = 0;
    let walletBalance = 0;
    let row = "";

    // Check if there are any elements inside the array, if not return
    if (coinsDb.length === 0) {
        if (Chart.getChart(btcCanvas) != undefined) {
            Chart.getChart(btcCanvas).destroy();
        }
        coinsTable.append(row);
        $('.wallet-balance').html('0');
        $('.current-price').html('');
        $('.price-change').html('');
        $('.24-high').html('');
        $('.24-low').html('');
        $('.coin-rank').html('');
        $('.market-cap').html('');
        return;
    }

    // Sort coins by estimated value
    const sortedCoins = numberSort(coinsDb);

    // Print coin data inside wallet table
    sortedCoins.forEach(coin => {
        row = `<tr>
                    <td><img src=${coin.image} style="width="40px"; height="40px";"/></td>
                    <td>
                        <div class="wrap">
                            <span class="wallet-coin-id">${capitalizeWord(coin.id)}</span>
                            <p class="wallet-coin-symbol text-secondary" style="font-size: 0.8rem;"><span>${coin.symbol.toUpperCase()}</span></p>
                        </div>
                    </td>
                    <td>
                        <div class="wrap">
                            <span class="wallet-coin-amount">${coin.coinsRecieved}</span>
                            <p class="wallet-coin-money text-secondary" style="font-size: 0.8rem;"><span>${formatCurrency(coin.estimatedValue)}</span></p>
                        </div>
                    </td>
                    <td>
                        <button type="button" class="btn btn-primary sell-popup-btns simulator-btns" data-bs-toggle="modal"
                        data-bs-target="#staticSellModal" style="width: 55px;">
                            Sell
                        </button>
                    </td>
                </tr>`
        coinsTable.append(row);
    });

    // Calculate and print wallet estimated value
    for (let i = 0; i < sortedCoins.length; i++) {
        walletEstimatedValue += sortedCoins[i].currentPrice * sortedCoins[i].coinsRecieved;
    }
    walletBalance = walletEstimatedValue / btcPrice;
    // Calcualte and print wallet account balance
    $('.wallet-balance').html(`<p style="font-size: 1.6rem;">${walletBalance.toFixed(5)} <span class="text-secondary" style="font-size: 1rem; font-weight: 600">BTC</span> ≈ ${formatCurrency(walletEstimatedValue)}</p>`);
}

fetchBtcValue();
//#endregion

//#region Statistics section
// Fill out statistics select with available coins in wallet
const populateStatisticsSelect = () => {
    const statisticsSelect = $('.statistics-select').empty();
    const coinsDb = JSON.parse(localStorage.getItem('coinsDb')) || [];

    coinsDb.forEach(coin => {
        const newOption = $('<option></option>');
        newOption.html(capitalizeWord(coin.id));
        statisticsSelect.append(newOption);
    });
}
populateStatisticsSelect();

// Fetch data from coingecko api
const loadStatisticsData = () => {
    const coinid = $('.statistics-select option:selected').text().toLowerCase();

    if (coinid == '') {
        return;
    }

    const url1 = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=usd&from=${time.oneDay}&to=${time.currentTime}`;
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
    const btcCanvas = $("#simulator-chart")[0].getContext('2d');
    // Chart needs to be destroyed to present a new one
    let chartStatus = Chart.getChart(btcCanvas);
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }

    // Global options for Chart.js
    Chart.defaults.font.family = 'Nunito';

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
            backgroundColor: 'rgb(27, 77, 137, 0.4)',
            borderColor: '#1b4d89',
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
                },
                legend: {
                    display: false
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
    $('.coin-rank').html(data.coingecko_rank);
    $('.market-cap').html(data.market_data.market_cap.usd);
}

// Set click events on all time links
const timeDates = [
    time.fifteenMinutes,
    time.oneHour,
    time.oneDay,
    time.oneWeek,
    time.oneMonth,
    time.oneYear
];
const timeLinks = $('.time-links');
for (let i = 0; i < timeLinks.length; i++) {
    timeLinks[i].onclick = () => {
        timeLinks.removeClass('active');
        $(timeLinks[i]).addClass('active');
        let coinid = $('.statistics-select option:selected').text().toLowerCase();
        const url = `https://api.coingecko.com/api/v3/coins/${coinid}/market_chart/range?vs_currency=eur&from=${timeDates[i]}&to=${time.currentTime}`;
        fetch(url)
            .then(data => data.json())
            .then(parsedData => {
                createGraph(parsedData, coinid);
            })
            .catch(err => console.error(err))
    }
}

// Load statistics data and change on select option
loadStatisticsData();
$('.statistics-select').change(loadStatisticsData);
//#endregion

//#region Buy section
const populateBuyFormSelect = () => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur')
        .then(data => data.json())
        .then(parsedData => {
            const buySelect = $('.buy-select');
            // Populate select with all the coins
            parsedData.forEach(coin => {
                const option = document.createElement('option');
                option.innerHTML = coin.symbol.toUpperCase();
                buySelect.append(option);
            });
        })
        .catch(err => console.error(err))
}
populateBuyFormSelect();

const buyFormData = () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            buyForm(parsedData);
        })
        .catch(err => console.error(err));
}

const buyForm = (data) => {
    const buyInput = $('#buy-input');
    const recieveInput = $('#buy-form-recieve');
    const coinPrice = $('#coin-price');
    const buyButton = $('#buy-btn');
    const buyFormValidation = $('#buy-validation');
    let total = 0;
    let coinData;

    // Get the selected coin
    // Nekogas ne go deketira selectot, ne znam zasto
    const selectedCoin = $('.buy-select option:selected').text().toLowerCase();
    if (selectedCoin === '') {
        console.log(selectedCoin);
        console.error('Data didnt load properly line 267');
        return;
    }

    data.forEach(coin => {
        if (coin.symbol === selectedCoin) {
            coinData = coin;
        }
    });

    // Calculate and print data to the form
    coinPrice.text(`1 ${coinData.symbol.toUpperCase()} ≈ ${formatCurrency(coinData.current_price)}`);
    if (buyInput.val() != '') {
        total = Number(buyInput.val()) / coinData.current_price;
        recieveInput.val(`${total.toFixed(5)}`);
    } else {
        buyButton.addClass('disabled');
    }

    buyInput.keyup(() => {
        if (Number(buyInput.val()) > 50000 || Number(buyInput.val()) < 15) {
            buyFormValidation.text('Limit per transaction is between 15.00 - 50000.00 EUR.')
            buyButton.addClass('disabled');
        } else {
            buyFormValidation.text('')
            buyButton.removeClass('disabled');
        }

        if (Number(buyInput.val()) >= 15) {
            total = buyInput.val() / coinData.current_price;
            recieveInput.val(`${total.toFixed(5)}`);
        } else {
            recieveInput.val('');
        }

        if (buyInput.val() === '') {
            buyFormValidation.text('');
            buyButton.addClass('disabled');
        }
    });
}

buyFormData();
$('.buy-select').change(buyFormData);

// Add coin in wallet on button click
$('#buy-btn').click(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            const selectedCoin = $('.buy-select option:selected').text().toLowerCase();
            const buyInput = $('#buy-input');
            const recieveInput = $('#buy-form-recieve');
            const coinsDb = JSON.parse(localStorage.getItem('coinsDb')) || [];
            let coinData;
            let existingCoin;

            // Get the selected coin
            parsedData.forEach(coin => {
                if (coin.symbol === selectedCoin) {
                    coinData = coin;
                }
            });

            let coinExists = false;
            coinsDb.forEach(coin => {
                if (coin.symbol.toUpperCase() === coinData.symbol.toUpperCase()) {
                    coinExists = true;
                    existingCoin = coin;
                }
            });

            if (coinExists) {
                existingCoin.coinsRecieved = existingCoin.coinsRecieved + Number(recieveInput.val());
                existingCoin.estimatedValue = existingCoin.estimatedValue + Number(buyInput.val());
                const coinToRemove = coinsDb.findIndex((obj => obj.id === existingCoin.id));
                coinsDb[coinToRemove] = existingCoin;
                localStorage.setItem('coinsDb', JSON.stringify(coinsDb));
            } else {
                let newCoin = {
                    id: coinData.id,
                    symbol: coinData.symbol,
                    image: coinData.image,
                    estimatedValue: Number(buyInput.val()),
                    coinsRecieved: Number(recieveInput.val()),
                    currentPrice: coinData.current_price
                };
                coinsDb.push(newCoin);
                localStorage.setItem('coinsDb', JSON.stringify(coinsDb));
            }

            buyInput.val('');
            recieveInput.val('');

            fetchBtcValue();
            populateStatisticsSelect();
            loadStatisticsData();
            populateSellFormSelect();
            sellFormData();
        })
        .catch(err => console.error(err));


    return false;
});
//#endregion

//#region Sell section
const populateSellFormSelect = () => {
    const sellbuySelect = $('#sell-select').empty();
    const coinsDb = JSON.parse(localStorage.getItem('coinsDb')) || [];

    // Populate select with wallet coins
    coinsDb.forEach(coin => {
        const option = $('<option></option>');
        option.html(coin.symbol.toUpperCase());
        sellbuySelect.append(option);
    });
}
populateSellFormSelect();

const sellFormData = () => {
    const sellInput = $('#sell-input');
    const recieveInput = $('#sell-form-recieve');
    const sellButton = $('#sell-btn');
    const sellFormValidation = $('#sell-validation');
    const coinsDb = JSON.parse(localStorage.getItem('coinsDb')) || [];
    let total = 0;
    let coinData;

    if (coinsDb.length === 0) {
        sellButton.addClass('disabled');
    } else {
        sellButton.removeClass('disabled');
    }

    // Get the selected coin
    const selectedCoin = $('#sell-select option:selected').text().toLowerCase();

    if (selectedCoin === '') {
        return;
    }

    coinsDb.forEach(coin => {
        if (coin.symbol === selectedCoin) {
            coinData = coin;
        }
    });

    sellInput.val('');
    recieveInput.val('');
    sellButton.addClass('disabled');

    sellInput.keyup(() => {
        if (Number(sellInput.val()) > coinData.coinsRecieved || Number(sellInput.val()) < 0) {
            sellFormValidation.text('Insufficient amount in account');
            sellButton.addClass('disabled');
        } else if (sellInput.val() === '') {
            sellFormValidation.text('');
            sellButton.addClass('disabled');
        } else {
            sellFormValidation.text('')
            sellButton.removeClass('disabled');
        }

        if (!(sellInput.val() === '')) {
            total = coinData.currentPrice * Number(sellInput.val());
            recieveInput.val(`${total.toFixed(5)}`);
        } else {
            recieveInput.val('');
        }
    });
}

// Sell crypto
$('#sell-btn').click(() => {
    const selectedCoin = $('#sell-select option:selected').text().toUpperCase();
    const sellInput = $('#sell-input');
    let coinsDb = JSON.parse(localStorage.getItem('coinsDb')) || [];

    coinsDb.forEach(coin => {
        if (coin.symbol.toUpperCase() === selectedCoin) {
            if (coin.coinsRecieved === Number(sellInput.val())) {
                const coinIndex = coinsDb.findIndex(el => el.id === coin.id);
                coinsDb.splice(coinIndex, 1);
                localStorage.setItem('coinsDb', JSON.stringify(coinsDb));
            } else {
                coin.coinsRecieved = (coin.coinsRecieved - Number(sellInput.val())).toFixed(5);
                coin.estimatedValue = coin.coinsRecieved * coin.currentPrice;
                const coinToModify = coinsDb.findIndex((obj => obj.id == coin.id));
                coinsDb[coinToModify] = coin;
                localStorage.setItem('coinsDb', JSON.stringify(coinsDb));
            }
        }
    });

    fetchBtcValue();
    populateSellFormSelect();
    populateStatisticsSelect();
    loadStatisticsData();
    sellFormData();

    return false;
});

// Load Coin data and change on select option
sellFormData();
$('#sell-select').change(sellFormData);
//#endregion

//#region Menu buttons
$('#s2').hide();

$(document).on('click', '#exchange-btn', function () {
    $('#s1').hide();
    $('#s2').show();
});
$(document).on('click', '#dashboard-btn', function () {
    $('#s1').show();
    $('#s2').hide();
});
//#endregion