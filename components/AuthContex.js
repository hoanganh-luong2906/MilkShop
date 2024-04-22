import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({
	isLoggedIn: false,
	user: {},
	setIsLoggedIn: () => {},
	setRole: () => {},
});

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(
		AsyncStorage.getItem('isLoggedIn') ?? false
	);
	const [user, setUser] = useState(AsyncStorage.getItem('user') ?? {});

	const login = async (userAccount) => {
		setIsLoggedIn(true);
		setUser(userAccount);
		await AsyncStorage.setItem('user', JSON.stringify(userAccount));
	};

	const logout = async () => {
		setIsLoggedIn(false);
		setUser('');
		await AsyncStorage.removeItem('user');
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
