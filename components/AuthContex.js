import React, { createContext, useState } from 'react';

const AuthContext = createContext({
	isLoggedIn: false,
	role: '',
	setIsLoggedIn: () => {},
	setRole: () => {},
});

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [role, setRole] = useState('');

	const login = (userRole) => {
		setIsLoggedIn(true);
		setRole(userRole);
		// Store token securely (e.g., AsyncStorage)
	};

	const logout = () => {
		setIsLoggedIn(false);
		setRole('');
		// Remove token from storage
	};

	return (
		<AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
