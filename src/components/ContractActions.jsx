import React from 'react'
import { useUserData } from '../contexts/UserDataContext'
import { HugeiconsIcon } from '@hugeicons/react'
import {
	LicenseIcon,
	User02Icon,
	PackageIcon,
	PenTool03Icon,
	CheckmarkSquare03Icon,
	Alert02Icon,
} from '@hugeicons/core-free-icons'
import { PDFDownloadLink } from '@react-pdf/renderer'
import ContractPDF from './ContractPDF'

function ContractActions() {
	const { date, name, adress, postalCodeCity, items, signature } = useUserData()

	const isFormValid = () => {
		const hasClientInfo = date && name && adress && postalCodeCity
		const hasItems = items?.length > 0
		const hasSignature = signature !== null

		return hasClientInfo && hasItems && hasSignature
	}

	const getValidationStatus = () => {
		return [
			{
				label: 'Informacje o kliencie',
				valid: date && name && adress && postalCodeCity,
				icon: <HugeiconsIcon icon={User02Icon} size={16} />,
			},
			{
				label: 'Pozycje umowy',
				valid: items?.length > 0,
				icon: <HugeiconsIcon icon={PackageIcon} size={16} />,
			},
			{
				label: 'Podpis cyfrowy',
				valid: signature !== null,
				icon: <HugeiconsIcon icon={PenTool03Icon} size={16} />,
			},
		]
	}

	// const handleGeneratePDF = () => {
	// 	if (isFormValid() && onGeneratePDF) {
	// 		onGeneratePDF()
	// 	}
	// }

	const validationChecks = getValidationStatus()
	const validChecks = validationChecks?.filter(check => check?.valid)?.length

	return (
		<div className="bg-white border border-slate-200 p-6">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-semibold text-text-primary">Generowanie umowy</h2>
				<div className="flex items-center space-x-1 text-xs text-text-secondary">
					<HugeiconsIcon icon={LicenseIcon} size={14} />
					<span>Gotowość: {validChecks}/3</span>
				</div>
			</div>

			{validationChecks?.map((check, index) => (
				<div key={index} className="flex items-center space-x-2 mb-3">
					<div
						className={`w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 ${check?.valid ? 'text-slate-800' : 'text-slate-500'}`}>
						{check?.icon}
					</div>
					<span className={`text-s ${check?.valid ? 'text-slate-800' : 'text-slate-500'}`}>{check?.label}</span>
					{check?.valid && <HugeiconsIcon icon={CheckmarkSquare03Icon} size={16} className="text-green-600 ml-auto" />}
				</div>
			))}

			{/* Progress Bar */}
			<div className="mb-6 mt-5">
				<div className="flex items-center justify-between mb-2 ">
					<span className="text-xs font-medium text-text-primary">Postęp formularza</span>
					<span className="text-xs text-text-secondary ">{Math.round((validChecks / 3) * 100)}%</span>
				</div>
				<div className="w-full bg-muted rounded-full h-2 bg-slate-100">
					<div
						className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-smooth"
						style={{ width: `${(validChecks / 3) * 100}%` }}
					/>
				</div>
			</div>

			{/* Action Button */}
			{/* <div className="space-y-3"> */}
			<PDFDownloadLink
				document={
					<ContractPDF
						date={date}
						name={name}
						adress={adress}
						postalCodeCity={postalCodeCity}
						items={items}
						signature={signature}
					/>
				}
				fileName="umowa.pdf"
				style={{
					padding: '8px 16px',
					backgroundColor: '#2563eb',
					color: 'white',
					borderRadius: '8px',
					fontSize: '14px',
					textDecoration: 'none',
				}}>
				Generuj
			</PDFDownloadLink>

			{/* <button
					onClick={handleGeneratePDF}
					disabled={!isFormValid() || isGenerating}
					className={`w-full flex items-center justify-center gap-2 px-4 py-2 text-white font-medium transition ${
						isFormValid() && !isGenerating
							? 'bg-success hover:bg-success/90'
							: 'bg-muted text-muted-foreground cursor-not-allowed'
					}`}>
					<HugeiconsIcon icon={LicenseIcon} size={16} />
					{isGenerating ? 'Generowanie...' : 'Generuj PDF'}
				</button> */}
			{/* </div> */}

			{/* Status Messages */}
			{!isFormValid() && (
				<div className="mt-4 p-3 border border-slate-200">
					<div className="flex items-start space-x-2">
						{/* <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" /> */}
						<HugeiconsIcon icon={Alert02Icon} size={18} className="text-yellow-600" />
						<div>
							<p className="text-xs font-medium text-yellow-600">Formularz niekompletny</p>
							<p className="text-xs text-text-secondary mt-1">
								Uzupełnij wszystkie wymagane pola aby wygenerować umowę PDF.
							</p>
						</div>
					</div>
				</div>
			)}

			{isFormValid() && (
				<div className="mt-4 p-3 border border-slate-200">
					<div className="flex items-start space-x-2">
						{/* <Icon name="CheckCircle" size={16} className="text-success mt-0.5" /> */}
						<HugeiconsIcon icon={CheckmarkSquare03Icon} size={18} className="text-green-600" />
						<div>
							<p className="text-xs font-medium text-green-600">Formularz gotowy</p>
							<p className="text-xs text-text-secondary mt-1">
								Wszystkie wymagane pola zostały uzupełnione. Możesz wygenerować umowę.
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default ContractActions
