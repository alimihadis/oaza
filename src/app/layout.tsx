import type { Metadata } from 'next';
import { Exo_2 } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PreloaderWrapper from '@/components/layout/PreloaderWrapper';

const exo2 = Exo_2({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-exo2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Oaza Software - Professional Software Development & Digital Marketing',
  description: 'Professional software development and digital marketing services. We transform ideas into powerful digital experiences that help businesses succeed.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${exo2.variable} font-exo2`}>
        <PreloaderWrapper />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
