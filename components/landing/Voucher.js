import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const translateCurrency = (number) => {
	const thousands = Math.floor(number / 1000);
	return `${thousands}K`;
};

const LandingVoucher = ({ vouchers, navigation }) => {
	return (
		<View style={styles.voucherContainer}>
			<View style={styles.voucherHeader}>
				<Text style={{ fontSize: 18, fontWeight: 'bold' }}>
					Dành cho bạn
				</Text>
				{vouchers?.length > 2 && (
					<Pressable
						style={{
							position: 'relative',
							paddingRight: 15,
						}}
						key={Math.random()}
						onPress={() => {
							navigation.navigate('voucher', {
								vouchers: vouchers,
							});
						}}
					>
						<Text
							style={{
								fontSize: 14,
								lineHeight: 16,
								opacity: 0.6,
							}}
						>
							Xem tất cả
						</Text>
						<Icon
							name='chevron-forward'
							size={14}
							style={styles.voucherHeaderIcon}
						/>
					</Pressable>
				)}
			</View>
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
			>
				{vouchers?.map((voucher, index) => (
					<Pressable
						style={styles.voucherContent}
						key={index}
						onPress={() => {
							navigation.navigate('voucher', {
								vouchers: vouchers,
								navigation: navigation,
							});
						}}
					>
						<View style={styles.voucherLeft}>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: 18,
								}}
							>
								GIẢM
							</Text>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: 24,
									color: '#FF5E00',
								}}
							>
								{voucher.isPercent
									? `${voucher.discount}%`
									: translateCurrency(voucher.discount)}
							</Text>
						</View>
						<View style={styles.voucherRight}>
							<Text
								style={{
									fontWeight: 500,
									width: '100%',
									textAlign: 'left',
								}}
							>
								Một số sản phẩm nhất định
							</Text>
							<Text
								numberOfLines={2}
								style={{
									width: '100%',
									textAlign: 'left',
									marginTop: 3,
								}}
							>
								{voucher.description}
							</Text>
							<Text
								style={{
									width: '100%',
									textAlign: 'left',
									marginTop: 3,
								}}
							>
								HSD:
								<Text
									style={{ fontWeight: 500 }}
								>{`    ${voucher.end_at}`}</Text>
							</Text>
						</View>
					</Pressable>
				))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	voucherContainer: {
		width: '99%',
		backgroundColor: 'white',
		elevation: 2,
		borderRadius: 10,
		padding: 10,
		marginHorizontal: 2,
		display: 'flex',
		flexDirection: 'column',
		marginBottom: 20,
	},
	voucherHeader: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'baseline',
	},
	voucherHeaderIcon: {
		position: 'absolute',
		top: 1,
		right: 0,
	},
	voucherContent: {
		width: 230,
		height: 100,
		marginRight: 50,
		marginTop: '2%',
		marginBottom: '1%',
		display: 'flex',
		flexDirection: 'row',
	},
	voucherLeft: {
		width: 60,
		backgroundColor: '#FEECE2',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		borderBottomLeftRadius: 15,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 2,
	},
	voucherRight: {
		width: 200,
		marginLeft: 3,
		backgroundColor: '#FEECE2',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 15,
		borderBottomRightRadius: 15,
		borderBottomLeftRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
});

export default LandingVoucher;
