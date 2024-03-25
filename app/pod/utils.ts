'use server'

export async function getTranscription(url: string) {
  // Run on the server to be able to use the API token
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
  const json = await response.json()
  console.log(json.output.slice(0, 100))

  const chunks = chunkify(json.output)
  return { chunks, text: '' }
}

function chunkify(words: Word[]) {
  const chunks: Chunk[] = []
  let currentChunk: Chunk = { text: '', timestamp: [0, 0] }
  for (const word of words) {
    if (word.speaker !== currentChunk.speaker) {
      if (currentChunk.text) {
        chunks.push(currentChunk)
      }
      currentChunk = {
        speaker: word.speaker,
        text: word.text,
        timestamp: word.timestamp,
      }
    } else {
      currentChunk.text += word.text
      currentChunk.timestamp[1] = word.timestamp[1]
    }
  }
  return chunks
}

export type Chunk = {
  speaker?: string
  text: string
  timestamp: [number, number]
}

type Word = {
  speaker: string
  text: string
  timestamp: [number, number]
}
