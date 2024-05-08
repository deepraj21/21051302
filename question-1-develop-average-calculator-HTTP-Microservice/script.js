const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;

const windowSize = 10;
let storedNumbers = [];

const calculateAverage = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
};

const fetchNumbers = async (req, res, next) => {
    try {
        const primeResponse = { data: { numbers: [2, 3, 5, 7, 11] } };
        const fiboResponse = { data: { numbers: [0, 1, 1, 2, 3, 5, 8, 13] } };
        const evenResponse = { data: { numbers: [2, 4, 6, 8, 10] } };

        req.fetchedNumbers = [
            ...primeResponse.data.numbers,
            ...fiboResponse.data.numbers,
            ...evenResponse.data.numbers
        ];
        next();
    } catch (error) {
        console.error('Error fetching numbers:', error.message);
        res.status(500).send('Error fetching numbers from the server');
    }
};

const storeNumbers = (req, res, next) => {
    const fetchedNumbers = req.fetchedNumbers;

    storedNumbers.push(...fetchedNumbers);

    storedNumbers = [...new Set(storedNumbers)];

    if (storedNumbers.length > windowSize) {
        storedNumbers = storedNumbers.slice(storedNumbers.length - windowSize);
    }

    next();
};

app.get('/numbers/:numberid', fetchNumbers, storeNumbers, (req, res) => {
    const windowPrevState = [...storedNumbers];
    const windowCurrState = [...storedNumbers];
    const fetchedNumbers = req.fetchedNumbers;
    const avg = calculateAverage(storedNumbers);

    res.json({
        windowPrevState,
        windowCurrState,
        numbers: fetchedNumbers,
        avg: avg.toFixed(2)
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
