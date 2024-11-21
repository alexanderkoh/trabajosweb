import { JobType } from '@/types'
import { notFound } from 'next/navigation'

async function getJob(id: string) {
  try {
    // Replace with your actual API endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/${id}`)
    if (!res.ok) throw new Error('Failed to fetch job')
    return res.json()
  } catch (error) {
    return null
  }
}

export default async function JobPage({ params }: { params: { id: string } }) {
  const job: JobType = await getJob(params.id)
  
  if (!job) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span className="mr-4">{job.company}</span>
            <span className="mr-4">•</span>
            <span className="mr-4">{job.location}</span>
            <span className="mr-4">•</span>
            <span>{job.salary}</span>
          </div>
          <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {job.type}
          </div>
        </div>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Job Description</h2>
          <div className="whitespace-pre-wrap">{job.description}</div>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Requirements</h2>
          <div className="whitespace-pre-wrap">{job.requirements}</div>
          
          <h2 className="text-xl font-semibold mt-8 mb-4">Benefits</h2>
          <div className="whitespace-pre-wrap">{job.benefits}</div>
        </div>

        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </main>
  )
} 