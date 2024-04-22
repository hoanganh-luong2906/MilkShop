import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	user: {},
	setIsLoggedIn: () => {},
	setRole: () => {},
});

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [isChanged, setIsChanged] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			const loggedIn = await AsyncStorage.getItem('isLoggedIn');
			const user = await AsyncStorage.getItem('user');
			if (loggedIn === 'true') {
				setIsLoggedIn(JSON.parse(loggedIn));
				setUser(JSON.parse(user));
			}
			setIsLoading(false);
		};
		fetchUser();
	}, []);

	const login = async (userAccount) => {
		setIsLoggedIn(true);
		setUser(userAccount);
		await AsyncStorage.setItem('isLoggedIn', 'true');
		await AsyncStorage.setItem('user', JSON.stringify(userAccount));
	};

	const logout = async () => {
		setIsLoggedIn(false);
		setUser('');
		await AsyncStorage.removeItem('isLoggedIn');
		await AsyncStorage.removeItem('user');
		setIsChanged(!isChanged);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn,
				user,
				login,
				logout,
				isLoading,
				isChanged,
				setIsChanged,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
