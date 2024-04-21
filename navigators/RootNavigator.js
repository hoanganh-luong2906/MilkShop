import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VoucherScreen from '../screens/VoucherScreen';
import useAuth from '../utils/useAuth';
import AdminNavigator from './AdminNavigator';
import CustomerNavigator from './CustomerNavigator';
import MainNavigator from './MainNavigator';
import StaffNavigator from './StaffNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import AddProduct from '../components/admin/AddProduct';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
	const { isLoggedIn, user } = useAuth();

	return (
		<NavigationContainer>
			{!isLoggedIn && !user ? (
				<Stack.Navigator initialRouteName='landing'>
					<Stack.Screen
						name='landing'
						component={MainNavigator}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='detail'
						component={DetailScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='login'
						component={LoginScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='register'
						component={RegisterScreen}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='voucher'
						component={VoucherScreen}
						options={{
							headerShown: false,
						}}
					/>
				</Stack.Navigator>
			) : (
				<Stack.Navigator
					initialRouteName={`${user?.role?.toLowerCase()}-home`}
					screenOptions={{ headerShown: false }}
				>
					{user?.role?.toLowerCase() === 'admin' ? (
						<>
							<Stack.Screen
								name='admin-home'
								component={AdminNavigator}
							/>
							<Stack.Screen
								name='admin-product-form'
								component={AddProduct}
								options={{
									headerTitle: "Product Form",
									headerShown: true,
									headerTitleAlign: 'center',
									headerTintColor: 'black',
									headerStyle: { backgroundColor: '#FFBE98' },
									headerTitleStyle: { fontSize: 30 },
									statusBarColor: "black"
								}}
							/>
						</>
					) : user?.role?.toLowerCase() === 'staff' ? (
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
							<Stack.Screen
								name='profile'
								component={ProfileScreen}
							/>
						</>
					)}
				</Stack.Navigator>
			)}
		</NavigationContainer>
	);
};

export default RootNavigator;
