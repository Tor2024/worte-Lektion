import Link from 'next/link';
import { Button } from './ui/button';
import { Languages } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Languages className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline sm:inline-block">
              Lernen Deutsch mit Oleh
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Курс
            </Link>
            <Link href="/my-lectures" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Мой словарь
            </Link>
          </nav>
        </div>
        {/* Add nav items here if needed */}
      </div>
    </header>
  );
};

export default Header;
