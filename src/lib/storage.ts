const STORAGE_KEY = 'propostaja_usage'
const FREE_LIMIT = 3

export type UsageData = {
  month: string // YYYY-MM
  count: number
}

function currentMonth(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

export function getUsage(): UsageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { month: currentMonth(), count: 0 }
    const data = JSON.parse(raw) as UsageData
    if (data.month !== currentMonth()) {
      return { month: currentMonth(), count: 0 }
    }
    return data
  } catch {
    return { month: currentMonth(), count: 0 }
  }
}

export function remainingFree(): number {
  const { count } = getUsage()
  return Math.max(0, FREE_LIMIT - count)
}

export function canGenerate(): boolean {
  return remainingFree() > 0
}

export function recordGeneration(): UsageData {
  const usage = getUsage()
  const next: UsageData = {
    month: currentMonth(),
    count: usage.count + 1,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export { FREE_LIMIT }
