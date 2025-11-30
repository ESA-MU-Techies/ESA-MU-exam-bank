import { createBrowserClient } from "@supabase/ssr"

// Return a browser-safe no-op client when env vars are not set so client-side
// code does not throw during development before a Supabase project is configured.
function makeNoopClient() {
  const noop = () => ({ data: [], error: null })
  const chainable = new Proxy(
    {},
    {
      get() {
        return () => chainable
      },
    }
  ) as any

  // When awaited, resolve to an empty result
  ;(chainable as any).then = (resolve: any) => Promise.resolve({ data: [], error: null }).then(resolve)

  return {
    from: () => chainable,
    // minimal storage/auth placeholders
    storage: { from: () => ({ upload: async () => ({ data: null, error: null }) }) },
    auth: { signIn: async () => ({ data: null, error: null }) },
  } as any
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn("Supabase env vars not found — returning no-op browser client for local rendering.")
    return makeNoopClient()
  }

  return createBrowserClient(url, key)
}
