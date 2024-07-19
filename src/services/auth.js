// src/services/auth.js

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: '105991145590-ibh28s9a3pttfidj47aolq2da39m6u4u.apps.googleusercontent.com', 
});

// Google Sign-In function
export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Google Sign-In Error:', error);
  }
};

// Facebook Sign-In function
export const signInWithFacebook = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    return auth().signInWithCredential(facebookCredential);
  } catch (error) {
    console.error('Facebook Sign-In Error:', error);
  }
};

// Apple Sign-In function
export const signInWithApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    });

    const { identityToken, nonce } = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      return auth().signInWithCredential(appleCredential);
    } else {
      throw 'Apple Sign-In failed - no identity token returned';
    }
  } catch (error) {
    console.error('Apple Sign-In Error:', error);
  }
};
