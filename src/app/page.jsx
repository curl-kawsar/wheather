'use client';

import dynamic from 'next/dynamic';
import { Toaster } from 'sonner';

const WeatherDashboard = dynamic(() => import('../components/WeatherDashboard'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <WeatherDashboard />
    </main>
  );
} 