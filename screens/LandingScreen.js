import { Button, Text, View } from 'react-native';

const LandingScreen = ({ navigation }) => {
	return (
		<View>
			<Text>This is LandingScreen</Text>
			<Button
				title='Go to Login'
				onPress={() => navigation.navigate('Login')}
			/>
		</View>
	);
};

export default LandingScreen;
