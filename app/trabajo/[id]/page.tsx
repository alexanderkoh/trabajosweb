import { notFound } from 'next/navigation';
import { ArrowLeft, Building2, MapPin, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { jobs } from '@/lib/jobs-data';

export default function JobDetails({ params }: { params: { id: string } }) {
  const job = jobs.find(j => j.id === parseInt(params.id));

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-block mb-6">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a empleos
          </Button>
        </Link>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Building2 className="h-4 w-4 mr-2" />
                  {job.company}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {job.displayLocation}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Timer className="h-4 w-4 mr-2" />
                  {job.type}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Wallet className="h-4 w-4 mr-2" />
                  {job.salary}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-4">Descripción del puesto</h2>
                <p className="mb-4">{job.description}</p>
                
                <h2 className="text-xl font-semibold mb-4">Requisitos</h2>
                <ul className="list-disc pl-6 mb-4">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mb-4">Beneficios</h2>
                <ul className="list-disc pl-6">
                  {job.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Aplicar al puesto</h2>
              <Button className="w-full" size="lg">
                Aplicar ahora
              </Button>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                O envía tu CV a{' '}
                <a href={`mailto:${job.contactEmail}`} className="text-primary hover:underline">
                  {job.contactEmail}
                </a>
              </p>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}