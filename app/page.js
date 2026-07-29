import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center gap-8">
      <Link
        href="/dev"
        className="w-64 h-80 bg-surface rounded-2xl border-4 border-[#4a7fb5] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <p className="text-2xl font-mono text-text">Dev</p>
      </Link>

      <Link
        href="/art"
        className="w-64 h-80 bg-surface rounded-2xl border-4 border-accent-gold flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <p className="text-2xl font-mono text-text">Art</p>
      </Link>
    </div>
  );
}