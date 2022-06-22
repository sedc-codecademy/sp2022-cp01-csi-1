// Get and print coin data for your wallet
const walletCoinData = () => {
    let accountBalance = 0;
    const coins = getCoinsDb();

    // Check if there are any elements inside the array, if not return
    if(coins.length === 0){
        return;
    }

    // Sort coins by estimated value
    const sortedCoins = numberSort(coins);

    // Print coin data inside wallet table
    let coinsTable = $('.coins-table');
    sortedCoins.forEach(coin => {
        let row = "";
        row = `<tr>
                    <td><img src=${coin.image} style="width="30px"; height="30px";"/></td>
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

    // Calculate and print account balance
    for (let i = 0; i < sortedCoins.length; i++) {
        accountBalance += sortedCoins[i].currentPrice * sortedCoins[i].coinsRecieved;
        console.log('calculating...')
    }
    $('.wallet-balance').text(formatCurrency(accountBalance));
}


walletCoinData();