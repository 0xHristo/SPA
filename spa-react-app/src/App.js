import './App.css';
import BarChart from 'chart-race-react'; 
import {mock_data} from './data/ptp_yearly';
import { RemovableItem } from './components/removable-item';
import { dataService } from './services/data-service';
import { useState } from 'react';


function App() {
  const [start, setStart] = useState(false);
  const [chartData, setChartData] = useState(dataService.getData(mock_data));
  const [labels, setLabels] = useState(dataService.getLabels(mock_data));
  const [timeline, setTimeline] = useState(dataService.getTimeline(mock_data));

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
      <div style={{textAlign:"center",}}>
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
    const labelIndex = timeline.indexOf(label);
    labels.forEach(l => {
      chartData[l].splice(labelIndex,1);
    });
    setChartData({...chartData});
    setTimeline(timeline.filter(time => time !== label));
  }

  const onRestart = () => {
    setChartData(dataService.getData(mock_data));
    setLabels(dataService.getLabels(mock_data));
    setTimeline(dataService.getTimeline(mock_data));
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
            {timeline.map(key => (<RemovableItem name={key} onRemove={removeFromTimeline}/>))}
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
                textAlign: "center",
                color: "rgb(133, 131, 131)",
                fontSize: "30px",
              }}
              barStyle={{
                height: "40px",
                marginTop: "10px",
                borderRadius: "10px",
              }}
              width={[20, 60, 20]}
            /> : null} 
          </div>
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
