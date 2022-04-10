import store from './app/store'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/Home'
import DetailScreen from './screens/Detail'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NativeBaseProvider } from 'native-base'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<NativeBaseProvider>
			<SafeAreaProvider>
				<Provider store={store}>
					<NavigationContainer>
						<Stack.Navigator
							initialRouteName="Home"
							screenOptions={{ headerShown: false }}
						>
							<Stack.Screen name="Home" component={HomeScreen} />
							<Stack.Screen name="Detail" component={DetailScreen} />
						</Stack.Navigator>
					</NavigationContainer>
				</Provider>
			</SafeAreaProvider>
		</NativeBaseProvider>
	)
}
