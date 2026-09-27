const CREATORS_API_PATH = '/api/creators'

export interface CreatorResponse {
  id: number
  name: string
  contact: string | null
}

export interface CreatorRequest {
  name: string
  contact: string | null
}

export type FieldErrors = Record<string, string>

export class CreatorApiError extends Error {
  status: number
  fieldErrors?: FieldErrors

  constructor(status: number, message: string, fieldErrors?: FieldErrors) {
    super(message)
    this.name = 'CreatorApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

async function throwForError(response: Response): Promise<never> {
  const body: unknown = await response.json().catch(() => undefined)

  if (response.status === 400) {
    const fieldErrors = isRecord(body) && Object.values(body).every((value) => typeof value === 'string')
      ? body as FieldErrors
      : undefined
    throw new CreatorApiError(400, 'Validation failed', fieldErrors)
  }

  const message = (isRecord(body) && typeof body.message === 'string' ? body.message : response.statusText)
  throw new CreatorApiError(response.status, message)
}

async function request<T>(path = '', init?: RequestInit): Promise<T> {
  const response = await fetch(`${CREATORS_API_PATH}${path}`, init)

  if (!response.ok) {
    return throwForError(response)
  }

  return response.json() as Promise<T>
}

export async function listCreators(): Promise<CreatorResponse[]> {
  return request<CreatorResponse[]>()
}

export async function getCreator(id: number | string): Promise<CreatorResponse> {
  return request<CreatorResponse>(`/${id}`)
}

export async function createCreator(data: CreatorRequest): Promise<CreatorResponse> {
  return request<CreatorResponse>('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function updateCreator(id: number | string, data: CreatorRequest): Promise<CreatorResponse> {
  return request<CreatorResponse>(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export async function deleteCreator(id: number | string): Promise<void> {
  const response = await fetch(`${CREATORS_API_PATH}/${id}`, { method: 'DELETE' })

  if (!response.ok) {
    return throwForError(response)
  }
}
