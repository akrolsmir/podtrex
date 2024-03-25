'use server'
import ShowChunks from './chunks'

async function runFastWhisper(url: string) {
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      version:
        '3ab86df6c8f54c11309d4d1f930ac292bad43ace52d10c80d87eb258b3c9f79c',
      input: {
        audio: url,
        batch_size: 64,
      },
    }),
  })
  const json = await response.json()
  // Note: json doesn't have the transcription yet; json.urls.get will produce it
  console.log(json)
  return json
}

export async function getTranscription(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
  const json = await response.json()
  const { chunks, text } = json.output
  return { chunks, text }
}

export default async function Pod() {
  async function postPod(formData: FormData) {
    'use server'
    const rawFormData = Object.fromEntries(formData.entries())
    const mp3Link = rawFormData.mp3 as string

    const transcription = await runFastWhisper(mp3Link)
    return transcription
  }

  const DEFAULT_PODCAST = 'https://media.transistor.fm/2bb32fae/a2bfec15.mp3'
  const PODCAST_VERY_TRIM =
    'https://bzdopflomdrflbctxbmo.supabase.co/storage/v1/object/public/audio/money-in-fiction-podcast-verytrim.mp3'
  return (
    <div className="max-w-2xl w-full">
      <h2 className="text-2xl font-bold">Podtrex</h2>
      <div className="h-4" />
      <form action={postPod} className="flex flex-col gap-4">
        <input
          type="text"
          name="mp3"
          defaultValue={PODCAST_VERY_TRIM}
          className="p-4"
        />
        <input
          type="submit"
          value="Submit"
          className="p-4 bg-green-100 rounded-md hover:bg-green-200 hover:cursor-pointer"
        />
      </form>

      <div className="h-4" />
      <ShowChunks />
    </div>
  )
}
