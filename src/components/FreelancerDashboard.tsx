import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, Wallet, FileText, Clock, Star, Sparkles, User } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { Job } from '../App';

interface FreelancerDashboardProps {
  onJobSelect: (job: Job) => void;
  onShowProfile?: () => void;
  onSettingProfile?: () => void;
}

export function FreelancerDashboard({ onJobSelect, onShowProfile, onSettingProfile }: FreelancerDashboardProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
    {
      id: '6',
      title: 'NFT Marketplace Frontend',
      description: 'Build responsive React frontend for NFT marketplace',
      budget: 2000,
      status: 'open',
      employer: 'addr1def...',
      bids: 12,
    },
    {
      id: '7',
      title: 'Video Editing',
      description: 'Edit 5-minute promotional video for DeFi protocol',
      budget: 350,
      status: 'open',
      employer: 'addr1ghi...',
      bids: 2,
    },
  ];

  const myBids: Job[] = [
    {
      id: '8',
      title: 'Build React Dashboard',
      description: 'Need a modern dashboard with charts and analytics',
      budget: 500,
      status: 'open',
      employer: 'addr1qxy...',
      bids: 7,
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
              <h2 className="text-foreground">Freelancer Dashboard</h2>
            </div>
// ...existing code...
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 border border-secondary/30 bg-secondary/5 rounded-lg">
                <Wallet className="w-4 h-4 text-secondary" />
                <span className="text-foreground">45.2 ADA</span>
              </div>
                  <div className="relative">
                    <button
                      className="focus:outline-none"
                      type="button"
                      title="Profile Menu"
                      onClick={() => setShowProfileMenu((prev) => !prev)}
                    >
                      <Avatar>
                        <AvatarFallback>
                          <User className="w-6 h-6 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                    </button>
                    {showProfileMenu && (
                      <div className="absolute right-0 mt-2 w-72 bg-card text-foreground rounded-xl shadow-lg border border-border z-50 flex flex-col items-center py-6 px-6 font-sans">
                        {/* Profile Data Example (replace with real data) */}
                        <div className="py-2 flex justify-center">
                          <div className="rounded-full w-20 h-20 bg-muted flex items-center justify-center border border-border">
                            <span className="text-muted-foreground text-sm">No Image</span>
                          </div>
                        </div>
                        <div className="space-y-1 text-center mb-4">
                          <h3 className="font-semibold text-base text-foreground">User Name</h3>
                          <p className="text-muted-foreground text-xs">user@email.com</p>
                        </div>
                        <button
                          className="w-full py-2 px-4 rounded-md bg-primary/10 hover:bg-primary/20 text-primary font-medium mb-2 transition-colors"
                          onClick={onShowProfile}
                        >
                          Show Profile
                        </button>
                        <button
                          className="w-full py-2 px-4 rounded-md bg-secondary/10 hover:bg-secondary/20 text-secondary font-medium mb-2 transition-colors"
                          onClick={onSettingProfile}
                        >
                          Profile Settings
                        </button>
                        <button
                          className="w-full py-2 px-4 rounded-md bg-muted hover:bg-muted/80 text-muted-foreground font-medium transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </div>
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
                <p className="text-muted-foreground">Active Bids</p>
                <h2 className="text-foreground">1</h2>
              </div>
              <FileText className="w-8 h-8 text-primary/50" />
            </div>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">In Progress</p>
                <h2 className="text-foreground">2</h2>
              </div>
              <Clock className="w-8 h-8 text-secondary/50" />
            </div>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Completed</p>
                <h2 className="text-foreground">15</h2>
              </div>
              <Star className="w-8 h-8 text-primary/50" />
            </div>
          </Card>
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground">Total Earned</p>
                <h2 className="text-foreground">6,450 ADA</h2>
              </div>
              <Wallet className="w-8 h-8 text-secondary/50" />
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search available jobs by title, category, or skills..." className="pl-10 bg-input/30" />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button variant="outline" size="sm">All Categories</Button>
          <Button variant="outline" size="sm">Development</Button>
          <Button variant="outline" size="sm">Design</Button>
          <Button variant="outline" size="sm">Writing</Button>
          <Button variant="outline" size="sm">Marketing</Button>
        </div>

        {/* My Bids Section */}
        <div className="mb-8">
          <h3 className="mb-4 text-foreground">My Active Bids</h3>
          <div className="space-y-4">
            {myBids.map((job) => (
              <Card 
                key={job.id}
                className="p-6 cursor-pointer bg-card/50 backdrop-blur-sm border-secondary/30 hover:border-secondary/50 transition-all"
                onClick={() => onJobSelect(job)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-foreground">{job.title}</h3>
                      <Badge className="bg-secondary/20 text-secondary border-secondary/30">Your Bid: 450 ADA</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex items-center gap-6 text-muted-foreground flex-wrap">
                      <span className="text-primary">{job.budget} ADA</span>
                      <span>{job.bids} Total Bids</span>
                      <span>Submitted 2 days ago</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Jobs */}
        <div>
          <h3 className="mb-4 text-foreground">Available Jobs</h3>
          <div className="space-y-4">
            {availableJobs.map((job) => (
              <Card 
                key={job.id}
                className="p-6 cursor-pointer bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all"
                onClick={() => onJobSelect(job)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-foreground">{job.title}</h3>
                      <Badge variant="outline">{job.status}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex items-center gap-6 text-muted-foreground flex-wrap">
                      <span className="text-primary">{job.budget} ADA</span>
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
  );
}