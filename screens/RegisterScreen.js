import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const RegisterScreen = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [fullName, setFullName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	return (
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
			<View style={styles.container}>
				<View>
					<Pressable
						style={styles.backArrow}
						onPress={() => navigation.goBack()}
					>
						<Icon name='arrow-back' size={30} color='black' />
					</Pressable>
					<Text style={styles.title}>ĐĂNG KÝ</Text>
					<View style={styles.inputContainer}>
						<TextInput
							style={styles.textInput}
							placeholder='Email của bạn'
							value={username}
							onChangeText={(text) => setUsername(text)}
						/>
						<TextInput
							style={styles.textInput}
							placeholder='Họ và tên'
							value={fullName}
							onChangeText={(text) => setFullName(text)}
						/>
						<TextInput
							style={styles.textInput}
							placeholder='Số điện thoại'
							value={phoneNumber}
							onChangeText={(text) => setPhoneNumber(text)}
						/>
						<View style={{ position: 'relative' }}>
							<TextInput
								style={styles.textInput}
								placeholder='Nhập mật khẩu'
								secureTextEntry={true}
								value={password}
								onChangeText={(text) => setPassword(text)}
							></TextInput>
						</View>
						<View style={{ position: 'relative' }}>
							<TextInput
								style={styles.textInput}
								placeholder='Nhập mật khẩu'
								secureTextEntry={true}
								value={passwordConfirm}
								onChangeText={(text) =>
									setPasswordConfirm(text)
								}
							></TextInput>
						</View>
					</View>
					<Pressable style={styles.registerButton}>
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
				</View>
				<Text
					style={{ fontSize: 16, width: '100%', textAlign: 'center' }}
				>
					Bạn đã có tài khoản?{' '}
					<Text
						style={{ fontWeight: 'bold', fontSize: 16 }}
						onPress={() => navigation.goBack()}
					>
						Dăng nhập ngay
					</Text>
				</Text>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		paddingHorizontal: 30,
		height: 'auto',
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
	backArrow: {
		position: 'absolute',
		top: 20,
		left: -20,
		zIndex: 1,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 50,
		marginBottom: 30,
		width: '100%',
		textAlign: 'center',
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
		marginTop: 30,
		borderWidth: 2,
		borderColor: 'black',
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
	},
});

export default RegisterScreen;
