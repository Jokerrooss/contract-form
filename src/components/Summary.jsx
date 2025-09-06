import React from 'react'
import { useUserData } from '../contexts/UserDataContext'
import { HugeiconsIcon } from '@hugeicons/react'
import { CoinsIcon, EuroIcon } from '@hugeicons/core-free-icons'

function Summary() {
	const { items } = useUserData()

	const formatCurrency = (amount, currency) => {
		return new Intl.NumberFormat('pl-PL', {
			style: 'currency',
			currency,
			minimumFractionDigits: 2,
		}).format(amount)
	}

	const calculateSeparateTotals = () => {
		let totalPLN = 0
		let totalEUR = 0

		items?.map(item => {
			const itemTotal = Number(item.quantity) * Number(item.unitPrice) || 0
			if (item.currency === 'PLN') {
				totalPLN += itemTotal
			} else if (item.currency === 'EUR') {
				totalEUR += itemTotal
			}
		})

		return { totalPLN, totalEUR }
	}

	const { totalPLN, totalEUR } = calculateSeparateTotals()
	const vatAmountPLN = totalPLN * 0.23
	const vatAmountEUR = totalEUR * 0.23
	const totalWithVATPLN = totalPLN + vatAmountPLN
	const totalWithVATEUR = totalEUR + vatAmountEUR

	return (
		<div className="bg-card border border-border rounded-lg p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold text-text-primary">Podsumowanie</h2>
			</div>
			<div className="space-y-4">
				{/* Items Count */}
				<div className="flex items-center justify-between py-2">
					<span className="text-sm text-text-secondary">Liczba pozycji:</span>
					<span className="text-sm font-medium text-text-primary">{items?.length}</span>
				</div>

				<div className="border-t border-border pt-4 space-y-4">
					{/* PLN Summary */}
					{totalPLN > 0 && (
						<div className="bg-muted/50 rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-text-primary flex items-center">
									<HugeiconsIcon icon={CoinsIcon} size={16} className="mr-2" />
									Suma netto (PLN)
								</span>
								<span className="text-lg font-semibold text-text-primary">{formatCurrency(totalPLN, 'PLN')}</span>
							</div>

							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-text-secondary">VAT (23%)</span>
								<span className="text-sm font-medium text-text-primary">{formatCurrency(vatAmountPLN, 'PLN')}</span>
							</div>

							<div className="border-t border-border pt-2 mt-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-semibold text-text-primary">Suma brutto (PLN)</span>
									<span className="text-xl font-bold text-primary">{formatCurrency(totalWithVATPLN, 'PLN')}</span>
								</div>
							</div>
						</div>
					)}

					{/* EUR Summary */}
					{totalEUR > 0 && (
						<div className="bg-accent/10 rounded-lg p-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-text-primary flex items-center">
									<HugeiconsIcon icon={EuroIcon} size={16} className="mr-2" />
									Suma netto (EUR)
								</span>
								<span className="text-lg font-semibold text-accent">{formatCurrency(totalEUR, 'EUR')}</span>
							</div>

							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-text-secondary">VAT (23%)</span>
								<span className="text-sm font-medium text-text-primary">{formatCurrency(vatAmountEUR, 'EUR')}</span>
							</div>

							<div className="border-t border-border pt-2 mt-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-semibold text-text-primary">Suma brutto (EUR)</span>
									<span className="text-xl font-bold text-accent">{formatCurrency(totalWithVATEUR, 'EUR')}</span>
								</div>
							</div>
						</div>
					)}

					{/* No items message */}
					{totalPLN === 0 && totalEUR === 0 && (
						<div className="bg-muted/30 rounded-lg p-4 text-center">
							<span className="text-sm text-text-secondary">Brak pozycji do podsumowania</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Summary
