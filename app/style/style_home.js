import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pickerContainer: {
    backgroundColor: 'lightgray', // Ash background color
    width: 150,
    borderRadius: 5, 
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
      color: 'blue',
      backgroundColor: 'transparent', 
  },
  container_data: {
    backgroundColor: 'red',
    marginTop:30, // Ash background color
    width: '100%',
    height:200,
    borderRadius: 5, 
    overflow: 'hidden',
  },
  container_location: {
    alignItems: 'center',
    width: '100%',
    height: '35%', 
    resizeMode: 'contain', 
    borderRadius: 5,
    overflow: 'hidden', 
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', 
  },
  tableContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 30,
    marginVertical: 10,
    borderWidth: 1, 
    borderColor: 'black', 
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    borderBottomWidth: 1, 
    borderColor: 'black', 
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    borderTopWidth: 1, 
    borderColor: 'black',
  },
  headerText: {
    fontWeight: 'bold',
    padding: 5, 
  },
  rowText: {
    padding: 5, 
  },
  container_contact: {
    backgroundColor: 'red',
    marginTop:30, 
    width: '100%',
    height:200,
    borderRadius: 5, 
    overflow: 'hidden',
  },
});
