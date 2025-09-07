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
})

export default function ContractPDF({ date, name, adress, postalCodeCity, items, signature }) {
	// Zabezpieczenie przed pustą tablicą items
	const hasItems = items && items.length > 0

	// Obliczanie łącznej kwoty
	const totalPrice = hasItems ? items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0) : 0

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				{/* Tytuł */}
				<Text style={styles.title}>Umowa sprzedaży</Text>
				<Text style={styles.contractNumber}>Nr.</Text>

				{/* Data i miejsce */}
				<View style={styles.section}>
					<Text>
						zawarta w Toruniu, w dniu: <Text style={styles.bold}>{date}</Text>
					</Text>
				</View>

				{/* Strony umowy */}
				<View style={styles.section}>
					<Text>pomiędzy:</Text>
					<Text>
						Imię i nazwisko: <Text style={styles.bold}>{name}</Text>
					</Text>
					<Text>
						Adres:{' '}
						<Text style={styles.bold}>
							{adress}, {postalCodeCity}
						</Text>
					</Text>
					<Text>zwanym dalej Sprzedawcą</Text>
					<Text>a</Text>
				</View>

				{/* Dane sprzedawcy */}
				<View style={styles.section}>
					<Text style={styles.bold}>Firmą MERFOR Beata Nowak, ul. Olsztyńska 121, 87-100 Toruń, NIP: 8791032330</Text>
					<Text>zwanym dalej Kupującym</Text>
				</View>

				{/* Sekcja § 1 */}
				<Text style={styles.sectionTitle}>§ 1</Text>
				<View style={styles.section}>
					<Text style={styles.indent}>1. Sprzedający sprzedaje, a Kupujący kupuje:</Text>

					{/* Tabela przedmiotów - z zabezpieczeniem */}
					<View style={styles.table}>
						<View style={[styles.tableRow, styles.tableHeader]}>
							{['Model', 'Ilość', 'Cena za sztukę', 'Razem'].map((col, idx) => (
								<View key={idx} style={styles.tableCol}>
									<Text>{col}</Text>
								</View>
							))}
						</View>

						{hasItems ? (
							items.map((item, idx) => (
								<View style={styles.tableRow} key={idx}>
									<View style={styles.tableCol}>
										<Text>{item.itemName || ''}</Text>
									</View>
									<View style={styles.tableCol}>
										<Text>{item.quantity || ''}</Text>
									</View>
									<View style={styles.tableCol}>
										<Text>
											{item.unitPrice || ''} {item.currency === 'PLN' ? 'zł' : '€'}
										</Text>
									</View>
									<View style={styles.tableCol}>
										<Text>
											{item.quantity * item.unitPrice || ''} {item.currency === 'PLN' ? 'zł' : '€'}
										</Text>
									</View>
								</View>
							))
						) : (
							// Pusty wiersz gdy nie ma przedmiotów
							<View style={styles.tableRow}>
								{['', '', '', ''].map((_, idx) => (
									<View key={idx} style={styles.tableCol}>
										<Text>-</Text>
									</View>
								))}
							</View>
						)}
					</View>

					<Text style={styles.indent}>dalej zwanym towarem (i/lub towarami)</Text>

					<Text style={styles.indent}>
						2. Cena towaru (lub towarów) zostaje ustalona na łączną kwotę brutto:
						<Text style={styles.bold}> {totalPrice} zł</Text>
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
						2. Kupujący zastrzega sobie 7- dniowy termin do zwrotu towaru na adres sprzedającego na koszt sprzedającego
						w przypadku, gdy jakość towaru nie będzie odpowiadać jakości towaru zaprezentowanego przed zawarciem umowy
						Kupującemu, a także w przypadku innych niezgodności z treścią umowy.
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
						{signature ? (
							<Image src={signature} style={styles.signatureImage} />
						) : (
							<Text style={styles.signatureLine}> </Text>
						)}
						<Text>Kupujący</Text>
					</View>
					<View style={styles.signatureBox}>
						<Text style={styles.signatureLine}> </Text>
						<Text>Sprzedający</Text>
					</View>
				</View>
			</Page>
		</Document>
	)
}
