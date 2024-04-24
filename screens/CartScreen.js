import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import React, { useCallback, useState } from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuth from '../utils/useAuth';
import { useFocusEffect } from '@react-navigation/native';

function formatToVND(value) {
	const formatter = new Intl.NumberFormat('vi-VN', {
		style: 'decimal' /* Use "decimal" style instead of "currency" */,
		minimumFractionDigits: 0, // Adjust for desired decimal places
	});

	const formattedNumber = formatter.format(value);
	return `${formattedNumber} VNĐ`; // Prepend "VND " manually
}

function formatDateToString(date) {
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString();
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const CartScreen = ({ navigation }) => {
	const [cart, setCart] = useState([]);
	const [originCart, setOriginCart] = useState([]);
	const { isChanged, user, setIsChanged, isLoggedIn } = useAuth();
	const [total, setTotal] = useState(0);
	const [totalDisc, setTotalDisc] = useState(0);

	useFocusEffect(
		useCallback(() => {
			const loadCart = async () => {
				const cartDB = await AsyncStorage.getItem('cart');
				if (cartDB) {
					setOriginCart(JSON.parse(cartDB));

					let tmpCart = JSON.parse(cartDB);
					tmpCart = tmpCart.filter((product) => {
						return (
							product?.user === (user?._id ? user?._id : 'guest')
						);
					});
					setCart([...tmpCart]);

					setTotal(0);
					tmpCart.map((item) => {
						setTotal(
							(prev) =>
								prev +
								(item.product.price -
									(item.product.price * item.product.sales) /
										100) *
									item.quantity
						);
						setTotalDisc(
							(prev) =>
								prev +
								((item.product.price * item.product.sales) /
									100) *
									item.quantity
						);
					});
				}
			};
			loadCart();
		}, [isChanged])
	);

	function subtractQuantityProduct(addedProduct) {
		try {
			let newCart = originCart.map((item) => {
				if (
					(item?.product._id ?? '') === addedProduct._id &&
					item?.user === (user?._id ? user?._id : 'guest')
				) {
					if (item.quantity !== 0) {
						item.quantity -= 1;
					}
				}
				return item; // Add this line to return the updated item
			});
			newCart = newCart.filter((item) => item?.quantity > 0); // Assign the filtered array back to newCart
			//setCart([...newCart]);
			AsyncStorage.setItem('cart', JSON.stringify(newCart));
			setIsChanged(!isChanged);
		} catch (error) {
			alert('Có lỗi xảy ra: ' + error);
		}
	}

	function addQuantityProduct(product) {
		try {
			let newCart = originCart.map((item) => {
				if (
					(item?.product._id ?? '') === product._id &&
					item?.user === (user?._id ? user?._id : 'guest')
				) {
					if (item.quantity >= product.quantity) {
						alert(
							'Bạn đã thêm vào giỏ hàng số lượng sản phẩm tối đa.'
						);
						return;
					}
					item.quantity += 1;
				}
				return item;
			});
			//setCart([...newCart]);
			AsyncStorage.setItem('cart', JSON.stringify(newCart));
			setIsChanged(!isChanged);
		} catch (error) {
			alert('Có lỗi xảy ra: ' + error);
		}
	}

	const handleCheckout = async () => {
		if (isLoggedIn) {
			let productList = cart.map((item) => {
				return {
					name: item.product.name,
					brandName: item.product.brandName,
					category: item.product.category.name,
					price: item.product.price,
					quantity: item.quantity,
					sales: item.product.sales,
					status: item.product.status,
					importedDate: item.product.importedDate,
					expiredDate: item.product.expiredDate,
					imageURL: item.product.imageURL,
					_id: item.product._id,
				};
			});
			const checkoutBody = {
				order: {
					shippingList: [],
					productList: [...productList],
					totalPrice: total,
					totalDiscount: totalDisc,
					shippingFee: 0,
					paymentMethod: 'Thanh toán bằng tiền mặt',
					timeOrder: formatDateToString(new Date()),
					timePayed: formatDateToString(new Date()),
					timeStartShip: formatDateToString(new Date()),
					timeCompletion: '',
				},
				user: user,
			};
			try {
				const response = await fetch(
					'https://milk-shop-eight.vercel.app/api/order/',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(checkoutBody),
					}
				);
				const data = await response.json();
				if (data.status === 201) {
					alert(
						'Tạo đơn hàng thành công, vui lòng theo dõi đơn trong hồ sơ.'
					);
					deleteCart();
				} else {
					throw new Error(data?.message ?? 'Lỗi server');
				}
			} catch (error) {
				alert('Có lỗi ở đây: ', error);
			}
			console.log(JSON.stringify(checkoutBody));
		} else {
			navigation.navigate('login');
		}
	};

	function deleteCart() {
		try {
			let newCart = originCart.filter((item) => {
				return item.user !== (user?._id ? user?._id : 'guest');
			});
			setCart([]);
			AsyncStorage.setItem('cart', JSON.stringify(newCart));
			setIsChanged(!isChanged);
		} catch (error) {
			alert('Có lỗi xảy ra: ' + error);
		}
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1.2 }}
				colors={['#FFF3ED', '#FFF3ED', '#FFFFFF', '#FFFFFF']}
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
					<Pressable style={styles.button} onPress={deleteCart}>
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
													letterSpacing: 0.3,
													lineHeight: 24,
												}}
											>
												{formatToVND(
													item.product.price -
														(item.product.price *
															item.product
																.sales) /
															100
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
													onPress={() =>
														subtractQuantityProduct(
															item?.product
														)
													}
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
														lineHeight: 23,
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
													onPress={() =>
														addQuantityProduct(
															item?.product
														)
													}
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
			<View style={styles.summaryContainer}>
				<View
					style={{
						width: '65%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'flex-end',
						paddingHorizontal: 15,
					}}
				>
					<Text style={{ fontSize: 16 }}>
						Tạm tính:{' '}
						<Text style={{ fontWeight: '500' }}>
							{formatToVND(total)}
						</Text>
					</Text>
					<Text
						style={{
							fontSize: 14,
							fontStyle: 'italic',
							opacity: 0.5,
							textAlign: 'right',
						}}
					>
						Tiến hành thanh toán và nhận hàng ngay trong hôm nay
					</Text>
				</View>
				<View
					style={{
						width: '35%',
						paddingVertical: 10,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Pressable
						style={[
							{
								width: 115,
								paddingHorizontal: 10,
								paddingVertical: 10,
								backgroundColor: 'tomato',
								borderRadius: 20,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							},
							cart.length === 0
								? { backgroundColor: 'gray' }
								: { backgroundColor: 'tomato' },
						]}
					>
						<Text
							style={{ fontWeight: 'bold', color: 'white' }}
							onPress={handleCheckout}
						>
							THANH TOÁN
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: 'relative',
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
		marginTop: 20,
		paddingHorizontal: 30,
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
		marginBottom: 95,
	},
	productContent: {
		width: '98%',
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginVertical: 5,
		marginHorizontal: 2,
		borderRadius: 10,
		elevation: 2,
		backgroundColor: 'white',
		overflow: 'hidden',
	},
	summaryContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		height: 80,
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		elevation: 10,
		zIndex: 999,
	},
});

export default CartScreen;
