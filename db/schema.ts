import { numeric, pgTable, serial, text, varchar } from 'drizzle-orm/pg-core'

export const notes = pgTable('notes', {
  id: serial('id').primaryKey().notNull(),
  title: text('title'),
})

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name'),
  phone: varchar('phone', { length: 256 }),
  email: text('email'),
  balance: numeric('balance', { precision: 10, scale: 2 }),
})
