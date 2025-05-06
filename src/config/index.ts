export const config = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1',
    mockEnabled: process.env.NEXT_PUBLIC_ENABLE_MOCK === 'true',
  },
} as const; 