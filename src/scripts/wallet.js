fetch('https://api.coingecko.com/api/v3/coins/bitcoin?market_data=true')
    .then(data => data.json())
    .then(parsedData => walletCoinData(parsedData))
    .catch(err => console.err(err))

// Get and print coin data for your wallet
const walletCoinData = (btc) => {

    const btcPrice = btc.market_data.current_price.eur;
    let walletEstimatedValue = 0;
    let walletBalance = 0;
    const coins = getCoinsDb();

    // Check if there are any elements inside the array, if not return
    if (coins.length === 0) {
        return;
    }

    // Sort coins by estimated value
    const sortedCoins = numberSort(coins);

    // Print coin data inside wallet table
    let coinsTable = $('.assets-table');
    sortedCoins.forEach(coin => {
        let row = "";
        row = `<tr>
                    <td><img src=${coin.image} style="width="40px"; height="40px";"/></td>
                    <td>
                        <div class="wrap">
                            <span class="wallet-coin-id">${capitalizeWord(coin.id)}</span>
                            <p class="wallet-coin-symbol"><span>${coin.symbol.toUpperCase()}</span></p>
                        </div>
                    </td>
                    <td>
                        <div class="wrap">
                            <span class="wallet-coin-amount">${coin.coinsRecieved}</span>
                            <p class="wallet-coin-money"><span>${formatCurrency(coin.estimatedValue)}</span></p>
                        </div>
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
    $('.wallet-balance').html(`<p style="font-size: 1.3rem;">${walletBalance.toFixed(5)} <span class="text-secondary" style="font-size: 1rem">BTC</span> ≈ ${formatCurrency(walletEstimatedValue)}</p>`);
}