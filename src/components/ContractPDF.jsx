// ContractPDF.jsx
import React from 'react'
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer'

Font.register({
	family: 'Roboto',
	fonts: [
		{ src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf' },
		{
			src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
			fontWeight: 'bold',
		},
	],
})

const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontSize: 10,
		fontFamily: 'Roboto',
		lineHeight: 1.3,
	},
	title: {
		fontSize: 12,
		textAlign: 'center',
		marginBottom: 5,
		fontWeight: 'bold',
	},
	section: {
		marginBottom: 5,
	},
	bold: {
		fontWeight: 'bold',
	},
	underline: {
		textDecoration: 'underline',
	},
	table: {
		display: 'table',
		width: '100%',
		borderStyle: 'solid',
		marginTop: 3,
		marginBottom: 3,
		borderSpacing: 0,
	},
	tableRow: {
		flexDirection: 'row',
	},
	tableCol: {
		width: '25%',
		borderStyle: 'solid',
		borderWidth: 1,
		padding: 3,
		textAlign: 'center',
	},
	tableHeader: {
		backgroundColor: '#f0f0f0',
		fontWeight: 'bold',
	},
	signatureBlock: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	signatureBox: {
		width: '45%',
		textAlign: 'center',
	},
	signatureLine: {
		marginBottom: 5,
		borderBottom: '1px solid black',
		paddingBottom: 3,
	},
	signatureImage: {
		width: 220,
		marginBottom: -15,
		alignSelf: 'center',
	},

	signatureImageBuyer: {
		width: 80,
		marginBottom: -10,
		alignSelf: 'center',
	},
	sectionTitle: {
		fontWeight: 'bold',
		marginBottom: 3,
		marginTop: 5,
		textAlign: 'center',
	},
	paragraph: {
		marginBottom: 8,
		textAlign: 'justify',
	},
	indent: {
		marginLeft: 10,
	},
	contractNumber: {
		textAlign: 'center',
	},
	enSubtitle: {
		fontSize: 9,
		textAlign: 'center',
		marginBottom: 6,
	},
	smallTranslation: {
		fontSize: 7.5,
		color: '#333333',
		marginTop: 2,
	},
	smallInline: {
		fontSize: 8,
	},
})

