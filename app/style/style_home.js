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
    backgroundColor: 'lightgray', // Ash background color
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
    // alignItems: 'center',
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 5,
    overflow: 'hidden',
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
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd'
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'space-between',
    // backgroundColor: '#f2f2f2',
    padding: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 11,

  },
  column: {
    width: '30%',
    textAlign: 'left',
    fontSize: 11,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headerText: {
    fontWeight: 'bold',
    padding: 5,
  },
  rowText: {
    padding: 5,
  },


  contactContainer: {
  },
});
