import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import GeneratorPl from './pages/GeneratorPl'
import GeneratorEn from './pages/GeneratorEn'
import { UserDataProvider } from './contexts/UserDataContext'

function App() {
	return (
		<UserDataProvider>
			<BrowserRouter>
				<Routes>
					<Route index path="/" element={<Navigate replace to="pl" />} />
					<Route path="pl" element={<GeneratorPl />} />
					<Route path="en" element={<GeneratorEn />} />
				</Routes>
			</BrowserRouter>
		</UserDataProvider>
	)
}

export default App
