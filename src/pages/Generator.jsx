// src/pages/Generator.jsx
import React from 'react'
import ClientInfo from '../components/ClientInfo'
import PageNav from '../components/PageNav'
import ItemInfo from '../components/ItemInfo'
import ItemsTable from '../components/ItemsTable'
import Signature from '../components/Signature'
import Summary from '../components/Summary'
import ContractActions from '../components/ContractActions'

function Generator() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<PageNav />
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2 space-y-8">
					<ClientInfo />
					<ItemInfo />
					<ItemsTable />
					<Signature />
				</div>
				<div className="space-y-6">
					<Summary />
					<ContractActions />
				</div>
			</div>
		</div>
	)
}

export default Generator
