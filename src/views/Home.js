import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import Surah from '../components/Surah'
import TextAnimation from '../components/TextAnimation'
import quran from '../assets/img/quran.png'

export default function Home() {
  const [surah, setSurah] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  async function getSurah(name = '') {
    setLoading(true)
    const response = await axios.get('https://quran-cloud.vercel.app/surah')
    setLoading(false)
    if (!name) {
      setSurah(response.data.data)
    } else {
      const result = response.data.data
      const hasil = result.find((item) => item.number === parseInt(name, 9))
      if (hasil?.number) {
        setSurah([hasil])
      }
    }
  }
  const submit = (e) => {
    e.preventDefault()
    // setSurah({})
    getSurah(inputRef.current.value)
    console.log({ result: surah })
  }
  useEffect(() => {
    getSurah()
  }, [])
  return (
    <div className="w-full">
      <div className="w-11/12 lg:w-8/12 mx-auto">
        <div className="mt-12 w-full text-left">
          <TextAnimation text="Assalamualaikum" />
          <div className="w-full p-4 md:px-6 flex gap-4 justify-between items-center mt-2 rounded-md bg-gradient-to-tr from-indigo-500 via-indigo-400 to-indigo-100">
            <div className=" text-left">
              <h1 className="text-2xl font-bold text-indigo-50">Quran web</h1>
              <span className="text-xs text-gray-200">
                <p>Baca dan bersahabat dengan Quran.</p>
              </span>
            </div>
            <div className="w-1/3 p-2 flex justify-end">
              <img src={quran} className="w-full md:w-2/3" alt="quran" />
            </div>
          </div>
          <form className="w-full my-4" action="" onSubmit={submit}>
            <div className="w-full h-full mx-auto rounded border border-indigo-500 flex overflow-hidden justify-between">
              <div className="w-9/12">
                <input
                  ref={inputRef}
                  className="h-full w-full p-2 focus:outline-none"
                  type="text"
                  placeholder="Cari Surah"
                />
              </div>
              <div className="px-3 h-full py-2 bg-indigo-500">
                <button
                  className="h-full text-gray-50 block w-full"
                  type="submit"
                >
                  Cari
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-wrap  md:flex-row">
          {!loading ? (
            surah
            && surah.map((ayat) => (
              <div key={ayat.number} className="w-full md:w-1/2 p-2">
                <Surah surah={ayat} />
              </div>
            ))
          ) : (
            <h1 className="text-2xl font-medium">Loading...</h1>
          )}
        </div>
      </div>
    </div>
  )
}
