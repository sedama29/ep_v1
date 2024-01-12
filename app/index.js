import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { styles } from './style/style_index';
import { Link, useNavigation } from 'expo-router'; // useNavigation is used for navigation
import BWImage from '../assets/images/BW_Logo.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import google from '../assets/images/btn_google_signin_dark_normal_web.png';
import auth from '@react-native-firebase/auth'; // Import Firebase authentication

export default function LoginPage() {
  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();
  const navigation = useNavigation(); // Hook for navigation

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: "811824618803-n1ra8a7lqq6f4m916hhlvm39jtvnst4s.apps.googleusercontent.com",
    });
  }, []);

  const signin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      setUserInfo(userCredential.user);
      navigation.navigate('/disclaimer'); // Navigate after successful authentication
    } catch (e) {
      setError(e);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={BWImage} style={styles.logo} />
      <Text style={styles.description}>
        The Enterococcus Predictor (or ep), an AI-enabled system to predict the level or counts of enterococcus bacteria for a geographical area, is currently in development. If you are a registered user, please use your Google account to log in. If you are having issues logging in, please contact info@enterococcus.today.
      </Text>
      <TouchableOpacity onPress={'/drawer'}>
        <Image source={google} style={styles.logo2} />
      </TouchableOpacity>
      <Text style={styles.agreementText}>
        I agree to the{' '}
        <Link href={'/disclaimer'}>
          <Text style={styles.hyperlink}>Terms and Conditions</Text>
        </Link>
      </Text>
    </View>
  );
}
