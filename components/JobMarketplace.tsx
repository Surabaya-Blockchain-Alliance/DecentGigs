import { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Users } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/sellect';
import type { User } from '../App';

interface Job {
  id: string;
  title: string;
  description: string;
  budget: number;
  currency: string;
  category: string;
  location: string;
  postedBy: string;
  postedDate: string;
  bids: number;
  status: 'open' | 'in-progress' | 'completed';
  escrowFunded: boolean;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Full-Stack DeFi Dashboard Development',
    description: 'Looking for an experienced developer to build a comprehensive DeFi dashboard with real-time data visualization and wallet integration.',
    budget: 5000,
    currency: 'USDC',
    category: 'Development',
    location: 'Remote',
    postedBy: '0x742d...bEb',
    postedDate: '2 hours ago',
    bids: 12,
    status: 'open',
    escrowFunded: true,
  },
  {
    id: '2',
    title: 'Smart Contract Audit for NFT Marketplace',
    description: 'Need a security expert to audit our NFT marketplace smart contracts. Must have experience with Solidity and security best practices.',
    budget: 3500,
    currency: 'ETH',
    category: 'Security',
    location: 'Remote',
    postedBy: '0x9a3f...2Cc',
    postedDate: '5 hours ago',
    bids: 8,
    status: 'open',
    escrowFunded: true,
  },
  {
    id: '3',
    title: 'UI/UX Design for Web3 Gaming Platform',
    description: 'Seeking a creative designer to create modern, engaging UI/UX for our blockchain-based gaming platform.',
    budget: 2800,
    currency: 'USDC',
    category: 'Design',
    location: 'Remote',
    postedBy: '0x1b4e...9Af',
    postedDate: '1 day ago',
    bids: 15,
    status: 'open',
    escrowFunded: true,
  },
  {
    id: '4',
    title: 'Community Manager for DAO Project',
    description: 'Looking for an experienced community manager to grow and engage our DAO community across Discord, Twitter, and Telegram.',
    budget: 1500,
    currency: 'USDC',
    category: 'Marketing',
    location: 'Remote',
    postedBy: '0x8d2a...7Fe',
    postedDate: '2 days ago',
    bids: 20,
    status: 'in-progress',
    escrowFunded: true,
  },
];

interface JobMarketplaceProps {
  user: User;
  onViewJob: (jobId: string) => void;
  onNavigate: (page: 'post-job') => void;
}

export function JobMarketplace({ user, onViewJob, onNavigate }: JobMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl mb-2">Job Marketplace</h1>
            <p className="text-gray-600">
              {user.role === 'provider' 
                ? 'Manage your posted jobs and find skilled bidders'
                : 'Browse available jobs and submit your bids'
              }
            </p>
          </div>
          {user.role === 'provider' && (
            <Button onClick={() => onNavigate('post-job')} size="lg">
              Post New Job
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search jobs by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Development">Development</SelectItem>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Security">Security</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map(job => (
          <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewJob(job.id)}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <div>
                    <h3 className="mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{job.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {job.postedDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {job.bids} bids
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{job.category}</Badge>
                  <Badge 
                    variant={job.status === 'open' ? 'default' : job.status === 'in-progress' ? 'secondary' : 'outline'}
                  >
                    {job.status === 'open' ? 'Open for Bids' : job.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </Badge>
                  {job.escrowFunded && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Escrow Funded
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex lg:flex-col items-center lg:items-end gap-4 lg:gap-2">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-2xl mb-1">
                    <DollarSign className="w-5 h-5" />
                    {job.budget.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">{job.currency}</div>
                </div>
                
                <Button variant="outline" onClick={(e) => {
                  e.stopPropagation();
                  onViewJob(job.id);
                }}>
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <p>No jobs found matching your criteria.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
