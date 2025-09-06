import React from 'react'
import PageNav from '../components/PageNav'
import ClientInfo from '../components/ClientInfo'
import ItemInfo from '../components/ItemInfo'
import ItemsTable from '../components/ItemsTable'

function GeneratorEn() {
	return (
		<div>
			<PageNav />
			<h1>GeneratorEN</h1>
			<ClientInfo />
			<ItemInfo />
			<ItemsTable />
		</div>
	)
}

export default GeneratorEn
