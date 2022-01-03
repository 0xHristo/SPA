
class DataService {
  getData(fromRawData) {
    return fromRawData.slice(1).reduce((datum, value) => {
      return {...datum, [value[0]]: value.slice(1)}
    }, {});
  }

  getTimeline(fromRawData) {
    return fromRawData[0].slice(1);
  }

  getLabels(fromRawData) {
    return fromRawData.slice(1).map(record => record[0]);
  }
}

export const dataService = new DataService();
