import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../views/Home'
import Detail from '../views/Detail'

export default function index() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/surah/:id" element={<Detail />} />
      </Routes>
    </div>
  )
}
