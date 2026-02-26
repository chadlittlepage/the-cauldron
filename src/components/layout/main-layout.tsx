import type { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col text-hex-text overflow-x-hidden">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
