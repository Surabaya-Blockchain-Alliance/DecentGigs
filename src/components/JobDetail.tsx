import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { ArrowLeft, Lock, Upload, CheckCircle, AlertCircle, Sparkles, User, Star } from 'lucide-react';
import { Job, UserType } from '../App';

interface JobDetailProps {
  job: Job;
  userType: UserType;
  onBack: () => void;
  onWorkSubmission: () => void;
  onApproval: () => void;
  onDispute: () => void;
  isDarkMode: boolean; // Added for theme consistency
}

export function JobDetail({ job, userType, onBack, onWorkSubmission, onApproval, onDispute, isDarkMode }: JobDetailProps) {
  const [showBidForm, setShowBidForm] = useState(false);

  const mockBids = [
    { id: '1', freelancer: 'addr1abc...', amount: 450, proposal: 'I have 5 years of experience in React development...', reputation: 4.8 },
    { id: '2', freelancer: 'addr1def...', amount: 480, proposal: 'I can deliver this project within 7 days...', reputation: 4.5 },
    { id: '3', freelancer: 'addr1ghi...', amount: 520, proposal: 'Expert in modern web development with portfolio...', reputation: 4.9 },
  ];

  const rootClass = isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900';
  const headerClass = isDarkMode ? 'bg-[#0a0a0a]/80 border-white/10' : 'bg-white/80 border-gray-200';
  const cardClass = isDarkMode ? 'bg-white/5 border border-primary/30' : 'bg-gray-50 border border-gray-300';
  const textForegroundClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const textMutedClass = isDarkMode ? 'text-white/70' : 'text-gray-500';
  const inputClass = isDarkMode ? 'bg-white/10 border-white/30 text-white' : 'bg-gray-100 border-gray-300 text-gray-900';

  return (
    <div className={`min-h-screen ${rootClass} transition-colors`}>
      {/* Header */}
      <header className={`backdrop-blur-sm border-b sticky top-0 z-10 ${headerClass}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className={isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-200'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Job Content (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-8">
            <Card className={`p-8 ${cardClass} space-y-6`}>
              {/* Job Title & Status */}
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <h1 className="text-4xl font-extrabold">{job.title}</h1>
                <Badge 
                  variant={
                    job.status === 'open' ? 'default' : 
                    job.status === 'in-progress' ? 'secondary' : 
                    'outline'
                  } 
                  className={`capitalize text-lg px-4 py-1 ${isDarkMode ? '' : 'text-gray-900 border-gray-300'}`}
                >
                  {job.status}
                </Badge>
              </div>

              {/* Budget & Timeline */}
              <div className="flex items-center gap-6 text-xl">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  <span className="font-bold text-primary">{job.budget} ADA</span>
                  <span className={textMutedClass}>Escrow</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-secondary" />
                  <span className="font-semibold">{job.status === 'open' ? '7-14 Days' : 'In Progress'}</span>
                </div>
              </div>

              <Separator className={isDarkMode ? 'bg-white/20' : 'bg-gray-300'} />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-semibold mb-3">Job Description</h2>
                <p className={textMutedClass + ' leading-relaxed'}>{job.description}</p>
                <ul className="list-disc pl-5 mt-4 space-y-1">
                    <li className={textMutedClass}>EUTXO knowledge required</li>
                    <li className={textMutedClass}>React/TypeScript experience a plus</li>
                    <li className={textMutedClass}>Must provide source code on submission</li>
                </ul>
              </div>

              {/* Action Buttons based on User Type and Status */}
              <div className="pt-4 space-y-3">
                {userType === 'freelancer' && job.status === 'open' && (
                  <>
                    {!showBidForm ? (
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                        onClick={() => setShowBidForm(true)}
                      >
                        Submit Your Bid
                      </Button>
                    ) : (
                      <Card className={`p-6 space-y-4 ${cardClass}`}>
                        <h3 className="text-lg font-semibold">Place Your Bid</h3>
                        <div>
                          <Label htmlFor="bid-amount" className={textForegroundClass}>Bid Amount (ADA)</Label>
                          <Input id="bid-amount" type="number" placeholder="e.g., 480" className={`mt-1 ${inputClass}`} />
                        </div>
                        <div>
                          <Label htmlFor="proposal" className={textForegroundClass}>Proposal</Label>
                          <Textarea id="proposal" rows={4} placeholder="Tell the employer why you are the best fit..." className={`mt-1 ${inputClass}`} />
                        </div>
                        <div className="flex gap-3">
                          <Button className="flex-1 bg-gradient-to-r from-secondary to-primary hover:opacity-90">
                            Confirm Bid
                          </Button>
                          <Button variant="outline" onClick={() => setShowBidForm(false)} className={isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-200'}>
                            Cancel
                          </Button>
                        </div>
                      </Card>
                    )}
                  </>
                )}

                {userType === 'freelancer' && job.status === 'in-progress' && (
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={onWorkSubmission}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Submit Final Work
                  </Button>
                )}

                {userType === 'employer' && job.status === 'work-submitted' && (
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={onApproval}
                    >
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Approve & Release Funds
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={onDispute}
                    >
                      <AlertCircle className="w-5 h-5 mr-2" />
                      File a Dispute
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Bids Section (Only for Employer on Open Jobs) */}
            {userType === 'employer' && job.status === 'open' && (
              <Card className={`p-8 ${cardClass} space-y-4`}>
                <h2 className="text-2xl font-semibold mb-3">Bids ({mockBids.length})</h2>
                <div className="space-y-4">
                  {mockBids.map((bid) => (
                    <div 
                      key={bid.id} 
                      className={`p-4 rounded-lg border flex items-center justify-between transition-all ${isDarkMode ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-white border-gray-200 hover:bg-gray-100'}`}
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-lg text-primary">{bid.amount} ADA</span>
                            <Badge variant="outline" className={`text-sm ${isDarkMode ? 'border-white/20' : 'border-gray-300 text-gray-700'}`}>
                                Rep: {bid.reputation} <Star className="w-3 h-3 ml-1 fill-yellow-500 text-yellow-500" />
                            </Badge>
                        </div>
                        <p className={textMutedClass + ' text-sm'}>{bid.proposal.slice(0, 50)}...</p>
                        <p className={textMutedClass + ' text-xs mt-1'}>Freelancer: {bid.freelancer.slice(0, 10)}...</p>
                      </div>
                      <Button className="bg-gradient-to-r from-secondary to-primary hover:opacity-90">Hire</Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Current Freelancer Info (Only on Active/Completed Jobs) */}
            {job.freelancer && (
                <Card className={`p-8 ${cardClass} space-y-4`}>
                    <h2 className="text-2xl font-semibold mb-3">Assigned Freelancer</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <User className="w-10 h-10 text-primary" />
                            <div>
                                <p className="font-semibold text-lg">Freelancer ({job.freelancer.slice(0, 16)}...)</p>
                                <div className="flex items-center text-sm">
                                    <span className="text-secondary mr-1">⭐ 4.8</span>
                                    <span className={textMutedClass}>(45 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <Button variant="outline" className={isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-200'}>View Profile</Button>
                    </div>
                </Card>
            )}

          </div>


          {/* Sidebar (Col 3) */}
          <div className="lg:col-span-1 space-y-8">
            <Card className={`p-6 ${cardClass} space-y-4`}>
              <h3 className="text-lg font-semibold mb-3">Employer Details</h3>
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-primary/80" />
                <div>
                  <p className="font-semibold">Employer ({job.employer.slice(0, 16)}...)</p>
                  <div className="flex items-center text-sm">
                    <span className="text-secondary mr-1">⭐ 4.7</span>
                    <span className={textMutedClass}>(23 reviews)</span>
                  </div>
                </div>
              </div>
              <Separator className={isDarkMode ? 'bg-white/20' : 'bg-gray-300'} />
              <div className={`space-y-2 ${textMutedClass}`}>
                <p>Jobs Posted: 12</p>
                <p>Hire Rate: 85%</p>
                <p>Member Since: Jan 2025</p>
              </div>
            </Card>

            <Card className={`p-6 ${cardClass} space-y-4`}>
              <h3 className="text-lg font-semibold mb-3">Payment Safety</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                  <p className={textMutedClass}>Funds locked in Aiken validator</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-primary" />
                  <p className={textMutedClass}>Automatic release on approval</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 text-secondary" />
                  <p className={textMutedClass}>Dispute resolution available</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}