### TODOs

- [ ] Once Replicate is running, persist urls in database and show when done
- [ ] Show inline widget for playback, link to timestamps
- [ ] Postprocess with some LLM to:
  - [ ] Remove filler words ("like", "I think", "yeah", etc)
  - [ ] Break long sections into paragraphs
  - [ ] Fix mis-diarized words
  - [ ] Summarize, add titles?
- [ ] Search for podcasts via Podchaser API or Listen Notes API?
- [ ] Check out modal for lower prices?
  - Replicate: faster-whisper looks like 2m runtime for 30m audio; $.000275/s x 60 x 30m = $0.495

### Misc devlog musings on working with AI

- Consistent AI credits could be useful (playing with Replicate, Modal, HuggingFace, OpenAI, etc)
  - (to say nothing of vercel (compute), supabase (storage) etc)
- Vaguely wish that replicate models came typed
  - Also better documented? eg tripped over footgun of needing to set word-level timestamps for diarization
