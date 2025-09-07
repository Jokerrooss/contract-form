import React, { useEffect, useRef, useState } from 'react'
import { useUserData } from '../contexts/UserDataContext'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'
import {
	Alert02Icon,
	CheckmarkSquare03Icon,
	PenTool03Icon,
	RefreshIcon,
	Download04Icon,
} from '@hugeicons/core-free-icons'

function Signature() {
	const { t } = useTranslation()
	const canvasRef = useRef(null)
	const [isDrawing, setIsDrawing] = useState(false)
	const [hasSignature, setHasSignature] = useState(false)
	const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })

	const { signature, handleInputChange } = useUserData()

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		ctx.strokeStyle = '#1E293B'
		ctx.lineWidth = 2
		ctx.lineCap = 'round'
		ctx.lineJoin = 'round'

		const rect = canvas.getBoundingClientRect()
		canvas.width = rect.width * window.devicePixelRatio
		canvas.height = rect.height * window.devicePixelRatio
		ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

		if (signature) {
			const img = new Image()
			img.onload = () => {
				ctx.clearRect(0, 0, rect.width, rect.height)
				ctx.drawImage(img, 0, 0, rect.width, rect.height)
				setHasSignature(true)
			}
			img.src = signature
		}
	}, [signature])

	const getEventPosition = e => {
		const canvas = canvasRef.current
		const rect = canvas.getBoundingClientRect()
		const clientX = e.clientX || (e.touches && e.touches[0]?.clientX)
		const clientY = e.clientY || (e.touches && e.touches[0]?.clientY)

		return {
			x: clientX - rect.left,
			y: clientY - rect.top,
		}
	}

	const startDrawing = e => {
		e.preventDefault()
		setIsDrawing(true)
		setLastPosition(getEventPosition(e))
	}

	const draw = e => {
		if (!isDrawing) return
		e.preventDefault()

		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		const currentPosition = getEventPosition(e)

		ctx.beginPath()
		ctx.moveTo(lastPosition.x, lastPosition.y)
		ctx.lineTo(currentPosition.x, currentPosition.y)
		ctx.stroke()

		setLastPosition(currentPosition)
		setHasSignature(true)
	}

	const stopDrawing = e => {
		if (!isDrawing) return
		e.preventDefault()
		setIsDrawing(false)

		const canvas = canvasRef.current
		const signatureDataURL = canvas.toDataURL('image/png')
		handleInputChange('signature', signatureDataURL)
	}

	const clearSignature = () => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext('2d')
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		setHasSignature(false)
		handleInputChange('signature', null)
	}

	const saveSignature = () => {
		if (!hasSignature) return
		const canvas = canvasRef.current
		const signatureDataURL = canvas.toDataURL('image/png')
		handleInputChange('signature', signatureDataURL)

		const link = document.createElement('a')
		link.download = `signature-${new Date().toISOString().split('T')[0]}.png`
		link.href = signatureDataURL
		link.click()
	}

	return (
		<div className="bg-white border border-slate-200 p-6">
			<h2 className="text-lg font-semibold text-text-primary mb-4">{t('signature.title')}</h2>

			<div className="space-y-4">
				<div className="relative">
					<canvas
						ref={canvasRef}
						className="w-full h-40 border-2 border-dashed border-slate-200 cursor-crosshair touch-none"
						onMouseDown={startDrawing}
						onMouseMove={draw}
						onMouseUp={stopDrawing}
						onMouseLeave={stopDrawing}
						onTouchStart={startDrawing}
						onTouchMove={draw}
						onTouchEnd={stopDrawing}
					/>

					{!hasSignature && (
						<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
							<div className="text-center">
								<HugeiconsIcon icon={PenTool03Icon} color="#9ca3af" size={36} className="mx-auto mb-4" />
								<p className="text-sm text-text-secondary">{t('signature.instruction')}</p>
								<p className="text-xs text-text-secondary mt-1">{t('signature.instructionMobile')}</p>
							</div>
						</div>
					)}
				</div>

				<div className="flex flex-col sm:flex-row gap-3">
					<button
						onClick={clearSignature}
						disabled={!hasSignature}
						className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 disabled:opacity-50">
						<HugeiconsIcon icon={RefreshIcon} size={15} />
						{t('signature.clear')}
					</button>
					<button
						onClick={saveSignature}
						disabled={!hasSignature}
						className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 disabled:opacity-50">
						<HugeiconsIcon icon={Download04Icon} size={20} strokeWidth={2} />
						{t('signature.download')}
					</button>
				</div>

				<div className={'flex space-x-2 p-3 border border-slate-200'}>
					<span>
						{hasSignature ? (
							<HugeiconsIcon icon={CheckmarkSquare03Icon} size={15} className="text-green-600 mt-px" />
						) : (
							<HugeiconsIcon icon={Alert02Icon} size={15} className="text-yellow-600 mt-px" />
						)}
					</span>
					<div>
						<p className={`text-xs font-medium ${hasSignature ? 'text-green-600' : 'text-yellow-600'}`}>
							{hasSignature ? t('signature.statusSigned') : t('signature.statusRequired')}
						</p>
						<p className="text-xs text-text-secondary mt-1">
							{hasSignature ? t('signature.noteSigned') : t('signature.noteRequired')}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signature
