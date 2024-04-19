import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';

const Tab = createBottomTabNavigator();

const StaffNavigator = () => {
	return (
		<Tab.Navigator initialRouteName='StaffHome'>
			<Tab.Screen name='StaffHome' component={LandingScreen} />
		</Tab.Navigator>
	);
};

export default StaffNavigator;
