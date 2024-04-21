import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/admin/LandingScreen';

const Tab = createBottomTabNavigator();

const CustomerNavigator = () => {
	return (
		<Tab.Navigator initialRouteName='CustomerHome'>
			<Tab.Screen name='CustomerHome' component={LandingScreen} />
		</Tab.Navigator>
	);
};

export default CustomerNavigator;
