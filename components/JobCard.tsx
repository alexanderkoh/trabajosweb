import Link from 'next/link'
import { JobType } from '@/types'

export default function JobCard({ job }: { job: JobType }) {
  return (
    <Link 
      href={`/jobs/${job.id}`}
      className="block hover:shadow-lg transition-shadow duration-200"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{job.title}</h3>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4">
          <span className="mr-4">{job.company}</span>
          <span className="mr-4">•</span>
          <span className="mr-4">{job.location}</span>
          <span className="mr-4">•</span>
          <span>{job.salary}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            {job.type}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            Posted {new Date(job.postedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  )
} 