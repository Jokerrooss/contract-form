import React from 'react'
import { useUserData } from '../contexts/UserDataContext'
import { HugeiconsIcon } from '@hugeicons/react'
import { CoinsIcon, EuroIcon } from '@hugeicons/core-free-icons'
import { useTranslation } from 'react-i18next'

function Summary() {
	const { t } = useTranslation()
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

		items?.forEach(item => {
			const itemTotal = Number(item.quantity) * Number(item.unitPrice) || 0
			if (item.currency === 'PLN') totalPLN += itemTotal
			if (item.currency === 'EUR') totalEUR += itemTotal
		})

		return { totalPLN, totalEUR }
	}

	const { totalPLN, totalEUR } = calculateSeparateTotals()
	const vatAmountPLN = totalPLN * 0.23
	const vatAmountEUR = totalEUR * 0.23
	const totalWithoutVATPLN = totalPLN - vatAmountPLN
	const totalWithoutVATEUR = totalEUR - vatAmountEUR

	return (
		<div className="bg-white border border-slate-200 p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold text-text-primary">{t('summary.title')}</h2>
			</div>
			<div className="space-y-4">
				<div className="flex items-center justify-between py-2">
					<span className="text-sm text-text-secondary">{t('summary.itemsCount')}</span>
					<span className="text-sm font-medium text-text-primary">{items?.length}</span>
				</div>

				<div className="border-t border-slate-200 pt-4 space-y-4">
					{totalPLN > 0 && (
						<div className="bg-muted/50 p-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-text-primary flex items-center">
									<HugeiconsIcon icon={CoinsIcon} size={16} className="mr-2" />
									{t('summary.netTotalPLN')}
								</span>
								<span className="text-lg font-semibold text-text-primary">
									{formatCurrency(totalWithoutVATPLN, 'PLN')}
								</span>
							</div>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-text-secondary">{t('summary.vat')}</span>
								<span className="text-sm font-medium text-text-primary">{formatCurrency(vatAmountPLN, 'PLN')}</span>
							</div>
							<div className="border-t border-slate-200 pt-2 mt-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-semibold text-text-primary">{t('summary.grossTotalPLN')}</span>
									<span className="text-xl font-bold text-primary">{formatCurrency(totalPLN, 'PLN')}</span>
								</div>
							</div>
						</div>
					)}

					{totalEUR > 0 && (
						<div className="bg-accent/10 p-4">
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm font-medium text-text-primary flex items-center">
									<HugeiconsIcon icon={EuroIcon} size={16} className="mr-2" />
									{t('summary.netTotalEUR')}
								</span>
								<span className="text-lg font-semibold text-accent">{formatCurrency(totalWithoutVATEUR, 'EUR')}</span>
							</div>
							<div className="flex items-center justify-between mb-2">
								<span className="text-sm text-text-secondary">{t('summary.vat')}</span>
								<span className="text-sm font-medium text-text-primary">{formatCurrency(vatAmountEUR, 'EUR')}</span>
							</div>
							<div className="border-t border-slate-200 pt-2 mt-2">
								<div className="flex items-center justify-between">
									<span className="text-sm font-semibold text-text-primary">{t('summary.grossTotalEUR')}</span>
									<span className="text-xl font-bold text-accent">{formatCurrency(totalEUR, 'EUR')}</span>
								</div>
							</div>
						</div>
					)}

					{totalPLN === 0 && totalEUR === 0 && (
						<div className="bg-muted/30 p-4 text-center">
							<span className="text-sm text-text-secondary">{t('summary.noItems')}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Summary
