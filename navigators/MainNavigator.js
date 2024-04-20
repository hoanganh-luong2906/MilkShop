import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/admin/LandingScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName='Landing'
			screenOptions={{ headerShown: false }}
		>
			<Tab.Screen name='Landing' component={LandingScreen} />
		</Tab.Navigator>
	);
};

export default MainNavigator;
