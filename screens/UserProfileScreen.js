import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { useCallback, useEffect, useState } from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import useAuth from '../utils/useAuth';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';

const ORDER_STATUS = [
	{
		title: 'Chờ giao',
		icon: 'https://cdn-icons-png.flaticon.com/128/850/850960.png',
		color: 'tomato',
		values: ['Đang chuẩn bị hàng', 'Đang xử lý'],
	},
	{
		title: 'Đang giao',
		icon: 'https://cdn-icons-png.flaticon.com/128/609/609361.png',
		color: 'green',
		values: ['Đang giao hàng', 'Người gửi hẹn lại ngày giao'],
	},
	{
		title: 'Hoàn thành',
		icon: 'https://cdn-icons-png.flaticon.com/128/10982/10982450.png',
		color: 'blue',
		values: ['Đã giao thành công'],
	},
	{
		title: 'Đã hủy',
		icon: 'https://cdn-icons-png.flaticon.com/128/1322/1322149.png',
		color: 'red',
		values: ['Đã huỷ'],
	},
	{
		title: 'Tất cả',
		icon: 'https://cdn-icons-png.flaticon.com/128/3979/3979423.png',
		color: 'black',
		values: [
			'Đã giao thành công',
			'Đang giao hàng',
			'Người gửi hẹn lại ngày giao',
			'Đang chuẩn bị hàng',
			'Đang xử lý',
		],
	},
];

function formatToVND(value) {
	const formatter = new Intl.NumberFormat('vi-VN', {
		style: 'decimal' /* Use "decimal" style instead of "currency" */,
		minimumFractionDigits: 0, // Adjust for desired decimal places
	});

	const formattedNumber = formatter.format(value);
	return `${formattedNumber} VNĐ`; // Prepend "VND " manually
}

