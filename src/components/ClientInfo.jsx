import React from 'react'
import Input from './ui/Input'
import { useTranslation } from 'react-i18next'

function ClientInfo() {
	const { t } = useTranslation()

	return (
		<div className="bg-white border border-slate-200 p-6">
			<h2 className="text-lg font-semibold text-text-primary mb-4">{t('clientInfo.title')}</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Input label={t('clientInfo.date')} type="date" inputId="date" required className="md:col-span-2" />
				<Input
					label={t('clientInfo.name')}
					type="text"
					inputId="name"
					placeholder={t('clientInfo.namePlaceholder')}
					required
					className="md:col-span-2"
				/>
				<Input
					label={t('clientInfo.adress')}
					type="text"
					inputId="adress"
					placeholder={t('clientInfo.adressPlaceholder')}
					required
					className="md:col-span-2"
				/>
				<Input
					label={t('clientInfo.postal')}
					type="text"
					inputId="postalCodeCity"
					placeholder={t('clientInfo.postalPlaceholder')}
					required
					className="md:col-span-2"
				/>
			</div>
		</div>
	)
}

export default ClientInfo
