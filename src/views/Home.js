import React, { useState, useEffect } from 'react'
import axios from 'axios'
import difflib from 'difflib'
import Surah from '../components/Surah'
import TextAnimation from '../components/TextAnimation'
import quran from '../assets/img/quran.png'
import listSurah from '../assets/json/list-surah'

export default function Home() {
  const [surah, setSurah] = useState([])
  const [loading, setLoading] = useState(false)
  const [suggestion, setSuggestion] = useState([])
  const [input, setInput] = useState('')
  async function getSurah() {
    setLoading(true)
    const response = await axios.get('https://quran-cloud.vercel.app/surah')
    setLoading(false)
    return (response.data.data)
  }
  const submit = async (e) => {
    e.preventDefault()
    const tempValueOfInput = input
    setInput('')
    const allSurah = await getSurah()
    const filter = allSurah.filter((item) => item.number === parseInt(tempValueOfInput, 10))
    if (filter[0]?.number) {
      setSurah(filter)
      console.log(filter)
    }
  }
  const handleComplete = async (e) => {
    const { id } = e.target
    const response = await axios.get('https://quran-cloud.vercel.app/surah')
    const hasil = response.data.data.find(
      (item) => item.number === parseInt(id, 10)
    )
    setInput('')
    setSuggestion([])
    setSurah([hasil])
  }
  const onSearch = (e) => {
    const { value } = e.target
    setInput(value)
    if (!value) {
      setSuggestion([])
    } else if (
      Number.isInteger(parseInt(value, 10))
      && parseInt(value, 10) < 115
    ) {
      setSuggestion([listSurah.find((x) => x.number === parseInt(value, 10))])
    } else {
      let main = listSurah.filter((x) => x.surah.toLowerCase().includes(value.toLowerCase()))
      const filter = difflib.getCloseMatches(
        value,
        listSurah.map((item) => item.surah),
        1
      )
      if (!main[0]?.number) {
        main = listSurah.filter((x) => x.surah.toLowerCase().includes(filter[0].toLowerCase()))
      }
      setSuggestion(main)
    }
  }
  useEffect(() => {
    getSurah()
      .then((result) => setSurah(result))
  }, [])
  return (
    <div className="w-full">
      <div className="w-11/12 lg:w-8/12 mx-auto">
        <div className="mt-12 w-full text-left">
          <div className="w-fit font-bold">
            <TextAnimation text="Assalamualaikum" />
          </div>
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
                  onChange={onSearch}
                  className="h-full w-full p-2 focus:outline-none"
                  type="text"
                  value={input}
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
            <div className={input !== '' && !Number.isInteger(input) ? 'w-full mt-2 max-h-32 overflow-scroll border border-indigo-500 rounded' : 'hidden'}>
              {suggestion.length > 0
                ? suggestion.map((item) => (
                  <button
                    type="button"
                    onClick={handleComplete}
                    id={item.number}
                    key={item.number}
                    className="w-full text-left p-2"
                  >
                    <h1 id={item.number}>
                      {`${item.number}. ${item.surah}`}
                    </h1>
                  </button>
                  ))
                : input && !Number.isInteger(input) && (
                  <h1 className="p-2 text-bold text-gray-500">
                    Tidak ada hasil{' '}
                    <span className="text-gray-700 font-medium">
                      "{input}"
                    </span>
                  </h1>
                  )}
            </div>
          </form>
        </div>
        <div className="flex flex-wrap  md:flex-row">
          {!loading
            ? surah
              && surah.map((ayat) => (
                <div key={ayat.number} className="w-full md:w-1/2 p-2">
                  <Surah surah={ayat} />
                </div>
              ))
            : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div key={item} className="w-full md:w-1/2 p-2 h-full">
                <div className="w-full h-30 border rounded flex items-center py-6 gap-2">
                  <div className="w-2/3 pl-4 flex flex-col gap-2">
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-2/3 h-2 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="w-1/3 flex flex-col gap-2">
                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="w-full h-2 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </div>
              ))}
        </div>
      </div>
    </div>
  )
}
