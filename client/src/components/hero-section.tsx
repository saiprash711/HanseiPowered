import { Button } from "@/components/ui/button";
import { Zap, Sparkles, ArrowRight, Play, TrendingUp, Clock, Users } from "lucide-react";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-40"></div>
      <div className="absolute inset-0 bg-pattern-dots opacity-30"></div>
      
      {/* Floating Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-secondary/15 to-accent/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className={`inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-primary/20 text-primary rounded-full text-sm font-semibold mb-8 shadow-lg hover-lift ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}`}>
            <Sparkles className="w-4 h-4 mr-2 animate-pulse-glow" />
            Revolutionary AI-Powered Manufacturing Optimization
            <div className="w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse"></div>
          </div>
          
          {/* Main Headline */}
          <h1 className={`text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <span className="text-gray-900 font-display">Generate Custom</span>
            <br />
            <span className="text-gradient-primary font-display animate-gradient-shift">DSB Solutions</span>
            <br />
            <span className="text-gray-700 font-display">in Minutes</span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            Transform manufacturing optimization from a 30-day consulting process into an 
            <span className="text-primary font-semibold"> instant, intelligent solution </span>
            with real-time dashboards and continuous AI-powered optimization.
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <button 
              className="btn-primary group text-lg px-8 py-4 rounded-2xl"
              onClick={() => scrollToSection('platform')}
              data-testid="button-try-free"
            >
              <span className="flex items-center">
                Try DSB GENIUS Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
            <button 
              className="btn-secondary group text-lg px-8 py-4 rounded-2xl"
              data-testid="button-watch-demo"
            >
              <span className="flex items-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </span>
            </button>
          </div>
          
          {/* Stats Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <div className="card-modern hover-glow group">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-accent to-yellow-400 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-accent mb-2" data-testid="text-time-30min">30 Minutes</div>
                <div className="text-gray-600 font-medium">AI-Generated Solution</div>
                <div className="text-sm text-gray-500 mt-1">vs 30 days traditional</div>
              </div>
            </div>
            
            <div className="card-modern hover-glow group" style={{ animationDelay: '0.9s' }}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-secondary to-pink-400 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-secondary mb-2" data-testid="text-roi-480">480% ROI</div>
                <div className="text-gray-600 font-medium">Average First Year</div>
                <div className="text-sm text-gray-500 mt-1">Proven results</div>
              </div>
            </div>
            
            <div className="card-modern hover-glow group" style={{ animationDelay: '1s' }}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-blue-400 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2" data-testid="text-cases-1000">1000+</div>
                <div className="text-gray-600 font-medium">DSB Case Studies</div>
                <div className="text-sm text-gray-500 mt-1">Industry validated</div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className={`mt-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
            <p className="text-sm text-gray-500 mb-6">Trusted by leading manufacturers worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {/* Placeholder for company logos */}
              <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-28 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 w-30 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
