import { Button, Text, View } from 'react-native';

const LoginScreen = ({ navigation }) => {
	return (
		<View>
			<Text>This is login Screen</Text>
			<Button
				title='Go to Register'
				onPress={() => navigation.navigate('Register')}
			/>
		</View>
	);
};

export default LoginScreen;
