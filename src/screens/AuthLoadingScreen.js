import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen = ({ navigation }) => {
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    // Token exists, navigate to Home
                    navigation.navigate('Home');
                } else {
                    // No token, navigate to Login
                    navigation.navigate('Registration');
                }
            } catch (error) {
                console.error('Error checking auth:', error);
                // Navigate to Login in case of error
                navigation.navigate('Registration');
            }
        };

        checkAuth();
    }, [navigation]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AuthLoadingScreen;
