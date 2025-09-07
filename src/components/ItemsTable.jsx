import { HugeiconsIcon } from '@hugeicons/react'
import { PackageIcon } from '@hugeicons/core-free-icons'
import { useUserData } from '../contexts/UserDataContext'
import { Delete02Icon } from '@hugeicons/core-free-icons'
// import Button from './ui/Button'

// funkcja pomocnicza do formatowania waluty
// function formatCurrency(value, currency) {
// 	if (!value) return '0,00'
// 	return new Intl.NumberFormat('pl-PL', {
// 		style: 'currency',
// 		currency,
// 	}).format(value)
// }

function ItemsTable() {
	const { items, removeItem } = useUserData() // pobieramy items z providera

	const onRemoveItem = index => {
		removeItem(index)
	}

	if (!items || items.length === 0) {
		return (
			<div className="bg-white border border-gray-200 p-8">
				<div className="text-center">
					<HugeiconsIcon icon={PackageIcon} size={48} color="#9ca3af" className="mx-auto mb-4" />
					<h3 className="text-lg font-medium text-gray-800 mb-2">Brak pozycji w umowie</h3>
					<p className="text-gray-500">Dodaj pierwszą pozycję używając formularza powyżej</p>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-white border border-gray-200 overflow-hidden">
			<div className="px-6 py-4 border-gray-200">
				<h2 className="text-base font-semibold text-gray-800">Pozycje umowy ({items.length})</h2>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-b border-gray-200 bg-gray-50">
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nazwa</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ilość</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Cena jedn.
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waluta</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Wartość
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akcje</th>
						</tr>
					</thead>
					<tbody>
						{items.map((item, index) => (
							<tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.itemName}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.quantity}</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
									{item.unitPrice} {item.currency === 'PLN' ? 'zł' : '€'}
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm">
									<span className="text-blue-600 font-medium cursor-pointer">{item.currency}</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
									{Number(item.quantity || 0) * Number(item.unitPrice || 0)} {item.currency === 'PLN' ? 'zł' : '€'}
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center space-x-3">
										{/* Ikona usuwania */}
										<HugeiconsIcon
											icon={Delete02Icon}
											onClick={() => onRemoveItem(index)}
											size={18}
											className="text-red-500 cursor-pointer hover:text-red-700"
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default ItemsTable
