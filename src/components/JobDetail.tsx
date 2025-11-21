import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ArrowLeft, Lock, Upload, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Job, UserType } from '../App';

interface JobDetailProps {
  job: Job;
  userType: UserType;
  onBack: () => void;
  onWorkSubmission: () => void;
  onApproval: () => void;
  onDispute: () => void;
}

export function JobDetail({ job, userType, onBack, onWorkSubmission, onApproval, onDispute }: JobDetailProps) {
  const [showBidForm, setShowBidForm] = useState(false);

  const mockBids = [
    { id: '1', freelancer: 'addr1abc...', amount: 450, proposal: 'I have 5 years of experience in React development...', reputation: 4.8 },
    { id: '2', freelancer: 'addr1def...', amount: 480, proposal: 'I can deliver this project within 7 days...', reputation: 4.5 },
    { id: '3', freelancer: 'addr1ghi...', amount: 520, proposal: 'Expert in modern web development with portfolio...', reputation: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-foreground">{job.title}</h2>
                    <Badge variant={
                      job.status === 'open' ? 'default' : 
                      job.status === 'in-progress' ? 'secondary' : 
                      'outline'
                    }>
                      {job.status}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">Posted by {job.employer.slice(0, 20)}...</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 text-foreground">Description</h3>
                  <p className="text-muted-foreground">{job.description}</p>
                  <p className="text-muted-foreground mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                  </p>
                </div>

                <div>
                  <h3 className="mb-2 text-foreground">Requirements</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Experience with React and TypeScript</li>
                    <li>Knowledge of responsive design</li>
                    <li>Portfolio of previous work</li>
                    <li>Available for immediate start</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 text-foreground">Deliverables</h3>
                  <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 text-muted-foreground">
                    Files will be uploaded to IPFS. Hash will be submitted to smart contract for verification.
                  </div>
                </div>
              </div>
            </Card>

            {/* Escrow Status (if in progress) */}
            {job.status === 'in-progress' && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg flex items-center justify-center border border-secondary/30">
                    <Lock className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-foreground">Escrow Active</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Locked:</span>
                    <span className="text-primary">{job.budget} ADA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contract Address:</span>
                    <span className="font-mono text-foreground">addr1vxy...abc123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className="bg-secondary/20 text-secondary border-secondary/30">Awaiting Delivery</Badge>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex gap-3">
                  {userType === 'freelancer' ? (
                    <Button onClick={onWorkSubmission} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Work
                    </Button>
                  ) : (
                    <Button onClick={onApproval} className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Review & Approve
                    </Button>
                  )}
                  <Button variant="outline" onClick={onDispute}>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Open Dispute
                  </Button>
                </div>
              </Card>
            )}

            {/* Bids Section (for employers on open jobs) */}
            {userType === 'employer' && job.status === 'open' && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
                <h3 className="mb-4 text-foreground">Proposals ({mockBids.length})</h3>
                <div className="space-y-4">
                  {mockBids.map((bid) => (
                    <div key={bid.id} className="border border-primary/20 bg-primary/5 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3 gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-foreground">{bid.freelancer}</span>
                            <Badge variant="outline" className="border-secondary/30 text-secondary">⭐ {bid.reputation}</Badge>
                          </div>
                          <p className="text-muted-foreground">{bid.proposal}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <span className="text-primary">Bid Amount: {bid.amount} ADA</span>
                        <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">Select & Create Escrow</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Bid Form (for freelancers on open jobs) */}
            {userType === 'freelancer' && job.status === 'open' && (
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/30">
                {!showBidForm ? (
                  <Button onClick={() => setShowBidForm(true)} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Submit Your Proposal
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-foreground">Submit Your Bid</h3>
                    
                    <div className="space-y-2">
                      <Label className="text-foreground">Your Bid Amount (ADA)</Label>
                      <Input type="number" placeholder={job.budget.toString()} className="bg-input/30" />
                      <p className="text-muted-foreground">Budget: {job.budget} ADA</p>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground">Cover Letter / Proposal</Label>
                      <Textarea 
                        placeholder="Explain why you're the best fit for this project..."
                        rows={6}
                        className="bg-input/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground">Estimated Delivery Time</Label>
                      <Input placeholder="e.g. 7 days" className="bg-input/30" />
                    </div>

                    <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                      <p className="text-muted-foreground">
                        Your bid will be recorded on-chain. If selected, funds will be locked in escrow automatically.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">Submit Bid</Button>
                      <Button variant="outline" onClick={() => setShowBidForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="mb-4 text-foreground">Job Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-muted-foreground">Budget</p>
                  <p className="text-primary">{job.budget} ADA</p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground">Posted</p>
                  <p className="text-foreground">3 days ago</p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground">Proposals</p>
                  <p className="text-foreground">{job.bids || 0} bids</p>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground">Category</p>
                  <Badge variant="outline">Development</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-secondary/20">
              <h3 className="mb-4 text-foreground">About Employer</h3>
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-full mx-auto" />
                <div className="text-center">
                  <p className="text-foreground">{job.employer.slice(0, 15)}...</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <span className="text-secondary">⭐ 4.7</span>
                    <span className="text-muted-foreground">(23 reviews)</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2 text-muted-foreground">
                  <p>Jobs Posted: 12</p>
                  <p>Hire Rate: 85%</p>
                  <p>Member Since: Jan 2025</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
              <h3 className="mb-3 text-foreground">Payment Safety</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                  <p className="text-muted-foreground">Funds locked in Aiken validator</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                  <p className="text-muted-foreground">Automatic release on approval</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                  <p className="text-muted-foreground">Dispute resolution available</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}