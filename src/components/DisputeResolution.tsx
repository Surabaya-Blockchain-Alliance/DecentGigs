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
}

export function DisputeResolution({ job, onBack }: DisputeResolutionProps) {
  const [disputeStep, setDisputeStep] = useState<'file' | 'pending' | 'voting'>('file');

  const juryVotes = [
    { id: '1', juror: 'addr1abc...', vote: 'employer', reputation: 4.9 },
    { id: '2', juror: 'addr1def...', vote: 'freelancer', reputation: 4.7 },
    { id: '3', juror: 'addr1ghi...', vote: 'freelancer', reputation: 4.8 },
    { id: '4', juror: 'addr1jkl...', vote: null, reputation: 4.6 },
    { id: '5', juror: 'addr1mno...', vote: null, reputation: 4.9 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-destructive/30">
          <div className="text-center mb-8">
            <div className="w-16 h-16 border-2 border-destructive rounded-full flex items-center justify-center mx-auto mb-4 bg-destructive/10">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-foreground">Dispute Resolution</h1>
            <p className="text-muted-foreground mt-2">
              {job.title}
            </p>
          </div>

          {/* File Dispute */}
          {disputeStep === 'file' && (
            <div className="space-y-6">
              <div className="bg-secondary/20 border border-secondary/40 rounded-lg p-6">
                <h3 className="mb-2 text-foreground">Before Opening a Dispute</h3>
                <p className="text-muted-foreground">
                  Disputes should be used as a last resort. We recommend trying to resolve issues directly with the other party first. 
                  Opening a dispute will involve community jury members who will vote on the outcome.
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-foreground">Why are you opening a dispute?</h3>
                <div className="space-y-3">
                  <button className="w-full text-left border-2 border-primary/30 bg-primary/5 rounded-lg p-4 hover:border-primary/50 transition-all">
                    <h3 className="text-foreground">Work not delivered as described</h3>
                    <p className="text-muted-foreground">The deliverables don't match the job requirements</p>
                  </button>
                  <button className="w-full text-left border-2 border-primary/30 bg-primary/5 rounded-lg p-4 hover:border-primary/50 transition-all">
                    <h3 className="text-foreground">Quality issues</h3>
                    <p className="text-muted-foreground">The work quality is below acceptable standards</p>
                  </button>
                  <button className="w-full text-left border-2 border-primary/30 bg-primary/5 rounded-lg p-4 hover:border-primary/50 transition-all">
                    <h3 className="text-foreground">Communication breakdown</h3>
                    <p className="text-muted-foreground">Unable to reach agreement with the other party</p>
                  </button>
                  <button className="w-full text-left border-2 border-primary/30 bg-primary/5 rounded-lg p-4 hover:border-primary/50 transition-all">
                    <h3 className="text-foreground">Payment not released</h3>
                    <p className="text-muted-foreground">Work completed but employer won't release funds</p>
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-foreground">Explain Your Case</h3>
                <Textarea 
                  placeholder="Provide detailed explanation with evidence, screenshots, or communication logs..."
                  rows={6}
                  className="bg-input/30"
                />
              </div>

              <div>
                <h3 className="mb-4 text-foreground">Evidence (Optional)</h3>
                <div className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-lg p-8 text-center">
                  <h3 className="mb-2 text-foreground">Upload Supporting Documents</h3>
                  <p className="text-muted-foreground mb-4">Screenshots, files, or other evidence</p>
                  <Button variant="outline">Choose Files</Button>
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                <h3 className="mb-2 text-foreground">How Disputes Work</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• A jury of 5 verified community members will be selected randomly</p>
                  <p>• Both parties present their case with evidence</p>
                  <p>• Jury members vote on the outcome</p>
                  <p>• Majority decision wins (3+ votes needed)</p>
                  <p>• Escrow funds distributed according to jury decision</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setDisputeStep('pending')} className="flex-1 bg-gradient-to-r from-destructive to-destructive/80 hover:opacity-90">
                  File Dispute
                </Button>
                <Button variant="outline" onClick={onBack}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Pending State */}
          {disputeStep === 'pending' && (
            <div className="space-y-6">
              <div className="bg-primary/20 border border-primary/40 rounded-lg p-6 text-center">
                <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="mb-2 text-foreground">Dispute Filed Successfully</h3>
                <p className="text-muted-foreground">
                  Selecting jury members from verified community pool...
                </p>
                <div className="mt-4">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-foreground">Your Submission</h3>
                <div className="border border-primary/20 bg-primary/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3 gap-4 flex-wrap">
                    <h3 className="text-foreground">Work not delivered as described</h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30">Filed</Badge>
                  </div>
                  <p className="text-muted-foreground">
                    The delivered dashboard is missing several key features that were specified in the job requirements, 
                    including the analytics section and the user management panel...
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-foreground">Escrow Status</h3>
                <div className="border border-secondary/20 bg-secondary/5 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Locked Amount:</span>
                    <span className="text-primary">{job.budget} ADA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant="secondary">Frozen - Dispute Active</Badge>
                  </div>
                </div>
              </div>

              <Button onClick={() => setDisputeStep('voting')} className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                View Jury Selection (Demo)
              </Button>
            </div>
          )}

          {/* Voting State */}
          {disputeStep === 'voting' && (
            <div className="space-y-6">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-6 h-6 text-primary" />
                  <h3 className="text-foreground">Jury Voting in Progress</h3>
                </div>
                <p className="text-muted-foreground">
                  5 jury members have been selected and are reviewing the case
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-foreground">Dispute Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border border-primary/20 bg-primary/5 rounded-lg p-4">
                    <p className="text-muted-foreground mb-1">Employer</p>
                    <p className="font-mono text-foreground">{job.employer.slice(0, 15)}...</p>
                  </div>
                  <div className="border border-secondary/20 bg-secondary/5 rounded-lg p-4">
                    <p className="text-muted-foreground mb-1">Freelancer</p>
                    <p className="font-mono text-foreground">{job.freelancer?.slice(0, 15)}...</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-foreground">Jury Votes</h3>
                <div className="space-y-3">
                  {juryVotes.map((vote) => (
                    <div key={vote.id} className="border border-primary/20 bg-primary/5 rounded-lg p-4">
                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-full" />
                          <div>
                            <p className="font-mono text-foreground">{vote.juror}</p>
                            <p className="text-muted-foreground">⭐ {vote.reputation} reputation</p>
                          </div>
                        </div>
                        <div>
                          {vote.vote === null ? (
                            <Badge variant="outline">Pending</Badge>
                          ) : vote.vote === 'employer' ? (
                            <Badge variant="secondary">Voted: Employer</Badge>
                          ) : (
                            <Badge className="bg-primary/20 text-primary border-primary/30">Voted: Freelancer</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                <h3 className="mb-3 text-foreground">Current Tally</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Votes for Employer:</span>
                    <span className="text-foreground">1 vote</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Votes for Freelancer:</span>
                    <span className="text-foreground">2 votes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pending:</span>
                    <span className="text-foreground">2 votes</span>
                  </div>
                  <Separator className="my-2" />
                  <p className="text-muted-foreground">3 votes needed for majority decision</p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-muted-foreground">
                  You will be notified when all jury members have voted. The majority decision will be final and the escrow 
                  will be distributed accordingly.
                </p>
              </div>

              <Button variant="outline" onClick={onBack} className="w-full">
                Back to Job
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}