"use client";

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchFiltersProps {
  searchTerm: string;
  locationFilter: string;
  typeFilter: string;
  onSearchChange: (value: string) => void;
  onLocationChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

export function SearchFilters({
  searchTerm,
  locationFilter,
  typeFilter,
  onSearchChange,
  onLocationChange,
  onTypeChange,
}: SearchFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="md:col-span-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Buscar por título o empresa..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <Select value={locationFilter} onValueChange={onLocationChange}>
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
      <Select value={typeFilter} onValueChange={onTypeChange}>
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
  );
}