// Create and append coin data for your wallet
const addCryptoData = (data) => {
    let coinsTable = $('.coins-table');
    data.forEach(item => {
        let row = "";
        row = `<tr>
                    <td><img src=${item.image} style="width="30px"; height="30px"; "/> </td>
                    <td>${item.id}</td>
                    <td>${formatCurrency(item.price)}</td>
                    <td>${item.amount.toFixed(5)}</td>
                </tr>`
        coinsTable.append(row);
    })
}

// Calculate the total amount of cash you have in the wallet
const walletBalance = () => {
    let amount = 0;
    for (let i = 0; i < localStorage.length; i++) {
        amount += JSON.parse(localStorage.getItem(localStorage.key(i))).price;
    }

    document.querySelector('.wallet-balance').textContent = formatCurrency(amount);
}

// Iterate through localStorage for the coin data
const walletInfo = () => {
    let items = [];

    for (let i = 0; i < localStorage.length; i++) {
        items.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    }
    addCryptoData(items)
}

walletBalance();
walletInfo();