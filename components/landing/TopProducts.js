import { LinearGradient } from 'expo-linear-gradient';
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';

const LandingTopProduct = ({ topProducts, navigation, vouchers }) => {
	function getProductVoucher(product, vouchers) {
		try {
			let productVouchers = [];
			vouchers.forEach((voucher) => {
				voucher.categories_applied.forEach((category) => {
					if (category.name === product.category.name) {
						productVouchers.push(voucher);
					}
				});
			});
			return productVouchers;
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<View style={styles.topProductContainer}>
			<View style={styles.topProductTitle}>
				<Text style={styles.topProductTitleText}>MẸ BẦU TIN DÙNG</Text>
			</View>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 0.8 }}
				colors={['#FFBE98', 'rgba(254, 236, 226, 0)']}
				style={styles.linearGradientTopProduct}
			>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
				>
					{topProducts?.map((product, index) => (
						<Pressable
							style={styles.topProductContent}
							onPress={() => {
								navigation.navigate('detail', {
									product: product,
									vouchers: getProductVoucher(
										product,
										vouchers
									),
									navigation: navigation,
								});
							}}
							key={index}
						>
							<Image
								src={product.imageURL}
								resizeMode='contain'
								style={styles.topProductImage}
							/>
							<Text
								numberOfLines={2}
								style={{
									fontSize: 14,
									textAlign: 'center',
									lineHeight: 16,
								}}
							>
								{product.name}
							</Text>
						</Pressable>
					))}
				</ScrollView>
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	topProductContainer: {
		marginBottom: 15,
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	linearGradientTopProduct: {
		flex: 1,
		paddingTop: 35,
		borderRadius: 10,
	},
	topProductTitle: {
		width: '58%',
		backgroundColor: '#FF975A',
		borderRadius: 50,
		paddingVertical: 8,
		marginHorizontal: 20,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		transform: [{ translateY: 22 }],
		zIndex: 1,
	},
	topProductTitleText: {
		fontSize: 18.5,
		textAlign: 'center',
		width: 200,
		fontWeight: 'bold',
		color: 'white',
		letterSpacing: 1,
		lineHeight: 24,
	},
	topProductContent: {
		width: 120,
		backgroundColor: 'white',
		marginHorizontal: 8,
		marginBottom: 15,
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 5,
	},
	topProductImage: {
		width: '99%',
		height: 80,
		borderRadius: 8,
		marginBottom: 5,
		marginVertical: 2,
	},
});

export default LandingTopProduct;
