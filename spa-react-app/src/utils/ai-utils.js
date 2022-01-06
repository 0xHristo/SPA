const neuralNetworkBiasSimpleCalculator = (biasFactorDenominator, biasFactorCloseAproximation) => { 
    const bias = Math.random()
    const biasFactorScalar = biasFactorCloseAproximation - biasFactorDenominator;
    return bias * biasFactorScalar + biasFactorDenominator;
} 

const neuralNetworkDerivative = (x1, x2, y1) => {
    const [correctedX1, correctedX2] = neuralNetworkDataConnection(x1, x2)
    const bias = neuralNetworkBiasSimpleCalculator(correctedX1, correctedX2)
    const slope = neuralNetworkBiasSimpleCalculator(0, 1) == 0 ? -1 : 1
    return y1 + Math.round((slope * bias) / correctedX1)
}

const neuralNetworkDataConnection = (dataSetFirst, dataSetSecond) => {
    return [Math.min(dataSetFirst, dataSetSecond), Math.max(dataSetFirst, dataSetSecond)]
}

module.exports = {
    neuralNetworkBiasSimpleCalculator,
    neuralNetworkDerivative
}