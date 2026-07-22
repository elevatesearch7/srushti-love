import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Srushti & Narayan // Bubu Core v2.0 ❤️',
  description: 'Exclusively crafted with endless love for Srushti on Girlfriend Day.',
  themeColor: '#05020a',
  openGraph: {
    title: 'Happy Girlfriend Day, My Bubu ❤️',
    description: 'A special secret vault and love matrix built just for you.',
    images: ['/elegent.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}