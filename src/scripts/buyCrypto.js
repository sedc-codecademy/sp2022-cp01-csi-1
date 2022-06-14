const userCardTemplate = document.querySelector('[data-user-template]');
const userCardContainer = document.querySelector('[user-cards-container]');
const searchInput = document.querySelector('[data-search');
let coins = [];

function CryptoEntry(id, image, price, amount) {
    this.id = id;
    this.image = image;
    this.price = price;
    this.amount = amount;
}

// Load Coin data and change on select option
$(() => {
    loadCoinsData();
    $('#buy-coins-select').change(loadCoinsData);
});

// Fetch all the available coins
const loadCoinsData = () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=24h`;
    fetch(url, {
        Accept: 'application/json',
        method: 'GET',
    })
        .then(data => data.json())
        .then(parsedData => {
            printOptions(parsedData);
            calculateValue(parsedData);
        })
        .catch(err => console.error(err));
}

// Populate select form with available coins
const printOptions = (data) => {
    const coinsSelect = $('#buy-coins-select');
    coins = data.forEach(coin => {
        const option = document.createElement('option');
        option.innerHTML = coin.symbol.toUpperCase();
        coinsSelect.append(option);
    });
}

// Calculate coin amount 
const calculateValue = (data) => {
    const totalInput = $('#total');
    totalInput.attr({"max" : 99999});
    let amount = $('#amount');
    let total = 0;
    let coinData;
    const selectedCoin = $('#buy-coins-select option:selected').text().toLowerCase();
    const coinPrice = $('#coin-price');

    // Get the selected coin
    data.forEach(coin => {
        if (coin.symbol === selectedCoin) {
            coinData = coin;
        }
    });

    // Calculate and print data to the form
    coinPrice.text(`1 ${coinData.symbol.toUpperCase()} ≈ ${formatCurrency(coinData.current_price)}`);
    total = parseInt(amount.val()) / coinData.current_price;
    if (amount.val() === '') {
        totalInput.val(`${0} ${coinData.symbol.toUpperCase()}`);
    } else {
        totalInput.val(`${total.toFixed(5)} ${coinData.symbol.toUpperCase()}`);
    }

    $('#amount').keyup(() => {
        total = parseInt(amount.val()) / coinData.current_price;
        if (amount.val() === '') {
            totalInput.val(`${0} ${coinData.symbol.toUpperCase()}`);
        } else {
            totalInput.val(`${total.toFixed(5)} ${coinData.symbol.toUpperCase()}`);
        }
    });

    // Create a new instance from CryptoEntry constructor function and put it inside localStorage
    $('#buy-form').submit( () => {
        let newCoin = new CryptoEntry(
            id = coinData.id,
            image = coinData.image,
            price = coinData.current_price,
            amount = total
        );
        localStorage.setItem(coinData.id, JSON.stringify(newCoin));
    });
}




