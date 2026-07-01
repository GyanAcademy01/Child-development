import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TAT GK - ગુજરાત TAT પરીક્ષા તૈયારી',
    short_name: 'TAT GK',
    description: 'ગુજરાત TAT પરીક્ષાની તૈયારી માટે GK Theory અને Test.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
  }
}
