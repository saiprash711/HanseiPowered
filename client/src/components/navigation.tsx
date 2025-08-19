import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const NavLinks = () => (
    <>
      <a 
        href="#platform" 
        className="text-neutral-600 hover:text-primary transition-colors"
        data-testid="nav-platform"
      >
        Platform
      </a>
      <a 
        href="#solutions" 
        className="text-neutral-600 hover:text-primary transition-colors"
        data-testid="nav-solutions"
      >
        Solutions
      </a>
      <a 
        href="#industries" 
        className="text-neutral-600 hover:text-primary transition-colors"
        data-testid="nav-industries"
      >
        Industries
      </a>
      <a 
        href="#pricing" 
        className="text-neutral-600 hover:text-primary transition-colors"
        data-testid="nav-pricing"
      >
        Pricing
      </a>
    </>
  );

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2" data-testid="logo-link">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <div>
                <span className="text-xl font-bold text-neutral-900">DSB GENIUS</span>
                <span className="text-xs text-neutral-500 block -mt-1">Powered by Hansei Intelligence</span>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div>
          
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                className="text-primary hover:bg-primary/10"
                data-testid="button-signin"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                className="bg-primary text-white hover:bg-primary/90"
                data-testid="button-trial"
              >
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  <div className="flex flex-col space-y-4">
                    <NavLinks />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Link href="/dashboard">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setIsOpen(false)}
                        data-testid="button-mobile-signin"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button 
                        className="w-full bg-primary text-white hover:bg-primary/90"
                        onClick={() => setIsOpen(false)}
                        data-testid="button-mobile-trial"
                      >
                        Start Free Trial
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
