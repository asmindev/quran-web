import React from 'react'
import { Link } from 'react-router-dom'

export default function Surah({ surah }) {
  return (
    <div className="w-full h-full p-4 flex flex-col  border border-indigo-100 rounded-lg">
      <Link to={`/surah/${surah.number}`}>
        <div className="flex w-full h-full justify-between items-center">
          <div className="w-1/2 flex gap-1 text-gray-800">
            <div className="w-fit">
              <h1 className="text-lg font-bold">{surah.number}.</h1>
            </div>
            <div className="">
              <h1 className="text-lg font-bold">{surah.name.transliteration.id}</h1>
              <h2 className="text-sm text-gray-500 font-light">{surah.name.translation.id} - {surah.numberOfVerses} Ayat</h2>
            </div>
          </div>
          <div className="w-fit text-right">
            <h1 className="text-3xl w-full text-indigo-500">{surah.name.short}</h1>
            <h2 className="text-sm text-gray-500 font-light">{surah.revelation.id}</h2>
          </div>
        </div>
      </Link>
    </div>
  )
}
