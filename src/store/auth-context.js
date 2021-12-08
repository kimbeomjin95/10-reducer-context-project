import React, {useEffect, useState} from 'react'

// 함수에 더미함수를 설정한 이유는 auto-completion을 사용하기 위함
const AuthContext = React.createContext({
	isLoggedIn: false,
	onLogin: (email, password) => {
	},
	onLogout: () => {
	}
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	// 무한루프 방지(useEffect 사용)
	useEffect(() => {
		const storedUserLoggedInInfo = localStorage.getItem('isLoggedIn')

		if (storedUserLoggedInInfo === '1') {
			setIsLoggedIn(true)
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn')
		setIsLoggedIn(false)
	}

	const loginHandler = () => {
		localStorage.setItem('isLoggedIn', '1') // 1: login, 2:logout
		setIsLoggedIn(true)
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogin: loginHandler,
				onLogout: logoutHandler,
			}}
		>{props.children}</AuthContext.Provider>
	)
}

export default AuthContext

