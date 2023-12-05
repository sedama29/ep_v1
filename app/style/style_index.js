import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 250,
    height: 150,
    marginBottom: 50,
    marginTop: 150
  },
  logo2: {
    width: 170,
    height: 50, // Adjust this based on your requirement
    resizeMode: 'contain',
  },
  description: {
    fontSize: 10,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    color: 'white'
  },
  googleButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  agreementText: {
    textAlign: 'center',
    marginTop: 50,
    marginHorizontal: 30,
    color: 'white'
  },
  hyperlink: {
    color: 'blue',
  },
});

