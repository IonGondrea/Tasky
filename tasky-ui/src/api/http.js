import axios from 'axios'

const viteApi = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL
const baseURL = viteApi
  ? (String(import.meta.env.VITE_API_URL).replace(/\/+$/, '') + '/api/v1')
  : '/api/v1'

if (typeof window !== 'undefined') {
  console.info('[http] resolved API baseURL:', baseURL)
}

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

export const http = api


