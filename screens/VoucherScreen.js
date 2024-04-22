import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const translateCurrency = (number) => {
	const thousands = Math.floor(number / 1000);
	return `${thousands}K`;
};

const VoucherScreen = ({ navigation, route }) => {
	const { vouchers } = route.params;

	return (
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 0.5 }}
				colors={[
					'#FEECE2',
					'#FFF3ED',
					'#FFF3ED',
					'#FAFAFA',
					'#FFFFFF',
					'#FFFFFF',
					'#FFFFFF',
					'#FFFFFF',
					'#FFFFFF',
				]}
				style={styles.linearGradient}
			>
				<View style={styles.topBarContainer}>
					<Pressable onPress={() => navigation.goBack()}>
						<Icon
							name='arrow-back-outline'
							size={23}
							color='black'
						/>
					</Pressable>
					<Text
						style={{
							fontSize: 23,
							fontWeight: 'bold',
							letterSpacing: 0.6,
							textAlign: 'center',
							marginLeft: 45,
							lineHeight: 25,
						}}
					>
						Voucher dành cho bạn
					</Text>
				</View>
				<Text
					style={{
						marginTop: 10,
						fontWeight: '500',
						opacity: 0.7,
						fontSize: 18,
						marginBottom: 15,
					}}
				>
					Khám phá những voucher được chuẩn bị dành riêng cho nhu cầu
					của bạn
				</Text>
				<ScrollView>
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
										fontSize: 25,
									}}
								>
									GIẢM
								</Text>
								<Text
									style={{
										fontWeight: 'bold',
										fontSize: 30,
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
										fontSize: 18,
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
										fontSize: 16,
										width: '100%',
										textAlign: 'left',
										marginTop: 3,
									}}
								>
									{voucher.description}
								</Text>
								<Text
									style={{
										fontSize: 16,
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
			</LinearGradient>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
	},
	linearGradient: {
		flex: 1,
		paddingTop: 35,
		paddingHorizontal: 15,
		borderRadius: 5,
		overflow: 'visible',
	},
	topBarContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	voucherContent: {
		width: '100%',
		height: 120,
		marginRight: 50,
		marginTop: '3%',
		marginBottom: '3%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	voucherLeft: {
		width: '24%',
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
		width: '75%',
		marginLeft: 3,
		backgroundColor: '#FEECE2',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 15,
		borderBottomRightRadius: 15,
		borderBottomLeftRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 10,
	},
});

export default VoucherScreen;
