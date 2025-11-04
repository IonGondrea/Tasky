// JS axios instance for API calls (replaces previous TS file)
import axios from 'axios'

// Resolve API base URL:
// - If VITE_API_URL is set at build-time (e.g. http://localhost:8080), use that + /api/v1
// - Otherwise fall back to a relative path '/api/v1' (works with Nginx proxy)
const viteApi = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL
const baseURL = viteApi
  ? (String(import.meta.env.VITE_API_URL).replace(/\/+$/, '') + '/api/v1')
  : '/api/v1'

// Log resolved baseURL for easier debugging in the browser console
if (typeof window !== 'undefined') {
  console.info('[http] resolved API baseURL:', baseURL)
}

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

// compatibility alias used by some files
export const http = api

export default api
