import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { ExampleTable } from './schema'

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql)

export const getExampleTable = async () => {
  const selectResult = await db.select().from(ExampleTable)
  console.log('Results', selectResult)
}
