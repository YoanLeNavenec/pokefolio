import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="flex justify-center gap-6 py-6 font-mono text-sm">
      <Link href="/dev" className="text-text hover:text-accent-gold transition-colors">
        Dev
      </Link>
      <Link href="/art" className="text-text hover:text-accent-gold transition-colors">
        Art
      </Link>
    </nav>
  );
}