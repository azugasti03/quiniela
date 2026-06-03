const COLORS = [
  'bg-blue-500', 'bg-violet-500', 'bg-green-500', 'bg-orange-500',
  'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-amber-500',
  'bg-teal-500', 'bg-cyan-500', 'bg-rose-500', 'bg-emerald-500',
]

const SIZES = {
  sm:  'w-9 h-9 text-xs',
  md:  'w-12 h-12 text-sm',
  lg:  'w-24 h-24 text-3xl',
}

interface AvatarProps {
  nombre: string
  foto?: string
  size?: keyof typeof SIZES
  className?: string
}

export default function Avatar({ nombre, foto, size = 'md', className = '' }: AvatarProps) {
  const initials = nombre
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const color = COLORS[nombre.charCodeAt(0) % COLORS.length]

  if (foto) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={foto}
        alt={nombre}
        className={`${SIZES[size]} rounded-full object-cover ${className}`}
      />
    )
  }

  return (
    <div className={`${SIZES[size]} ${color} rounded-full flex items-center justify-center text-white font-bold shrink-0 ${className}`}>
      {initials}
    </div>
  )
}
