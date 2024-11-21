import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { JobType } from '@/types/job'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    
    const jobs = await prisma.job.findMany({
      where: featured ? { featured: true } : {},
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(jobs)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const job: JobType = await request.json()
    
    const newJob = await prisma.job.create({
      data: job,
    })

    return NextResponse.json(newJob)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create job' },
      { status: 500 }
    )
  }
} 