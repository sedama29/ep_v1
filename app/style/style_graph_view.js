import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      flex: 1,
      borderWidth: 1,
    },
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    axisStyles: {
      axis: { stroke: '#756f6a' },
      axisLabel: { fontSize: 16, padding: 30 },
      tickLabels: { fontSize: 10, padding: 5 },
      ticks: { stroke: '#756f6a', size: 5 },
      grid: { stroke: '#e6e6e6', strokeDasharray: '5' },
      tickLabels: { fontSize: 6, padding: 5 },
      axisLabel: { fontSize: 8, padding: 25 } 
    }
  });