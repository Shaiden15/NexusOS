type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface ApiRequestOptions<TBody = unknown> {
  path: string
  method?: HttpMethod
  query?: Record<string, string | number | boolean | undefined>
  body?: TBody
  headers?: Record<string, string>
}

interface ApiErrorPayload {
  message: string
  status: number
  details?: unknown
}

export class ApiError extends Error {
  status: number
  details?: unknown

  constructor({ message, status, details }: ApiErrorPayload) {
    super(message)
    this.status = status
    this.details = details
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api'

let tokenProvider: (() => string | null) | null = null

export const registerTokenProvider = (provider: () => string | null) => {
  tokenProvider = provider
}

const buildQueryString = (query?: ApiRequestOptions['query']) => {
  if (!query) return ''
  const params = new URLSearchParams()
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    params.append(key, String(value))
  })
  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}

export async function apiClient<TResponse, TBody = unknown>({
  path,
  method = 'GET',
  query,
  body,
  headers = {},
}: ApiRequestOptions<TBody>): Promise<TResponse> {
  const token = tokenProvider?.()
  const response = await fetch(`${API_BASE_URL}${path}${buildQueryString(query)}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    const errorPayload = (await response.json().catch(() => ({}))) as ApiErrorPayload
    throw new ApiError({
      message: errorPayload.message || 'Unexpected API error',
      status: response.status,
      details: errorPayload.details,
    })
  }

  if (response.status === 204) {
    return undefined as TResponse
  }

  return (await response.json()) as TResponse
}
