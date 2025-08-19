import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "BASIC",
      price: "₹2 Lakhs",
      period: "per year",
      description: "Perfect for small manufacturers getting started",
      features: [
        "Basic DSB solution generation",
        "Standard dashboards",
        "Email support",
        "5 solution generations/month"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      testId: "basic"
    },
    {
      name: "PROFESSIONAL",
      price: "₹8 Lakhs",
      period: "per year",
      description: "Most popular for growing businesses",
      popular: true,
      features: [
        "Advanced AI-powered solutions",
        "Custom industry dashboards",
        "Priority phone support",
        "Unlimited generations",
        "API access"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      testId: "professional"
    },
    {
      name: "ENTERPRISE",
      price: "₹25+ Lakhs",
      period: "per year",
      description: "Full-scale enterprise implementation",
      features: [
        "Full consulting integration",
        "Dedicated account manager",
        "Custom AI model training",
        "On-site implementation"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "default" as const,
      testId: "enterprise"
    }
  ];

  const guaranteeMetrics = [
    { value: "480%", label: "Average ROI" },
    { value: "₹32 Cr", label: "Average Revenue Impact" },
    { value: "30 minutes", label: "Solution Generation" }
  ];

  return (
    <section id="pricing" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Revolutionary cost structure that scales with your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative hover:shadow-lg transition-shadow ${
                plan.popular 
                  ? 'bg-primary text-white border-2 border-primary' 
                  : 'bg-white border border-neutral-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <Badge className="bg-secondary text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-neutral-900'}`}>
                    {plan.name}
                  </h3>
                  <div className={`text-4xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-neutral-900'}`} data-testid={`text-price-${plan.testId}`}>
                    {plan.price}
                  </div>
                  <div className={plan.popular ? 'opacity-90' : 'text-neutral-600'}>
                    {plan.period}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className={`w-5 h-5 mr-3 ${plan.popular ? 'text-secondary' : 'text-secondary'}`} />
                      <span className={plan.popular ? 'text-white' : 'text-neutral-700'} data-testid={`text-feature-${plan.testId}-${featureIndex}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.popular ? "secondary" : plan.buttonVariant}
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-white text-primary hover:bg-neutral-50' 
                      : plan.buttonVariant === 'outline' 
                        ? 'border-primary text-primary hover:bg-primary/10'
                        : 'bg-accent text-white hover:bg-accent/90'
                  }`}
                  data-testid={`button-plan-${plan.testId}`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ROI Guarantee */}
        <Card className="bg-gradient-to-r from-secondary/10 to-primary/10 border-secondary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">ROI Guarantee</h3>
            <p className="text-lg text-neutral-700 mb-6">
              We guarantee a minimum 300% ROI in the first year or your money back
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              {guaranteeMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold ${
                    index === 0 ? 'text-secondary' : 
                    index === 1 ? 'text-primary' : 'text-accent'
                  }`} data-testid={`text-guarantee-${index}`}>
                    {metric.value}
                  </div>
                  <div className="text-sm text-neutral-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
