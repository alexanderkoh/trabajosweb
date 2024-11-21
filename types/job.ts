export interface BaseJobType {
  title: string
  company: string
  location: string
  displayLocation: string
  salary: string
  type: string
  tags: string[]
  featured: boolean
  description: string
  requirements: string[]
  benefits: string[]
  contactEmail: string
}

export interface JobType extends BaseJobType {
  id?: number
  createdAt?: Date
  updatedAt?: Date
}

export interface JobWithId extends BaseJobType {
  id: number
  createdAt: Date
  updatedAt: Date
} 