import React, { useState } from 'react'
import Input from './ui/Input'
import { useUserData } from '../contexts/UserDataContext'
import { HugeiconsIcon } from '@hugeicons/react'
import { Add01Icon } from '@hugeicons/core-free-icons'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

function ItemInfo() {
	const location = useLocation()
	const curCurrency = location.pathname === '/pl' ? 'PLN' : 'EUR'
	const { t } = useTranslation()
	const { addItem } = useUserData()
	const [newItem, setNewItem] = useState({
		itemName: '',
		quantity: '',
		unitPrice: '',
		currency: curCurrency,
	})

	const handleChange = (field, value) => {
		setNewItem(prev => ({ ...prev, [field]: value }))
	}

	const handleAddItem = () => {
		if (!newItem.itemName || !newItem.quantity || !newItem.unitPrice) return
		addItem(newItem)
		setNewItem({ itemName: '', quantity: '', unitPrice: '', currency: curCurrency })
	}

	return (
		<div className="bg-white border border-slate-200 p-6">
			<h2 className="text-lg font-semibold mb-4">{t('itemInfo.addItemTitle')}</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
				<Input
					label={t('itemInfo.productName')}
					inputId="itemName"
					placeholder={t('itemInfo.productNamePlaceholder')}
					required
					className="lg:col-span-2"
					localValue={newItem.itemName}
					localOnChange={e => handleChange('itemName', e.target.value)}
				/>
				<Input
					label={t('itemInfo.quantity')}
					type="number"
					inputId="quantity"
					placeholder="1"
					required
					localValue={newItem.quantity}
					localOnChange={e => handleChange('quantity', e.target.value)}
				/>
				<Input
					label={t('itemInfo.unitPrice')}
					type="number"
					inputId="unitPrice"
					placeholder="0,00"
					required
					localValue={newItem.unitPrice}
					localOnChange={e => handleChange('unitPrice', e.target.value)}
				/>
				<div>
					<label htmlFor="currencySelect" className="text-sm font-medium">
						{t('itemInfo.currency')} <span className="text-destructive ml-1">*</span>
					</label>
					<select
						id="currencySelect"
						value={newItem.currency}
						onChange={e => handleChange('currency', e.target.value)}
						className="p-2 w-full mb-4 lg:col-span-2 flex h-10 bg-zinc-50 px-3 py-2 text-sm">
						<option value="PLN">PLN</option>
						<option value="EUR">{t('itemInfo.euro')}</option>
					</select>
				</div>
			</div>

			<button
				onClick={handleAddItem}
				disabled={!newItem.itemName || !newItem.quantity || !newItem.unitPrice}
				className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 disabled:opacity-50">
				<HugeiconsIcon icon={Add01Icon} size={15} strokeWidth={3} />
				{t('itemInfo.addItemButton')}
			</button>
		</div>
	)
}

export default ItemInfo
