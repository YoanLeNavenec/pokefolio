import { login } from "./actions";

export default async function Page({ searchParams }) {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-surface rounded-2xl p-6 border-2 border-[#4a7fb5] shadow-lg">
        <p className="text-text font-mono text-sm mb-4">&gt; Admin access</p>

        {params.error === '1' && (
          <p className="text-sm text-red-300 bg-red-900/30 border border-red-700 rounded-lg px-3 py-2 mb-4">
            Invalid email or password.
          </p>
        )}

        <form action={login} className="flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-xs text-text-muted">
            Email
            <input
              name="email"
              type="email"
              required
              className="bg-surface-2 text-text rounded-lg px-3 py-2 border border-text-muted/30 focus:border-accent-gold focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-text-muted">
            Password
            <input
              name="password"
              type="password"
              required
              className="bg-surface-2 text-text rounded-lg px-3 py-2 border border-text-muted/30 focus:border-accent-gold focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="mt-2 font-mono text-sm px-4 py-2 rounded-lg bg-accent-gold text-bg hover:scale-[1.02] transition-transform"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
