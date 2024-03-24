import type { Config } from 'drizzle-kit'

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.SUPABASE_CONNECTION_STRING!,
  },
  verbose: true,
} satisfies Config

// export default {
//   schema: './vdb/schema.ts',
//   out: './vdb/migrations',
//   driver: 'pg',
//   dbCredentials: {
//     connectionString: process.env.VERCEL_PG_URL!,
//   },
//   verbose: true,
// } satisfies Config
