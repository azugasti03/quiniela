import { getFlagUrl } from '@/lib/scoring'

interface Props {
  team: string
  size?: 'sm' | 'md'
}

export default function TeamFlag({ team, size = 'sm' }: Props) {
  const url = getFlagUrl(team)
  const cls = size === 'sm' ? 'w-5 h-4' : 'w-7 h-5'
  if (!url) return null
  return (
    <img
      src={url}
      alt={team}
      className={`${cls} inline-block object-cover rounded-[2px] shrink-0`}
    />
  )
}
