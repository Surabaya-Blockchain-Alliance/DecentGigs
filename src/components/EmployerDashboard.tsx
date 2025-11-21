import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Plus, Search, Wallet, FileText, Clock, CheckCircle, Sparkles } from 'lucide-react';
import { Job } from '../App';

interface EmployerDashboardProps {
  onJobSelect: (job: Job) => void;
  isDarkMode: boolean; // Added for theme consistency
}

export function EmployerDashboard({ onJobSelect, isDarkMode }: EmployerDashboardProps) {
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', description: '', budget: 0 });

  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Build React Dashboard',
      description: 'Need a modern dashboard with charts and analytics',
      budget: 500,
      status: 'open',
      employer: 'addr1qxy...',
      bids: 7,
    },
    {
      id: '2',
      title: 'Smart Contract Audit',
      description: 'Security audit for Aiken validator contract',
      budget: 1200,
      status: 'in-progress',
      employer: 'addr1qxy...',
      freelancer: 'addr1abc...',
    },
    {
      id: '3',
      title: 'Logo Design',
      description: 'Modern logo for DeFi project',
      budget: 300,
      status: 'completed',
      employer: 'addr1qxy...',
      freelancer: 'addr1def...',
    },
  ];

  const rootClass = isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900';
  const cardClass = isDarkMode ? 'bg-white/5 border border-primary/30' : 'bg-gray-50 border border-gray-300';
  const jobCardClass = isDarkMode ? 'bg-white/5 backdrop-blur-sm border-primary/20 hover:border-primary/50' : 'bg-white border-gray-200 hover:border-primary/50';
  const textForegroundClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = isDarkMode ? 'text-white/70' : 'text-gray-500';
  const inputClass = isDarkMode ? 'bg-white/10 border-white/30 text-white' : 'bg-gray-100 border-gray-300 text-gray-900';


  return (
    <div className={`min-h-screen ${rootClass} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-secondary" />
          Employer Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={`p-6 ${cardClass}`}>
            <Wallet className="w-6 h-6 text-primary mb-3" />
            <p className={textMutedClass}>Escrow Balance</p>
            <h2 className="text-3xl font-bold">1,800 ADA</h2>
          </Card>
          <Card className={`p-6 ${cardClass}`}>
            <FileText className="w-6 h-6 text-primary mb-3" />
            <p className={textMutedClass}>Total Jobs Posted</p>
            <h2 className="text-3xl font-bold">12</h2>
          </Card>
          <Card className={`p-6 ${cardClass}`}>
            <Clock className="w-6 h-6 text-primary mb-3" />
            <p className={textMutedClass}>Avg Time to Hire</p>
            <h2 className="text-3xl font-bold">2.4 Days</h2>
          </Card>
        </div>

        <div className="mb-8">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            onClick={() => setShowCreateJob(!showCreateJob)}
          >
            <Plus className="w-5 h-5 mr-2" />
            {showCreateJob ? 'Cancel Job Creation' : 'Post New Job'}
          </Button>
        </div>

        {showCreateJob && (
          <Card className={`p-8 mb-8 space-y-4 ${cardClass}`}>
            <h2 className="text-2xl font-semibold mb-4">Create New Job Posting</h2>
            <div>
              <Label htmlFor="title" className={textForegroundClass}>Job Title</Label>
              <Input 
                id="title" 
                placeholder="e.g., Build a Plutus Validator" 
                className={`mt-1 ${inputClass}`}
                onChange={(e) => setNewJob({...newJob, title: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="description" className={textForegroundClass}>Description</Label>
              <Textarea 
                id="description" 
                placeholder="Detailed description of the required work..." 
                rows={5} 
                className={`mt-1 ${inputClass}`}
                onChange={(e) => setNewJob({...newJob, description: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="budget" className={textForegroundClass}>Budget (ADA)</Label>
              <Input 
                id="budget" 
                type="number" 
                placeholder="e.g., 500" 
                className={`mt-1 ${inputClass}`}
                onChange={(e) => setNewJob({...newJob, budget: parseFloat(e.target.value) || 0})}
              />
            </div>
            <Button className="bg-gradient-to-r from-secondary to-primary hover:opacity-90">
              Post Job & Escrow Funds
            </Button>
          </Card>
        )}

        {/* Job Listings */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Your Posted Jobs</h2>
            <div className="relative">
              <Input placeholder="Search jobs..." className={`pl-10 ${inputClass}`} />
              <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${textMutedClass}`} />
            </div>
          </div>
          
          <div className="space-y-4">
            {mockJobs.map((job) => (
            <Card 
              key={job.id}
              className={`p-6 cursor-pointer transition-all ${jobCardClass}`}
              onClick={() => onJobSelect(job)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className={textForegroundClass}>{job.title}</h3>
                    <Badge variant={
                      job.status === 'open' ? 'default' : 
                      job.status === 'in-progress' ? 'secondary' : 
                      'outline'
                    } className={`capitalize ${isDarkMode ? '' : 'text-gray-900 border-gray-300'}`}>
                      {job.status}
                    </Badge>
                  </div>
                  <p className={textMutedClass + ' mb-3'}>{job.description}</p>
                  <div className={`flex items-center gap-6 flex-wrap ${textMutedClass}`}>
                    <span className="text-primary font-semibold">{job.budget} ADA</span>
                    {job.bids && <span className={textMutedClass}>{job.bids} Bids</span>}
                    {job.freelancer && <span className={textMutedClass}>Freelancer: {job.freelancer.slice(0, 12)}...</span>}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary/80" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);
}