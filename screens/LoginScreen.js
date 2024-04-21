import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import useAuth from '../utils/useAuth';

const LoginScreen = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const { login } = useAuth();

	const handleLoginBtn = async () => {
		try {
			const response = await fetch(
				'https://milk-shop-eight.vercel.app/api/authen/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: username,
						password: password,
					}),
				}
			);
			const data = await response.json();
			if (data && data?.status === 200) {
				login(data.data);
			}
		} catch (error) {
			alert('ERROR: ' + error);
		}
	};

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
				<Pressable
					style={styles.backArrow}
					onPress={() => navigation.goBack()}
				>
					<Icon name='arrow-back' size={30} color='black' />
				</Pressable>
				<Text style={styles.title}>ĐĂNG NHẬP</Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.textInput}
						placeholder='Email của bạn'
						value={username}
						onChangeText={(text) => setUsername(text)}
					/>
					<View style={{ position: 'relative' }}>
						<TextInput
							style={styles.textInput}
							placeholder='Mật khẩu'
							secureTextEntry={showPassword ? false : true}
							value={password}
							onChangeText={(text) => setPassword(text)}
						></TextInput>
						{password?.length > 0 && (
							<Pressable
								style={styles.showPasswordBtn}
								onPress={() => setShowPassword(!showPassword)}
							>
								<Icon
									name={
										showPassword
											? 'eye-off-sharp'
											: 'eye-sharp'
									}
									size={20}
									color='black'
								/>
							</Pressable>
						)}
					</View>
				</View>
				<Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
				<Pressable style={styles.loginButton}>
					<Text
						style={{
							color: 'white',
							fontWeight: 'bold',
							letterSpacing: 1,
							fontSize: 18,
						}}
						onPress={() => handleLoginBtn()}
					>
						ĐĂNG NHẬP
					</Text>
				</Pressable>
				<Text
					style={{
						width: '100%',
						textAlign: 'center',
						marginTop: 20,
						fontSize: 16,
						fontWeight: 500,
						opacity: 0.5,
						letterSpacing: 1,
					}}
				>
					Hoặc
				</Text>
				<Pressable
					style={styles.registerButton}
					onPress={() => navigation.push('register')}
				>
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
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 50,
		paddingHorizontal: 30,
		height: 'auto',
	},
	background: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 0,
		opacity: 0.8,
	},
	backArrow: {
		position: 'absolute',
		top: 50,
		left: 5,
		zIndex: 1,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 60,
		marginBottom: 30,
		width: '100%',
		textAlign: 'center',
	},
	inputContainer: {
		width: '100%',
		height: 120,
		display: 'flex',
		justifyContent: 'space-between',
	},
	textInput: {
		backgroundColor: 'white',
		paddingVertical: 10,
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
		marginTop: 20,
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

export default LoginScreen;
