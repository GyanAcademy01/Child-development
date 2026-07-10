import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Child Development - બાળ વિકાસ',
    short_name: 'Child Development',
    description: 'બાળ વિકાસ અને શિક્ષણના સિદ્ધાંતોની તૈયારી માટે Theory અને Test.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/app-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/app-logo.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ],
  }
}
