import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 px-6 py-12">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <div className="w-32 h-32 rounded-full bg-surface border-4 border-accent-gold flex items-center justify-center shadow-lg">
          <span className="text-4xl">🔮</span>
        </div>

        <div className="bg-surface-2 rounded-2xl p-5 border-2 border-[#4a7fb5]">
          <p className="text-sm text-text leading-relaxed">
            Welcome to <span className="font-medium">DrPoochyena&apos;s</span> portfolio! (or maybe you know them as{' '}
            <span className="font-medium">ElliotDaSmol</span>? or{' '}
            <span className="font-medium">Yoan Le Navenec</span> even?) I assume you&apos;re here to inquire about their services, or maybe to bask in their grandeur. Who wouldn&apos;t! There, let me guide you. Follow me, I&apos;ll guide you to the right area!
          </p>
        </div>

        <Link
          href="/select"
          className="mt-2 font-mono text-sm px-6 py-2 rounded-full bg-accent-gold text-[#16140f] hover:scale-105 transition-transform"
        >
          Follow me →
        </Link>
      </div>

      <div className="flex gap-8 mt-6">
        {[
          { label: 'GitHub', href: '#' },
          { label: 'Bluesky', href: '#' },
          { label: 'LinkedIn', href: '#' },
        ].map((link) => (
          <a key={link.label} href={link.href} className="flex flex-col items-center gap-2 group">
            <div className="w-14 h-14 rounded-full bg-surface border-2 border-text-muted flex items-center justify-center group-hover:border-accent-gold transition-colors">
              <span className="text-xl">✨</span>
            </div>
            <span className="text-xs text-text-muted font-mono">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}