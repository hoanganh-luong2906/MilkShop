import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VoucherScreen from '../screens/VoucherScreen';
import LandingScreen from '../screens/LandingScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName='Landing'
			screenOptions={{ headerShown: false }}
		>
			<Tab.Screen
				name='Landing'
				component={LandingScreen}
				options={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'tomato',
					tabBarIcon: ({ color, size }) => (
						<Icon name='home' size={+size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name='category'
				component={CategoryScreen}
				options={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'tomato',
					tabBarIcon: ({ color, size }) => (
						<Icon name='grid' size={+size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name='cart'
				component={CartScreen}
				options={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'tomato',
					tabBarIcon: ({ color, size }) => (
						<Icon name='cart' size={+size} color={color} />
					),
				}}
			/>
			<Tab.Screen
				name='profile'
				component={ProfileScreen}
				options={{
					tabBarShowLabel: false,
					tabBarActiveTintColor: 'tomato',
					tabBarIcon: ({ color, size }) => (
						<Icon name='person' size={+size} color={color} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default MainNavigator;
