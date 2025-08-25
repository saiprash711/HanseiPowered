import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles, Zap, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = () => (
    <>
      <a 
        href="#platform" 
        className="relative text-gray-600 hover:text-primary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-primary/5 group"
        data-testid="nav-platform"
      >
        Platform
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></div>
      </a>
      <a 
        href="#solutions" 
        className="relative text-gray-600 hover:text-primary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-primary/5 group"
        data-testid="nav-solutions"
      >
        Solutions
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></div>
      </a>
      <a 
        href="#industries" 
        className="relative text-gray-600 hover:text-primary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-primary/5 group"
        data-testid="nav-industries"
      >
        Industries
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></div>
      </a>
      <a 
        href="#pricing" 
        className="relative text-gray-600 hover:text-primary transition-all duration-300 font-medium py-2 px-3 rounded-lg hover:bg-primary/5 group"
        data-testid="nav-pricing"
      >
        Pricing
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></div>
      </a>
    </>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200/50 shadow-lg' 
        : 'bg-white/80 backdrop-blur-sm border-b border-gray-200/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-3 group" data-testid="logo-link">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Zap className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div className="transition-transform duration-300 group-hover:translate-x-1">
              <span className="text-2xl font-bold text-gray-900 font-display">DSB GENIUS</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500 font-medium">Powered by</span>
                <span className="text-xs font-semibold text-gradient-primary">Hansei Intelligence</span>
                <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks />
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/dashboard">
              <Button 
                variant="ghost" 
                className="text-primary hover:bg-primary/10 font-semibold transition-all duration-300 hover:scale-105"
                data-testid="button-signin"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button 
                className="btn-primary font-semibold shadow-lg"
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative w-12 h-12 rounded-xl hover:bg-primary/10 transition-all duration-300"
                  data-testid="button-mobile-menu"
                >
                  <Menu className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[320px] bg-white/95 backdrop-blur-lg border-l border-gray-200"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between py-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-900">DSB GENIUS</span>
                        <p className="text-xs text-gray-500">Hansei Intelligence</p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-2 py-8">
                    <a 
                      href="#platform" 
                      className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 group"
                      onClick={() => setIsOpen(false)}
                      data-testid="nav-platform"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300">
                        <span className="text-sm font-semibold text-primary">P</span>
                      </div>
                      <span className="font-medium">Platform</span>
                    </a>
                    <a 
                      href="#solutions" 
                      className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 group"
                      onClick={() => setIsOpen(false)}
                      data-testid="nav-solutions"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-100 to-purple-200 rounded-lg flex items-center justify-center group-hover:from-secondary/20 group-hover:to-secondary/30 transition-all duration-300">
                        <span className="text-sm font-semibold text-secondary">S</span>
                      </div>
                      <span className="font-medium">Solutions</span>
                    </a>
                    <a 
                      href="#industries" 
                      className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 group"
                      onClick={() => setIsOpen(false)}
                      data-testid="nav-industries"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center group-hover:from-accent/20 group-hover:to-accent/30 transition-all duration-300">
                        <span className="text-sm font-semibold text-accent">I</span>
                      </div>
                      <span className="font-medium">Industries</span>
                    </a>
                    <a 
                      href="#pricing" 
                      className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 group"
                      onClick={() => setIsOpen(false)}
                      data-testid="nav-pricing"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center group-hover:from-green-500/20 group-hover:to-green-600/30 transition-all duration-300">
                        <span className="text-sm font-semibold text-green-600">$</span>
                      </div>
                      <span className="font-medium">Pricing</span>
                    </a>
                  </div>

                  {/* Mobile CTA */}
                  <div className="mt-auto pb-8 space-y-4">
                    <Link href="/dashboard">
                      <Button 
                        variant="outline" 
                        className="w-full h-12 font-semibold"
                        onClick={() => setIsOpen(false)}
                        data-testid="button-mobile-signin"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button 
                        className="btn-primary w-full h-12 font-semibold shadow-lg"
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
