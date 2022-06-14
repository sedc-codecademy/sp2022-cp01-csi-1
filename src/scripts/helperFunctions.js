// Format given number in currency format
const formatCurrency = (cur) => {
    return cur.toLocaleString('en-US', {
        style: 'currency',
        currency: 'EUR',
    });
}