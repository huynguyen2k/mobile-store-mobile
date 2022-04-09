import store from './app/store'
import { Provider } from 'react-redux'
import * as eva from '@eva-design/eva'
import { ApplicationProvider } from '@ui-kitten/components'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/Home'
import DetailScreen from './screens/Detail'

const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<ApplicationProvider {...eva} theme={eva.light}>
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Home">
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Detail" component={DetailScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</ApplicationProvider>
	)
}
