import store from './app/store'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/Home'
import DetailScreen from './screens/Detail'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { NativeBaseProvider } from 'native-base'
import { LogBox } from 'react-native'
import LoginScreen from './screens/Login'
import { SSRProvider } from '@react-aria/ssr'
import CartScreen from './screens/Cart'

LogBox.ignoreLogs(['NativeBase:'])

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<SSRProvider>
			<NativeBaseProvider>
				<SafeAreaProvider>
					<SafeAreaView style={{ flex: 1 }}>
						<Provider store={store}>
							<NavigationContainer>
								<Stack.Navigator
									initialRouteName="Home"
									screenOptions={{ headerShown: false }}
								>
									<Stack.Screen name="Login" component={LoginScreen} />
									<Stack.Screen name="Home" component={HomeScreen} />
									<Stack.Screen name="Detail" component={DetailScreen} />
									<Stack.Screen name="Cart" component={CartScreen} />
								</Stack.Navigator>
							</NavigationContainer>
						</Provider>
					</SafeAreaView>
				</SafeAreaProvider>
			</NativeBaseProvider>
		</SSRProvider>
	)
}
