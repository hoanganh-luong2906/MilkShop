import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import VoucherScreen from '../screens/VoucherScreen';
import LandingScreen from '../screens/LandingScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View } from 'react-native';
import useAuth from '../utils/useAuth';
const Tab = createBottomTabNavigator();

const CustomerNavigator = () => {
	const [cart, setCart] = useState([]);
	const { isChanged, user } = useAuth();

	useEffect(() => {
		const loadCart = async () => {
			const cartDB = await AsyncStorage.getItem('cart');
			if (cartDB) {
				let tmpCart = JSON.parse(cartDB);
				tmpCart = tmpCart.filter((product) => {
					return product?.user === (user?._id ? user?._id : 'guest');
				});
				setCart([...tmpCart]);
			}
		};
		loadCart();
	}, [isChanged]);

	return (
		<Tab.Navigator
			initialRouteName='CustomerHome'
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
						<View style={{ position: 'relative' }}>
							<Icon name='cart' size={+size} color={color} />
							{cart?.length > 0 && (
								<Text
									style={{
										fontSize: 12,
										backgroundColor: 'red',
										color: 'white',
										position: 'absolute',
										top: -3,
										right: -3,
										paddingHorizontal: 4,
										fontWeight: 'bold',
										borderRadius: 10,
									}}
								>
									{cart.length}
								</Text>
							)}
						</View>
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

export default CustomerNavigator;
