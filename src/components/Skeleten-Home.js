import React from 'react'

export default function SkeletenHome() {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
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
  ))
}
