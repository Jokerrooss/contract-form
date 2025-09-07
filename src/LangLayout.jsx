import { Outlet, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import i18n from './i18n'

export default function LangLayout() {
	const { lang } = useParams()
	const [ready, setReady] = useState(false)

	useEffect(() => {
		let mounted = true

		const changeLang = async () => {
			if (lang && i18n.language !== lang) {
				await i18n.changeLanguage(lang)
			}
			if (mounted) setReady(true)
		}

		changeLang()

		return () => (mounted = false)
	}, [lang])

	// dopóki i18n się nie zsynchronizuje, nie renderujemy dzieci
	if (!ready) return null

	return <Outlet key={lang} /> // key wymusza remount dzieci przy zmianie języka
}
