import { Button, StyleSheet, Text, View } from 'react-native';

const NavigationScreen = ({ navigation }) => {
	return (
		<View>
			<Text>This is NavigationScreen</Text>
			<Button
				title='Go to Guest'
				onPress={() => navigation.navigate('landing')}
			/>
			<Button
				title='Go to Staff'
				onPress={() => navigation.navigate('staff-home')}
			/>
			<Button
				title='Go to Admin'
				onPress={() => navigation.navigate('admin-home')}
			/>
			<Button
				title='Go to Customer'
				onPress={() => navigation.navigate('customer-home')}
			/>
		</View>
	);
};

export default NavigationScreen;
