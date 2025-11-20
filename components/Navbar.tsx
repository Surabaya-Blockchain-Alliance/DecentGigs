// Global CSS and Tailwind used
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  isConnected: boolean;
  walletName: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function Navbar({ isConnected, walletName, onConnect, onDisconnect }: NavbarProps) {
  return (
    <nav className="navbar w-full flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="logo text-2xl font-bold text-blue-600 dark:text-white">Decentralize-Market-Place</div>
      <ul className="navLinks flex items-center gap-6">
        <li><a href="#features" className="hover:text-blue-500 transition-colors">Features</a></li>
        <li><a href="#how" className="hover:text-blue-500 transition-colors">How It Works</a></li>
        <li><a href="#contact" className="hover:text-blue-500 transition-colors">Contact</a></li>
        <li>
          {!isConnected ? (
            <button className="navButton button-primary" onClick={onConnect}>
              Connect Wallet
            </button>
          ) : (
            <button className="navButton button-primary" onClick={onDisconnect}>
              Disconnect
            </button>
          )}
        </li>
        <li>
          <ThemeSwitcher />
        </li>
      </ul>
      {isConnected && walletName && (
        <div className="walletInfo bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-lg ml-4">
          <span>Connected: {walletName}</span>
        </div>
      )}
    </nav>
  );
}
