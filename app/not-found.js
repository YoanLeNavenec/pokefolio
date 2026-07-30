import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-4xl">🔮</p>
      <h1 className="text-xl font-mono text-text">This page doesn&apos;t exist in this timeline.</h1>
      <Link href="/" className="text-sm font-mono text-accent-gold hover:underline">Take me home (country roaaaad...) →</Link>
    </div>
  );
}