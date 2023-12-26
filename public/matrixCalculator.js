function createMatrixInput(matrixId, rows, cols) {
    const matrixDiv = document.getElementById(matrixId);

    // Check if the element with the given ID exists
    if (!matrixDiv) {
        console.error(`Element with ID ${matrixId} not found.`);
        return;
    }

    // Clear the existing content
    matrixDiv.innerHTML = '';

    // Create new input fields
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.placeholder = `(${i + 1},${j + 1})`;
            matrixDiv.appendChild(input);
        }
        matrixDiv.appendChild(document.createElement('br'));
    }
}


function getMatrixValues(matrixId, rows, cols) {
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            const input = document.getElementById(matrixId).querySelector(`input[placeholder='(${i + 1},${j + 1})']`);
            const value = parseFloat(input.value) || 0;
            matrix[i][j] = value;
        }
    }

    return matrix;
}

async function calculateAndDisplayResult() {
    const matrix1 = getMatrixValues('matrix1', parseInt(document.getElementById('rows1').value), parseInt(document.getElementById('cols1').value));
    const matrix2 = getMatrixValues('matrix2', parseInt(document.getElementById('rows2').value), parseInt(document.getElementById('cols2').value));

    console.log('Matrix 1:', matrix1);
    console.log('Matrix 2:', matrix2);

    try {
        const response = await fetch('/multiply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ matrix1, matrix2 }),
        });

        const result = await response.json();
        console.log('Result:', result.result);

        // Display input matrices and result
        document.getElementById('matrixResult').innerHTML = `
            <div>Matrix 1: ${JSON.stringify(matrix1)}</div>
            <div>Matrix 2: ${JSON.stringify(matrix2)}</div>
            <div>Result Matrix: ${JSON.stringify(result.result)}</div>
        `;
    } catch (error) {
        console.error('Error during matrix multiplication:', error);
        alert('An error occurred during matrix multiplication. Please check the console for details.');
    }
}

function setMatrices() {
    const rows1 = parseInt(document.getElementById('rows1').value);
    const cols1 = parseInt(document.getElementById('cols1').value);
    const rows2 = parseInt(document.getElementById('rows2').value);
    const cols2 = parseInt(document.getElementById('cols2').value);

    createMatrixInput('matrix1', rows1, cols1);
    createMatrixInput('matrix2', rows2, cols2);
}

// Event handlers for the buttons
document.getElementById('setMatricesBtn').addEventListener('click', setMatrices);
document.getElementById('showResultBtn').addEventListener('click', calculateAndDisplayResult);
