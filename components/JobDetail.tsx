import { useState } from 'react';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/text-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import type { User } from '../App';

interface JobDetailProps {
  jobId: string;
  user: User;
  onBack: () => void;
}

interface Bid {
  id: string;
  bidder: string;
  bidderName: string;
  amount: number;
  currency: string;
  proposal: string;
  deliveryTime: string;
  rating: number;
  completedJobs: number;
  submittedAt: string;
}

const mockBids: Bid[] = [
  {
    id: '1',
    bidder: '0x9a3f...2Cc',
    bidderName: 'Alice Chen',
    amount: 4500,
    currency: 'USDC',
    proposal: 'I have 5+ years of experience in DeFi development with expertise in React, Node.js, and Solidity. I can deliver a high-quality dashboard with real-time data integration.',
    deliveryTime: '3 weeks',
    rating: 4.9,
    completedJobs: 47,
    submittedAt: '2 hours ago',
  },
  {
    id: '2',
    bidder: '0x1b4e...9Af',
    bidderName: 'Bob Smith',
    amount: 4800,
    currency: 'USDC',
    proposal: 'Experienced full-stack developer specializing in Web3 applications. I will provide a modern, responsive dashboard with comprehensive analytics and wallet integration.',
    deliveryTime: '4 weeks',
    rating: 4.7,
    completedJobs: 32,
    submittedAt: '5 hours ago',
  },
];

export function JobDetail({ jobId, user, onBack }: JobDetailProps) {
  const [bidAmount, setBidAmount] = useState('');
  const [bidProposal, setBidProposal] = useState('');
  const [showBidForm, setShowBidForm] = useState(false);

  // Mock job data
  const job = {
    id: jobId,
    title: 'Full-Stack DeFi Dashboard Development',
    description: 'Looking for an experienced developer to build a comprehensive DeFi dashboard with real-time data visualization and wallet integration. The dashboard should display portfolio tracking, yield farming opportunities, and transaction history across multiple chains.',
    budget: 5000,
    currency: 'USDC',
    category: 'Development',
    location: 'Remote',
    postedBy: '0x742d...bEb',
    postedByName: 'John Doe',
    postedDate: '2 hours ago',
    bids: mockBids.length,
    status: 'open' as const,
    escrowFunded: true,
    escrowAmount: 5000,
    requirements: '• 3+ years of React/TypeScript experience\n• Experience with Web3.js or Ethers.js\n• Knowledge of DeFi protocols\n• Portfolio of previous work required',
    duration: '3-4 weeks',
  };

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate bid submission
    setShowBidForm(false);
    setBidAmount('');
    setBidProposal('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Marketplace
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="mb-4">
              <h1 className="text-3xl mb-3">{job.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Posted {job.postedDate}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {job.bids} bids
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{job.category}</Badge>
                <Badge variant="default">Open for Bids</Badge>
                {job.escrowFunded && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Lock className="w-3 h-3 mr-1" />
                    Escrow Funded
                  </Badge>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              <h2 className="text-xl mb-3">Description</h2>
              <p className="text-gray-700 mb-4">{job.description}</p>

              <h3 className="mb-2">Requirements</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {job.requirements}
                </pre>
              </div>
            </div>
          </Card>

          {/* Bids Section */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl">Bids ({mockBids.length})</h2>
              {user.role === 'bidder' && !showBidForm && (
                <Button onClick={() => setShowBidForm(true)}>
                  Submit Your Bid
                </Button>
              )}
            </div>

            {/* Bid Form */}
            {showBidForm && user.role === 'bidder' && (
              <form onSubmit={handleSubmitBid} className="mb-6 p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <h3 className="mb-4">Your Bid</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bidAmount">Bid Amount (USDC)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="bidAmount"
                        type="number"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder="4500"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bidProposal">Proposal</Label>
                    <Textarea
                      id="bidProposal"
                      value={bidProposal}
                      onChange={(e) => setBidProposal(e.target.value)}
                      placeholder="Explain why you're the best fit for this job..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setShowBidForm(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Submit Bid
                    </Button>
                  </div>
                </div>
              </form>
            )}

            {/* Bid List */}
            <div className="space-y-4">
              {mockBids.map((bid) => (
                <div key={bid.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback>{bid.bidderName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4>{bid.bidderName}</h4>
                        <p className="text-sm text-gray-500">{bid.bidder}</p>
                        <div className="flex items-center gap-2 mt-1 text-sm">
                          <Badge variant="secondary" className="text-xs">
                            ⭐ {bid.rating}
                          </Badge>
                          <span className="text-gray-500">{bid.completedJobs} jobs completed</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xl mb-1">
                        <DollarSign className="w-4 h-4" />
                        {bid.amount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">{bid.currency}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">{bid.proposal}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Delivery: {bid.deliveryTime}</span>
                    <span>Submitted {bid.submittedAt}</span>
                  </div>

                  {user.role === 'provider' && (
                    <Button variant="outline" className="w-full mt-3">
                      Accept Bid
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Budget & Escrow */}
          <Card className="p-6">
            <h3 className="mb-4">Budget & Escrow</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Job Budget</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{job.budget.toLocaleString()} {job.currency}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Escrow Status</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Funded
                  </Badge>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm mb-1 text-blue-900">Protected Payment</h4>
                    <p className="text-xs text-blue-700">
                      {job.escrowAmount.toLocaleString()} {job.currency} locked in smart contract escrow until job completion is verified on-chain.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Job Provider */}
          <Card className="p-6">
            <h3 className="mb-4">Job Provider</h3>
            
            <div className="flex items-start gap-3 mb-4">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h4>{job.postedByName}</h4>
                <p className="text-sm text-gray-500">{job.postedBy}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    KYC Verified
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Jobs Posted</span>
                <span>24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rating</span>
                <span>⭐ 4.8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Member Since</span>
                <span>Jan 2024</span>
              </div>
            </div>
          </Card>

          {/* Job Timeline */}
          <Card className="p-6">
            <h3 className="mb-4">Timeline</h3>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm mb-1">Job Posted</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm mb-1">Escrow Funded</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm mb-1">Accepting Bids</p>
                  <p className="text-xs text-gray-500">Current status</p>
                </div>
              </div>

              <div className="flex gap-3 opacity-40">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full border-2 border-gray-400" />
                </div>
                <div>
                  <p className="text-sm mb-1">Work in Progress</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>

              <div className="flex gap-3 opacity-40">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <div className="w-3 h-3 rounded-full border-2 border-gray-400" />
                </div>
                <div>
                  <p className="text-sm mb-1">On-Chain Verification</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
