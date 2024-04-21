import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import React, { useCallback, useState } from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LandingVoucher from '../components/landing/Voucher';

function formatToVND(value) {
	const formatter = new Intl.NumberFormat('vi-VN', {
		style: 'decimal' /* Use "decimal" style instead of "currency" */,
		minimumFractionDigits: 0, // Adjust for desired decimal places
	});

	const formattedNumber = formatter.format(value);
	return `${formattedNumber} VNĐ`; // Prepend "VND " manually
}

const DetailScreen = ({ navigation, route }) => {
	const { product, vouchers } = route.params;
	const [comments, setComments] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const fetchComments = async () => {
				const response = await fetch(
					'https://milk-shop-eight.vercel.app/api/comment'
				);
				const data = await response.json();
				if (data) {
					const filteredComments = data.data.filter(
						(comment) => comment.productId === product._id
					);
					setComments([...filteredComments]);
				}
			};
			fetchComments();
		}, [])
	);

	function countExistingStar(comments, star) {
		let count = 0;
		comments.forEach((comment) => {
			if (comment.rating === star) {
				count++;
			}
		});
		return count;
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1.5 }}
				colors={['#FFF3ED', '#FFF3EE', '#FFFFFF']}
				style={styles.linearGradient}
			>
				<View style={styles.searchContainer}>
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
					<View>
						<TextInput
							style={styles.searchBox}
							placeholder='Tìm kiếm sản phẩm'
						/>
						<Icon
							name='search'
							size={25}
							color='gray'
							style={styles.searchIcon}
						/>
					</View>
					<Pressable
						style={styles.button}
						onPress={() =>
							navigation.reset({
								index: 0,
								routes: [{ name: 'landing' }],
							})
						}
					>
						<Icon name='home' size={23} color='gray' />
					</Pressable>
				</View>
				<ScrollView>
					<View style={styles.headerContainer}>
						<Image
							src={product.imageURL}
							style={styles.productImage}
							resizeMode='contain'
						/>
						<View>
							<View style={styles.productHeader}>
								{product?.sales > 0 ? (
									<View>
										<Text
											style={{
												textDecorationLine:
													'line-through',
												opacity: 0.4,
												fontSize: 20,
												fontWeight: 'bold',
												letterSpacing: 0.6,
											}}
										>
											{formatToVND(product.price)}
										</Text>
										<Text
											style={{
												fontSize: 25,
												fontWeight: 'bold',
												letterSpacing: 0.7,
											}}
										>
											{formatToVND(
												product.price -
													(product.price *
														product.sales) /
														100
											)}
										</Text>
									</View>
								) : (
									<View>
										<Text
											style={{
												fontSize: 25,
												fontWeight: 'bold',
												letterSpacing: 0.7,
											}}
										>
											{formatToVND(product.price)}
										</Text>
									</View>
								)}
								<View style={styles.ratingContainer}>
									<View style={styles.productRating}>
										{[1, 2, 3, 4, 5].map((star, index) => (
											<View key={index}>
												<Icon
													name='star'
													size={25}
													color={
														Math.round(
															product.percentageRating
														) >= star
															? '#FF8137'
															: 'gray'
													}
												/>
											</View>
										))}
									</View>
									<View style={styles.soldContainer}>
										<Text
											style={{
												fontSize: 18,
												lineHeight: 20,
											}}
										>
											Đã bán
										</Text>
										<Text
											style={{
												fontSize: 18,
												fontWeight: 500,
												lineHeight: 20,
											}}
										>
											{`  ${
												product.count < 1000
													? product.count
													: '999+'
											}`}
										</Text>
									</View>
								</View>
							</View>
							<Text style={styles.productName}>
								{product.name}
							</Text>
						</View>
					</View>
					{vouchers ? (
						<View style={{ width: '100%', paddingHorizontal: 14 }}>
							<LandingVoucher vouchers={vouchers} />
						</View>
					) : (
						<View></View>
					)}
					<View style={styles.descriptionContainer}>
						<View style={styles.contentContainer}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 18,
									fontWeight: 'bold',
									marginBottom: 10,
								}}
							>
								Thông tin chi tiết
							</Text>
							<View style={styles.evenTable}>
								<Text style={{ fontSize: 16, lineHeight: 18 }}>
									Danh mục
								</Text>
								<Text style={styles.hightlightText}>
									{product.category.name}
								</Text>
							</View>
							<View style={styles.oddTable}>
								<Text style={{ fontSize: 16, lineHeight: 18 }}>
									Thương hiệu
								</Text>
								<Text style={styles.hightlightText}>
									{product.brandName}
								</Text>
							</View>
							<View style={styles.evenTable}>
								<Text style={{ fontSize: 16, lineHeight: 18 }}>
									Sản xuất tại
								</Text>
								<Text style={styles.hightlightText}>
									Việt Nam
								</Text>
							</View>
							<Text style={styles.productDescription}>
								{product.description}
							</Text>
						</View>
					</View>
					<View style={styles.descriptionContainer}>
						<View style={styles.contentContainer}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 18,
									fontWeight: 'bold',
									marginBottom: 10,
								}}
							>
								Đánh giá
							</Text>
							<View
								style={{
									width: 250,
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'flex-start',
									marginVertical: 10,
								}}
							>
								<View
									style={{
										width: '45%',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										alignContent: 'center',
									}}
								>
									<Text
										style={{
											fontSize: 40,
											fontWeight: 'bold',
											lineHeight: 40,
											textAlign: 'center',
											color: '#FF8137',
										}}
									>
										{product.percentageRating.toFixed(1)}
									</Text>
									<Text
										style={{
											fontSize: 25,
											textAlign: 'center',
											color: 'gray',
											fontWeight: 'bold',
											letterSpacing: 0.5,
										}}
									>
										Có{' '}
										<Text
											style={{
												fontSize: 30,
												fontWeight: 'bold',
												color: 'black',
											}}
										>
											{comments.length}
										</Text>{' '}
										lượt đánh giá
									</Text>
								</View>
								<View>
									{[5, 4, 3, 2, 1].map((star, index) => (
										<View
											key={index}
											style={{
												width: '100%',
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'flex-end',
												alignItems: 'center',
											}}
										>
											{Array.from({ length: star }).map(
												(_, innerIndex) => (
													<View
														key={
															innerIndex *
															Math.random(10, 100)
														}
													>
														<Icon
															name='star'
															size={25}
															color={'#FF8137'}
														/>
													</View>
												)
											)}
											<View
												style={{
													position: 'relative',
													width: 110,
												}}
											>
												<View
													style={{
														position: 'absolute',
														top: 0,
														left: 0,
														width: 100,
														height: 10,
														backgroundColor:
															'lightgray',
														marginVertical: 5,
														marginHorizontal: 5,
														borderRadius: 4,
													}}
												></View>
												<View
													style={{
														width:
															countExistingStar(
																comments,
																star
															) *
																(100 /
																	(comments.length ==
																	0
																		? 1
																		: comments.length)) ??
															0,
														height: 10,
														backgroundColor:
															'#FF8137',
														marginVertical: 5,
														marginHorizontal: 5,
														borderRadius: 4,
													}}
												></View>
											</View>
										</View>
									))}
								</View>
							</View>
							{comments?.length > 0 ? (
								<View>
									{comments.map((comment, index) => (
										<View
											style={styles.commentContainer}
											key={index}
										>
											<View style={styles.commentContent}>
												<View
													style={styles.commentHeader}
												>
													<Text
														style={{
															fontSize: 17,
															fontWeight: 500,
														}}
													>
														{
															comment.author
																.fullName
														}
													</Text>
													<View
														style={
															styles.commentRating
														}
													>
														{[1, 2, 3, 4, 5].map(
															(star, index) => (
																<View
																	key={index}
																>
																	<Icon
																		name='star'
																		size={
																			18
																		}
																		color={
																			comment.rating >=
																			star
																				? '#FF8137'
																				: 'gray'
																		}
																	/>
																</View>
															)
														)}
													</View>
												</View>
												<Text style={{ opacity: 0.4 }}>
													{comment.date}
												</Text>
												<Text
													style={{
														fontSize: 16,
														opacity: 0.8,
													}}
												>
													{comment.comment}
												</Text>
											</View>
										</View>
									))}
								</View>
							) : (
								<View>
									<LottieView
										source={require('../assets/no_Comment.json')}
										autoPlay
										loop
										style={{
											width: 200,
											height: 200,
											alignSelf: 'center',
										}}
									/>
									<Text
										style={{
											textAlign: 'center',
											fontWeight: 500,
											marginBottom: 10,
										}}
									>
										Hiện chưa có bình luận nào
									</Text>
								</View>
							)}
						</View>
					</View>
				</ScrollView>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 600,
	},
	linearGradient: {
		flex: 1,
		paddingTop: 35,
		// paddingHorizontal: 15,
		borderRadius: 5,
		overflow: 'visible',
	},
	searchContainer: {
		position: 'relative',
		width: '100%',
		height: 50,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
		paddingHorizontal: 15,
	},
	searchBox: {
		width: 260,
		backgroundColor: 'white',
		paddingVertical: 8,
		paddingRight: 30,
		paddingLeft: 50,
		borderRadius: 50,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 16,
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
	searchIcon: {
		position: 'absolute',
		top: 9,
		left: 15,
	},
	headerContainer: {
		width: '100%',
		backgroundColor: 'white',
		paddingVertical: 10,
		elevation: 3,
		marginBottom: 20,
	},
	productImage: {
		width: '100%',
		height: 250,
	},
	productHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	starContainer: {
		width: '13%',
	},
	productRating: {
		width: '100%',
		marginTop: 3,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	ratingContainer: {
		width: '40%',
		display: 'flex',
		flexDirection: 'column',
	},
	soldContainer: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 8,
		opacity: 0.6,
		paddingRight: 5,
	},
	productName: {
		fontSize: 23,
		paddingHorizontal: 15,
		fontWeight: 'bold',
		marginVertical: 10,
		lineHeight: 25,
		letterSpacing: 0.7,
	},
	descriptionContainer: {
		width: '100%',
		paddingHorizontal: 15,
		marginBottom: 20,
	},
	contentContainer: {
		width: '100%',
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
		elevation: 1,
		marginBottom: 2,
	},
	oddTable: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 30,
		paddingVertical: 10,
		borderRadius: 10,
		marginVertical: 3,
	},
	evenTable: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 30,
		paddingVertical: 10,
		borderRadius: 10,
		marginVertical: 3,
		backgroundColor: '#E6E6E6',
	},
	hightlightText: {
		position: 'absolute',
		top: 8,
		left: 160,
		fontSize: 16,
		fontWeight: '500',
	},
	productDescription: {
		marginVertical: 10,
		paddingHorizontal: 5,
		fontSize: 16,
	},
	commentContainer: {
		marginVertical: 8,
		backgroundColor: '#FAFAFA',
		paddingVertical: 15,
		paddingHorizontal: 10,
		borderRadius: 10,
	},
	commentHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	commentRating: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
});

export default DetailScreen;
