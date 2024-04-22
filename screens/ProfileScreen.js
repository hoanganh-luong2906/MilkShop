import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import useAuth from '../utils/useAuth';

const ProfileScreen = ({ navigation }) => {
	const { user, isLoggedin } = useAuth();

	const handleEditProfile = () => { };

	const handleLogout = () => {
		// Logout logic
	};

	return (
		<View style={styles.screen}>
			{isLoggedin ? (
				<>
					<View style={styles.header}>
						<Text style={styles.headerText}>Hồ sơ cá nhân</Text>
					</View>
					<View style={styles.contentContainer}>
						<View style={[styles.content, styles.contentBox]}>
							<View style={styles.headerPoint}>
								<Text></Text>
							</View>
							<View style={[styles.row, styles.rowWithBorder]}>
								<Text style={[styles.label, styles.bold]}>
									Tên
								</Text>
								<Text style={[styles.value, styles.bold]}>
									Nguyễn Văn A
								</Text>
							</View>
							<View style={[styles.row, styles.rowWithBorder]}>
								<Text style={[styles.label, styles.bold]}>
									Giới tính
								</Text>
								<Text style={[styles.value, styles.bold]}>
									Nam
								</Text>
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
								<Text style={[styles.label, styles.bold]}>
									Email
								</Text>
								<Text style={[styles.value, styles.bold]}>
									s*****@gmail.com
								</Text>
							</View>
							<View style={[styles.row, styles.rowWithBorder]}>
								<Text style={[styles.label, styles.bold]}>
									Địa chỉ
								</Text>
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
								<Text style={styles.loginButtonText}>
									Đăng xuất
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</>
			) : (
				<View style={styles.loginContainer}>
					<Text style={styles.loginText}>Đăng nhập để xem hồ sơ</Text>
					<TouchableOpacity
						style={styles.loginButton}
						// onPress={() => navigation.navigate("login")}
						onPress={() => setIsLoggedin(true)}
					>
						<Text style={styles.loginButtonText}>Đăng nhập</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		paddingVertical: 30,
		marginVertical: 0,
	},
	header: {
		backgroundColor: '#FEBE98',
		padding: 10,
	},
	headerText: {
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
	},
	contentContainer: {
		backgroundColor: '#FEECE2',
		// borderTopLeftRadius: 40,
		// borderTopRightRadius: 40,
		// borderColor: "#FFBE98",
		// borderWidth: 2,
		overflow: 'hidden',
		height: '100%',
		marginTop: 3,
	},
	content: {
		padding: 15,
	},
	contentBox: {
		backgroundColor: '#FEECE2',
	},
	//   headerPoint: {
	// 	backgroundColor: "#FFBE98",
	// 	width: 70,
	// 	height: 10,
	// 	borderRadius: 25,
	// 	alignSelf: 'center',
	// 	marginBottom: 10,
	//   },
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

export default ProfileScreen;
