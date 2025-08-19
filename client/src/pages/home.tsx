import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ProblemInput } from "@/components/problem-input";
import { SolutionShowcase } from "@/components/solution-showcase";
import { IndustryExamples } from "@/components/industry-examples";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ProblemInput />
      <SolutionShowcase />
      <IndustryExamples />
      <PricingSection />
      
      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-secondary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Manufacturing?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join the manufacturing revolution. Generate your first custom DSB solution in the next 30 minutes and see the difference AI-powered optimization can make.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg"
              className="px-8 py-4 bg-white text-primary hover:bg-neutral-50 text-lg shadow-lg"
              data-testid="button-cta-trial"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="px-8 py-4 border-2 border-white text-white hover:bg-white/10 text-lg"
              data-testid="button-cta-demo"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-sm opacity-90">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              30-day money-back guarantee
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Setup in under 24 hours
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
