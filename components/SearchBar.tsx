'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchTerm) params.set('q', searchTerm)
    if (location) params.set('location', location)
    router.push(`/?${params.toString()}`)
  }

  const handleSaveSearch = () => {
    const searchCriteria = {
      query: searchTerm,
      location: location,
      timestamp: new Date().toISOString(),
    }

    // Get existing saved searches from localStorage
    const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]')
    
    // Add new search to the beginning of the array
    savedSearches.unshift(searchCriteria)
    
    // Keep only the last 10 searches
    const updatedSearches = savedSearches.slice(0, 10)
    
    // Save back to localStorage
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches))

    // Show confirmation to user
    alert('Search criteria saved! You can access your saved searches from your profile.')
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Keywords
            </label>
            <input
              id="search"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
              placeholder="Job title, skills, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Location
            </label>
            <input
              id="location"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Search Jobs
          </button>
          <button
            type="button"
            onClick={handleSaveSearch}
            className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Save Search
          </button>
        </div>
      </form>
    </div>
  )
} 