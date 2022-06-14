import React, { useRef, useState } from 'react'

export default function Surah({ surah }) {
  const [playing, setPlaying] = useState(false)
  const [onPlay, setOnPlay] = useState(false)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)
  const play = (e) => {
    e.preventDefault()
    if (!playing) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
    setPlaying(!playing)
    setOnPlay(!onPlay)
  }
  return (
    <div className="w-full h-full p-4 flex flex-wrap flex-col gap-4 border border-indigo-100 rounded-lg">
      <div className="w-full flex">
        <div className="bg-indigo-100/50 mt-2 rounded text-indigo-600 w-fit px-2 h-fit flex justify-center items-center">
          {surah.number.inSurah}
        </div>
        <div className="w-full">
          <h1 className="w-full text-right text-4xl text-indigo-500 font-medium">
            {surah.text.arab}
          </h1>
        </div>
      </div>
      <div className="flex gap-1 flex-col">
        <h2 className="w-full text-sm font-bold text-justify">
          {surah.text.transliteration.en}
        </h2>
        <h2 className="w-full text-justify text-sm text-gray-600">
          {surah.translation.id}
        </h2>
      </div>
      <div className="w-full">
        <div className="w-full flex gap-2 items-center justify-between">
          <button
            className="max-w-min text-xl relative -top-3"
            onClick={play}
            type="button"
          >
            <p
              className={`${
                !onPlay
                  ? 'delay-100 rotate-0 opacity-100'
                  : 'rotate-90 opacity-0'
              } transition-all duration-200 h-5 absolute top-0`}
            >
              <ion-icon name="play-outline" />
            </p>
            <p
              className={`${
                onPlay
                  ? 'delay-100 rotate-0 opacity-100'
                  : 'opacity-0 rotate-90<F2>'
              } transition-all duration-200 h-5 absolute top-0`}
            >
              <ion-icon name="pause-outline" />
            </p>
          </button>
          <div className="w-[90%] h-1 bg-indigo-200">
            <div
              role="progressbar"
              className="h-1 bg-indigo-400 rounded-lg transition-all duration-100"
              aria-valuenow={duration}
              style={{ width: `${parseInt(duration, 10)}%` }}
              aria-label="save"
            />
          </div>
        </div>
        <audio
          onEnded={() => {
            setOnPlay(!onPlay)
            setPlaying(!playing)
            setDuration(0)
          }}
          onLoad={console.log('loadded')}
          ref={audioRef}
          className="w-full"
          onTimeUpdate={(e) => setDuration((e.target.currentTime / e.target.duration) * 100)}
          src={surah.audio.primary}
        >
          <track kind="captions" />
        </audio>
      </div>
    </div>
  )
}
