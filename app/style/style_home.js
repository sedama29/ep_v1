import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    // height: '100%',
    // backgroundColor:'white',
    borderRadius: 5,
  },
  pickerContainer: {
    backgroundColor: 'lightgray',
    width: 250,
    borderRadius: 5,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    color: 'blue',
    backgroundColor: 'transparent',
  },
  descriptionText: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 11,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  container_data: {
    width: '100%',
    // height: 250,
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  row_contact: {
    flexDirection: 'row',
  },
  column_contact: {
    flex: 1,
    fontSize: 11,
  },
  value_contact: {
    flex: 4,
    fontSize: 11,

  },
  container_location: {
    borderWidth:1,
    padding: 5,
    height: 320,
    resizeMode: 'contain',
    borderRadius: 5,
    overflow: 'hidden',
  },
  container_image: {
    alignItems: 'center',
    width: '100%', 
    height: 'auto', 
    borderRadius: 5,
    overflow: 'hidden',
  },
  
  imageStyle: {
    borderWidth: 1,
    width: '100%',
    aspectRatio: 1.5, 
    resizeMode: 'contain',
  },

  container_contact: {
    alignItems: 'left',
    width: '100%',
    borderWidth: 1,
    padding: 5,
    // height: 200,
    borderRadius: 5,
  },
  sectionHeader: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 11,
  },
  textSpacing: {
    marginBottom: 10,
  },
  rowText: {
    fontWeight: 'bold'
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    // backgroundColor: '#f2f2f2',
    padding: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  column: {
    width: '25%',
    textAlign: 'center',
    fontSize: 11,
  },

  headerText: {
    fontWeight: 'bold',
    padding: 5,
  },
  rowText: {
    padding: 5,
  },
});
