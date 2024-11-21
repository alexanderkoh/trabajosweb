import JobBoard from '@/components/job-board';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Trabajos Blockchain
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Encuentra las mejores oportunidades en blockchain y web3
        </p>
      </div>
      <SearchBar />
      <JobBoard />
    </main>
  );
}