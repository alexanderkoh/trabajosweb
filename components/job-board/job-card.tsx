"use client";

import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { JobType } from '@/types/job'

interface JobCardProps {
  job: Omit<JobType, 'id'> & { id: number }
}

export function JobCard({ job }: JobCardProps) {
  const router = useRouter();
  
  const typeDisplay = {
    fulltime: 'Tiempo Completo',
    parttime: 'Medio Tiempo',
    contract: 'Contrato',
  }[job.type] || job.type;

  return (
    <Card 
      className="group hover:shadow-lg transition-all duration-200 cursor-pointer border border-border/50"
      onClick={() => router.push(`/trabajo/${job.id}`)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">
              {job.title}
            </CardTitle>
            <CardDescription>{job.company}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground group-hover:text-primary">
            <ArrowUpRight className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{job.location}</span>
            <span className="font-medium">{job.salary}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="mr-2">
              {typeDisplay}
            </Badge>
            {job.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}