import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Pressable,
	Dimensions,
} from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../../utils/useAuth';

export function AdminProfileScreen({ navigation }) {
	const [isSetting, setSetting] = useState(false);
	const { user, isLoggedIn, login, logout } = useAuth();

	const handleNavigate = (nameRoute) => {
		navigation.navigate(nameRoute);
	};

	return (
		<LinearGradient
			colors={['#FFF3ED', '#FFFFFF']}
			style={{ flex: 1, position: 'relative', paddingTop: 20 }}
		>
			{isLoggedIn ? (
				<>
					<ScrollView style={styles.mainScreen}>
						<View style={styles.questionStyle}>
							<AntDesign
								name='questioncircleo'
								size={24}
								color='#FFBE98'
							/>
						</View>
						<View style={styles.titleContainer}>
							<Text style={styles.nameTitle}>Nguyen Văn A</Text>
							<Pressable
								onPress={() => {
									setSetting(!isSetting);
								}}
							>
								<MaterialIcons
									name='settings'
									size={24}
									color='#FFBE98'
								/>
							</Pressable>
						</View>
						{/* Function 1 */}
						<Pressable
							style={styles.functionContainerStyle}
							onPress={() => {
								handleNavigate("admin-create-product");
							}}
						>
							<View style={styles.functionPressable}>
								<Feather
									name='box'
									size={27}
									color='black'
									style={styles.functionIcon}
								/>
								<Text style={styles.functionDescription}>
									Thêm sản phẩm
								</Text>
							</View>
							<AntDesign
								name='caretright'
								size={15}
								color='black'
							/>
						</Pressable>
						{/* Function 2 */}
						<Pressable
							style={styles.functionContainerStyle}
							onPress={() => {
								handleNavigate("admin-update-product");
							}}
						>
							<View style={styles.functionPressable}>
								<FontAwesome6
									name='box-open'
									size={24}
									color='black'
									style={styles.functionIcon}
								/>
								<Text style={styles.functionDescription}>
									Cập nhật sản phẩm
								</Text>
							</View>
							<AntDesign
								name='caretright'
								size={15}
								color='black'
							/>
						</Pressable>
						{/* Function 3 */}
						<Pressable
							style={styles.functionContainerStyle}
							onPress={() => logout()}
						>
							<View style={styles.functionPressable}>
								<MaterialIcons
									name='logout'
									size={25}
									color='black'
									style={[
										styles.functionIcon,
										{ marginLeft: 5 },
									]}
								/>
								<Text style={styles.functionDescription}>
									Đăng xuất
								</Text>
							</View>
							<AntDesign
								name='caretright'
								size={15}
								color='black'
							/>
						</Pressable>
					</ScrollView>
					{isSetting && (
						<NavigationDrawer
							isSetting={isSetting}
							setSetting={setSetting}
						/>
					)}
				</>
			) : (
				<View style={styles.loginContainer}>
					<Text style={styles.loginText}>Đăng nhập để xem hồ sơ</Text>
					<TouchableOpacity
						style={styles.loginButton}
						onPress={() => navigation.navigate("login")}
					>
						<Text style={styles.loginButtonText}>Đăng nhập</Text>
					</TouchableOpacity>
				</View>
			)}
		</LinearGradient>
	);
}

const NavigationDrawer = ({ isSetting, setSetting }) => {
	return (
		<View style={styles.screen}>
			<View style={styles.contentContainer}>
				<View style={[styles.content, styles.contentBox]}>
					<View style={styles.headerPoint}>
						<Pressable
							onPress={() => {
								setSetting(!isSetting);
							}}
						>
							<AntDesign
								name='closecircleo'
								size={24}
								color='#FFBE98'
							/>
						</Pressable>
					</View>
					<View style={[styles.row, styles.rowWithBorder]}>
						<Text style={[styles.label, styles.bold]}>Tên</Text>
						<Text style={[styles.value, styles.bold]}>
							Nguyễn Văn A
						</Text>
					</View>
					<View style={[styles.row, styles.rowWithBorder]}>
						<Text style={[styles.label, styles.bold]}>
							Giới tính
						</Text>
						<Text style={[styles.value, styles.bold]}>Nam</Text>
					</View>
					<View style={[styles.row, styles.rowWithBorder]}>
						<Text style={[styles.label, styles.bold]}>
							Ngày sinh
						</Text>
						<Text style={[styles.value, styles.bold]}>
							04-07-2003
						</Text>
					</View>
					<View style={[styles.row, styles.rowWithBorder]}>
						<Text style={[styles.label, styles.bold]}>
							Số điện thoại
						</Text>
						<Text style={[styles.value, styles.bold]}>
							04*****84
						</Text>
					</View>
					<View style={[styles.row, styles.rowWithBorder]}>
						<Text style={[styles.label, styles.bold]}>Email</Text>
						<Text style={[styles.value, styles.bold]}>
							s*****@gmail.com
						</Text>
					</View>
					<View style={[styles.row, styles.rowWithBorder]}>
						<Text style={[styles.label, styles.bold]}>Địa chỉ</Text>
						<Text style={[styles.value, styles.bold]}>
							Quận Thủ Đức TpHcm
						</Text>
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.profileButton}>
						<Text style={styles.profileButtonText}>
							Chỉnh sửa hồ sơ
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.loginButton}
						onPress={() => setIsLoggedin(false)}
					>
						<Text style={styles.loginButtonText}>Đăng xuất</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainScreen: {
		flex: 1,
	},
	questionStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		margin: 10,
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 10,
	},
	nameTitle: {
		textAlignVertical: 'center',
		fontSize: 30,
	},
	functionContainerStyle: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#FFBE98',
		paddingRight: 5,
	},
	functionPressable: {
		flex: 0.5,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		margin: 10,
	},
	functionIcon: {
		marginRight: 10,
	},
	functionDescription: {
		textAlignVertical: 'center',
		fontSize: 20,
	},

	screen: {
		flex: 1,
		// backgroundColor: "#FFF0E7",
		paddingVertical: 30,
		marginVertical: 0,
		position: 'absolute',
		bottom: 0,
		zIndex: 1,
	},
	header: {
		backgroundColor: '#FFF0E7',
		padding: 10,
	},
	headerText: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	contentContainer: {
		backgroundColor: '#FEECE2',
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
		borderColor: '#FFBE98',
		borderWidth: 2,
		overflow: 'hidden',
		height: '100%',
		marginTop: 30,
	},
	content: {
		padding: 15,
	},
	contentBox: {
		backgroundColor: '#FEECE2',
	},
	headerPoint: {
		flex: 1,
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 10,
	},
	rowWithBorder: {
		marginVertical: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#FFBE98',
	},
	label: {
		color: '#000000',
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	value: {
		color: '#000000',
		fontSize: 18,
		fontWeight: '700',
		marginBottom: 10,
	},
	bold: {
		fontWeight: 'bold',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
	},
	loginContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loginText: {
		fontSize: 18,
		marginBottom: 20,
		fontWeight: 'bold',
		paddingHorizontal: 10,
	},
	loginButton: {
		backgroundColor: '#FFBE98',
		width: '30%',
		borderRadius: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginVertical: 5,
		marginHorizontal: 25,
	},
	loginButtonText: {
		color: '#000000',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
	},
	profileButton: {
		backgroundColor: '#FFBE98',
		width: '50%',
		borderRadius: 15,
		paddingVertical: 10,
		paddingHorizontal: 10,
		marginVertical: 5,
		marginHorizontal: 25,
	},
	profileButtonText: {
		color: '#000000',
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 20,
	},
});
