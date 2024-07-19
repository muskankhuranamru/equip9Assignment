import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { fetchUserProfile } from '../services/api'; // Ensure you have this function defined in your API services

const HomeScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const userData = await fetchUserProfile(token);
                    console.log('userData: ', userData);
                    setUser(userData[0]);
                } else {
                    // Navigate to login if no token is found
                    navigation.navigate('Login');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                navigation.navigate('Login');
            }
        };

        getUserData();
    }, [navigation]);

    const logoutUser = async () => {
        try {
            // Remove token from AsyncStorage
            await AsyncStorage.removeItem('token');
            // Navigate to Login
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>User data not available.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.greetingText}>{`${greeting()} Mr. ${user.firstName}, ${user.lastName}`}</Text>
            <Button title="Logout" onPress={logoutUser} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    greetingText: {
        fontSize: 18,
        marginBottom: 20,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});

export default HomeScreen;
