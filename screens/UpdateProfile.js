import React, { useCallback, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ToastAndroid,
	KeyboardAvoidingView,
	ScrollView,
	Pressable,
	Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import ConfirmModal from '../components/admin/ConfirmModal';
import DatePickerCustom from '../components/admin/DatePickerCustom';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import useAuth from '../utils/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UpdateProfile({ route }) {
	const { userId } = route.params;
	const { user, logout } = useAuth();
	const navigation = useNavigation();
	const goBack = () => {
		navigation.goBack();
	};

	const [dateChooseDateOfBirth, setDateChooseDateOfBirth] = useState(
		new Date()
	);
	const arrChooseGender = [
		{ title: 'Nam', gender: true },
		{ title: 'Nữ', gender: false },
	];
	const [isShowedGender, setShowedGender] = useState(false);
	const [profile, setProfile] = useState({
		fullName: user.fullName || '',
		gender: user.gender, // true for male, false for female
		dateOfBirth: user.dateOfBirth || '',
		phone: user.phone || '',
		email: user.email || '',
		address: user.address || '',
	});

	const [errors, setErrors] = useState({
		dateOfBirth: false,
		phone: false,
		address: false,
		errorFinal: false,
	});

	const [errorsString, setErrorsString] = useState({
		dateOfBirth: '',
		phone: '',
		address: '',
		errorFinal: '',
	});

	const [confirmVisible, setConfirmVisible] = useState(false);
	const handleConfirm = () => {
		setConfirmVisible(!confirmVisible);
	};

	const [confirmSignIn, setConfirmSignIn] = useState(false);
	const handleConfirmSignIn = () => {
		setConfirmSignIn(!confirmSignIn);
	};

	const handleChooseDateOfBirth = (event, selectedDate) => {
		// const currentDate = selectedDate;
		const currentDate = moment(selectedDate).format('DD/MM/YYYY');
		setProfile((prev) => ({
			...prev,
			dateOfBirth: currentDate.toString(),
		}));
		setDateChooseDateOfBirth(selectedDate);
	};

	const handleChangeData = (fieldName, data) => {
		setProfile((prev) => ({
			...prev,
			[fieldName]: data,
		}));
	};

	const validateForm = () => {
		const validations = {
			dateOfBirth: profile.dateOfBirth === '',
			phone: profile.phone === '',
			address: profile.address === '',
			errorFinal: false,
		};
		const validationsString = {
			dateOfBirth: undefined,
			phone: undefined,
			address: undefined,
			errorFinal: undefined,
		};
		if (profile.dateOfBirth === '') {
			validationsString.dateOfBirth = 'Ngày sinh trống';
			validations.dateOfBirth = true;
		} else {
			validations.dateOfBirth = false;
		}

		if (profile.phone === '') {
			validationsString.phone = 'SĐT trống';
			validations.phone = true;
		} else {
			validations.phone = false;
		}

		if (profile.address === '') {
			validationsString.address = 'Địa chỉ trống';
			validations.address = true;
		} else {
			validations.address = false;
		}
		const isValid = Object.values(validations).every((value) => !value);
		setErrors(validations);
		return {
			isValid,
			errors: validations,
			validationsString: validationsString,
		};
	};

	const saveChanges = async () => {
		const { isValid, errors, validationsString } = validateForm();
		setErrors(errors);
		setErrorsString(validationsString);
		if (isValid) {
			try {
				const data = await putProfile(profile);
				if (data.status === 201) {
					// Clear form after successful update
					// setUser(profile)
					showError('Cập nhật thành công');
				} else if (data.status == 400) {
					setErrors((prev) => ({
						...prev,
						errorFinal: true,
					}));
					setErrorsString((prev) => ({
						...prev,
						errorFinal: data.message,
					}));
				} else {
					showError('Cập nhật thành công');
					handleConfirmSignIn();
				}
			} catch (error) {
				console.error('Lỗi cập nhât:', error);
				showError('An error occurred while updating profile');
			}
		} else {
			showError('Làm ơn điền đủ');
		}
		handleConfirm();
	};

	const showError = (message) => {
		ToastAndroid.show(message, ToastAndroid.CENTER);
	};

	async function putProfile(profileData) {
		const url = `https://milk-shop-eight.vercel.app/api/account/${userId}`;
		try {
			const response = await fetch(url, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(profileData),
			});
			return await response.json();
		} catch (error) {
			console.error('Có lỗi xảy ra:', error);
			throw error;
		}
	}

	useFocusEffect(
		useCallback(() => {
			setProfile({
				fullName: user.fullName || '',
				gender: user.gender, // true for male, false for female
				dateOfBirth: user.dateOfBirth || '',
				phone: user.phone || '',
				email: user.email || '',
				address: user.address || '',
			});
			setErrors({
				dateOfBirth: false,
				phone: false,
				address: false,
				errorFinal: false,
			});
			setErrorsString({
				dateOfBirth: '',
				phone: '',
				address: '',
				errorFinal: '',
			});
		}, [])
	);

	return (
		<KeyboardAvoidingView
			behavior='padding'
			style={{
				flex: 1,
			}}
		>
			<ScrollView>
				<View style={styles.title}>
					<TouchableOpacity onPress={goBack}>
						<FontAwesome
							name='chevron-left'
							size={22}
							style={styles.goBack}
						/>
					</TouchableOpacity>
					<Text style={styles.titleText}>Cập nhật hồ sơ</Text>
				</View>
				<LinearGradient
					colors={['#FFF3ED', '#FFFFFF']}
					style={styles.container}
				>
					<Text>Giới tính:</Text>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							<Pressable
								style={[styles.filterContainer, { zIndex: 2 }]}
								onPress={() => {
									setShowedGender(!isShowedGender);
								}}
							>
								<View style={styles.filterWrapper}>
									<Text
										style={[
											styles.inputFilter,
											errors.gender
												? styles.inputError
												: null,
										]}
									>
										{profile.gender ? 'Nam' : 'Nữ'}
									</Text>
									<View style={styles.iconFilterContainer}>
										<AntDesign
											name={
												isShowedGender
													? 'caretup'
													: 'caretdown'
											}
											size={15}
											color={'black'}
										/>
									</View>
								</View>
								{isShowedGender && (
									<View style={styles.showItem}>
										{arrChooseGender.map(
											(gender, index) => (
												<Pressable
													style={[
														styles.item,
														{
															borderTopLeftRadius:
																index === 0
																	? 20
																	: 0,
															borderTopRightRadius:
																index === 0
																	? 20
																	: 0,
															borderBottomLeftRadius:
																index === 1
																	? 20
																	: 0,
															borderBottomRightRadius:
																index === 1
																	? 20
																	: 0,
															backgroundColor:
																profile.gender ===
																(index === 0)
																	? '#FFBE98'
																	: '#FEECE2',
															borderWidth: 1,
														},
													]}
													onPress={() => {
														setProfile((prev) => ({
															...prev,
															gender:
																index === 0
																	? true
																	: false,
														}));
														setShowedGender(
															!isShowedGender
														);
													}}
													key={index}
												>
													<Text
														style={{
															textAlign: 'left',
															textAlignVertical:
																'center',
															paddingLeft: 10,
														}}
													>
														{gender.title}
													</Text>
												</Pressable>
											)
										)}
									</View>
								)}
							</Pressable>
						</View>
					</View>
					<Text>Ngày sinh:</Text>
					<DatePickerCustom
						isError={errors.dateOfBirth}
						date={dateChooseDateOfBirth}
						dateShow={
							profile?.dateOfBirth?.length == 0
								? 'Ngày sinh'
								: profile.dateOfBirth
						}
						onChange={handleChooseDateOfBirth}
					/>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{errors.dateOfBirth && (
								<Text style={[styles.textError]}>
									{errorsString.dateOfBirth}
								</Text>
							)}
						</View>
					</View>
					<Text>SĐT:</Text>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							<TextInput
								style={[
									styles.input,
									errors.phone && styles.inputError,
								]}
								placeholder='SĐT'
								value={profile.phone}
								onChangeText={(value) =>
									handleChangeData('phone', value)
								}
							/>
						</View>
					</View>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{errors.phone && (
								<Text style={[styles.textError]}>
									{errorsString.phone}
								</Text>
							)}
						</View>
					</View>
					<Text>Địa chỉ:</Text>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							<TextInput
								style={[
									styles.input,
									errors.address && styles.inputError,
								]}
								placeholder='Địa chỉ'
								value={profile.address}
								onChangeText={(value) =>
									handleChangeData('address', value)
								}
							/>
						</View>
					</View>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{errors.address && (
								<Text style={[styles.textError]}>
									{errorsString.address}
								</Text>
							)}
						</View>
					</View>
					<TouchableOpacity
						style={styles.saveButton}
						onPress={() => handleConfirm()}
					>
						<Text style={styles.buttonText}>Cập nhật</Text>
					</TouchableOpacity>
					<ConfirmModal
						textTitle={'Bạn có chắc chắn sửa hồ sơ?'}
						visible={confirmVisible}
						onClose={() => setConfirmVisible(false)}
						onConfirm={saveChanges}
					/>
					<Modal
						animationType='slide'
						transparent={true}
						visible={confirmSignIn}
						onRequestClose={handleConfirmSignIn}
					>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
							}}
						>
							<View
								style={{
									backgroundColor: 'white',
									padding: 20,
									borderWidth: 1,
									borderColor: 'black',
									borderRadius: 10,
								}}
							>
								<Text
									style={{ fontSize: 20, marginBottom: 20 }}
								>
									Cập nhật thành công. Vui lòng đăng nhập lại.
								</Text>
								<View
									style={{
										flexDirection: 'row',
										justifyContent: 'center',
									}}
								>
									<Pressable
										style={{
											flex: 0.5,
											backgroundColor: '#FFBE98',
											padding: 10,
											borderWidth: 1,
											borderColor: 'black',
											borderRadius: 5,
											marginHorizontal: 10,
										}}
										onPress={() => logout()}
									>
										<Text
											style={{
												color: 'black',
												fontSize: 18,
												textAlignVertical: 'center',
												textAlign: 'center',
											}}
										>
											Đăng nhập
										</Text>
									</Pressable>
								</View>
							</View>
						</View>
					</Modal>
				</LinearGradient>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	screen: {
		marginBottom: 5,
	},
	title: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		height: 70,
		backgroundColor: '#FFBE98',
	},
	titleText: {
		flex: 1,
		textAlign: 'center',
		fontSize: 24,
		fontWeight: 'bold',
	},
	goBack: {
		marginLeft: 20,
	},
	container: {
		flex: 1,
		padding: 20,
	},
	inputContainer: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 5,
	},
	inputWrapper: {
		flex: 1,
	},
	input: {
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
	},
	filterContainer: {
		flex: 1,
		flexDirection: 'row',
		marginBottom: 10,
	},
	filterWrapper: {
		flex: 1,
		position: 'relative',
	},
	inputFilter: {
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 3.5,
	},
	iconFilterContainer: {
		position: 'absolute',
		right: 10,
		top: 5,
	},
	showItem: {
		position: 'absolute',
		bottom: -100,
		backgroundColor: '#FEECE2',
		flex: 1,
		width: '100%',
		height: 100,
		borderRadius: 20,
	},
	item: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderColor: 'black',
	},
	inputError: {
		borderColor: 'red', // Change border color to red for invalid input
	},
	textError: {
		color: 'red', // Change border color to red for invalid input
		fontSize: 12,
		paddingLeft: 10,
	},
	saveButton: {
		backgroundColor: '#FFBE98',
		paddingVertical: 10,
		borderRadius: 15,
		marginTop: 260,
		alignItems: 'center',
	},
	buttonText: {
		color: '#FFFFFF',
		fontWeight: 'bold',
		fontSize: 18,
	},
});
