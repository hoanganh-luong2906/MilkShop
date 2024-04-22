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

const styles = StyleSheet.create({});

export default ProfileScreen;
