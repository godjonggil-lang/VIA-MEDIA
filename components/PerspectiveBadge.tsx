import { Perspective } from '@/types'

const config: Record<Perspective, { label: string; className: string }> = {
  progressive: {
    label: '진보의 시각',
    className: 'border border-[#B22222] text-[#B22222]',
  },
  conservative: {
    label: '보수의 시각',
    className: 'border border-gray-800 text-gray-800',
  },
  analysis: {
    label: '분석',
    className: 'border border-gray-400 text-gray-500',
  },
}

export default function PerspectiveBadge({
  perspective,
  size = 'sm',
}: {
  perspective: Perspective
  size?: 'sm' | 'xs'
}) {
  const { label, className } = config[perspective]
  const sizeClass = size === 'xs' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1'
  return (
    <span className={`inline-block font-sans font-medium tracking-wide uppercase ${sizeClass} ${className}`}>
      {label}
    </span>
  )
}
