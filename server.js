const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/multiply', (req, res) => {
    console.log('Request received:', req.body);

    const { matrix1, matrix2 } = req.body;

    // Validate matrices and perform multiplication
    if (isValidMatrix(matrix1) && isValidMatrix(matrix2) && canMultiply(matrix1, matrix2)) {
        const result = multiplyMatrices(matrix1, matrix2);
        console.log('Result:', result);
        res.json({ result });
    } else {
        console.error('Invalid matrices for multiplication:', matrix1, matrix2);
        res.status(400).json({ error: 'Invalid matrices for multiplication' });
    }
});

function isValidMatrix(matrix) {
    // Implement matrix validation logic as needed
    return Array.isArray(matrix) && matrix.length > 0 && Array.isArray(matrix[0]);
}

function canMultiply(matrix1, matrix2) {
    // Implement logic to check if matrices can be multiplied
    return matrix1[0].length === matrix2.length;
}

function multiplyMatrices(matrix1, matrix2) {
    // Implement matrix multiplication logic
    // This is a basic example and may need modification based on your requirements
    const result = [];

    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            result[i][j] = 0;
            for (let k = 0; k < matrix1[0].length; k++) {
                result[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }

    return result;
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
