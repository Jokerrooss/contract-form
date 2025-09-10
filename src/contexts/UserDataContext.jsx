import { createContext, useContext, useReducer } from 'react'

const UserDataContext = createContext()

const initialState = {
	date: '',
	name: '',
	adress: '',
	postalCodeCity: '',
	items: [],
	signature: null,
	paymentMethod: '',
	accountNumber: '',
}

function reducer(state, action) {
	switch (action.type) {
		case 'input/change': {
			const { field, value } = action.payload
			return {
				...state,
				[field]: value,
			}
		}
		case 'item/add':
			return { ...state, items: [...state.items, action.payload] }
		case 'item/remove':
			return { ...state, items: Array.isArray(state.items) ? state.items.filter((_, i) => i !== action.payload) : [] }
		case 'signature/set':
			return { ...state, signature: action.payload }
		case 'payment/set':
			return { ...state, paymentMethod: action.payload }
		case 'account/set':
			return { ...state, accountNumber: action.payload }
		default:
			return state
	}
}

function UserDataProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState)

	const value = {
		...state,
		handleInputChange,
		addItem,
		removeItem,
		setPaymentMethod,
		setAccountNumber,
	}

	function handleInputChange(field, value) {
		dispatch({ type: 'input/change', payload: { field, value } })
	}

	function addItem(item) {
		dispatch({ type: 'item/add', payload: item })
	}

	function removeItem(index) {
		dispatch({ type: 'item/remove', payload: index })
	}

	function setPaymentMethod(method) {
		dispatch({ type: 'payment/set', payload: method })
	}

	function setAccountNumber(account) {
		dispatch({ type: 'account/set', payload: account })
	}

	return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>
}

function useUserData() {
	const context = useContext(UserDataContext)
	if (context === undefined) throw new Error('UserDataContext was used outside the UserDataProvider')
	return context
}

export { UserDataProvider, useUserData }
