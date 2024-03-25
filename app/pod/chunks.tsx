'use client'

import { useState } from 'react'
import { getTranscription } from './page'
import { Chunk } from './utils'

export default function ShowChunks() {
  const [text, setText] = useState('')
  const [chunks, setChunks] = useState<Chunk[]>([])

  return (
    <div>
      <button
        className="p-4 bg-red-100 hover:bg-red-200 rounded-md"
        onClick={async () => {
          const { chunks: c, text: t } = await getTranscription(
            // 'https://api.replicate.com/v1/predictions/qecw27dbfs4tffv53yoxbrmtei'
            // 'https://api.replicate.com/v1/predictions/f7uzbttbm5dtd2dnymwl5l5bkm'
            'https://api.replicate.com/v1/predictions/kbfk6albjgn7rxsu2ovfa4766a'
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

// Convert a seconds like 127.24 to a timestamp like 00:02:07
function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)
  return [hours, minutes, secs].map((n) => String(n).padStart(2, '0')).join(':')
}

function getSpeakerName(speaker?: string) {
  if (!speaker) return '???'
  const speakerMap = {
    SPEAKER_00: 'Nadia',
    SPEAKER_01: 'Nadia',
    SPEAKER_02: 'Nadia',
    SPEAKER_03: 'Henry',
    // SPEAKER_04: '???',
  } as Record<string, string>
  return speakerMap[speaker] || speaker
}

export function ChunkView(props: { chunk: Chunk }) {
  const { chunk } = props
  return (
    <div className="p-2 hover:bg-gray-200 rounded-md">
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-bold text-black mr-4">
          {getSpeakerName(chunk.speaker)}
        </span>
        <span>{formatTime(chunk.timestamp[0])}</span>
      </p>
      {chunk.text}
    </div>
  )
}
