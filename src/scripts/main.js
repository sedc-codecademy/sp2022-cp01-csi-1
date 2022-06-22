// Get all the coins stored in localStorage
const getCoinsDb = () => {
    const coins = [];

    for (let i = 0; i < localStorage.length; i++) {
        coins.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
    }

    return coins;
}

const fetchData = (url) => {
    
    const data = fetch(url);

    return data
        .then(res => res.json())
        .catch(err => console.error(err))
}

// Change section on button click
const walletBtn = $('#wallet-btn');
const statsBtn = $('#stats-btn');
const exchangeBtn = $('#exchange-btn');
const section1 = $('#s1');
const section2 = $('#s2');
const section3 = $('#s3');

walletBtn.click(() => {
    section1.removeClass('hide');
    section2.addClass('hide');
    section3.addClass('hide');
});

statsBtn.click(() => {
    section2.removeClass('hide');
    section1.addClass('hide');
    section3.addClass('hide');
});

exchangeBtn.click(() => {
    section3.removeClass('hide');
    section1.addClass('hide');
    section2.addClass('hide');
});

