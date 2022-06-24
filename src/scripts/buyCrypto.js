// Fetch all the available coins
const loadCoinsData = () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            getAvailableCoins(parsedData);
            buyFormData(parsedData);
        })
        .catch(err => console.error(err));
}

// Populate select form with available coins
const getAvailableCoins = (data) => {
    const coinsSelect = $('.buy-select');
    data.forEach(coin => {
        const option = document.createElement('option');
        option.innerHTML = coin.symbol.toUpperCase();
        coinsSelect.append(option);
    });
}

// Calculate coin amount
const buyFormData = (data) => {
    const buyInput = $('#buy-input');
    const recieveInput = $('#buy-form-recieve');
    const selectedCoin = $('.buy-select option:selected').text().toLowerCase();
    const coinPrice = $('#coin-price');
    const buyButton = $('#buy-btn');
    const buyFormValidation = $('#buy-validation');
    let total = 0;
    let coinData;

    // Get the selected coin
    data.forEach(coin => {
        if (coin.symbol === selectedCoin) {
            coinData = coin;
        }
    });

    // Calculate and print data to the form
    coinPrice.text(`1 ${coinData.symbol.toUpperCase()} ≈ ${formatCurrency(coinData.current_price)}`);
    if (buyInput.val() != '') {
        total = buyInput.val() / coinData.current_price;
        recieveInput.val(`${total.toFixed(5)}`);
    } else {
        buyButton.addClass('disabled');
    }

    buyInput.keyup(() => {
        if (buyInput.val() > 50000 || buyInput.val() < 15) {
            buyFormValidation.text('Limit per transaction is between 15.00 - 50000.00 EUR.')
            buyButton.addClass('disabled');
        } else {
            buyFormValidation.text('')
            buyButton.removeClass('disabled');
        }

        if (buyInput.val() >= 1) {
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

// Load Coin data and change on select option
$(() => {
    loadCoinsData();
    $('.buy-select').change(loadCoinsData);
});

$('#buy-btn').click(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            const selectedCoin = $('.buy-select option:selected').text().toLowerCase();
            const buyInput = $('#buy-input');
            const recieveInput = $('#buy-form-recieve');
            const walletCoins = getCoinsDb();
            let coinData;

            // Get the selected coin
            parsedData.forEach(coin => {
                if (coin.symbol === selectedCoin) {
                    coinData = coin;
                }
            });

            let coinExists = false;
            walletCoins.forEach(coin => {
                if (coin.symbol.toUpperCase() === coinData.symbol.toUpperCase()) {
                    coinExists = true;
                }
            });

            if (coinExists) {
                const coinToUpdate = JSON.parse(localStorage.getItem(coinData.id));
                coinToUpdate.estimatedValue = parseInt(coinToUpdate.estimatedValue) + parseInt(buyInput.val());
                coinToUpdate.coinsRecieved = parseFloat(coinToUpdate.coinsRecieved) + parseFloat(recieveInput.val());

                localStorage.setItem(coinData.id, JSON.stringify(coinToUpdate));
            } else {
                localStorage.setItem(coinData.id, JSON.stringify({
                    id: coinData.id,
                    symbol: coinData.symbol,
                    image: coinData.image,
                    estimatedValue: parseFloat(buyInput.val()),
                    coinsRecieved: recieveInput.val(),
                    currentPrice: coinData.current_price
                }));
            }
        })
        .catch(err => console.error(err));
});