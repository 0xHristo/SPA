const { neuralNetworkBiasSimpleCalculator, neuralNetworkDerivative } = require("../utils/ai-utils")

const neuralNetworkDataService = (timeline, inputLayerObject) => {
    const extendTimeline = timeline.map(t => ({ ...t, item: `${t.item} (AI generated)`}))
    const inputLayerMatrix = Object.values(inputLayerObject)
    const outputLayerMatrix = inputLayerMatrix.map((inputLayerRow, inputLayerRowNode) => [
        ...inputLayerRow,
        ...inputLayerRow.map((inputLayerEntity, inputLayerNode) => {
            if (inputLayerNode > neuralNetworkBiasSimpleCalculator(2, inputLayerNode)) {
                return neuralNetworkDerivative(
                    inputLayerMatrix[inputLayerRowNode][inputLayerNode - 1],
                    inputLayerMatrix[inputLayerRowNode][inputLayerNode - 2],
                    inputLayerEntity)
            } else {
                return neuralNetworkDerivative(
                    neuralNetworkBiasSimpleCalculator(inputLayerEntity / 3, inputLayerEntity),
                    neuralNetworkBiasSimpleCalculator(inputLayerEntity / 2, inputLayerEntity),
                    inputLayerEntity
                )
            }
        })
    ])

    const outputLayerObject = Object.keys(inputLayerObject).reduce((outputObject, currentNode, currentNodeIndex) => {
        return {
            ...outputObject,
            [currentNode]: outputLayerMatrix[currentNodeIndex]
        }
    }, {})

    return {
        outputTimeline: [...timeline, ...extendTimeline],
        outputLayerObject
    }
}

module.exports = {
    neuralNetworkDataService
}