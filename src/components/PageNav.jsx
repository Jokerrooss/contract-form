import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function PageNav() {
	const navigate = useNavigate()
	const location = useLocation()
	console.log(location)

	const handleChange = e => {
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
