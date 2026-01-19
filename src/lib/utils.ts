import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = timestamp - now;
  const dayInMs = 1000 * 60 * 60 * 24;

  if (diff <= 0) return 'Сегодня';

  const days = Math.ceil(diff / dayInMs);

  if (days === 1) return 'Завтра';
  if (days < 7) return `Через ${days} дн.`;
  if (days < 30) return `Через ${Math.floor(days / 7)} нед.`;

  return new Date(timestamp).toLocaleDateString('ru-RU');
}
