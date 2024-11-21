"use client";

import { useState, useEffect } from 'react';
import { JobType } from '@/types/job';
import { Header } from './header';
import { SearchFilters } from './search-filters';
import { JobCard } from './job-card';

export default function JobBoard() {
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  const featuredJobs = jobs.filter(job => job.featured);
  const regularJobs = jobs.filter(job => !job.featured);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">All Jobs</h2>
        <div className="space-y-4">
          {regularJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}