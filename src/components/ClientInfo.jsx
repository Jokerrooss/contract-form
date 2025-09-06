import React from 'react'
import Input from './ui/Input'

function ClientInfo() {
	return (
		<div className="bg-card border border-border rounded-lg p-6">
			<h2 className="text-lg font-semibold text-text-primary mb-4">Informacje o kliencie</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Input label="Data" type="date" inputId="date" required className="md:col-span-2" />
				<Input label="Imię i nazwisko" type="text" inputId="name" required className="md:col-span-2" />
				<Input label="Adres" type="text" inputId="adress" required className="md:col-span-2" />
				<Input label="Kod pocztowy i miasto" type="text" inputId="postalCodeCity" required className="md:col-span-2" />
			</div>
		</div>
	)
}

export default ClientInfo
