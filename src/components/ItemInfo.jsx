import React, { useState } from 'react'
import Input from './ui/Input'
import { useUserData } from '../contexts/UserDataContext'

function ItemInfo() {
	const { addItem } = useUserData()
	const [newItem, setNewItem] = useState({
		itemName: '',
		quantity: '',
		unitPrice: '',
		currency: 'PLN',
	})

	const handleChange = (field, value) => {
		setNewItem(prev => ({ ...prev, [field]: value }))
	}

	const handleAddItem = () => {
		if (!newItem.itemName || !newItem.quantity || !newItem.unitPrice) return
		addItem(newItem)
		setNewItem({ itemName: '', quantity: '', unitPrice: '', currency: 'PLN' })
	}

	return (
		<div className="bg-white border border-slate-200 p-6">
			<h2 className="text-lg font-semibold mb-4">Dodaj pozycję</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
				<Input
					label="Nazwa produktu"
					inputId="itemName"
					placeholder="Wprowadź nazwę"
					required
					className="lg:col-span-2"
					localValue={newItem.itemName}
					localOnChange={e => handleChange('itemName', e.target.value)}
				/>
				<Input
					label="Ilość"
					type="number"
					inputId="quantity"
					placeholder="1"
					required
					localValue={newItem.quantity}
					localOnChange={e => handleChange('quantity', e.target.value)}
				/>
				<Input
					label="Cena jednostkowa"
					type="number"
					inputId="unitPrice"
					placeholder="0,00"
					required
					localValue={newItem.unitPrice}
					localOnChange={e => handleChange('unitPrice', e.target.value)}
				/>
				<div>
					<label htmlFor="currencySelect" className="text-sm font-medium">
						Waluta <span className="text-destructive ml-1">*</span>
					</label>
					<select
						id="currencySelect"
						value={newItem.currency}
						onChange={e => handleChange('currency', e.target.value)}
						className="border p-2 w-full mb-4">
						<option value="PLN">PLN</option>
						<option value="EUR">EURO</option>
					</select>
				</div>
			</div>

			<button onClick={handleAddItem} className="bg-primary text-white px-4 py-2 ">
				Dodaj pozycję
			</button>
		</div>
	)
}

export default ItemInfo
