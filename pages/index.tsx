// pages/index.tsx
import { LandingPage } from '../components/LandingPage';

export default function Home() {
  return <LandingPage onConnect={() => alert('Wallet connect coming soon!')} />;
}