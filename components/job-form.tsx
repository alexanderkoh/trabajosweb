"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { JobType } from '@/types/job'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

export function JobForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    
    const jobData: JobType = {
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      displayLocation: formData.get('displayLocation') as string,
      salary: formData.get('salary') as string,
      type: formData.get('type') as string,
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
      featured: formData.get('featured') === 'true',
      description: formData.get('description') as string,
      requirements: (formData.get('requirements') as string).split('\n').filter(Boolean),
      benefits: (formData.get('benefits') as string).split('\n').filter(Boolean),
      contactEmail: formData.get('contactEmail') as string,
    }

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      })

      if (!response.ok) throw new Error('Failed to create job')

      toast({
        title: "Success!",
        description: "Job posting created successfully",
      })

      router.push('/')
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create job posting",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        <Input name="title" placeholder="Job Title" required />
        <Input name="company" placeholder="Company Name" required />
        <Input name="location" placeholder="Location (for filtering)" required />
        <Input name="displayLocation" placeholder="Display Location" required />
        <Input name="salary" placeholder="Salary Range" required />
        <Input name="type" placeholder="Job Type" required />
        <Input name="tags" placeholder="Tags (comma separated)" required />
        <Textarea name="description" placeholder="Job Description" required />
        <Textarea name="requirements" placeholder="Requirements (one per line)" required />
        <Textarea name="benefits" placeholder="Benefits (one per line)" required />
        <Input name="contactEmail" type="email" placeholder="Contact Email" required />
        <div className="flex items-center space-x-2">
          <input type="checkbox" name="featured" value="true" id="featured" />
          <label htmlFor="featured">Featured Job Posting</label>
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Job Posting'}
      </Button>
    </form>
  )
} 