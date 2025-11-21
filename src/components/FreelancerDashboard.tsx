import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Wallet, FileText, Clock, Star, Sparkles, User, Settings } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { Job } from '../App';

interface FreelancerDashboardProps {
  onJobSelect: (job: Job) => void;
  onShowProfile?: () => void;
  onSettingProfile?: () => void;
  isDarkMode: boolean; // Added for theme consistency
}

export function FreelancerDashboard({ onJobSelect, onShowProfile, onSettingProfile, isDarkMode }: FreelancerDashboardProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const myActiveJobs: Job[] = [
    {
      id: '6',
      title: 'NFT Metadata Generator',
      description: 'Create a script to generate JSON metadata for a 10K NFT collection.',
      budget: 600,
      status: 'in-progress',
      employer: 'addr1abc...',
      freelancer: 'addr1xyz...',
    },
  ];

  const availableJobs: Job[] = [
    {
      id: '4',
      title: 'Mobile App UI Design',
      description: 'Design clean UI for a crypto wallet mobile app',
      budget: 800,
      status: 'open',
      employer: 'addr1xyz...',
      bids: 3,
    },
    {
      id: '5',
      title: 'Write Technical Documentation',
      description: 'Document smart contract functionality and API endpoints',
      budget: 400,
      status: 'open',
      employer: 'addr1abc...',
      bids: 5,
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
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-secondary" />
              Freelancer Dashboard
            </h1>
            
            <DropdownMenu open={showProfileMenu} onOpenChange={setShowProfileMenu}>
                <DropdownMenuTrigger asChild>
                    <Button 
                        variant="ghost" 
                        className={`p-0 h-auto ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-200'}`}
                    >
                        <Avatar className="w-10 h-10 border-2 border-primary cursor-pointer">
                            <AvatarFallback className="bg-primary/20 text-primary">AD</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className={`w-56 ${isDarkMode ? 'bg-card border-border' : 'bg-white border-gray-200'}`} align="end">
                    <DropdownMenuItem 
                        onClick={onShowProfile} 
                        className={`cursor-pointer ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} p-2 rounded-md`}
                    >
                        <User className="mr-2 h-4 w-4" />
                        <span className={textForegroundClass}>View Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={onSettingProfile} 
                        className={`cursor-pointer ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'} p-2 rounded-md`}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        <span className={textForegroundClass}>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className={`p-6 ${cardClass}`}>
            <Wallet className="w-6 h-6 text-primary mb-3" />
            <p className={textMutedClass}>Total Earned (ADA)</p>
            <h2 className="text-3xl font-bold">12,500</h2>
          </Card>
          <Card className={`p-6 ${cardClass}`}>
            <Clock className="w-6 h-6 text-primary mb-3" />
            <p className={textMutedClass}>Active Contracts</p>
            <h2 className="text-3xl font-bold">{myActiveJobs.length}</h2>
          </Card>
          <Card className={`p-6 ${cardClass}`}>
            <Star className="w-6 h-6 text-primary mb-3" />
            <p className={textMutedClass}>Reputation Score</p>
            <h2 className="text-3xl font-bold text-secondary">4.85</h2>
          </Card>
        </div>

        <div className="space-y-10">
            {/* My Active Jobs */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">My Active Contracts</h2>
              <div className="space-y-4">
                {myActiveJobs.map((job) => (
                  <Card 
                    key={job.id}
                    className={`p-6 cursor-pointer border-l-4 border-primary transition-all ${jobCardClass}`}
                    onClick={() => onJobSelect(job)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className={textForegroundClass}>{job.title}</h3>
                          <Badge variant="secondary" className="capitalize">
                            {job.status}
                          </Badge>
                        </div>
                        <p className={textMutedClass + ' mb-3'}>{job.description}</p>
                        <div className={`flex items-center gap-6 flex-wrap ${textMutedClass}`}>
                          <span className="text-primary font-semibold">{job.budget} ADA</span>
                          <span>Employer: {job.employer.slice(0, 12)}...</span>
                        </div>
                      </div>
                      <Button variant="outline" className={isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-200'}>
                        View Progress
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Jobs */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Available Jobs</h2>
                <div className="relative">
                  <Input placeholder="Search jobs..." className={`pl-10 ${inputClass}`} />
                  <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${textMutedClass}`} />
                </div>
              </div>
              <div className="space-y-4">
                {availableJobs.map((job) => (
                  <Card 
                    key={job.id}
                    className={`p-6 cursor-pointer transition-all ${jobCardClass}`}
                    onClick={() => onJobSelect(job)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className={textForegroundClass}>{job.title}</h3>
                          <Badge variant="outline" className={`capitalize ${isDarkMode ? 'border-white/20' : 'border-gray-300'}`}>
                            {job.status}
                          </Badge>
                        </div>
                        <p className={textMutedClass + ' mb-3'}>{job.description}</p>
                        <div className={`flex items-center gap-6 flex-wrap ${textMutedClass}`}>
                          <span className="text-primary font-semibold">{job.budget} ADA</span>
                          <span>{job.bids} Bids</span>
                          <span>Posted by {job.employer.slice(0, 12)}...</span>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">Submit Bid</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}