import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryArea } from 'victory-native';

import axios from 'axios';
import * as d3 from 'd3';

const GraphView = ({ siteId }) => {
  const [data, setData] = useState({});
  const screenWidth = 400;
  const screenHeight = 300;

  useEffect(() => {
    const fetchData = async () => {
      if (siteId) {
        try {
          const response = await axios.get(`https://enterococcus.today/waf/nowcast/TX/eCount_stat_app_2/${siteId}.csv`);
          const parseDate = d3.timeParse("%Y-%m-%d");
          const newData = d3.csvParse(response.data, (row) => {
            const newRow = { date: parseDate(row.date) };
            Object.keys(row).forEach(key => {
              if (key !== 'date') {
                newRow[key] = +row[key];
              }
            });
            return newRow;
          });
          const transformedData = newData.reduce((acc, row) => {
            Object.keys(row).forEach(key => {
              if (key !== 'date') {
                if (!acc[key]) acc[key] = [];
                acc[key].push({ date: row.date, value: row[key] }); // Use Date object directly
              }
            });
            return acc;
          }, {});
          setData(transformedData);
        } catch (error) {
          console.error('Error fetching graph data:', error);
        }
      }
    };
    fetchData();
  }, [siteId]);

  // Function to format the date in "DD MMM" format (e.g., "12 Nov")
  const formatDate = d3.timeFormat("%d %b");

  // Determine the tick values (one per week)
  let tickValues = [];
  if (Object.keys(data).length > 0) {
    const dates = data[Object.keys(data)[0]].map(d => d.date);
    tickValues = d3.timeWeek.every(1).range(d3.min(dates), d3.max(dates));
  }

  const createAreaData = (min, max) => {
    const data = [];
    if (tickValues.length > 0) {
      tickValues.forEach(date => {
        data.push({ date, value: min });
        data.push({ date, value: max });
      });
    }
    return data;
  };

  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {Object.keys(data).length > 0 && (
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 10, y: 10 }}
          width={screenWidth}
          height={screenHeight}
        >
          <VictoryAxis
            scale="time"
            standalone={false}
            tickValues={tickValues}
            tickFormat={formatDate}
            label="Date"
            style={{
              tickLabels: { fontSize: 6, padding: 5 },
              axisLabel: { fontSize: 8, padding: 25 } // Style for the axis title
            }}
          // axisLabelComponent={<VictoryLabel dy={20}/>} 
          />
          <VictoryAxis
            dependentAxis
            standalone={false}
            label="Highest Count (cfu/100 ml)"
            style={{
              tickLabels: { fontSize: 6, padding: 5 },
              axisLabel: { fontSize: 8, padding: 25 } // Style for the axis title
            }}
          />
          {Object.keys(data).map((key, index) => (
            <VictoryLine
              key={key}
              data={data[key]}
              x="date"
              y="value"
              style={{ data: { stroke: d3.schemeCategory10[index % 10] } }}
            />
          ))}
        </VictoryChart>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    // backgroundColor: 'lightgrey',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default GraphView;
