import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function formatToVND(value) {
	const formatter = new Intl.NumberFormat('vi-VN', {
		style: 'decimal' /* Use "decimal" style instead of "currency" */,
		minimumFractionDigits: 0, // Adjust for desired decimal places
	});

	const formattedNumber = formatter.format(value);
	return `${formattedNumber} VNĐ`; // Prepend "VND " manually
}

const LandingCategory = ({ categoryList, products }) => {
	return (
		<View>
			{categoryList ? (
				categoryList.map((category) => (
					<View style={styles.categoryContainer}>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 20,
								marginBottom: 15,
							}}
						>
							{category}
						</Text>
						<ScrollView
							horizontal={true}
							showsHorizontalScrollIndicator={false}
						>
							{products
								.filter(
									(product) =>
										product.category.name === category
								)
								?.map((product) => (
									<Pressable style={styles.categoryProducts}>
										<Image
											src={product.imageURL}
											style={styles.categoryImages}
											resizeMode='contain'
										/>
										<Text
											numberOfLines={2}
											style={{
												width: '100%',
												textAlign: 'left',
												fontWeight: 500,
											}}
										>
											{product.name}
										</Text>
										<View style={styles.categoryBody}>
											<View style={styles.productRating}>
												{[1, 2, 3, 4, 5].map((star) => (
													<View key={Math.random()}>
														<Icon
															name='star'
															size={11}
															color={
																5 >= star
																	? '#FF8137'
																	: 'gray'
															}
														/>
													</View>
												))}
											</View>
											<Text
												style={{
													fontWeight: 500,
													opacity: 0.6,
													fontSize: 12,
													lineHeight: 20,
												}}
											>
												Đã bán{' '}
												{product.count < 1000
													? product.count
													: '999+'}
											</Text>
										</View>
										<Text
											style={{
												fontSize: 16,
												fontWeight: 'bold',
											}}
										>
											{formatToVND(product.price)}
										</Text>
									</Pressable>
								))}
						</ScrollView>
					</View>
				))
			) : (
				<View></View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	productRating: {
		marginTop: 3,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	categoryContainer: {
		width: '100%',
		marginBottom: 5,
		paddingVertical: 10,
	},
	categoryProducts: {
		width: 150,
		height: 200,
		backgroundColor: 'white',
		elevation: 5,
		marginHorizontal: 10,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
	categoryImages: {
		width: '100%',
		height: 100,
	},
	categoryBody: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});

export default LandingCategory;
