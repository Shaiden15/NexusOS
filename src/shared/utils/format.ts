export const formatCurrency = (value: number, currency: string = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)

export const formatPercentage = (value: number, options?: { maximumFractionDigits?: number }) =>
  `${value.toFixed(options?.maximumFractionDigits ?? 1)}%`

export const formatDate = (input: string | number | Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(input))
