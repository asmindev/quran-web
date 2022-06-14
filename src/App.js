import React from 'react'
import { HeartIcon } from '@heroicons/react/solid'
import Routes from './router'

export default function App() {
  return (
    <div className="w-full max-h-screen container mx-auto text-gray-700">
      <Routes />
      <footer className="mt-12 w-full h-16">
        <div className="w-full h-full text-gray-50 bg-gray-800 flex items-center justify-center">
          <h1 className="flex text-sm">
            Made with <HeartIcon className="text-red-500 w-5 mx-2" /> by <a className="mx-2" href="https://instagram.com/iniasmin_" rel="noopener noreferrer" target="_blank">@iniasmin_</a>
          </h1>
        </div>
      </footer>
    </div>
  )
}
