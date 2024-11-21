"use client";

import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
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
  );
}