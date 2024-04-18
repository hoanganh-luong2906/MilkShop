import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import MainNavigator from './navigators/MainNavigator';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Main'>
				<Stack.Screen
					options={{ headerShown: false }}
					name='Main'
					component={MainNavigator}
				/>
				<Stack.Screen name='Login' component={LoginScreen} />
				<Stack.Screen name='Register' component={RegisterScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
