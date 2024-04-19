import { Button, Text, View } from 'react-native';

const LoginScreen = ({ navigation }) => {
	return (
		<View>
			<Text>This is login Screen</Text>
			<Button
				title='Go to Register'
				onPress={() => navigation.navigate('register')}
			/>
			<Button
				title='Login as Staff'
				onPress={() => navigation.navigate('staff-home')}
			/>
		</View>
	);
};

export default LoginScreen;
