import React from 'react'
import PageNav from '../components/PageNav'
import ClientInfo from '../components/ClientInfo'
import ItemInfo from '../components/ItemInfo'
import ItemsTable from '../components/ItemsTable'
import Summary from '../components/Summary'

function GeneratorPl() {
	return (
		<div>
			<PageNav />
			<h1>GeneratorPL</h1>
			<ClientInfo />
			<ItemInfo />
			<ItemsTable />
			<Summary />
		</div>
	)
}

export default GeneratorPl
