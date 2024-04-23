import {
	KeyboardAvoidingView,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	ToastAndroid,
	View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import moment from "moment";
import ConfirmModal from '../components/admin/ConfirmModal';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import useAuth from '../utils/useAuth';

const RegisterScreen = ({ navigation }) => {
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const { login } = useAuth();

	const arrChooseGender = [
		{ title: "Nam", isMale: true },
		{ title: "Nữ", isMale: false },
	]
	const [isShowedGender, setShowedGender] = useState(false);

	const [dateChooseDOB, setChooseDOB] = useState(new Date());

	const [account, setAccount] = useState({
		email: "",
		password: "",
		fullName: "",
		address: "",
		phone: "",
		dateOfBirth: "",
		gender: false,
		role: "Customer",
		status: true,
	});

	const [errors, setErrors] = useState({
		"email": false,
		"password": false,
		"fullName": false,
		"address": false,
		"phone": false,
		"dateOfBirth": false,
		"checkPass": false,
		"errorFinal": false,
	});
	const [errorsString, setErrorsString] = useState({
		"email": "",
		"password": "",
		"fullName": "",
		"address": "",
		"phone": "",
		"dateOfBirth": "",
		"checkPass": "",
		"errorFinal": ""
	});

	const [confirmVisible, setConfirmVisible] = useState(false);
	const handleConfirm = () => {
		setConfirmVisible(!confirmVisible)
	}

	const handleChangeData = (fieldName, data) => {
		setAccount(prev => ({
			...prev,
			[fieldName]: data
		}))
	}

	const validateForm = () => {
		// Define your validation criteria for each field
		const validations = {
			email: account.email === "",
			password: account.password === "",
			fullName: account.fullName === "",
			address: account.address === "",
			phone: account.phone === "",
			dateOfBirth: account.dateOfBirth === "",
			checkPass: account.password !== passwordConfirm,
			errorFinal: false,
		};

		const validationsString = {
			email: undefined,
			password: undefined,
			fullName: undefined,
			address: undefined,
			phone: undefined,
			dateOfBirth: undefined,
			checkPass: validations.checkPass ? "Mật khẩu nhập lại không chính xác" : "",
			errorFinal: undefined,
		};

		//email
		if (account.email === "") {
			validationsString.email = "Email trống";
			validations.email = true;
		} else if (!handleValidEmail(account.email)) {
			validationsString.email = "Email không hợp lệ";
			validations.email = true;
		} else {
			validations.email = false;
		}

		//password
		if (account.password === "") {
			validationsString.password = "Mật khẩu trống";
			validations.password = true;
		} else if (account.password.length < 5) {
			validationsString.password = "Mật khẩu có độ dài tối thiểu là 5 kí tự";
			validations.password = true;
		} else {
			validations.password = false;
		}

		//fullName
		if (account.fullName === "") {
			validationsString.fullName = "Họ và tên trống";
			validations.fullName = true;
		} else {
			validations.fullName = false;
		}

		//address
		if (account.address === "") {
			validationsString.address = "Địa chỉ trống";
			validations.address = true;
		} else {
			validations.address = false;
		}

		//phone
		if (account.phone === "") {
			validationsString.phone = "Số điện thoại trống";
			validations.phone = true;
		} else if (!handleValidPhone(account.phone)) {
			validationsString.phone = "Số điện thoại không hợp lệ";
			validations.phone = true;
		} else {
			validations.phone = false;
		}

		const currentDate = moment(new Date()).format('DD/MM/YYYY');
		//Expired date
		if (account.dateOfBirth === "") {
			validationsString.dateOfBirth = "Ngày sinh trống";
			validations.dateOfBirth = true;
		} else if (!isOlderThan16YearsOld(account.dateOfBirth, currentDate)) {
			validationsString.dateOfBirth = "Người dùng chưa đủ 16 tuổi";
			validations.dateOfBirth = true;
		} else {
			validations.dateOfBirth = false;
		}

		// Check if all fields are valid
		const isValid = Object.values(validations).every(value => !value);

		// Return validation result and errors
		return { isValid, errors: validations, validationsString: validationsString };
	};

	const handleValidEmail = (mail) => {
		return /^[\w-\.]+@gmail\.com$/.test(mail);
	}

	const handleValidPhone = (phone) => {
		return /((^(\+84|84|0){1})(3|5|7|8|9))+([0-9]{8})$/.test(phone);
	}

	const saveChanges = async () => {
		// Validate the form
		const { isValid, errors, validationsString } = validateForm();
		setErrors(errors);
		setErrorsString(validationsString);
		if (isValid) {
			console.log("vo day");
			const data = await registerAccount(account);
			if (data.status == 201) {
				setAccount({
					email: "",
					password: "",
					fullName: "",
					address: "",
					phone: "",
					dateOfBirth: "",
					gender: false,
					role: "Customer",
					status: true,
				})
				setPasswordConfirm("");
				showError("Tạo tài khoản thành công");
				await login(data.data);
			} else if (data.status == 400) {
				// showError(`${data.message}`);
				setErrors(prev => ({
					...prev,
					errorFinal: true
				}))
				setErrorsString(prev => ({
					...prev,
					errorFinal: data.message
				}))
			} else {
				showError(`Lỗi Server: ${data.message}`);
			}
		} else {
			showError("Có lỗi xảy ra");
		}
		handleConfirm();
	};

	const showError = (message) => {
		ToastAndroid.show(message, ToastAndroid.CENTER);
	};

	async function registerAccount(voucherData) {
		const url = 'https://milk-shop-eight.vercel.app/api/account';

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(voucherData)
			});

			const data = await response.json();
			console.log('Account posted response:', data);
			return data; // Return the posted account data if needed
		} catch (error) {
			console.error('Error posting account:', error);
			showError("Có lỗi xảy ra", error);
		}
	}

	function compareDates(dateString1, dateString2) {
		// Convert the input strings to Date objects
		const parts1 = dateString1.split('/');
		const day1 = parseInt(parts1[0], 10);
		const month1 = parseInt(parts1[1], 10) - 1; // Months are zero-based
		const year1 = parseInt(parts1[2], 10);
		const date1 = new Date(year1, month1, day1);

		const parts2 = dateString2.split('/');
		const day2 = parseInt(parts2[0], 10);
		const month2 = parseInt(parts2[1], 10) - 1; // Months are zero-based
		const year2 = parseInt(parts2[2], 10);
		const date2 = new Date(year2, month2, day2);

		// Compare the two dates
		if (date1 < date2) {
			return -1; // date1 is before date2
		} else if (date1 > date2) {
			return 1; // date1 is after date2
		} else {
			return 0; // dates are equal
		}
	}

	function isOlderThan16YearsOld(dob, currDate) {
		const ageLimitDate = new Date();
		ageLimitDate.setFullYear(ageLimitDate.getFullYear() - 16);

		const convertAgeLimitDate = moment(ageLimitDate).format('DD/MM/YYYY');

		return compareDates(dob, currDate) <= 0 && compareDates(dob, convertAgeLimitDate) <= 0;
	}

	//DOB function
	const showMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: dateChooseDOB,
			onChange,
			mode: currentMode,
			is24Hour: true,
		});
	};
	const showDatepicker = () => {
		showMode('date');
	};
	const onChange = (event, selectedDate) => {
		// const currentDate = selectedDate;
		const currentDate = moment(selectedDate).format('DD/MM/YYYY');
		setAccount(prev => ({
			...prev,
			dateOfBirth: currentDate.toString()
		}))
		setChooseDOB(selectedDate);
	};

	// useFocusEffect(
	// 	useCallback(() => {
	// 	}, [])
	// )

	return (
		<KeyboardAvoidingView
			behavior='padding'
			style={{ flex: 1 }}
		>
			<LinearGradient
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 0.8 }}
				colors={['#FFC8AA', '#FFC8AA', '#FEECE2']}
				style={styles.linearGradient}
			>
				<LottieView
					source={require('../assets/background-login.json')}
					style={styles.background}
					autoPlay
					loop={false}
				/>
				<ScrollView>

					{/* email */}
					<TextInput
						style={[styles.textInput, { borderColor: errors.email ? "red" : undefined, borderWidth: errors.email ? 1 : 0 }]}
						placeholder='Email của bạn'
						value={account.email}
						onChangeText={(value) => handleChangeData("email", value)}
					/>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{
								errors.email &&
								<Text style={[
									styles.textError
								]}>{errorsString.email}</Text>
							}
						</View>
					</View>

					{/* fullName */}
					<TextInput
						style={[styles.textInput, { borderColor: errors.fullName ? "red" : undefined, borderWidth: errors.fullName ? 1 : 0 }]}
						placeholder='Họ và tên'
						value={account.fullName}
						onChangeText={(value) => handleChangeData("fullName", value)}
					/>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{
								errors.fullName &&
								<Text style={[
									styles.textError
								]}>{errorsString.fullName}</Text>
							}
						</View>
					</View>

					{/* gender */}
					<Pressable style={styles.filterContainer} onPress={() => { setShowedGender(!isShowedGender) }} >
						{/* <View style={styles.filterWrapper}> */}
						<Text style={styles.inputFilter}>
							{account.gender ? arrChooseGender[0].title : arrChooseGender[1].title}
						</Text>
						<View style={styles.iconFilterContainer}>
							<AntDesign name={isShowedGender ? "caretup" : "caretdown"} size={15} color={"black"} />
						</View>
						{/* </View> */}
					</Pressable>
					{isShowedGender &&
						<View style={styles.showItem}>
							{
								arrChooseGender.map((item, index) => (
									<Pressable
										style={[styles.item, {
											borderTopLeftRadius: index == 0 ? 10 : 0,
											borderTopRightRadius: index == 0 ? 10 : 0,
											borderBottomLeftRadius: index == arrChooseGender.length - 1 ? 10 : 0,
											borderBottomRightRadius: index == arrChooseGender.length - 1 ? 10 : 0,
											backgroundColor: account.gender == item.isMale ? "#FFBE98" : "#FEECE2",
											borderWidth: 1,
										}]}
										onPress={() => {
											setAccount(prev => ({
												...prev,
												gender: item.isMale
											}))
											setShowedGender(!isShowedGender)
										}}
										key={index}
									>
										<Text style={{ textAlign: "left", textAlignVertical: "center", paddingLeft: 10 }}>{item.title}</Text>
									</Pressable>
								))
							}
						</View>
					}

					{/* address */}
					<TextInput
						style={[styles.textInput, { borderColor: errors.address ? "red" : undefined, borderWidth: errors.address ? 1 : 0 }]}
						placeholder='Địa chỉ'
						value={account.address}
						onChangeText={(value) => handleChangeData("address", value)}
					/>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{
								errors.address &&
								<Text style={[
									styles.textError
								]}>{errorsString.address}</Text>
							}
						</View>
					</View>

					{/* phone */}
					<TextInput
						style={[styles.textInput, { borderColor: errors.phone ? "red" : undefined, borderWidth: errors.phone ? 1 : 0 }]}
						placeholder='Số điện thoại'
						value={account.phone}
						onChangeText={(value) => handleChangeData("phone", value)}
					/>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{
								errors.phone &&
								<Text style={[
									styles.textError
								]}>{errorsString.phone}</Text>
							}
						</View>
					</View>

					{/* password */}
					<TextInput
						style={[styles.textInput, { borderColor: errors.password ? "red" : undefined, borderWidth: errors.password ? 1 : 0 }]}
						placeholder='Nhập mật khẩu'
						secureTextEntry={true}
						value={account.password}
						onChangeText={(value) => handleChangeData("password", value)}
					/>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{
								errors.password &&
								<Text style={[
									styles.textError
								]}>{errorsString.password}</Text>
							}
						</View>
					</View>

					{/* confirm password */}
					<TextInput
						style={[styles.textInput, { borderColor: errors.checkPass ? "red" : undefined, borderWidth: errors.checkPass ? 1 : 0 }]}
						placeholder='Nhập lại mật khẩu'
						secureTextEntry={true}
						value={passwordConfirm}
						onChangeText={(text) =>
							setPasswordConfirm(text)
						}
					/>
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{
								errors.checkPass &&
								<Text style={[
									styles.textError
								]}>{errorsString.checkPass}</Text>
							}
						</View>
					</View>

					{/* DOB */}
					<Pressable style={[styles.filterContainer, { borderColor: errors.dateOfBirth ? "red" : undefined, borderWidth: errors.dateOfBirth ? 1 : 0 }]} onPress={showDatepicker} >
						{/* <View style={styles.inputWrapper}> */}
						<Text style={[styles.inputFilter, { color: account.dateOfBirth.length == 0 ? "grey" : "black" }]}>
							{account.dateOfBirth.length == 0 ? "Nhập ngày sinh" : account.dateOfBirth}
						</Text>
						<View style={styles.iconFilterContainer}>
							<AntDesign name="calendar" size={20} color={"black"} />
						</View>
						{/* </View> */}
					</Pressable >
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{
								errors.dateOfBirth &&
								<Text style={[
									styles.textError
								]}
								>{errorsString.dateOfBirth}</Text>
							}
						</View>
					</View>

					{/* Error final */}
					<View style={styles.inputContainer}>
						<View style={styles.inputWrapper}>
							{
								errors.errorFinal &&
								<Text style={[
									styles.textError
								]}
								>{errorsString.errorFinal}</Text>
							}
						</View>
					</View>

					<Pressable style={styles.registerButton} onPress={() => { handleConfirm() }}>
						<Text
							style={{
								color: 'black',
								fontWeight: 'bold',
								letterSpacing: 1,
								fontSize: 18,
							}}
						>
							ĐĂNG KÝ
						</Text>
					</Pressable>
					<Text
						style={{ fontSize: 16, width: '100%', textAlign: 'center', marginBottom: 10 }}
					>
						Bạn đã có tài khoản?{' '}
						<Text
							style={{ fontWeight: 'bold', fontSize: 16 }}
							onPress={() => navigation.goBack()}
						>
							Đăng nhập ngay
						</Text>
					</Text>
					<ConfirmModal textTitle={"Xác nhận đăng ký tài khoản?"} visible={confirmVisible} onClose={() => setConfirmVisible(false)} onConfirm={saveChanges} />
				</ScrollView>
			</LinearGradient>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		paddingHorizontal: 30,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 0,
	},
	inputContainer: {
		width: '100%',
		height: 350,
		display: 'flex',
		justifyContent: 'space-between',
	},
	textInput: {
		backgroundColor: 'white',
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 50,
		fontSize: 17,
		marginVertical: 10,
	},
	showPasswordBtn: {
		position: 'absolute',
		right: 20,
		top: 14,
	},
	forgotPassword: {
		marginTop: 15,
		textAlign: 'right',
		paddingHorizontal: 10,
		fontSize: 17,
	},
	loginButton: {
		display: 'flex',
		alignItems: 'center',
		paddingVertical: 13,
		paddingHorizontal: 20,
		backgroundColor: 'black',
		borderRadius: 50,
		marginTop: 20,
	},
	registerButton: {
		display: 'flex',
		alignItems: 'center',
		paddingVertical: 13,
		paddingHorizontal: 20,
		borderRadius: 50,
		marginTop: 10,
		borderWidth: 2,
		borderColor: 'black',
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
	},

	inputContainer: {
		flex: 1,
		flexDirection: "row",
		marginBottom: 5
	},
	inputWrapper: {
		flex: 1
	},
	input: {
		borderColor: "grey",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
	},
	filterContainer: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: 'white',
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 50,
		marginVertical: 10,
		justifyContent: "space-between"
	},
	inputFilter: {
		fontSize: 17,
		color: "grey"
	},
	iconFilterContainer: {
		alignItems: "center",
		justifyContent: "center"
	},
	showItem: {
		flex: 1,
		backgroundColor: "#FEECE2",
		borderRadius: 10,
		marginTop: -10
	},
	item: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderColor: "black"
	},
	textError: {
		color: "red", // Change border color to red for invalid input
		fontSize: 12,
		paddingLeft: 10
	},

	inputError: {
		borderColor: "red", // Change border color to red for invalid input
	},
	iconContainer: {
		// position: 'absolute',
		// right: 10,
		// top: 2.5,
	},
});

export default RegisterScreen;
