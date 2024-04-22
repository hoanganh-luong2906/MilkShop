import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
	ScrollView,
	Pressable,
} from 'react-native';
import useAuth from '../utils/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

function formatToVND(value) {
	const formatter = new Intl.NumberFormat('vi-VN', {
		style: 'decimal' /* Use "decimal" style instead of "currency" */,
		minimumFractionDigits: 0, // Adjust for desired decimal places
	});

	const formattedNumber = formatter.format(value);
	return `${formattedNumber} VNĐ`; // Prepend "VND " manually
}

const CartScreen = ({ navigation }) => {
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
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1.2 }}
				colors={['#FFF3ED', '#FFF3ED', '#FFFFFF']}
				style={styles.linearGradient}
			>
				<View style={styles.navigationContainer}>
					<Pressable
						style={styles.button}
						onPress={() => navigation.goBack()}
					>
						<Icon
							name='arrow-back-outline'
							size={23}
							color='gray'
						/>
					</Pressable>
					<Text
						style={{
							fontSize: 25,
							fontWeight: 'bold',
							letterSpacing: 1,
						}}
					>
						Giỏ hàng
					</Text>
					<Pressable
						style={styles.button}
						onPress={() =>
							navigation.reset({
								index: 0,
								routes: [{ name: 'landing' }],
							})
						}
					>
						<Icon
							name='trash-bin'
							size={23}
							color='red'
							style={{ opacity: 0.6 }}
						/>
					</Pressable>
				</View>
				<View style={styles.productContainer}>
					{cart.length > 0 ? (
						<ScrollView showsVerticalScrollIndicator={false}>
							{cart.map((item, index) => (
								<View
									key={index}
									style={[styles.productContent]}
								>
									<View
										style={{
											backgroundColor: 'white',
										}}
									>
										<Image
											src={item.product.imageURL}
											style={{
												width: 100,
												height: 100,
											}}
											resizeMode='contain'
										/>
									</View>
									<View
										style={{
											width: 260,
											display: 'flex',
											justifyContent: 'space-between',
											flexDirection: 'column',
											paddingHorizontal: 10,
										}}
									>
										<Text
											style={{
												fontSize: 20,
												fontWeight: '500',
												lineHeight: 24,
											}}
											numberOfLines={2}
										>
											{item.product.name}
										</Text>
										<View
											style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<Text
												style={{
													fontSize: 21,
													fontWeight: 'bold',
													letterSpacing: 1,
													lineHeight: 24,
												}}
											>
												{formatToVND(
													item.product.price
												)}
											</Text>
											<View
												style={{
													display: 'flex',
													flexDirection: 'row',
													alignItems: 'center',
													marginBottom: 5,
												}}
											>
												<Pressable
													style={{
														padding: 2,
														backgroundColor:
															'lightgray',
														borderRadius: 5,
														marginRight: 10,
													}}
												>
													<Icon
														name='remove-outline'
														size={20}
														color={'black'}
													/>
												</Pressable>
												<Text
													style={{
														fontSize: 20,
														fontWeight: 'bold',
													}}
												>
													{item.quantity}
												</Text>
												<Pressable
													style={{
														padding: 2,
														backgroundColor:
															'lightgray',
														borderRadius: 5,
														marginLeft: 10,
													}}
												>
													<Icon
														name='add-outline'
														size={20}
														color={'black'}
													/>
												</Pressable>
											</View>
										</View>
									</View>
								</View>
							))}
						</ScrollView>
					) : (
						<View
							style={{
								width: '100%',
								height: 350,
								display: 'flex',
								justifyContent: 'center',
								marginTop: '20%',
							}}
						>
							<LottieView
								style={{ flex: 1, width: '100%' }}
								source={require('../assets/empty.json')}
								autoPlay
								loop
							/>
							<Text
								style={{
									textAlign: 'center',
									width: '100%',
									fontSize: 16,
									marginTop: 20,
									fontWeight: 'bold',
									opacity: 0.5,
									letterSpacing: 0.5,
								}}
							>
								Bạn chưa thêm sản phẩm nào vào giỏ hàng
							</Text>
						</View>
					)}
				</View>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	linearGradient: {
		flex: 1,
	},
	navigationContainer: {
		position: 'relative',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 40,
		paddingHorizontal: 30,
		paddingBottom: 10,
	},
	button: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	productContainer: {
		flex: 1,
		padding: 15,
	},
	productContent: {
		width: '98%',
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginVertical: 10,
		marginHorizontal: 2,
		borderRadius: 10,
		elevation: 2,
		backgroundColor: 'white',
		overflow: 'hidden',
	},
});

export default CartScreen;
