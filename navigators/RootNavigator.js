import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import NavigationScreen from '../screens/NavigationScreen';
import RegisterScreen from '../screens/RegisterScreen';
import useAuth from '../utils/useAuth';
import AdminNavigator from './AdminNavigator';
import CustomerNavigator from './CustomerNavigator';
import MainNavigator from './MainNavigator';
import StaffNavigator from './StaffNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
	const { isLoggedIn, role } = useAuth();

	return (
		<NavigationContainer>
			{!isLoggedIn ? (
				<Stack.Navigator initialRouteName='Navigation'>
					{/*=======Đoạn code này sẽ bị xóa sau khi login được==========*/}
					<Stack.Screen
						name='Navigation'
						component={NavigationScreen}
					/>
					<Stack.Screen
						name='staff-home'
						component={StaffNavigator}
					/>
					<Stack.Screen
						name='admin-home'
						component={AdminNavigator}
					/>
					<Stack.Screen
						name='customer-home'
						component={CustomerNavigator}
					/>
					{/*===========================================================*/}

					<Stack.Screen
						name='landing'
						component={MainNavigator}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='login'
						component={LoginScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='register'
						component={RegisterScreen}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			) : (
				<Stack.Navigator
					initialRouteName=''
					screenOptions={{ headerShown: false }}
				>
					{role === 'Admin' ? (
						<>
							<Stack.Screen
								name='admin-home'
								component={AdminNavigator}
							/>
						</>
					) : role === 'Staff' ? (
						<>
							<Stack.Screen
								name='staff-home'
								component={StaffNavigator}
							/>
						</>
					) : (
						<>
							<Stack.Screen
								name='customer-home'
								component={CustomerNavigator}
							/>
						</>
					)}
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	headerTitle: {
		width: '78%',
		textAlign: 'center',
		fontSize: 22,
		fontWeight: 'bold',
	},
});

export default RootNavigator;
