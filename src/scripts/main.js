// Format given number in currency format
const formatCurrency = (cur) => {
    return cur.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

// Capitalize word
// const capitalizeWord = (word) => {
//     const lower = word.toLowerCase();
//     return word.charAt(0).toUpperCase() + lower.slice(1);
// }


// Sort numbers in descending order
const numberSort = (arr) => {
    if (arr.length === 1 || arr.length < 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const leftArr = [];
    const rightArr = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i].estimatedValue > pivot.estimatedValue) {
            leftArr.push(arr[i]);
        } else {
            rightArr.push(arr[i]);
        }
    }

    if (leftArr.length > 0 && rightArr.length > 0) {
        return [...numberSort(leftArr), pivot, ...numberSort(rightArr)];
    } else if (leftArr.length > 0) {
        return [...numberSort(leftArr), pivot];
    } else {
        return [pivot, ...numberSort(rightArr)];
    }
}

// Used for getting historical data for given coin
const time = {
    currentTime: Math.floor(Date.now() / 1000),
    fifteenMinutes: Math.floor(Date.now() / 1000) - 900,
    oneHour: Math.floor(Date.now() / 1000) - 3600,
    oneDay: Math.floor(Date.now() / 1000) - 86400,
    oneWeek: Math.floor(Date.now() / 1000) - 604800,
    oneMonth: Math.floor(Date.now() / 1000) - 2592000,
    oneYear: Math.floor(Date.now() / 1000) - 31104000
}
