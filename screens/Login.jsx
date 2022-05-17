import React, { useState } from 'react'
import {
	Center,
	Box,
	Heading,
	VStack,
	FormControl,
	Input,
	Link,
	Button,
	Text,
	HStack,
	Toast,
} from 'native-base'
import { useDispatch } from 'react-redux'
import { login } from '../app/reducers/authSlice'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
	const dispatch = useDispatch()
	const navigation = useNavigation()

	const [email, setEmail] = useState('')
	const handleEmailChange = value => setEmail(value)

	const [password, setPassword] = useState('')
	const handlePasswordChange = value => setPassword(value)

	const handleLogin = async () => {
		try {
			await dispatch(
				login({
					email,
					password,
				})
			).unwrap()

			navigation.goBack()
		} catch (error) {
			Toast.show({
				placement: 'top-right',
				render: () => {
					return (
						<Box bg="red.500" p="4" rounded="sm" mb={2} mr={4}>
							{error.message}
						</Box>
					)
				},
			})
		}
	}

	return (
		<Center w="100%">
			<Box safeArea p="2" py="8" w="90%">
				<Heading
					size="lg"
					fontWeight="600"
					color="coolGray.800"
					_dark={{
						color: 'warmGray.50',
					}}
				>
					Mobile Store
				</Heading>
				<Heading
					mt="1"
					_dark={{
						color: 'warmGray.200',
					}}
					color="coolGray.600"
					fontWeight="medium"
					size="xs"
				>
					Đăng nhập để tiếp tục
				</Heading>

				<VStack space={3} mt="5">
					<FormControl>
						<FormControl.Label>Email</FormControl.Label>
						<Input size="xl" onChangeText={handleEmailChange} />
					</FormControl>

					<FormControl>
						<FormControl.Label>Mật khẩu</FormControl.Label>
						<Input
							type="password"
							size="xl"
							onChangeText={handlePasswordChange}
						/>
						<Link
							_text={{
								fontSize: 'xs',
								fontWeight: '500',
								color: 'indigo.500',
							}}
							alignSelf="flex-end"
							mt="1"
						>
							Quên mật khẩu?
						</Link>
					</FormControl>

					<Button
						size="lg"
						padding="3"
						mt="2"
						colorScheme="blue"
						onPress={handleLogin}
					>
						Đăng nhập
					</Button>

					<HStack mt="6" justifyContent="center">
						<Text
							fontSize="sm"
							color="coolGray.600"
							_dark={{
								color: 'warmGray.200',
							}}
						>
							Bạn chưa có tài khoản?{' '}
						</Text>
						<Link
							_text={{
								color: 'indigo.500',
								fontWeight: 'medium',
								fontSize: 'sm',
							}}
							href="#"
						>
							Đăng ký
						</Link>
					</HStack>
				</VStack>
			</Box>
		</Center>
	)
}
