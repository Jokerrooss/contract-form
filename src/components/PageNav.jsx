import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import i18n from '../i18n'

function PageNav() {
	const navigate = useNavigate()
	const location = useLocation()

	const handleChange = e => {
		const lang = e.target.value.replace('/', '')
		i18n.changeLanguage(lang)
		navigate(e.target.value)
	}

	return (
		<div>
			<select value={location.pathname} onChange={handleChange}>
				<option value="/pl">PL</option>
				<option value="/en">EN</option>
			</select>
		</div>
	)
}

export default PageNav
