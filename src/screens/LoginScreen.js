import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await loginUser({ mobileNumber, password });
            if (response.success) {
                // Save token and user data to AsyncStorage
                await AsyncStorage.setItem('token', response.token);
                await AsyncStorage.setItem('user', JSON.stringify(response.user));

                // Navigate to the home screen
                navigation.navigate('Home', { user: response.user });
            } else {
                Alert.alert('Login Failed', response.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Login Error', 'An error occurred during login. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Mobile Number:</Text>
            <TextInput
                style={styles.input}
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="numeric"
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <Button title="Login" onPress={handleLogin} />
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
});

export default LoginScreen;
