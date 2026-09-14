const STORAGE_KEY = 'propostaja_usage'
const PRO_KEY = 'propostaja_pro'
const FREE_LIMIT = 3
const VALID_CODE = 'PROJA990'

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

export function isPro(): boolean {
  try {
    return localStorage.getItem(PRO_KEY) === '1'
  } catch {
    return false
  }
}

export function activatePro(code: string): boolean {
  const normalized = code.trim().toUpperCase()
  if (normalized !== VALID_CODE) return false
  try {
    localStorage.setItem(PRO_KEY, '1')
    return true
  } catch {
    return false
  }
}

/** Free generations remaining this month (ignores Pro). */
export function remainingFree(): number {
  const { count } = getUsage()
  return Math.max(0, FREE_LIMIT - count)
}

export function canGenerate(): boolean {
  return isPro() || remainingFree() > 0
}

export function recordGeneration(): UsageData {
  if (isPro()) {
    return getUsage()
  }
  const usage = getUsage()
  const next: UsageData = {
    month: currentMonth(),
    count: usage.count + 1,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

export { FREE_LIMIT }
