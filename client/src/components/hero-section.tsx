import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            Revolutionary AI-Powered Manufacturing Optimization
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Generate Custom 
            <span className="text-primary"> DSB Solutions</span> 
            in 30 Minutes
          </h1>
          
          <p className="text-xl text-neutral-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            The world's first AI-powered platform that transforms manufacturing optimization from a 30-day consulting process into an instant, intelligent solution with real-time dashboards and continuous optimization.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-4 bg-primary text-white hover:bg-primary/90 text-lg shadow-lg"
              onClick={() => scrollToSection('platform')}
              data-testid="button-try-free"
            >
              Try DSB GENIUS Free
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg"
              data-testid="button-watch-demo"
            >
              Watch Demo
            </Button>
          </div>
          
          {/* Speed Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <div className="text-3xl font-bold text-accent mb-2" data-testid="text-time-30min">30 Minutes</div>
              <div className="text-sm text-neutral-600">AI-Generated Solution</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <div className="text-3xl font-bold text-secondary mb-2" data-testid="text-roi-480">480% ROI</div>
              <div className="text-sm text-neutral-600">Average First Year</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
              <div className="text-3xl font-bold text-primary mb-2" data-testid="text-cases-1000">1000+</div>
              <div className="text-sm text-neutral-600">DSB Case Studies</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
