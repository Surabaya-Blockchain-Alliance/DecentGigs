export default function Footer() {
  return (
    <footer className="footer w-full py-6 bg-gray-100 dark:bg-gray-900 text-center">
      <div className="footerContent flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto px-4 text-gray-600 dark:text-gray-300">
        <span>&copy; {new Date().getFullYear()} Decentralize-Market-Place. All rights reserved.</span>
        <span>Built for Catalyst Fund 15 | Real World Adoption</span>
      </div>
    </footer>
  );
}