export default function ContractPDF({ date, name, adress, postalCodeCity, items, signature }) {
	const lang = window.location.href.split('/').at(-1)
	console.log(lang)

	const startDate = new Date('2025-09-09T00:00:00')
	const now = new Date()
	const diffMs = now - startDate
	const diffDays = Math.floor(diffMs / 1000 / 60 / 60 / 24)

	const [firstName, lastName] = name.split(' ')
	const initials = (firstName?.slice(0, 2) || '') + (lastName?.slice(0, 2) || '')

	const contractNumber = `${initials.toUpperCase()}${diffDays}`
	const totalPLN = items
		.filter(item => item.currency === 'PLN')
		.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

	const totalEUR = items
		.filter(item => item.currency === 'EUR')
		.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)

	if (lang === 'pl') {
		return (
			<Document>
				<Page size="A4" style={styles.page}>
					{/* Tytuł */}
					<Text style={styles.title}>Umowa sprzedaży</Text>
					<Text style={styles.contractNumber}>Nr {contractNumber}</Text>

					{/* Data i miejsce */}
					<View style={styles.section}>
						<Text>
							zawarta w Toruniu, w dniu: <Text style={styles.bold}>{date}</Text>
						</Text>
					</View>

					{/* Strony umowy */}
					<View style={styles.section}>
						<Text>pomiędzy:</Text>
						<Text style={styles.bold}>Firmą MERFOR Beata Nowak, ul. Olsztyńska 121, 87-100 Toruń, NIP: 8791032330</Text>
						<Text>zwanym dalej Kupującym</Text>

						<Text>a</Text>

						<Text style={styles.bold}>
							{name}, {adress}, {postalCodeCity}
						</Text>

						<Text>zwanym dalej Sprzedawcą</Text>
					</View>

					{/* Dane sprzedawcy */}
					{/* <View style={styles.section}></View> */}

					{/* Sekcja § 1 */}
					<Text style={styles.sectionTitle}>§ 1</Text>
					<View style={styles.section}>
						<Text style={styles.indent}>1. Sprzedający sprzedaje, a Kupujący kupuje:</Text>

						{/* Tabela przedmiotów */}
						<View style={styles.table}>
							<View style={[styles.tableRow, styles.tableHeader]}>
								{['Model', 'Ilość', 'Cena za sztukę', 'Razem'].map((col, idx) => (
									<View key={idx} style={styles.tableCol}>
										<Text>{col}</Text>
									</View>
								))}
							</View>

							{items?.map((item, idx) => (
								<View style={styles.tableRow} key={idx}>
									<View style={styles.tableCol}>
										<Text>{item.itemName}</Text>
									</View>
									<View style={styles.tableCol}>
										<Text>{item.quantity}</Text>
									</View>
									<View style={styles.tableCol}>
										<Text>
											{item.unitPrice} {item.currency === 'PLN' ? 'zł' : '€'}
										</Text>
									</View>
									<View style={styles.tableCol}>
										<Text>
											{item.quantity * item.unitPrice} {item.currency === 'PLN' ? 'zł' : '€'}
										</Text>
									</View>
								</View>
							))}
						</View>

						<Text style={styles.indent}>dalej zwanym towarem (i/lub towarami)</Text>

						<Text style={styles.indent}>
							2. Cena towaru (lub towarów) zostaje ustalona na łączną kwotę brutto:
							<Text style={styles.bold}>
								{totalPLN && !totalEUR ? ` ${totalPLN} zł` : ''}
								{totalEUR && !totalPLN ? ` ${totalEUR} €` : ''}
								{totalPLN && totalEUR ? ` ${totalPLN} zł + ${totalEUR} €` : ''}
							</Text>
						</Text>

						<Text style={styles.indent}>
							3. Kupujący zapłaci za zamówiony towar umówioną cenę gotówką lub przelewem bankowym na rachunek bankowy
							Sprzedającego.
						</Text>

						<Text style={styles.indent}>
							4. Sprzedawca oświadcza, że Towar jest jego własnością,{' '}
							<Text style={styles.bold}>używany a jego jakość odpowiada jakości Towaru </Text>
							zaprezentowanego Kupującemu przed zawarciem umowy, jest oryginalny oraz, że towar pozbawiony jest wad
							fizycznych oraz praw i obciążeń osób trzecich.
						</Text>

						<Text style={styles.indent}>5. Przedmiotem umowy są towary używane.</Text>
					</View>

					{/* Sekcja § 2 */}
					<Text style={styles.sectionTitle}>§ 2</Text>
					<View style={styles.section}>
						<Text style={styles.indent}>1. Za uchybienia związane z jakością towaru, odpowiada Sprzedający.</Text>
						<Text style={styles.indent}>
							2. Kupujący zastrzega sobie 7- dniowy termin do zwrotu towaru na adres sprzedającego na koszt
							sprzedającego w przypadku, gdy jakość towaru nie będzie odpowiadać jakości towaru zaprezentowanego przed
							zawarciem umowy Kupującemu, a także w przypadku innych niezgodności z treścią umowy.
						</Text>
					</View>

					{/* Sekcja § 3 */}
					<Text style={styles.sectionTitle}>§ 3</Text>
					<View style={styles.section}>
						<Text style={styles.indent}>
							Zmiany umowy wymagają zgody obu stron i zachowania formy pisemnej dla wywołania skutków prawnych.
						</Text>
					</View>

					{/* Sekcja § 4 */}
					<Text style={styles.sectionTitle}>§ 4</Text>
					<View style={styles.section}>
						<Text style={styles.indent}>
							W sprawach nieuregulowanych w umowie będą miały zastosowanie przepisy kodeks cywilnego.
						</Text>
					</View>

					{/* Sekcja § 5 */}
					<Text style={styles.sectionTitle}>§ 5</Text>
					<View style={styles.section}>
						<Text style={styles.indent}>
							Spory między stronami rozstrzyga sąd właściwy miejscowo i rzeczowo dla miasta Torunia, 87-100.
						</Text>
					</View>

					{/* Sekcja § 6 */}
					<Text style={styles.sectionTitle}>§ 6</Text>
					<View style={styles.section}>
						<Text style={styles.indent}>
							Umowę spisano w dwóch jednobrzmiących egzemplarzach po jednym dla każdej ze stron.
						</Text>
					</View>

					{/* Podpisy */}
					<View style={styles.signatureBlock}>
						<View style={styles.signatureBox}>
							<Image src="../../public/signature.png" style={styles.signatureImageBuyer} />
							<Text style={styles.signatureLine}> </Text>
							<Text>Kupujący</Text>
						</View>
						<View style={styles.signatureBox}>
							<Image src={signature} style={styles.signatureImage} />
							<Text style={styles.signatureLine}> </Text>
							<Text>Sprzedający</Text>
						</View>
					</View>
				</Page>
			</Document>
		)
	}

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* Title */}
				<Text style={styles.title}>Sales Agreement</Text>
				<Text style={styles.enSubtitle}>(Umowa sprzedaży)</Text>
				<Text style={styles.contractNumber}>No {contractNumber}</Text>

				{/* Place & date */}
				<View style={styles.section}>
					<Text>
						Concluded in Toruń, on: <Text style={styles.bold}>{date}</Text>
					</Text>
					<Text style={styles.smallTranslation}>(zawarta w Toruniu, dnia: {date})</Text>
				</View>

				{/* Parties */}
				<View style={styles.section}>
					<Text style={styles.bold}>between:</Text>
					<Text style={styles.smallTranslation}>(pomiędzy:)</Text>
					<Text style={{ marginTop: 6 }}>
						<Text style={styles.bold}>Company: MERFOR Beata Nowak</Text>, ul. Olsztyńska 121, 87-100 Toruń, NIP:
						8791032330
					</Text>
					<Text style={{ marginTop: 4 }}>
						Hereinafter referred to as the <Text style={styles.bold}>Buyer</Text>.
					</Text>
					<Text style={styles.smallTranslation}>
						(zwanym dalej <Text style={styles.bold}>Kupującym</Text>.)
					</Text>

					<Text style={{ marginTop: 6 }}>and</Text>
					<Text style={styles.smallTranslation}>(a)</Text>
					<Text style={{ marginTop: 4, fontWeight: 'bold' }}>
						{name}, {adress}, {postalCodeCity}
					</Text>
					<Text style={{ marginTop: 4 }}>
						Hereinafter referred to as the <Text style={styles.bold}>Seller</Text>:
					</Text>
					<Text style={styles.smallTranslation}>
						(zwanym dalej <Text style={styles.bold}>Sprzedawcą</Text>:)
					</Text>
				</View>

				{/* §1 */}
				<Text style={styles.sectionTitle}>§ 1</Text>
				<View style={styles.section}>
					<Text style={styles.indent}>1. The Seller sells, and the Buyer buys the following goods:</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						1. Sprzedający sprzedaje, a Kupujący kupuje następujące towary:
					</Text>

					{/* Items table */}
					<View style={styles.table}>
						{/* Table Header */}
						<View style={[styles.tableRow, styles.tableHeader]}>
							{[
								{
									en: 'Product name',
									pl: 'Nazwa produktu',
								},
								{
									en: 'Quantity',
									pl: 'Ilość',
								},
								{
									en: 'Price per unit',
									pl: 'Cena za sztukę',
								},
								{
									en: 'Total',
									pl: 'Razem',
								},
							].map((col, idx) => (
								<View key={`header-${idx}`} style={styles.tableCol}>
									<Text>{col.en}</Text>
									<Text style={styles.smallTranslation}>{col.pl}</Text>
								</View>
							))}
						</View>

						{/* Table Rows */}
						{items?.map((item, idx) => (
							<View key={`row-${idx}`} style={styles.tableRow}>
								<View style={styles.tableCol}>
									<Text>{item.itemName || ''}</Text>
								</View>
								<View style={styles.tableCol}>
									<Text>{item.quantity || 0}</Text>
								</View>
								<View style={styles.tableCol}>
									<Text>
										{item.unitPrice || 0} {item.currency === 'PLN' ? 'PLN' : 'EUR'}
									</Text>
								</View>
								<View style={styles.tableCol}>
									<Text>
										{(item.quantity || 0) * (item.unitPrice || 0) || 0} {item.currency === 'PLN' ? 'PLN' : 'EUR'}
									</Text>
								</View>
							</View>
						))}
					</View>

					<Text style={styles.indent}>
						2. Which gives a total agreed gross price:
						{totalPLN && !totalEUR ? ` ${totalPLN} zł` : ''}
						{totalEUR && !totalPLN ? ` ${totalEUR} €` : ''}
						{totalPLN && totalEUR ? ` ${totalPLN} zł + ${totalEUR} €` : ''}
					</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						2. Co daje łączną ustaloną cenę brutto:{totalPLN && !totalEUR ? ` ${totalPLN} zł` : ''}
						{totalEUR && !totalPLN ? ` ${totalEUR} €` : ''}
						{totalPLN && totalEUR ? ` ${totalPLN} zł + ${totalEUR} €` : ''}
					</Text>

					<Text style={styles.indent}>
						3. The Buyer shall pay for the ordered goods the agreed gross price in cash or by bank transfer to the
						Seller's bank account.
					</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						3. Kupujący zapłaci za zamówiony towar umówioną cenę gotówką lub przelewem bankowym na rachunek
						Sprzedającego.
					</Text>

					<Text style={styles.indent}>
						4. The Seller declares that the Goods are his property, used, and their quality corresponds to the quality
						of the Goods presented to the Buyer before the conclusion of the contract, they are original and free from
						physical defects and third party encumbrances.
					</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						4. Sprzedawca oświadcza, że Towar jest jego własnością, używany, a jego jakość odpowiada jakości towaru
						zaprezentowanego Kupującemu przed zawarciem umowy; jest oryginalny oraz pozbawiony wad fizycznych i obciążeń
						osób trzecich.
					</Text>

					<Text style={styles.indent}>5. The subject of the contract is used goods.</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>5. Przedmiotem umowy są towary używane.</Text>
				</View>

				{/* §2 */}
				<Text style={styles.sectionTitle}>§ 2</Text>
				<View style={styles.section}>
					<Text style={styles.indent}>
						1. The Seller is responsible for any defects related to the quality of the goods.
					</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						1. Za wady związane z jakością towaru odpowiada Sprzedający.
					</Text>

					<Text style={styles.indent}>
						2. The Buyer reserves a 7-day period to return the goods to the Seller's address at the Seller's expense if
						the quality of the goods does not correspond to the quality presented before the conclusion of the contract,
						as well as in case of other discrepancies with the contract.
					</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						2. Kupujący zastrzega sobie 7-dniowy termin do zwrotu towaru na adres Sprzedającego na koszt Sprzedającego,
						w przypadku gdy jakość towaru nie będzie odpowiadać jakości zaprezentowanej przed zawarciem umowy, oraz w
						przypadku innych niezgodności z treścią umowy.
					</Text>
				</View>

				{/* §3 */}
				<Text style={styles.sectionTitle}>§ 3</Text>
				<View style={styles.section}>
					<Text style={styles.indent}>
						Changes to the contract require the consent of both parties and must be made in writing to be legally
						effective.
					</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						Zmiany umowy wymagają zgody obu stron i formy pisemnej pod rygorem nieważności.
					</Text>
				</View>

				{/* §4 */}
				<Text style={styles.sectionTitle}>§ 4</Text>
				<View style={styles.section}>
					<Text style={styles.indent}>
						In matters not regulated by this contract, the provisions of the Polish Civil Code shall apply.
					</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						W sprawach nieuregulowanych w umowie mają zastosowanie przepisy polskiego Kodeksu cywilnego.
					</Text>
				</View>

				{/* §5 */}
				<Text style={styles.sectionTitle}>§ 5</Text>
				<View style={styles.section}>
					<Text style={styles.indent}>
						Disputes between the parties shall be resolved by the court having local and subject matter jurisdiction for
						the city of Toruń, 87-100 Poland.
					</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						Spory między stronami rozstrzyga sąd właściwy miejscowo i rzeczowo dla miasta Torunia, 87-100 Polska.
					</Text>
				</View>

				{/* §6 */}
				<Text style={styles.sectionTitle}>§ 6</Text>
				<View style={styles.section}>
					<Text style={styles.indent}>The contract is drawn up in two identical copies, one for each party.</Text>
					<Text style={[styles.smallTranslation, styles.indent]}>
						Umowę sporządzono w dwóch jednobrzmiących egzemplarzach, po jednym dla każdej ze stron.
					</Text>
				</View>

				{/* Signatures */}
				<View style={styles.signatureBlock}>
					<View style={styles.signatureBox}>
						<Image src={'../../public/signature.png'} style={styles.signatureImageBuyer} />
						<Text style={styles.signatureLine}> </Text>
						<Text>Buyer (Kupujący)</Text>
					</View>
					<View style={styles.signatureBox}>
						<Image src={signature} style={styles.signatureImage} />
						<Text style={styles.signatureLine}> </Text>
						<Text>Seller (Sprzedający)</Text>
					</View>
				</View>
			</Page>
		</Document>
	)
}
