import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLine, VictoryArea, VictoryContainer } from 'victory-native';
import axios from 'axios';
import * as d3 from 'd3';
import { styles } from './style/style_graph_view';
import CustomBackground from './Graph/CustomBackground';


const chartPadding = { top: 10, bottom: 50, left: 50, right: 50 };

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
                newRow[key] = row[key] ? +row[key] : null;
              }
            });
            return newRow;
          });
          const transformedData = newData.reduce((acc, row) => {
            Object.keys(row).forEach(key => {
              if (key !== 'date') {
                if (!acc[key]) acc[key] = [];
                acc[key].push({ date: row.date, value: row[key] });
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

  const formatDate = d3.timeFormat("%d %b");

  let areaPlotData = [];
  if (data["Probality_Space_high"] && data["Probality_Space_low"]) {
    areaPlotData = data["Probality_Space_high"].map((high, index) => {
      const low = data["Probality_Space_low"][index];
      return { date: high.date, y: high.value, y0: low.value };
    });
  }

  let tickValues = [];
  if (Object.keys(data).length > 0) {
    const dates = data[Object.keys(data)[0]].map(d => d.date);
    tickValues = d3.timeWeek.every(1).range(d3.min(dates), d3.max(dates));
  }

  return (
    <ScrollView horizontal style={styles.container} contentContainerStyle={styles.contentContainer}>
      {Object.keys(data).length > 0 && (
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 10, y: 10 }}
          padding={chartPadding}
          width={screenWidth}
          height={screenHeight}
          containerComponent={<CustomBackground />}
        >
          <VictoryAxis
            scale="time"
            tickValues={tickValues}
            tickFormat={formatDate}
            label="Date"
            style={styles.axisStyles}
          />
          <VictoryAxis
            dependentAxis
            domain={[0, 150]}
            label="Highest Count (cfu/100 ml)"
            style={styles.axisStyles}
          />
          <VictoryArea
            data={areaPlotData}
            x="date"
            y="y"
            y0="y0"
            style={{ data: { fill: "lightblue", opacity: 0.5 } }} 
          />
          {Object.keys(data).map((key, index) => (
            <VictoryLine
              key={key}
              data={data[key]}
              x="date"
              y="value"
              style={{
                data: {
                  stroke: key === 'Probality_Space_high' || key === 'Probality_Space_low' ? 'transparent' : d3.schemeCategory10[index % 10],
                  strokeDasharray: key === 'Probality_Space' ? '4, 4' : '0', // Dotted style for 'Probality_Space'
                }
            }}
            />
          ))}
        </VictoryChart>
      )}
    </ScrollView>
  );
};

export default GraphView;
