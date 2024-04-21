import { Button, Text, View } from 'react-native';

const AdminHomeScreen = ({ navigation }) => {
	return (
		<View>
			<Text>This is AdminHomeScreen</Text>
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

export default AdminHomeScreen;
