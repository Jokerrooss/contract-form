import React from 'react'
import { useUserData } from '../../contexts/UserDataContext'

function Input({ label, type = 'text', placeholder, inputId, required = false, className, localValue, localOnChange }) {
	const { [inputId]: valueFromContext, handleInputChange } = useUserData()

	// wartość i onChange zależnie od trybu
	const value = localValue !== undefined ? localValue : valueFromContext || ''
	const onChange = localOnChange !== undefined ? localOnChange : e => handleInputChange(inputId, e.target.value)

	const baseInputClasses = 'flex h-10 w-full bg-zinc-50 px-3 py-2 text-sm'

	if (type === 'checkbox') {
		return (
			<input
				type="checkbox"
				id={inputId}
				checked={value}
				onChange={onChange}
				className={`h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
			/>
		)
	}

	if (type === 'radio') {
		return (
			<input
				type="radio"
				id={inputId}
				checked={value}
				onChange={onChange}
				className={`h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
			/>
		)
	}

	return (
		<div className="space-y-2">
			{label && (
				<label htmlFor={inputId} className="text-sm font-medium">
					{label} {required && <span className="text-destructive ml-1">*</span>}
				</label>
			)}
			<input
				type={type}
				id={inputId}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className={`${baseInputClasses} ${className}`}
			/>
		</div>
	)
}

export default Input
