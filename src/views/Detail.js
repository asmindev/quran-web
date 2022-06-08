import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Ayat from '../components/Ayat'
import quran from '../assets/img/quran.png'

export default function Detail() {
  const [surah, setSurah] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const getSurah = async () => {
    setLoading(true)
    const res = await axios.get(`https://quran-cloud.vercel.app/surah/${id}`)
    setLoading(false)
    setSurah(res.data.data)
  }
  useEffect(() => {
    if (id) {
      getSurah()
    }
  }, [])
  return (
    <div className="w-full">
      <div className="w-11/12 lg:w-8/12 mx-auto">
        <div className="w-full">
          <div className="mt-6">
            <h1 className="text-xl font-black text-gray-700">Baca Sekarang.</h1>
          </div>
          <div className="w-full h-full p-4 md:px-6 flex gap-4 justify-between items-center mt-2 rounded-md bg-gradient-to-tr from-indigo-500 via-indigo-400 to-indigo-100">
            <div className="text-left h-full flex flex-col">
              <div className="w-full">
                <h1 className="text-4xl mb-4 font-bold text-indigo-50">
                  {surah.name ? surah.name.short : 'loading..'}
                </h1>
                <span className="text-xs text-gray-200">
                  <p>{surah.name ? surah.name.translation.id : 'loading..'}</p>
                </span>
              </div>
              <div className="text-gray-200 text-xs flex items-center gap-2">
                <p className="text-left">
                  {surah.name ? `${surah.numberOfVerses} Ayat` : 'loading..'}
                </p>
                <span className="tet-gray-50">
                  {surah.name ? `- ${surah.revelation.id}` : 'loading..'}
                </span>
              </div>
            </div>
            <div className="w-1/3 p-2 flex justify-end">
              <img src={quran} className="w-full md:w-2/3" alt="quran" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap  md:flex-row">
            {!loading ? (
              surah.number
              && surah.verses.map((ayat) => (
                <div key={ayat.number} className="w-full md:w-1/2 p-2">
                  <Ayat surah={ayat} />
                </div>
              ))
            ) : (
              <h1 className="text-2xl font-medium">Loading...</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
