import Logo from '@/components/common/Logo';
import Navigation from './Navigation';
import Button from '@/components/ui/Button';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <div className="flex items-center space-x-4">
            <Navigation />
            <Button 
              variant="primary" 
              size="sm"
              className="hidden sm:inline-flex"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
