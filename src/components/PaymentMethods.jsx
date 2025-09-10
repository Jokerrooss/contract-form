import React, { useState } from 'react'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cash02Icon, CreditCardIcon } from '@hugeicons/core-free-icons'
import { useUserData } from '../contexts/UserDataContext'
import Input from './ui/Input'
import { useTranslation } from 'react-i18next'

const PaymentMethods = () => {
	const { t } = useTranslation()
	const { paymentMethod, setAccountNumber, setPaymentMethod } = useUserData()
	// const [accNum, setAccNum] = useState('')

	const methods = [
		{
			id: 'transfer',
			label: t('payment.transfer'),
			icon: <HugeiconsIcon icon={CreditCardIcon} />,
			color: 'blue',
		},
		{
			id: 'cash',
			label: t('payment.cash'),
			icon: <HugeiconsIcon icon={Cash02Icon} />,
			color: 'green',
		},
	]

	const getColorClasses = (method, isSelected) => {
		const colorMap = {
			blue: isSelected
				? 'bg-blue-100 border-blue-500 text-blue-700'
				: 'bg-white border-gray-200 text-gray-700 hover:border-blue-300',
			green: isSelected
				? 'bg-green-100 border-green-500 text-green-700'
				: 'bg-white border-gray-200 text-gray-700 hover:border-green-300',
		}
		return colorMap[method.color]
	}

	return (
		<div className="bg-white border border-slate-200 p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold text-text-primary">{t('payment.title')}</h2>
			</div>
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					{methods.map(method => {
						const isSelected = paymentMethod === method.id

						return (
							<button
								key={method.id}
								type="button"
								onClick={() => {
									if (method.id === 'cash') setAccountNumber('')
									setPaymentMethod(method.id)
								}}
								className={`p-4 border-2 transition-all duration-200 hover:shadow-md ${getColorClasses(
									method,
									isSelected
								)} ${isSelected ? 'transform scale-105 shadow-lg' : ''}`}>
								<div className="flex flex-col items-center gap-2">
									{method.icon}
									<span className="text-sm font-medium">{method.label}</span>
								</div>
							</button>
						)
					})}
				</div>
			</div>
			{paymentMethod === 'transfer' && (
				<div className="mt-3">
					<Input
						label={t('payment.account')}
						type="text"
						inputId="accountNumber"
						placeholder={111111}
						required
						className="md:col-span-2"
					/>
				</div>
			)}
		</div>
	)
}

export default PaymentMethods
