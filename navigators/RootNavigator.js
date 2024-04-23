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
import LoadingScreen from '../screens/Loading';
import UpdateProduct from '../components/admin/UpdateProduct';
import AddVoucher from '../components/staff/AddVoucher';
import CartScreen from '../screens/CartScreen';
import ProductDetailScreen from '../screens/admin/ProductDetailScreen';
import StaffUpdateProduct from '../components/staff/StaffUpdateProduct';
import UpdateAdminProfile from '../components/admin/UpdateAdminProfile';
import UserprofileScreen from '../screens/UserProfileScreen';
import UpdateProfile from '../screens/UpdateProfile';
import ViewOrderScreen from '../screens/staff/ViewOrderScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
	const { isLoggedIn, user, isLoading } = useAuth();

	return (
		<>
			{isLoading ? (
				<LoadingScreen />
			) : (
				<NavigationContainer>
					{!isLoggedIn ? (
						<Stack.Navigator
							initialRouteName='landing'
							screenOptions={{ statusBarColor: 'black' }}
						>
							<Stack.Screen
								name='landing'
								component={MainNavigator}
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
									headerTitle: 'ĐĂNG KÝ',
									headerShown: true,
									headerTitleAlign: 'center',
									headerTintColor: 'black',
									headerStyle: {
										backgroundColor: '#FFBE98',
									},
									headerTitleStyle: {
										fontSize: 25,
										fontWeight: 'bold',
									},
									statusBarColor: 'black',
									headerBackVisible: false,
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
								name='voucher'
								component={VoucherScreen}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name='cart'
								component={CartScreen}
								options={{
									headerShown: false,
								}}
							/>
						</Stack.Navigator>
					) : (
						<Stack.Navigator
							initialRouteName={`${user?.role?.toLowerCase()}-home`}
							screenOptions={{
								headerShown: false,
								statusBarColor: 'black',
							}}
						>
							{user?.role?.toLowerCase() === 'admin' ? (
								<>
									<Stack.Screen
										name='admin-home'
										component={AdminNavigator}
										options={{
											statusBarColor: 'black',
										}}
									/>
									<Stack.Screen
										name='admin-product-detail'
										component={ProductDetailScreen}
										options={{
											statusBarColor: 'black',
										}}
									/>
									<Stack.Screen
										name='admin-create-product'
										component={AddProduct}
										options={{
											headerTitle: 'Thêm sản phẩm',
											headerShown: true,
											headerTitleAlign: 'center',
											headerTintColor: 'black',
											headerStyle: {
												backgroundColor: '#FFBE98',
											},
											headerTitleStyle: { fontSize: 25 },
											statusBarColor: 'black',
										}}
									/>
									<Stack.Screen
										name='admin-update-product'
										component={UpdateProduct}
										options={{
											headerTitle: 'Cập nhật sản phẩm',
											headerShown: true,
											headerTitleAlign: 'center',
											headerTintColor: 'black',
											headerStyle: {
												backgroundColor: '#FFBE98',
											},
											headerTitleStyle: { fontSize: 25 },
											statusBarColor: 'black',
										}}
									/>
									<Stack.Screen
										name='admin-update-profile'
										component={UpdateAdminProfile}
										options={{
											headerTitle: 'Cập nhật profile',
											headerShown: true,
											headerTitleAlign: 'center',
											headerTintColor: 'black',
											headerStyle: {
												backgroundColor: '#FFBE98',
											},
											headerTitleStyle: { fontSize: 25 },
											statusBarColor: 'black',
										}}
									/>
								</>
							) : user?.role?.toLowerCase() === 'staff' ? (
								<>
									<Stack.Screen
										name='staff-home'
										component={StaffNavigator}
									/>
									<Stack.Screen
										name='staff-product-detail'
										component={ProductDetailScreen}
										options={{
											statusBarColor: 'black',
										}}
									/>
									<Stack.Screen
										name='staff-create-voucher'
										component={AddVoucher}
										options={{
											headerTitle: 'Thêm mã giảm giá',
											headerShown: true,
											headerTitleAlign: 'center',
											headerTintColor: 'black',
											headerStyle: {
												backgroundColor: '#FFBE98',
											},
											headerTitleStyle: { fontSize: 25 },
											statusBarColor: 'black',
										}}
									/>
									<Stack.Screen
										name='staff-update-product'
										component={StaffUpdateProduct}
										options={{
											headerTitle: 'Cập nhật sản phẩm',
											headerShown: true,
											headerTitleAlign: 'center',
											headerTintColor: 'black',
											headerStyle: {
												backgroundColor: '#FFBE98',
											},
											headerTitleStyle: { fontSize: 25 },
											statusBarColor: 'black',
										}}
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
										component={UserprofileScreen}
									/>
									<Stack.Screen
										name='profile-spec'
										component={ProfileScreen}
									/>
									<Stack.Screen
										name='Update Profile'
										component={UpdateProfile}
									/>
									<Stack.Screen
										name='order'
										component={ViewOrderScreen}
									/>
									<Stack.Screen
										name='detail'
										component={DetailScreen}
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
									<Stack.Screen
										name='cart'
										component={CartScreen}
										options={{
											headerShown: false,
										}}
									/>
								</>
							)}
						</Stack.Navigator>
					)}
				</NavigationContainer>
			)}
		</>
	);
};

export default RootNavigator;
