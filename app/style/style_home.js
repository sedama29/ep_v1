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
    width: '75%',
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
    fontSize: 13,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline'
  },
  container_data: {
    width: '100%',
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
    // height: 300,
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
    // height: 500,
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

  modalView: {
    flex: 1,
    marginTop: 20,
    padding:10,
    borderRadius: 5,

  },
  closeButton: {
    alignItems: "center",
    alignSelf: 'center', 
    backgroundColor: "blue",
    padding: 10,
    width: '20%',
    borderRadius: 5,
  },
  alertButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  alertText: {
    color: 'red',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
  pickerAndDotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotsButton: {
    fontSize:12,
    padding: 5,
  },
  modalView_2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle_2: {
    // Style for the image
    width: '90%',
    height: '50%',
    resizeMode: 'contain',
  },
  closeButton_image: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  dotTouchable: {
    position: 'absolute',
    width: 30,
    height: 30,
    left: 179 - 15,
    top: 380 - 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});
