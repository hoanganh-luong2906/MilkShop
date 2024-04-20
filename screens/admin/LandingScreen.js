import { Button, Text, View } from 'react-native';

const LandingScreen = ({ navigation }) => {
	return (
		<View>
			<Text>This is LandingScreen</Text>
			<Button
				title='Go to Login'
				onPress={() => navigation.navigate('login')}
			/>
			<Button
				title='Go to Staff'
				onPress={() => navigation.navigate('staff-home')}
			/>
		</View>
	);
};

export default LandingScreen;
