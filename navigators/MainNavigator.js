import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
	return (
		<Tab.Navigator initialRouteName='Landing'>
			<Tab.Screen name='Landing' component={LandingScreen} />
		</Tab.Navigator>
	);
};

export default MainNavigator;
