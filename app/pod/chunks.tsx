'use client'

import { useState } from 'react'
import { getTranscription } from './page'

export default function ShowChunks() {
  const [text, setText] = useState('')
  const [chunks, setChunks] = useState<Chunk[]>([])

  return (
    <div>
      <button
        className="p-4 bg-red-100 hover:bg-red-200 rounded-md"
        onClick={async () => {
          const { chunks: c, text: t } = await getTranscription(
            'https://api.replicate.com/v1/predictions/qecw27dbfs4tffv53yoxbrmtei'
          )
          setText(t)
          setChunks(c)
        }}
      >
        Get chunky
      </button>
      {/* <div className="max-w-2xl">{text}</div> */}
      <div className="max-w-2xl flex flex-col gap-4">
        {chunks.map((chunk, i) => (
          <ChunkView key={i} chunk={chunk} />
        ))}
      </div>
    </div>
  )
}

type Chunk = {
  text: string
  timestamp: [number, number]
}

export function ChunkView(props: { chunk: Chunk }) {
  const { chunk } = props
  return (
    <div className="p-4 bg-gray-100 hover:bg-gray-200 rounded-md">
      <p className="text-sm text-gray-500">
        {chunk.timestamp[0]} - {chunk.timestamp[1]}
      </p>
      {chunk.text}
    </div>
  )
}
