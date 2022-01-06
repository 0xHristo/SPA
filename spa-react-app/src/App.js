"use strict";

import './App.css';
import BarChart from './components/BarChart'; 
import {mock_data} from './data/ptp_yearly';
import { RemovableItem } from './components/removable-item';
import { dataService } from './services/data-service';
import { useState } from 'react';
import { neuralNetworkDataService } from './services/ai-service'

const NeuralNetworkData = () => {
  const inputLayerObject = dataService.getData(mock_data)
  const inputTimeline = dataService.getTimeline(mock_data)
  const { outputLayerObject, outputTimeline } = neuralNetworkDataService(inputTimeline, inputLayerObject)
  return [outputLayerObject, dataService.getLabels(mock_data), outputTimeline]
}

function App() {
  const nnData = NeuralNetworkData()
  const [start, setStart] = useState(false);
  const [chartData, setChartData] = useState(nnData[0]);
  const [labels, setLabels] = useState(nnData[1]);
  const [timeline, setTimeline] = useState(nnData[2]);

  const randomColor = () => {
    return `rgb(${255 * Math.random()}, ${255 * Math.random()}, ${255})`;
  }

  const colors = labels.reduce((res, item) => ({ 
    ...res, 
    ...{ [item]: randomColor() } 
  }), {});

  const labelDivs = labels.reduce((res, item, idx) => {
    return{
    ...res, 
    ...{[item]: (
      <div style={{textAlign:"right", marginRight:"10px"}}>
        <div>{item}</div>
      </div>
      )}
  }}, {});

  const removeFromData = (label) => {
    delete chartData[label];
    setChartData({...chartData});
    setLabels(labels => labels.filter(value => value !== label));
  }

  const removeFromTimeline = (label) => {
    const labelIndex = timeline.find((element) => element.item == label)
    labels.forEach(l => {
      chartData[l].splice(labelIndex,1);
    });
    setChartData({...chartData});
    setTimeline(timeline.filter(time => time.item !== label));
  }

  const onRestart = () => {
    const neuralNetworkData = NeuralNetworkData();
    setChartData(neuralNetworkData[0]);
    setLabels(neuralNetworkData[1]);
    setTimeline(neuralNetworkData[2]);
  }

  return (
    <div className="App">
      <div className="chart">
        <div className="chart-settings">
          <div className="selection-menu">
            <h4>Единица</h4>
            {labels.map(key => (<RemovableItem name={key} onRemove={removeFromData}/>))}
          </div>
          <div className="selection-menu">
          <h4>Хронологична Единица</h4>
            {timeline.map(key => (<RemovableItem name={key.item} onRemove={removeFromTimeline}/>))}
          </div>
        </div>
        <div className="chart-layout">
          { start ? <BarChart 
              start={start}
              data={chartData} 
              timeline={timeline} 
              labels={labelDivs}
              colors={colors}
              len={timeline.len}
              timeout={600}
              delay={400}
              timelineStyle={{
                textAlign: "center",
                fontSize: "40px",
                color: "rgb(148, 148, 148)",
                marginBottom: "100px"
              }}
              textBoxStyle={{
                textAlign: "right",
                marginLeft: "10px",
                color: "rgb(133, 131, 131)",
                fontSize: "30px",
                width: "30px"
              }}
              barStyle={{
                height: "40px",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              width={[20, 60, 20]}
              maxItems={10}
            /> : null} 
          </div>
          {console.log(chartData)}
          <button className="start-button" onClick={() => {
            setStart(value => !value);
            if (start) {
              onRestart();
            }
          }}>{start ? 'Restart' : 'Start'}</button>
        </div>
    </div>
  );
}

export default App;