const UserprofileScreen = ({ navigation }) => {
	const { isLoggedIn, user } = useAuth();
	const [order, setOrder] = useState([]);
	const [originOrder, setOriginOrder] = useState([]);
	const [selectedStatus, setSelectedStatus] = useState();
	const { logout } = useAuth();

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				const response = await fetch(
					'https://milk-shop-eight.vercel.app/api/order'
				);
				const data = await response.json();
				if (data) {
					let tmpData = data.data.filter((order) => {
						let index = order.shippingList.length;
						return (
							order.shippingList[index - 1]?.receiver ===
							user.fullName
						);
					});
					setOrder([...tmpData]);
					setOriginOrder([...tmpData]);
				}
			};
			if (isLoggedIn) {
				fetchData();
			}
			setSelectedStatus(ORDER_STATUS[ORDER_STATUS.length - 1]);
		}, [isLoggedIn])
	);

	function filterOrder() {
		let tmpData = originOrder.filter((order) => {
			let index = order.shippingList.length;
			return selectedStatus.values.includes(
				order.shippingList[index - 1].statusString
			);
		});
		setOrder([...tmpData]);
	}

	function getShortStatus(longStatus) {
		let shortStatus = '';
		switch (longStatus) {
			case 'Đã giao thành công':
				shortStatus = 'Hoàn thành';
				break;
			case 'Đang giao hàng':
				shortStatus = 'Đang giao';
				break;
			case 'Người gửi hẹn lại ngày giao':
				shortStatus = 'Đang giao';
				break;
			case 'Đang chuẩn bị hàng':
				shortStatus = 'Chờ giao';
				break;
			case 'Đang xử lý':
				shortStatus = 'Chờ giao';
				break;
			case 'Đã huỷ':
				shortStatus = 'Đã hủy';
				break;
			default:
				shortStatus = 'Đang giao';
				break;
		}
		return shortStatus;
	}

	function getStatusColor(status) {
		let statusColor = '';
		switch (status) {
			case 'Đã giao thành công':
				statusColor = 'green';
				break;
			case 'Đang giao hàng':
				statusColor = 'blue';
				break;
			case 'Người gửi hẹn lại ngày giao':
				statusColor = 'blue';
				break;
			case 'Đang chuẩn bị hàng':
				statusColor = 'tomato';
				break;
			case 'Đang xử lý':
				statusColor = 'tomato';
				break;
			case 'Đã huỷ':
				statusColor = 'red';
				break;
			default:
				statusColor = 'gray';
				break;
		}
		return statusColor;
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1.2 }}
				colors={['#FFF3ED', '#FFF3ED', '#FFFFFF', '#FFFFFF', '#FFFFFF']}
				style={styles.linearGradient}
			>
				<View style={styles.headerContainer}>
					<Image
						source={require('../assets/user-logo.jpg')}
						style={{
							width: 70,
							height: 70,
							borderWidth: 2,
							borderRadius: 35,
							borderColor: 'white',
						}}
					/>
					{!isLoggedIn ? (
						<View style={{ width: '65%' }}>
							<Pressable
								style={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: 'tomato',
									paddingVertical: 12,
									paddingHorizontal: 10,
									borderRadius: 30,
								}}
								onPress={() => navigation.navigate('login')}
							>
								<Text
									style={{
										fontSize: 20,
										fontWeight: 'bold',
										letterSpacing: 0.5,
										color: 'white',
										lineHeight: 22,
									}}
								>
									Đăng nhập / Đăng ký
								</Text>
							</Pressable>
						</View>
					) : (
						<Pressable
							style={{ display: 'flex', flexDirection: 'row' }}
							onPress={() => navigation.navigate('profile-spec')}
						>
							<Text
								style={{
									fontSize: 20,
									fontWeight: 'bold',
									letterSpacing: 0.5,
									color: 'black',
									lineHeight: 22,
								}}
							>
								{user?.fullName}
							</Text>
							<Icon
								name='chevron-forward'
								size={20}
								color={'black'}
								style={{ lineHeight: 20 }}
							/>
						</Pressable>
					)}
				</View>
				<View>
					<View style={styles.orderContainer}>
						<View style={styles.orderHeader}>
							{ORDER_STATUS.map((category, index) => (
								<Pressable
									style={[
										styles.orderCategories,
										selectedStatus?.title === category.title
											? { backgroundColor: 'lightgray' }
											: { backgroundColor: 'white' },
									]}
									key={index}
									onPress={() => {
										setSelectedStatus(category);
										filterOrder();
									}}
								>
									<Image
										src={category.icon}
										resizeMode='contain'
										style={{ width: 35, height: 35 }}
									/>
									<Text style={styles.orderHeaderText}>
										{category.title}
									</Text>
								</Pressable>
							))}
						</View>
						<View>
							{isLoggedIn ? (
								<View>
									{order.length > 0 ? (
										<ScrollView
											showsVerticalScrollIndicator={false}
										>
											<View style={{ marginBottom: 100 }}>
												{order.map((order, index2) => (
													<Pressable
														key={index2}
														style={{
															paddingHorizontal: 15,
															marginVertical: 10,
														}}
													>
														<View
															style={
																styles.orderHeaderStatus
															}
														>
															<Text
																style={{
																	fontSize: 16,
																	fontWeight:
																		'500',
																}}
															>
																Đơn hàng{' '}
																{index2 + 1}
															</Text>
															<Text
																style={{
																	fontSize: 16,
																	color: getStatusColor(
																		order
																			.shippingList[
																			order
																				.shippingList
																				.length -
																				1
																		]
																			.statusString
																	),
																}}
															>
																{getShortStatus(
																	order
																		.shippingList[
																		order
																			.shippingList
																			.length -
																			1
																	]
																		.statusString
																)}
															</Text>
														</View>
														<View
															style={{
																borderBottomColor:
																	'gray',
																borderBottomWidth: 1,
																paddingVertical: 5,
															}}
														>
															<Text
																style={{
																	fontSize: 16,
																	fontWeight:
																		'500',
																}}
															>
																Sản phẩm
															</Text>
															{order.productList.map(
																(
																	product,
																	index
																) => (
																	<View
																		style={{
																			display:
																				'flex',
																			flexDirection:
																				'row',
																		}}
																		key={
																			index +
																			Math.random()
																		}
																	>
																		<View
																			style={{
																				backgroundColor:
																					'white',
																				width: '30%',
																			}}
																		>
																			<Image
																				src={
																					product.imageURL
																				}
																				resizeMode='contain'
																				style={{
																					width: 100,
																					height: 100,
																				}}
																			/>
																		</View>
																		<View
																			style={{
																				width: '65%',
																				display:
																					'flex',
																				flexDirection:
																					'column',
																				justifyContent:
																					'space-between',
																				paddingBottom: 10,
																			}}
																		>
																			<Text
																				style={{
																					fontSize: 18,
																					fontWeight:
																						'500',
																					textAlign:
																						'justify',
																				}}
																			>
																				{
																					product.name
																				}
																			</Text>
																			<View
																				style={{
																					display:
																						'flex',
																					flexDirection:
																						'row',
																					justifyContent:
																						'space-between',
																				}}
																			>
																				<Text
																					style={{
																						fontSize: 18,
																						fontWeight:
																							'bold',
																					}}
																				>
																					{formatToVND(
																						product.price
																					)}
																				</Text>
																				<Text
																					style={{
																						fontSize: 18,
																					}}
																				>
																					x{' '}
																					{
																						product.quantity
																					}
																				</Text>
																			</View>
																		</View>
																	</View>
																)
															)}
														</View>
														<View
															style={{
																display: 'flex',
																flexDirection:
																	'row',
																justifyContent:
																	'space-between',
																paddingRight: 15,
																borderBottomColor:
																	'gray',
																borderBottomWidth: 1,
																paddingVertical: 5,
															}}
														>
															<Text
																style={{
																	fontSize: 16,
																}}
															>
																Tổng thành tiền
															</Text>
															<Text
																style={{
																	fontSize: 16,
																	fontWeight:
																		'bold',
																}}
															>
																{formatToVND(
																	order.totalPrice
																)}
															</Text>
														</View>
														<View
															style={{
																padding: 2,
																borderBottomColor:
																	'gray',
																borderBottomWidth: 1,
																paddingVertical: 5,
															}}
														>
															<Text
																style={{
																	color: getStatusColor(
																		order
																			.shippingList[
																			order
																				.shippingList
																				.length -
																				1
																		]
																			.statusString
																	),
																}}
															>
																{
																	order
																		.shippingList[
																		order
																			.shippingList
																			.length -
																			1
																	]
																		.statusString
																}
															</Text>
														</View>
														<View
															style={{
																display: 'flex',
																flexDirection:
																	'row',
																justifyContent:
																	'flex-end',
															}}
														>
															<Pressable
																style={{
																	paddingVertical: 6,
																	paddingHorizontal: 15,
																	backgroundColor:
																		'tomato',
																	marginVertical: 10,
																	borderRadius: 5,
																}}
															>
																<Pressable
																	onPress={() =>
																		navigation.navigate(
																			'order',
																			{
																				orderId:
																					order._id,
																			}
																		)
																	}
																>
																	<Text
																		style={{
																			fontSize: 16,
																			fontWeight:
																				'bold',
																			letterSpacing: 0.2,
																			color: 'white',
																		}}
																	>
																		Chi tiết
																	</Text>
																</Pressable>
															</Pressable>
														</View>
													</Pressable>
												))}
											</View>
										</ScrollView>
									) : (
										<View
											style={{
												display: 'flex',
												justifyContent: 'center',
												alignItems: 'center',
												marginBottom: 20,
											}}
										>
											<LottieView
												source={require('../assets/no-order.json')}
												style={{
													width: 200,
													height: 200,
												}}
												autoPlay
												loop
											/>
											<Text
												style={{
													fontWeight: '500',
													opacity: 0.5,
													fontSize: 16,
												}}
											>
												Bạn không có đơn nào ở đây
											</Text>
										</View>
									)}
								</View>
							) : (
								<View
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										marginBottom: 20,
									}}
								>
									<LottieView
										source={require('../assets/orderStatus.json')}
										style={{ width: 200, height: 200 }}
										autoPlay
										loop
									/>
									<Text
										style={{
											fontWeight: 'bold',
											color: 'tomato',
										}}
										onPress={() =>
											navigation.navigate('login')
										}
									>
										Đăng nhập / Đăng ký{' '}
										<Text
											style={{
												fontWeight: 'normal',
												color: 'black',
											}}
										>
											Để theo dõi đơn hàng của bạn
										</Text>
									</Text>
								</View>
							)}
						</View>
					</View>
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
		paddingTop: 15,
		paddingHorizontal: 15,
		borderRadius: 5,
		overflow: 'visible',
	},
	headerContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
		marginBottom: 10,
	},
	orderContainer: {
		width: '99%',
		height: 500,
		backgroundColor: 'white',
		elevation: 2,
		marginHorizontal: 2,
		marginVertical: 5,
		borderRadius: 10,
		overflow: 'hidden',
	},
	orderHeader: {
		width: '100%',
		paddingHorizontal: 5,
		paddingVertical: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	orderCategories: {
		height: 65,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 5,
	},
	orderHeaderText: { fontSize: 13 },
	orderHeaderStatus: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
		paddingVertical: 5,
	},
});

export default UserprofileScreen;
