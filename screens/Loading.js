import { StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
	return (
		<View style={{ flex: 1 }}>
			<LottieView
				source={require('../assets/loading-main.json')}
				style={{ width: '100%', height: '100%', position: 'absolute' }}
				autoPlay
				loop
				speed={0.8}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default LoadingScreen;
