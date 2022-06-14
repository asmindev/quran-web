import React from 'react'
import Audio from './Audio'

export default function Surah({ surah }) {
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
      <div className="w-full my-4">
        <Audio audio={surah.audio} />
      </div>
    </div>
  )
}
