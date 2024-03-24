import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const connectionString = process.env.SUPABASE_CONNECTION_STRING!
const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql)

console.log('one')
await migrate(db, { migrationsFolder: './db/migrations' })
console.log('two')
await sql.end()
console.log('three')
