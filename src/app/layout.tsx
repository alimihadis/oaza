import type { Metadata } from 'next';
import { Exo_2 } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PreloaderWrapper from '@/components/layout/PreloaderWrapper';
import { ThemeProvider } from '@/contexts/ThemeContext';

const exo2 = Exo_2({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-exo2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Oaza Software - Professional Software Development & Digital Marketing',
  description: 'Professional software development and digital marketing services. We transform ideas into powerful digital experiences that help businesses succeed.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${exo2.variable} font-exo2 bg-dark-950 text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <PreloaderWrapper />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
