import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './components/AuthContex';
import RootNavigator from './navigators/RootNavigator';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<AuthProvider>
			<RootNavigator />
		</AuthProvider>
	);
}
