import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { VictoryChart, VictoryTheme, VictoryAxis, VictoryLine, VictoryArea, VictoryContainer } from 'victory-native';
import Svg, { Rect } from 'react-native-svg';
import axios from 'axios';
import * as d3 from 'd3';
import { styles } from './style/style_graph_view';

const chartPadding = { top: 10, bottom: 50, left: 50, right: 50 };

const CustomBackground = ({ children, ...props }) => {
  const yScale = props.scale.y;

  const plotAreaTop = yScale(150);
  const plotAreaBottom = yScale(0);

  const yYellow = yScale(104);
  const yGreen = yScale(35);
  const yRed = plotAreaTop;

  const heightLightYellow = yGreen - yYellow;
  const heightLightGreen = plotAreaBottom - yGreen;
  const heightLightCoral = yYellow - yRed;

  return (
    <VictoryContainer {...props}>
      <Svg style={{ position: 'absolute', top: 0, left: 0 }}>
        <Rect x={chartPadding.left} y={yYellow} width={props.width - chartPadding.left - chartPadding.right} height={heightLightYellow} fill="#FFFFE5" />
        <Rect x={chartPadding.left} y={yGreen} width={props.width - chartPadding.left - chartPadding.right} height={heightLightGreen} fill="#E5FFE5" />
        <Rect x={chartPadding.left} y={yRed} width={props.width - chartPadding.left - chartPadding.right} height={heightLightCoral} fill="#FFE5E5" />
      </Svg>
      {children}
    </VictoryContainer>
  );
};

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
                  stroke: d3.schemeCategory10[index % 10],
                  strokeDasharray: key === 'Probality_Space' ? '4, 4' : '0', // Apply dotted style for 'ecount'
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
