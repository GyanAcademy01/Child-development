'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the PDF viewer with SSR disabled
const PDFViewer = dynamic(() => import('./PDFViewer'), {
 ssr: false,
 loading: () => null,
});

export default function PDFViewPage() {
 return (
 <Suspense fallback={null}>
  <PDFViewer />
 </Suspense>
 );
}
