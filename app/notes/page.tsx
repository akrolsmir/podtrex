import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
})

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: notes } = await supabase.from('notes').select()

  console.log('apiKey', process.env['OPENAI_API_KEY'])

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  })

  return (
    <div>
      <h1>Notes</h1>
      <pre>{JSON.stringify(notes, null, 2)}</pre>
      <pre>{JSON.stringify(chatCompletion, null, 2)}</pre>
    </div>
  )
}
