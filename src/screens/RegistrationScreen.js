// src/screens/RegistrationScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { registerUser } from '../services/api'; // Adjust path if necessary
import { signInWithGoogle, signInWithFacebook, signInWithApple } from '../services/auth'; // Adjust path if necessary

const RegistrationScreen = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await registerUser({ firstName, lastName, mobileNumber, password });
            if (response.success) {
                navigation.navigate('Login');
            } else {
                setErrorMessage(response.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('User Already registered');
        }
    };

    const handleGoogleSignIn = async () => {
        await signInWithGoogle();
    };

    const handleFacebookSignIn = async () => {
        await signInWithFacebook();
    };

    const handleAppleSignIn = async () => {
        await signInWithApple();
    };

    return (
        <View style={styles.container}>
            <Text>First Name:</Text>
            <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
            />
            <Text>Last Name:</Text>
            <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
            />
            <Text>Mobile Number:</Text>
            <TextInput
                style={styles.input}
                value={mobileNumber}
                onChangeText={setMobileNumber}
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button title="Register" onPress={handleRegister} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
            <Button title="Sign In with Google" onPress={handleGoogleSignIn} />
            <Button title="Sign In with Facebook" onPress={handleFacebookSignIn} />
            <Button title="Sign In with Apple" onPress={handleAppleSignIn} />
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default RegistrationScreen;
