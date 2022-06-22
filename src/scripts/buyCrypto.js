// Fetch all the available coins
const loadCoinsData = () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur`;
    fetch(url)
        .then(data => data.json())
        .then(parsedData => {
            getAvailableCoins(parsedData);
            buyFormData(parsedData);
            $('#buy-btn').click(buyCrypto.bind(null, parsedData));
        })
        .catch(err => console.error(err));
}

// Populate select form with available coins
const getAvailableCoins = (data) => {
    const coinsSelect = $('#buy-coins-select');
    data.forEach(coin => {
        const option = document.createElement('option');
        option.innerHTML = coin.symbol.toUpperCase();
        coinsSelect.append(option);
    });
}

// Calculate coin amount
const buyFormData = (data) => {
    const totalInput = $('#total');
    const amountInput = $('#amount');
    const selectedCoin = $('#buy-coins-select option:selected').text().toLowerCase();
    const coinPrice = $('.buy');
    const buyButton = $('#buy-btn');
    const buyFormValidation = $('#buy-form-validation');
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
    if (amountInput.val() != '') {
        total = amountInput.val() / coinData.current_price;
        totalInput.val(`${total.toFixed(5)}`);
    }

    amountInput.keyup(() => {
        if (amountInput.val() > 50000 || amountInput.val() < 15) {
            buyFormValidation.text('The limit per transaction is between 15.00 - 50000.00 EUR. Please adjust the amount.')
            buyFormValidation.css('color', 'red');
            buyButton.attr('disabled', true);
            buyButton.css('backgroundColor', '#EAECEF');
        } else {
            buyFormValidation.text('')
            buyButton.removeAttr('disabled');
            buyButton.css('backgroundColor', '#00458B');
        }

        if (amountInput.val() === '') {
            buyFormValidation.text('')
            buyButton.removeAttr('disabled');
            buyButton.css('backgroundColor', '#00458B');
        }

        if (amountInput.val() >= 1) {
            total = amountInput.val() / coinData.current_price;
            totalInput.val(`${total.toFixed(5)}`);
        } else {
            totalInput.val('');
        }
    });
}

const buyCrypto = (data) => {
    const selectedCoin = $('#buy-coins-select option:selected').text().toLowerCase();
    const totalInput = $('#total');
    const amountInput = $('#amount');

    // Get the selected coin
    data.forEach(coin => {
        if (coin.symbol === selectedCoin) {
            coinData = coin;
        }
    });

    localStorage.setItem(coinData.id, JSON.stringify({
        id: coinData.id,
        symbol: coinData.symbol,
        image: coinData.image,
        estimatedValue: parseFloat(amountInput.val()),
        coinsRecieved: totalInput.val(),
        currentPrice: coinData.current_price
    }));
}

// Load Coin data and change on select option
$(() => {
    loadCoinsData();
    $('#buy-coins-select').change(loadCoinsData);
});
