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
}

export function EmployerDashboard({ onJobSelect }: EmployerDashboardProps) {
  const [showCreateJob, setShowCreateJob] = useState(false);

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
      freelancer: 'addr1xyz...',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-foreground">Employer Dashboard</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 border border-primary/30 bg-primary/5 rounded-lg">
                <Wallet className="w-4 h-4 text-primary" />
                <span className="text-foreground">125.5 ADA</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-full" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Active Jobs</p>
                <h2 className="text-foreground">3</h2>
              </div>
              <FileText className="w-8 h-8 text-primary/50" />
            </div>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Bids</p>
                <h2 className="text-foreground">23</h2>
              </div>
              <Clock className="w-8 h-8 text-secondary/50" />
            </div>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">In Progress</p>
                <h2 className="text-foreground">1</h2>
              </div>
              <Clock className="w-8 h-8 text-primary/50" />
            </div>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Completed</p>
                <h2 className="text-foreground">8</h2>
              </div>
              <CheckCircle className="w-8 h-8 text-secondary/50" />
            </div>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search your jobs..." className="pl-10 bg-input/30" />
            </div>
          </div>
          <Button onClick={() => setShowCreateJob(!showCreateJob)} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            <Plus className="w-4 h-4 mr-2" />
            Create Job
          </Button>
        </div>

        {/* Create Job Form */}
        {showCreateJob && (
          <Card className="p-6 mb-6 bg-card/50 backdrop-blur-sm border-primary/30">
            <h3 className="mb-4 text-foreground">Create New Job</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Job Title</Label>
                <Input placeholder="e.g. Build a responsive landing page" className="bg-input/30" />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Description</Label>
                <Textarea 
                  placeholder="Describe the project requirements, deliverables, and timeline..."
                  rows={4}
                  className="bg-input/30"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Budget (ADA)</Label>
                  <Input type="number" placeholder="500" className="bg-input/30" />
                </div>
                <div className="space-y-2">
                  <Label className="text-foreground">Category</Label>
                  <Input placeholder="Development" className="bg-input/30" />
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground">Listing Fee: 2 ADA</p>
                    <p className="text-muted-foreground">Jobs appear instantly on-chain</p>
                  </div>
                  <div className="px-4 py-2 border border-primary bg-primary/20 rounded-lg text-primary">
                    2 ADA
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">Pay & Publish Job</Button>
                <Button variant="outline" onClick={() => setShowCreateJob(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Jobs List */}
        <div className="space-y-4">
          <h3 className="text-foreground">Your Jobs</h3>
          {mockJobs.map((job) => (
            <Card 
              key={job.id}
              className="p-6 cursor-pointer bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all"
              onClick={() => onJobSelect(job)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-foreground">{job.title}</h3>
                    <Badge variant={
                      job.status === 'open' ? 'default' : 
                      job.status === 'in-progress' ? 'secondary' : 
                      'outline'
                    }>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-3">{job.description}</p>
                  <div className="flex items-center gap-6 text-muted-foreground flex-wrap">
                    <span className="text-primary">{job.budget} ADA</span>
                    {job.bids && <span>{job.bids} Bids</span>}
                    {job.freelancer && <span>Freelancer: {job.freelancer.slice(0, 12)}...</span>}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}