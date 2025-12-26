const fs = require('fs');
const path = require('path');

const pricesFilePath = path.join(__dirname, '..', 'prices.json');

function calculatePrice(material, weight) {
    try {
        const pricesData = fs.readFileSync(pricesFilePath, 'utf8');
        const prices = JSON.parse(pricesData);
        const materialPrice = prices[material];
        if (materialPrice) {
            return weight * materialPrice;
        }
        return 0;
    } catch (error) {
        console.error('Error reading prices file:', error);
        return 0;
    }
}

module.exports = {
    calculatePrice
};
