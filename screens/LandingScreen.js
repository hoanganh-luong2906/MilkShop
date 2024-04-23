import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LandingCategory from '../components/landing/Category';
import LandingTopProduct from '../components/landing/TopProducts';
import LandingVoucher from '../components/landing/Voucher';
import useAuth from '../utils/useAuth';

const calculateAvgRating = (ratings) => {
	let totalRatings = 0;
	let count = 0;
	let avgRating = 0;
	if (ratings && ratings?.length !== 0) {
		ratings?.forEach((rating) => {
			totalRatings += rating.rating;
			count++;
		});
		return (avgRating = totalRatings / count);
	} else if (!ratings) {
		return avgRating;
	}
};

const LandingScreen = ({ navigation }) => {
	const [products, setProducts] = useState([]);
	const [topProducts, setTopProducts] = useState([]);
	const [vouchers, setVouchers] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [isTopProductsLoaded, setIsTopProductsLoaded] = useState(false);
	const [isVoucherLoaded, setIsVoucherLoaded] = useState(false);
	const [isCategoryLoaded, setIsCategoryLoaded] = useState(false);
	const { isLoggedIn, user } = useAuth();

	useEffect(() => {
		const loadTopProducts = async () => {
			const { default: LandingTopProduct } = await import('../components/landing/TopProducts');
			setIsTopProductsLoaded(true);
		};

		const loadVoucher = async () => {
			const { default: LandingVoucher } = await import('../components/landing/Voucher');
			setIsVoucherLoaded(true);
		};

		const loadCategory = async () => {
			const { default: LandingCategory } = await import('../components/landing/Category');
			setIsCategoryLoaded(true);
		};

		loadTopProducts();
		loadVoucher();
		loadCategory();
	}, []);

	function updateStateValue({ productsValue, topProductsValue, categoriesValue, voucherData }) {
		setProducts([...productsValue]);
		setTopProducts([...topProductsValue]);
		setCategoryList([...categoriesValue]);
		setVouchers([...voucherData]);
	}

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch('https://milk-shop-eight.vercel.app/api/product/top');
			const data = await response.json();

			const responseVoucher = await fetch('https://milk-shop-eight.vercel.app/api/voucher');
			const dataVoucher = await responseVoucher.json();

			if (data && dataVoucher) {
				const tmpData = data.data.filter((data) => data.quantity > 0);

				const tmpTopProducts = data.data
					.filter((product) => product.quantity > 0)
					.sort((a, b) => b.count - a.count)
					.slice(0, 10);

				const categories = new Set();
				data.data.forEach((product) => {
					categories.add(product?.category?.name);
				});

				updateStateValue({
					productsValue: tmpData,
					topProductsValue: tmpTopProducts,
					categoriesValue: categories,
					voucherData: dataVoucher.data,
				});
			}
		};

		fetchProducts();
	}, []);

	return (
		<View style={styles.container}>
			<LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1.2 }} colors={['#FFF3ED', '#FFF3ED', '#FFFFFF']} style={styles.linearGradient}>
				<View style={styles.searchContainer}>
					<TextInput style={styles.searchBox} placeholder='Tìm kiếm sản phẩm' />
					<Icon name='search' size={25} color='gray' style={styles.searchIcon} />
					{isLoggedIn ? (
						<Pressable style={styles.button}>
							<Image
								source={require('../assets/user-logo.jpg')}
								style={{
									width: 35,
									height: 35,
									borderRadius: 30,
								}}
							/>
						</Pressable>
					) : (
						<Pressable style={styles.button} onPress={() => navigation.push('login')}>
							<Icon name='person' size={23} color='black' />
						</Pressable>
					)}
				</View>
				<ScrollView>
					{isTopProductsLoaded && <LandingTopProduct topProducts={topProducts} navigation={navigation} vouchers={vouchers} />}
					{isVoucherLoaded && <LandingVoucher vouchers={vouchers} navigation={navigation} />}
					{isCategoryLoaded && (
						<LandingCategory categoryList={categoryList} products={products} vouchers={vouchers} navigation={navigation} />
					)}
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
		paddingTop: 15,
		paddingHorizontal: 15,
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
		marginBottom: 5,
	},
	searchBox: {
		width: '80%',
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
		marginLeft: 10,
	},
	button: {
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 10,
	},
	searchIcon: {
		position: 'absolute',
		top: 12,
		left: 25,
	},
});

export default LandingScreen;
