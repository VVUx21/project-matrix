import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Google Fonts
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

// For now, using fallback fonts since actual font files may not exist
export const shlop = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const spirits = Inter({
  subsets: ['latin'],
  display: 'swap',
});
