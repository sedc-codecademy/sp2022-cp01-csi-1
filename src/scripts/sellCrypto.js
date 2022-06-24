const coinsInWallet = getCoinsDb();
const sellCoinsSelect = $('#sell-select');

coinsInWallet.forEach(coin => {
    const option = $('<option></option>');
    option.html(coin.symbol.toUpperCase());
    sellCoinsSelect.append(option);
});

const sellFormData = () => {
    const selectedCoin = $('#sell-select option:selected').text().toLowerCase();
    const sellInput = $('#sell-input');
    const recieveInput = $('#sell-form-recieve');
    const sellButton = $('#sell-btn');
    const sellFormValidation = $('#sell-validation');
    let total = 0;
    let coinData;

    if (coinsInWallet.length === 0) {
        sellButton.addClass('disabled');
    } else {
        sellButton.removeClass('disabled');
    }

    // Get the selected coin
    coinsInWallet.forEach(coin => {
        if (coin.symbol === selectedCoin) {
            coinData = coin;
        }
    });

    sellInput.val('');
    recieveInput.val('');
    sellButton.addClass('disabled');

    sellInput.keyup(() => {
        if (sellInput.val() > coinData.coinsRecieved || sellInput.val() < 0) {
            sellFormValidation.text('Insufficient amount in account')
            sellButton.addClass('disabled');
        } else if (sellInput.val() === '') {
            sellFormValidation.text('');
            sellButton.addClass('disabled');
        } else {
            sellFormValidation.text('')
            sellButton.removeClass('disabled');
        }

        total = coinData.currentPrice * sellInput.val();
        console.log(coinData.estimatedValue);
        recieveInput.val(`${total.toFixed(5)}`);
    });
}

// Sell crypto
$('#sell-btn').click(() => {
    const selectedCoin = $('#sell-select option:selected').text().toUpperCase();
    const sellInput = $('#sell-input');

    coinsInWallet.forEach(coin => {
        if (coin.symbol.toUpperCase() === selectedCoin) {
            if (coin.coinsRecieved === sellInput.val()) {
                localStorage.removeItem(coin.id);
            } else {
                const coinToUpdate = JSON.parse(localStorage.getItem(coin.id));
                coinToUpdate.coinsRecieved = (coinToUpdate.coinsRecieved - sellInput.val()).toFixed(5);
                coinToUpdate.estimatedValue = coinToUpdate.coinsRecieved * coinToUpdate.currentPrice;
                localStorage.setItem(coin.id, JSON.stringify(coinToUpdate));
            }
        }
    });
});

// Load Coin data and change on select option
$(() => {
    sellFormData();
    $('#sell-select').change(sellFormData);
});

