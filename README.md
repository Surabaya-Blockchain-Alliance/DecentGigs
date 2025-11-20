# Decentralize Market Place  
**Fully On-Chain Freelance & Jobs Marketplace on Cardano**  
Catalyst Fund 15 Proposal – Real World Adoption Challenge  

> The first 100% on-chain freelance platform where jobs, bids, reputation, identity, escrow, and payments live forever on Cardano.powered by Aiken + Atala PRISM.

[![Cardano](https://img.shields.io/badge/Powered_by-Cardano-0033AD?style=flat&logo=cardano)](https://cardano.org)
[![Atala PRISM](https://img.shields.io/badge/Atala_PRISM-DID-blue)](https://atalaprism.io)
[![Aiken](https://img.shields.io/badge/Smart_Contracts-Aiken-FF6D00)](https://aiken-lang.org)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-000000?logo=next.js)](https://nextjs.org)

## Problems We Solve
- 90%+ of the world’s 1.57 billion freelancers have never touched blockchain  
- Centralized platforms take 10–20% fees and own your data  
- Fake reviews, identity fraud, and chargeback scams are rampant  
- Cross-border payments cost 6–12% and take days  
- Reputation cannot be ported between platforms  

## Solution – 100% On-Chain Freelance Marketplace
Everything that matters lives on Cardano. No databases, no admins, no custody.

### Core Features (All On-Chain)
| Feature                      | Description                                                                 | On-Chain |
|------------------------------|-----------------------------------------------------------------------------|----------|
| Job Posting & Bidding        | Post jobs, receive bids with proposals                                      | Yes      |
| Atala PRISM DID + Selective KYC | Verifiable Credentials for identity & skills                           | Yes      |
| Permanent Reputation System  | Score = (jobs completed × avg rating × timeliness) – immutable         | Yes      |
| Proof-of-Work Verification   | Deliverable hash submitted → employer verifies → auto-release          | Yes      |
| Milestone Escrow             | Funds locked in Aiken validator, released only on milestone approval   | Yes      |
| Dispute Resolution           | Community jury staking or appointed arbitrators                        | Yes      |
| Private Reviews              | Only winning bidder can review (zero-knowledge proof)                  | Yes      |

## Architecture & Tech Stack
```
Next.js 14 (App Router) + Tailwind + shadcn/ui
           ↓ (Wallet Connect)
Mesh.js / Lucid ←→ Cardano Wallet (Nami, Eternl, Typhon, etc.)
           ↓ (Transaction Building & Signing)
Blockfrost / Maestro / Carp (indexer)
           ↓
Aiken Smart Contracts on Cardano Mainnet
           ↓
Atala PRISM (DID + Verifiable Credentials)
IPFS (only file hashes stored on-chain)
```

**Full Tech Stack**
- Blockchain: Cardano Mainnet  
- Smart Contracts: Aiken (functional, safe, low-cost)  
- Frontend: Next.js 14, TypeScript, TailwindCSS, shadcn/ui  
- Wallet: Mesh.js + Lucid  
- Identity: Atala PRISM Pioneer Program  
- Storage: IPFS via web3.storage  
- Indexing: Blockfrost + custom Carp queries  
- Analytics: On-chain Dune-style dashboard (Next.js + Recharts)

## Smart Contracts (Aiken)
```
/contracts/
  escrow.aiken
  milestone.aiken
  reputation.aiken
  dispute.aiken
  proof_of_work.aiken
  governance.aiken   (future token)
```

## Public On-Chain Metrics Dashboard
https://dashboard.decentralize.market (live on mainnet launch)

| Metric                          | Source                  | Frequency  |
|---------------------------------|-------------------------|------------|
| Total Jobs Posted               | Job script datum        | Real-time  |
| Total Escrow Volume             | Escrow validator        | Real-time  |
| Verified DIDs                   | PRISM credential count  | Daily      |
| Average Completion Time         | Timestamp analysis      | Real-time  |
| Top Freelancers by Reputation   | Reputation validator    | Real-time  |
| Dispute Rate                    | Dispute validator           | Real-time  |

## User Flow (Text Wireframe)
```
1. Landing → Connect Wallet → Atala PRISM Login / Register
   → Optional KYC → Receive Verifiable Credential → DID created

2. Employer Dashboard
   → Create Job → Pay 2 ADA listing fee → Job appears instantly on-chain

3. Freelancer Dashboard
   → Browse Jobs → Submit Bid + Proposal + Amount

4. Job Page
   → Employer selects winner → Escrow contract created automatically
   → Funds locked in Aiken validator

5. Work Submission
   → Freelancer uploads deliverable → IPFS → hash submitted to contract

6. Release Flow
   → Employer clicks “Approve & Release” → funds + reputation auto-updated
   → Both parties leave review (ZK-protected)

7. Dispute (rare)
   → Either party opens dispute → jury votes → majority wins
```

## Business Model & Revenue
Low fees, high volume, fully decentralized.

| Revenue Stream               | Fee             | Projected 2028 Volume |
|------------------------------|-----------------|-----------------------|
| Transaction fee on escrow    | 1.5%            | $7.5M                 |
| Featured job listing         | 5 ADA (~$2.5)   | $500K                 |
| Jury staking rewards cut     | 10%             | $300K                 |
| Credential issuance          | 1 ADA           | $200K                 |
| **Total Annual Revenue**     |                 | **~$8.5M**            |

→ 70–80% gross margin (almost no operating cost after launch)

## Market Size & Competitive Research (2025)
| Platform         | Valuation / Market Cap (Nov 2025) | Annual GMV      | Fee % |
|------------------|----------------------------------|-----------------|-------|
| Upwork           | $2.14 billion                    | ~$4 billion     | 5–20% |
| Fiverr           | $800 million                     | ~$1 billion     | 20%   |
| Freelancer.com   | $77 million                      | ~$800 million   | 10%   |
| Socious (Cardano)| <$1 million (early)              | <$1 million     | 3–5%  |
| CryptoTask       | ~$2–3 million (est.)             | <$10 million    | 2–5%  |

**Total Addressable Market (TAM**: $7.65 billion platform revenue in 2025 → $16.5 billion by 2030 (16.7% CAGR))

Decentralized platforms can realistically capture 5–10% of TAM by 2030 = $800M–$1.6B opportunity.

## Valuation & Market Cap Projections
| Year | GMV          | Revenue      | Valuation Multiple | Projected Market Cap |
|------|--------------|--------------|--------------------|----------------------|
| 2026 | $10M         | $150K        | 30x revenue        | $5–8M                |
| 2027 | $100M        | $1.5M        | 40x revenue        | $50–80M              |
| 2028 | $500M        | $7.5M        | 60x revenue / 1x GMV | $300–500M+           |

## Funding Request – Catalyst Fund 15
**125,000 ADA** (~$65,000 at time of writing)

## Why This Project Must Be Funded
- Largest real-world use case still missing on Cardano  
- 100% on-chain (not hybrid) – true decentralization  
- First production-grade use of Aiken at scale  
- Atala PRISM integration – flagship showcase for decentralized identity  
- Mainnet launch within 12 months of funding  

## Links
- GitHub: https://github.com/decentralize-market-place  
