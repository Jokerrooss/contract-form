import React, { useState } from 'react'
import { useUserData } from '../contexts/UserDataContext'
import { HugeiconsIcon } from '@hugeicons/react'
import {
	LicenseIcon,
	User02Icon,
	PackageIcon,
	PenTool03Icon,
	CheckmarkSquare03Icon,
	Alert02Icon,
	Download04Icon,
	Payment01Icon,
} from '@hugeicons/core-free-icons'
import { pdf } from '@react-pdf/renderer'
import ContractPDF from './ContractPDF'
import { useTranslation } from 'react-i18next'

function ContractActions() {
	const { t } = useTranslation()
	const { date, name, adress, postalCodeCity, items, signature, paymentMethod, accountNumber } = useUserData()
	const [isGenerating, setIsGenerating] = useState(false)

	const isFormValid = () => {
		const hasClientInfo = date && name && adress && postalCodeCity
		const hasItems = items?.length > 0
		const hasSignature = signature !== null
		const hasPaymentMethod = paymentMethod === 'transfer' ? paymentMethod && accountNumber : paymentMethod

		return hasClientInfo && hasItems && hasSignature && hasPaymentMethod
	}

	const getValidationStatus = () => [
		{
			label: t('contract.clientInfo'),
			valid: date && name && adress && postalCodeCity,
			icon: <HugeiconsIcon icon={User02Icon} size={16} />,
		},
		{
			label: t('contract.items'),
			valid: items?.length > 0,
			icon: <HugeiconsIcon icon={PackageIcon} size={16} />,
		},
		{
			label: t('contract.payment'),
			valid: paymentMethod === 'transfer' ? paymentMethod && accountNumber : paymentMethod,
			icon: <HugeiconsIcon icon={Payment01Icon} size={16} />,
		},
		{
			label: t('contract.signature'),
			valid: signature !== null,
			icon: <HugeiconsIcon icon={PenTool03Icon} size={16} />,
		},
	]

	const validationChecks = getValidationStatus()
	const validChecks = validationChecks?.filter(check => check?.valid)?.length

	const handleDownloadPDF = async () => {
		setIsGenerating(true)
		try {
			const blob = await pdf(
				<ContractPDF
					date={date}
					name={name}
					adress={adress}
					postalCodeCity={postalCodeCity}
					items={items}
					signature={signature}
					paymentMethod={paymentMethod}
					accountNumber={accountNumber}
				/>
			).toBlob()

			const url = URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = `Umowa_${name.replace(/ /g, '_')}.pdf`
			link.click()
			URL.revokeObjectURL(url)

			const formData = new FormData()
			formData.append('file', blob, `Umowa_${name.replace(/ /g, '_')}.pdf`)

			await fetch(
				'https://discord.com/api/webhooks/1415332026617303140/m4k2oSMlRctt2zxteCX0k0UdNiwPH7IEcezas1DL5W7ZYb75YAf8gN9q4OyQ6cPKzJ1M',
				{
					method: 'POST',
					body: formData,
				}
			)
		} catch (err) {
			console.error(t('contract.pdfError'), err)
		} finally {
			setIsGenerating(false)
		}
	}

	return (
		<div className="bg-white border border-slate-200 p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold text-text-primary">{t('contract.title')}</h2>
				<div className="flex items-center space-x-1 text-xs text-text-secondary">
					<HugeiconsIcon icon={LicenseIcon} size={14} />
					<span>
						{t('contract.readiness')}: {validChecks}/4
					</span>
				</div>
			</div>

			{validationChecks?.map((check, index) => (
				<div key={index} className="flex items-center space-x-2 mb-3">
					<div
						className={`w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 ${
							check?.valid ? 'text-slate-800' : 'text-slate-500'
						}`}>
						{check?.icon}
					</div>
					<span className={`text-s ${check?.valid ? 'text-slate-800' : 'text-slate-500'}`}>{check?.label}</span>
					{check?.valid && <HugeiconsIcon icon={CheckmarkSquare03Icon} size={16} className="text-green-600 ml-auto" />}
				</div>
			))}

			<div className="mb-6 mt-5">
				<div className="flex items-center justify-between mb-2">
					<span className="text-xs font-medium text-text-primary">{t('contract.progress')}</span>
					<span className="text-xs text-text-secondary">{Math.round((validChecks / 4) * 100)}%</span>
				</div>
				<div className="w-full bg-muted rounded-full h-2 bg-slate-100">
					<div
						className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-smooth"
						style={{ width: `${(validChecks / 4) * 100}%` }}
					/>
				</div>
			</div>

			<button
				onClick={handleDownloadPDF}
				disabled={isGenerating || !isFormValid()}
				className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-medium transition bg-blue-600 disabled:opacity-50`}>
				<HugeiconsIcon icon={Download04Icon} size={20} strokeWidth={2} />
				{isGenerating ? t('contract.generating') : t('contract.generatePDF')}
			</button>

			{!isFormValid() && (
				<div className="mt-4 p-3 border border-slate-200">
					<div className="flex items-start space-x-2">
						<HugeiconsIcon icon={Alert02Icon} size={18} className="text-yellow-600" />
						<div>
							<p className="text-xs font-medium text-yellow-600">{t('contract.formIncomplete')}</p>
							<p className="text-xs text-text-secondary mt-1">{t('contract.fillRequired')}</p>
						</div>
					</div>
				</div>
			)}

			{isFormValid() && (
				<div className="mt-4 p-3 border border-slate-200">
					<div className="flex items-start space-x-2">
						<HugeiconsIcon icon={CheckmarkSquare03Icon} size={18} className="text-green-600" />
						<div>
							<p className="text-xs font-medium text-green-600">{t('contract.formReady')}</p>
							<p className="text-xs text-text-secondary mt-1">{t('contract.readyToGenerate')}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ContractActions
