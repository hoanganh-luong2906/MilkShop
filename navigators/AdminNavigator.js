import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screens/LandingScreen';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
	return (
		<Tab.Navigator initialRouteName='AdminHome'>
			<Tab.Screen name='AdminHome' component={LandingScreen} />
		</Tab.Navigator>
	);
};

export default AdminNavigator;
