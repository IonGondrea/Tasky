// JS axios instance for API calls (replaces previous TS file)
import axios from 'axios'

// Update baseURL to /api/v1 to match backend v1 endpoints
export const api = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
})

// compatibility alias used by some files
export const http = api

export default api
