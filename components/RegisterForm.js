import { KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';

const RegisterForm = () => {
	return (
		<KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
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
			<TextInput
				style={styles.textInput}
				placeholder='Nhập mật khẩu'
				secureTextEntry={true}
				value={password}
				onChangeText={(text) => setPassword(text)}
			/>
			<TextInput
				style={styles.textInput}
				placeholder='Nhập lại mật khẩu'
				secureTextEntry={true}
				value={passwordConfirm}
				onChangeText={(text) => setPasswordConfirm(text)}
			/>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: 'white',
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 50,
		fontSize: 17,
		marginVertical: 10,
	},
});

export default RegisterForm;
