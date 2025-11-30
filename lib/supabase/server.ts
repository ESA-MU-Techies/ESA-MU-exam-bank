import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

type AnyRow = any

class NoopQuery {
  private _data: AnyRow[]

  constructor(data: AnyRow[] = []) {
    this._data = data
  }

  // chainable query methods
  select() { return this }
  order() { return this }
  eq() { return this }
  neq() { return this }
  in() { return this }
  ilike() { return this }
  match() { return this }
  limit() { return this }
  range() { return this }

  // mutation helpers return a resolved promise indicating success
  delete() { return Promise.resolve({ data: null, error: null }) }
  insert(payload: AnyRow | AnyRow[]) { return Promise.resolve({ data: payload, error: null }) }
  update(payload: AnyRow) { return Promise.resolve({ data: payload, error: null }) }
  single() { return Promise.resolve({ data: this._data[0] ?? null, error: null }) }

  // thenable support so `await query` works
  then(resolve: any) {
    return Promise.resolve({ data: this._data, error: null }).then(resolve)
  }
}

class NoopClient {
  from(_table: string) {
    return new NoopQuery([])
  }
}

export async function createClient() {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    // Return a safe no-op client so pages can render without a database configured
    // Components can still use the returned object's methods; they will resolve
    // to empty arrays or benign values.
    console.warn("Supabase env vars not found — returning no-op client for local rendering.")
    return new NoopClient() as any
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Ignore errors in Server Components
        }
      },
    },
  })
}
