import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'

const connectionString = process.env.VERCEL_PG_URL!
const sql = postgres(connectionString, { max: 1 })
const db = drizzle(sql)

console.log('one')
await migrate(db, { migrationsFolder: './vdb/migrations' })
console.log('two')
await sql.end()
console.log('three')
