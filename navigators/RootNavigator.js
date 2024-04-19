import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNavigator from './MainNavigator';
import useAuth from '../utils/useAuth';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CustomerNavigator from './CustomerNavigator';
import StaffNavigator from './StaffNavigator';
import AdminNavigator from './AdminNavigator';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
	const { isLoggedIn, role } = useAuth();

	return (
		<NavigationContainer>
			{!isLoggedIn ? (
				<Stack.Navigator initialRouteName='landing'>
					<Stack.Screen name='landing' component={MainNavigator} />
					<Stack.Screen name='login' component={LoginScreen} />
					<Stack.Screen name='register' component={RegisterScreen} />
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

export default RootNavigator;
