let coinsInWallet = getCoinsDb();
const sellCoinsSelect = $('#sell-coins-select');

coinsInWallet.forEach(coin => {
    const option = $('<option></option>');
    option.html(coin.symbol.toUpperCase());
    sellCoinsSelect.append(option);
});

const sellFormData = () => {
    const selectedCoin = $('#sell-coins-select option:selected').text().toLowerCase();
    const coinPrice = $('.sell');
    const spendInput = $('#spend');
    const recieveInput = $('#recieve');
    const sellButton = $('#sell-btn');
    const sellFormValidation = $('#sell-form-validation');
    let total = 0;
    let coinData;

    // if(coinsInWallet.length === 0 ) {
    //     sellButton.attr('disabled', true);
    //     sellButton.css('backgroundColor', '#EAECEF');
    //     return;
    // } else {
    //     sellButton.attr('disabled', true);
    //     sellButton.css('backgroundColor', '#00458B');
    // }

    for (let i = 0; i < coinsInWallet.length; i++) {
        let coin = coinsInWallet[i];
        if (coin.symbol === selectedCoin) {
            coinData = coin;
        }
    }

    coinPrice.html(`1 ${coinData.symbol.toUpperCase()} ≈ ${formatCurrency(coinData.currentPrice)}`);
    spendInput.val('');
    recieveInput.val('');
    spendInput.keyup(() => {
        if (spendInput.val() > coinData.coinsRecieved) {
            sellFormValidation.text('Insufficient amount in account')
            sellFormValidation.css('color', 'red');
            sellButton.attr('disabled', true);
            sellButton.css('backgroundColor', '#EAECEF');
        } else {
            sellFormValidation.text('')
            sellButton.removeAttr('disabled');
            sellButton.css('backgroundColor', '#00458B');
        }

        if (spendInput.val() >= 1) {
            total = coinData.currentPrice * spendInput.val();
            console.log(coinData.estimatedValue);
            recieveInput.val(`${total.toFixed(2)}`);
        } else {
            recieveInput.val('');
        }
    });
}

// Sell crypto
$('#sell-btn').click(() => {
    const selectedCoin = $('#sell-coins-select option:selected').text().toUpperCase();
    const spendInput = $('#spend');
    const walletCoins = getCoinsDb();

    walletCoins.forEach(coin => {
        if (coin.symbol.toUpperCase() === selectedCoin) {
            if(coin.coinsRecieved === spendInput.val()){
                localStorage.removeItem(coin.id);
                return;
            }

            const getCoin = JSON.parse(localStorage.getItem(coin.id));
            getCoin.coinsRecieved = (getCoin.coinsRecieved - spendInput.val()).toFixed(5);
            getCoin.estimatedValue = getCoin.coinsRecieved * getCoin.currentPrice;
            localStorage.setItem(coin.id, JSON.stringify(getCoin));
            return;
        }
    })
});

// Load Coin data and change on select option
$(() => {
    sellFormData();
    $('#sell-coins-select').change(sellFormData);
});

