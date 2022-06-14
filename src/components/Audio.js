import React, { useState, useRef } from 'react'

export default function Audio({ audio }) {
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
                  ? 'text-indigo-600 delay-100 rotate-0 opacity-100'
                  : 'opacity-0 rotate-90'
              } transition-all duration-200 h-5 absolute top-0`}
          >
            <ion-icon name="pause-outline" />
          </p>
        </button>
        <div className="w-[90%] h-0.5 bg-indigo-100/80">
          <div
            role="progressbar"
            className="h-full bg-indigo-400 rounded-lg transition-all duration-100"
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
        src={audio.primary}
      >
        <track kind="captions" />
      </audio>
    </div>
  )
}
