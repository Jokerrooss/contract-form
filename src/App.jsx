import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { UserDataProvider } from './contexts/UserDataContext'
import LangLayout from './LangLayout'
import Generator from './pages/Generator'

function App() {
	return (
		<UserDataProvider>
			<BrowserRouter>
				<Routes>
					<Route index path="/" element={<Navigate replace to="pl" />} />

					{/* obsługa języka przez param :lang */}
					<Route path=":lang" element={<LangLayout />}>
						<Route index element={<Generator />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</UserDataProvider>
	)
}

export default App
