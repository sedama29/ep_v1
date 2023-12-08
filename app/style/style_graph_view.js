import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
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
      grid: { stroke: '#FF000019', strokeDasharray: '0' },
      tickLabels: { fontSize: 6, padding: 5 },
      axisLabel: { fontSize: 8, padding: 25 } 
    },
    legendContainer: {
      position: 'absolute',
      top: 40,
      right: 70,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      // other styles...
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      fontSize:4,
      // other styles...
    },
    legendToggleButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'lightgray', // Temporary background for debugging
      padding: 10, // Ensure it's easily clickable
      zIndex: 1, // Make sure it's above other components
    },

    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    checkboxBase: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 4,
      marginRight: 8,
    },
    checkboxChecked: {
      backgroundColor: 'blue',
      padding: 10, // Add some padding to increase the touchable area
    },
    checkboxCheckmark: {
      color: 'white',
    },
    
  });

  