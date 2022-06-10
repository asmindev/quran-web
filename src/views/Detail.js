import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import Ayat from '../components/Ayat'
import recite from '../assets/img/quran (1).png'

export default function Detail() {
  const [surah, setSurah] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.8,
        when: 'afterChildren',
        staggerChildren: 0.5,
        type: 'spring',
      },
    },
  }

  const item = {
    hidden: { y: 200, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const getSurah = async () => {
    setLoading(true)
    const res = await axios.get(`https://quran-cloud.vercel.app/surah/${id}`)
    setLoading(false)
    console.log(loading)
    setSurah(res.data.data)
  }
  useEffect(() => {
    if (id) {
      getSurah()
    }
  }, [])
  console.log(surah.verses)
  return (
    <div className="w-full">
      <div className="w-11/12 lg:w-8/12 mx-auto">
        <div className="w-full">
          <div className="mt-6">
            <h1 className="text-xl font-black text-gray-700">Baca Sekarang.</h1>
          </div>
          <div className="w-full h-full p-4 md:px-6 flex gap-4 justify-between items-center mt-2 rounded-md bg-gradient-to-tr from-indigo-500 via-indigo-400 to-indigo-100">
            <div className="w-full text-left h-full flex flex-col">
              <div className="w-full">
                <motion.h1 className="text-4xl mb-4 font-bold text-indigo-50">
                  {surah.name ? surah.name.short : <div className="relative w-32 h-6 animate-pulse rounded bg-indigo-50/50" />}
                </motion.h1>
                <span className="text-xs text-gray-200">
                  <p>{surah.name ? surah.name.translation.id : <div className="relative w-12 h-4 animate-pulse rounded bg-indigo-50/50" />}</p>
                </span>
              </div>
              <div className="text-gray-200 text-xs flex items-center gap-2 w-full">
                <p className="text-left">
                  {surah.name ? `${surah.numberOfVerses} Ayat` : <div className="mt-2 relative w-8 h-4 animate-pulse rounded bg-indigo-50/50" />}
                </p>
                <span className="tet-gray-50">
                  {surah.name ? `- ${surah.revelation.id}` : <div className="mt-2 relative w-24 h-4 animate-pulse rounded bg-indigo-50/50" />}
                </span>
              </div>
            </div>
            <div className="w-fit flex justify-end">
              <img src={recite} className="w-1/2 md:w-2/3" alt="quran" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <motion.div
            initial="hidden"
            animate={surah.number ? 'visible' : 'hidden'}
            variants={container}
            className="flex flex-wrap  md:flex-row justify-center"
          >
            {
              surah.verses && surah.verses.map((ayat) => (
                <div key={ayat.number.inQuran} className="w-full flex md:w-1/2 p-2 h-full overflow-hidden">
                  <motion.div
                    variants={item}
                    className="w-full h-full"
                  >
                    <Ayat surah={ayat} />
                  </motion.div>
                </div>
              ))
            }
          </motion.div>
        </div>
      </div>
      <div className="w-full py-5 text-center">ini footer</div>
    </div>
  )
}
