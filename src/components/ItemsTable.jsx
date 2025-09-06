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
			<div className="bg-card border border-border rounded-lg p-8">
				<div className="text-center">
					<HugeiconsIcon icon={PackageIcon} size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
					<h3 className="text-lg font-medium text-text-primary mb-2">Brak pozycji w umowie</h3>
					<p className="text-text-secondary">Dodaj pierwszą pozycję używając formularza powyżej</p>
				</div>
			</div>
		)
	}

	return (
		<div className="bg-card border border-border rounded-lg overflow-hidden">
			<div className="px-6 py-4 border-b border-border">
				<h2 className="text-lg font-semibold text-text-primary">Pozycje umowy ({items.length})</h2>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-muted">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
								Nazwa
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
								Ilość
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
								Cena jedn.
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
								Waluta
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
								Wartość
							</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
								Akcje
							</th>
						</tr>
					</thead>
					<tbody className="bg-card divide-y divide-border">
						{items.map((item, index) => (
							<tr key={index} className="hover:bg-muted/50 transition-colors">
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-text-primary">{item.itemName}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-text-primary">{item.quantity}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm text-text-primary">{item.unitPrice}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
										{item.currency}
									</span>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="text-sm font-medium text-text-primary">{item.quantity * item.unitPrice}</div>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<div className="flex items-center space-x-2">
										<HugeiconsIcon icon={Delete02Icon} onClick={() => onRemoveItem(index)} iconSize={14} />
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
