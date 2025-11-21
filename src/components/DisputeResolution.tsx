import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ArrowLeft, AlertCircle, Scale, Users } from 'lucide-react';
import { Job } from '../App';

interface DisputeResolutionProps {
  job: Job;
  onBack: () => void;
  isDarkMode: boolean;
}

export function DisputeResolution({ job, onBack, isDarkMode }: DisputeResolutionProps) {
  const [disputeStep, setDisputeStep] = useState<'file' | 'pending' | 'voting'>('file');
  const [vote, setVote] = useState<'employer' | 'freelancer' | null>(null);

  const juryVotes = [
    { id: '1', juror: 'addr1abc...', vote: 'employer', reputation: 4.9 },
    { id: '2', juror: 'addr1def...', vote: 'freelancer', reputation: 4.7 },
    { id: '3', juror: 'addr1ghi...', vote: 'freelancer', reputation: 4.8 },
    { id: '4', juror: 'addr1jkl...', vote: null, reputation: 4.6 },
    { id: '5', juror: 'addr1mno...', vote: null, reputation: 4.9 },
  ];

  const rootClass = isDarkMode ? 'bg-[#0a0a0a] text-white' : 'bg-white text-gray-900';
  const headerClass = isDarkMode ? 'bg-[#0a0a0a]/80 border-white/10' : 'bg-white/80 border-gray-200';
  const cardClass = isDarkMode ? 'bg-white/5 border border-primary/30' : 'bg-gray-50 border border-gray-300';
  const textMutedClass = isDarkMode ? 'text-white/70' : 'text-gray-500';

  return (
    <div className={`min-h-screen ${rootClass} transition-colors`}>
      {/* Header */}
      <header className={`backdrop-blur-sm border-b sticky top-0 z-10 ${headerClass}`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack} className={isDarkMode ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-200'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Scale className="w-8 h-8 text-primary" />
            Dispute Resolution for "{job.title}"
        </h1>
        
        <Card className={`p-8 rounded-xl shadow-xl space-y-6 ${cardClass}`}>
          <div className="text-center space-y-2">
            <Badge variant="destructive" className="text-sm px-3 py-1 mb-4">DISPUTE ACTIVE</Badge>
            <p className={textMutedClass}>Escrow is currently locked in the Aiken smart contract.</p>
          </div>

          {/* Dispute Filing Step */}
          {disputeStep === 'file' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">File Your Case</h2>
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-destructive mt-1" />
                  <p className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>
                      Provide a detailed, neutral explanation of the issue and why the funds should be released (or returned).
                  </p>
              </div>

              <div className="space-y-4">
                  <Textarea placeholder="Explain your position and provide evidence links..." rows={8} />
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    onClick={() => setDisputeStep('pending')}
                  >
                      Submit Case to Jury Pool
                  </Button>
              </div>
            </div>
          )}

          {/* Pending / Jury Voting Step */}
          {(disputeStep === 'pending' || disputeStep === 'voting') && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Jury Voting In Progress</h2>

              <div className={`p-4 rounded-lg space-y-3 ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                <div className="flex items-center gap-3 text-lg font-medium">
                    <Users className="w-6 h-6 text-primary" />
                    <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>Jury Panel Status</span>
                </div>
                
                <ul className="space-y-2">
                  {juryVotes.map((j) => (
                    <li key={j.id} className="flex items-center justify-between p-3 rounded-md transition-colors border border-dashed border-border/50">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-700'}`}>{j.juror.slice(0, 16)}...</span>
                        <Badge variant="secondary" className="text-xs">Rep: {j.reputation}</Badge>
                      </div>
                      <span className={`font-semibold ${
                          j.vote === 'employer' ? 'text-red-500' : 
                          j.vote === 'freelancer' ? 'text-green-500' : 
                          textMutedClass
                      }`}>
                          {j.vote ? `Voted for ${j.vote}` : 'Pending Vote'}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Only show the voting UI if it's the 'voting' step and the user is a juror */}
              {disputeStep === 'voting' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Your Decision (As a Juror)</h3>
                  <p className={textMutedClass}>Vote on the outcome to ensure a fair resolution.</p>
                  <div className="flex gap-4">
                    <Button 
                      className={`flex-1 ${vote === 'employer' ? 'bg-red-500 hover:bg-red-600' : 'bg-primary/20 hover:bg-primary/30'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      onClick={() => setVote('employer')}
                    >
                      Side with Employer
                    </Button>
                    <Button 
                      className={`flex-1 ${vote === 'freelancer' ? 'bg-green-500 hover:bg-green-600' : 'bg-primary/20 hover:bg-primary/30'} ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
                      onClick={() => setVote('freelancer')}
                    >
                      Side with Freelancer
                    </Button>
                  </div>
                  {vote && (
                    <Button 
                      className="w-full bg-gradient-to-r from-secondary to-primary hover:opacity-90"
                      onClick={() => { /* Mock submission */ setDisputeStep('pending'); }}
                    >
                      Submit Final Vote for {vote.toUpperCase()}
                    </Button>
                  )}
                </div>
              )}

              {/* Status Summary */}
              <div className={`p-4 rounded-lg space-y-3 ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                <h3 className="text-lg font-semibold">Current Vote Tally</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={textMutedClass}>Votes for Employer:</span>
                    <span className="font-semibold text-red-400">1 vote</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={textMutedClass}>Votes for Freelancer:</span>
                    <span className="font-semibold text-green-400">2 votes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={textMutedClass}>Pending:</span>
                    <span className="font-semibold">{juryVotes.filter(j => j.vote === null).length} votes</span>
                  </div>
                  <Separator className={isDarkMode ? 'my-2 bg-white/20' : 'my-2 bg-gray-300'} />
                  <p className={textMutedClass}>3 votes needed for majority decision</p>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-primary/10 border border-primary/30' : 'bg-primary/5 border border-primary/20'}`}>
                <p className={isDarkMode ? 'text-white/80' : 'text-gray-700'}>
                  You will be notified when all jury members have voted. The majority decision will be final and the escrow 
                  will be distributed accordingly.
                </p>
              </div>

              <Button variant="outline" onClick={onBack} className={`w-full ${isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-200'}`}>
                Back to Job
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}