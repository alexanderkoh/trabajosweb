"use client";

import { useState } from 'react';
import { Search, Briefcase, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const featuredJobs = [
  {
    id: 1,
    title: 'Desarrollador Senior Blockchain',
    company: 'CryptoTech España',
    location: 'Madrid, España (Remoto)',
    salary: '€65,000 - €85,000',
    type: 'Tiempo Completo',
    tags: ['Solidity', 'Ethereum', 'Smart Contracts'],
    featured: true,
  },
  {
    id: 2,
    title: 'Arquitecto DeFi',
    company: 'BlockChain Solutions',
    location: 'Barcelona, España',
    salary: '€70,000 - €90,000',
    type: 'Tiempo Completo',
    tags: ['DeFi', 'Web3.js', 'Solidity'],
    featured: true,
  },
];

const regularJobs = [
  {
    id: 3,
    title: 'Desarrollador Web3 Junior',
    company: 'Crypto Startup',
    location: 'Valencia, España (Híbrido)',
    salary: '€35,000 - €45,000',
    type: 'Tiempo Completo',
    tags: ['JavaScript', 'React', 'Web3'],
  },
  // Add more jobs as needed
];

export default function JobBoard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">Blockchain Jobs España</h1>
          <p className="text-muted-foreground">Encuentra tu próximo trabajo en blockchain y Web3</p>
        </div>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          <Briefcase className="mr-2 h-5 w-5" />
          Publicar Empleo
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por título o empresa..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Ubicación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="madrid">Madrid</SelectItem>
            <SelectItem value="barcelona">Barcelona</SelectItem>
            <SelectItem value="valencia">Valencia</SelectItem>
            <SelectItem value="remoto">Remoto</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de Empleo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fulltime">Tiempo Completo</SelectItem>
            <SelectItem value="parttime">Medio Tiempo</SelectItem>
            <SelectItem value="contract">Contrato</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Jobs */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Empleos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
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
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Regular Jobs */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Todos los Empleos</h2>
        <div className="space-y-4">
          {regularJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                    <CardDescription>{job.company}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
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
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}