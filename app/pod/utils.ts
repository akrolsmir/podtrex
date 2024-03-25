export function chunkify(words: Word[]) {
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
