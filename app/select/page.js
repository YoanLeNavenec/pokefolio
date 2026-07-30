import Link from 'next/link';

export default function Home() {
  return (
    <div className="group relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-has-[.dev-card:hover]:opacity-100 bg-linear-to-br from-[#0b1220] via-[#0f1b2e] to-[#16213a] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(74,127,181,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(74,127,181,0.18) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 30% 50%, rgba(74,127,181,0.35), transparent 60%)' }}
        />
      </div>

      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-has-[.art-card:hover]:opacity-100 bg-linear-to-br from-[#2a1810] via-[#241a10] to-[#1a1008] pointer-events-none">
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at 70% 50%, rgba(212,175,55,0.3), transparent 60%)' }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center gap-8">
        <Link
          href="/dev"
          className="dev-card w-64 h-80 bg-surface rounded-2xl border-4 border-[#4a7fb5] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <p className="text-2xl font-mono text-text">Dev</p>
        </Link>

        <Link
          href="/art"
          className="art-card w-64 h-80 bg-surface rounded-2xl border-4 border-accent-gold flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <p className="text-2xl font-mono text-text">Art</p>
        </Link>
      </div>
    </div>
  );
}