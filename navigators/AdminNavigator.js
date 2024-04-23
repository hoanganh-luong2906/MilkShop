import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import AccountScreen from '../screens/admin/AccountScreen';
import { AdminProfileScreen } from '../screens/admin/AdminProfileScreen';
import ChartScreen from '../screens/admin/ChartScreen';

const Tab = createBottomTabNavigator();

const AdminNavigator = () => {
	const screenOptions = ({ route }) => ({
		headerShown: false,
		tabBarHideOnKeyboard: true,
		tabBarActiveTintColor: 'tomato',
		// tabBarIcon: ({ focused, color }) => {
		// 	switch (route.name) {
		// 		case "Staff Home":
		// 			focused ? setIconName("home") : setIconName("home-outline");
		// 			break;
		// 	}
		// },
	});
	return (
		<Tab.Navigator initialRouteName='AdminHome' screenOptions={screenOptions}>
			<Tab.Screen
				name='AdminHome'
				component={AdminHomeScreen}
				options={{
					tabBarLabel: 'Home',
					tabBarShowLabel: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name={"home"} size={26} color={color} />
					),
					headerTitle: 'Home',
				}} />
			<Tab.Screen
				name='AdminAccounts'
				component={AccountScreen}
				options={{
					tabBarLabel: 'Accounts',
					tabBarShowLabel: false,
					tabBarIcon: ({ color, size }) => (
						<Feather name="users" size={26} color={color} />
					),
					headerTitle: 'Accounts',
				}} />
			<Tab.Screen
				name='AdminChart'
				component={ChartScreen}
				options={{
					tabBarLabel: 'Chart',
					tabBarShowLabel: false,
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="areachart" size={26} color={color} />
					),
					headerTitle: 'Chart',
				}} />
			<Tab.Screen
				name='AdminProfile'
				component={AdminProfileScreen}
				options={{
					tabBarLabel: 'Profile',
					tabBarShowLabel: false,
					tabBarIcon: ({ color, size }) => (
						<FontAwesome name="user" size={24} color={color} />
					),
					headerTitle: 'Profile',
				}} />
		</Tab.Navigator>
	);
};

export default AdminNavigator;
