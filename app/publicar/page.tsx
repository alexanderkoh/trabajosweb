'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type TierType = {
  id: string
  name: string
  price: number
  features: string[]
}

type TierKeys = 'NORMAL' | 'PREMIUM' | 'VIP'

const LISTING_TIERS: Record<TierKeys, TierType> = {
  NORMAL: {
    id: 'normal',
    name: 'Normal Listing',
    price: 49,
    features: [
      '30 days listing duration',
      'Basic job listing visibility',
      'Standard search placement'
    ]
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium Listing',
    price: 99,
    features: [
      '60 days listing duration',
      'Featured tag on listing',
      'Priority search placement',
      'Social media promotion'
    ]
  },
  VIP: {
    id: 'vip',
    name: 'VIP Listing',
    price: 299,
    features: [
      '90 days listing duration',
      'Featured tag + highlighted listing',
      'Top search placement',
      'Social media promotion',
      'Email newsletter feature',
      'Premium support'
    ]
  }
} as const

export default function PublicarPage() {
  const router = useRouter()
  const [selectedTier, setSelectedTier] = useState<TierKeys>('NORMAL')
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    salary: '',
    description: '',
    requirements: '',
    benefits: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tier: selectedTier,
          price: LISTING_TIERS[selectedTier].price
        }),
      })

      if (response.ok) {
        router.push('/payment-success')
      }
    } catch (error) {
      console.error('Error posting job:', error)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/"
          className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Jobs
        </Link>
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Publica tu Empleo en Trabajos Blockchain
        </h1>
        <div className="w-24" /> {/* Spacer for centering */}
      </div>
      
      {/* Pricing Tiers */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {Object.entries(LISTING_TIERS).map(([key, tier]) => (
          <div 
            key={tier.id}
            className={`border rounded-lg p-6 ${
              selectedTier === key 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-gray-200 dark:border-gray-700'
            } dark:bg-gray-800`}
          >
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{tier.name}</h3>
            <p className="text-3xl font-bold mb-4 dark:text-white">${tier.price}</p>
            <ul className="space-y-2 mb-6">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedTier(key as TierKeys)}
              className={`w-full py-2 px-4 rounded ${
                selectedTier === key
                  ? 'bg-blue-600 dark:bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              } hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors`}
            >
              Select {tier.name}
            </button>
          </div>
        ))}
      </div>

      {/* Job Posting Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Job Title
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Company Name
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Location
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Job Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Salary Range
            </label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
              placeholder="e.g., $50,000 - $70,000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Job Description
            </label>
            <textarea
              required
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Requirements
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Benefits
            </label>
            <textarea
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              value={formData.benefits}
              onChange={(e) => setFormData({...formData, benefits: e.target.value})}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
          >
            Continue to Payment - ${LISTING_TIERS[selectedTier].price}
          </button>
        </div>
      </form>
    </main>
  )
} 