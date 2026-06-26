import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTime(minutes: number | null): string {
  const hours = Math.floor((minutes || 0) / 60)
  const remainingMinutes = (minutes || 0) % 60
  if (hours === 0) {
    return `${remainingMinutes}min`
  }
  return `${hours}h ${remainingMinutes}min`
}
