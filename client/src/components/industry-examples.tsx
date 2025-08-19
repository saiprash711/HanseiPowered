import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Cpu, Palette, FlaskConical } from "lucide-react";

export function IndustryExamples() {
  const industries = [
    {
      name: "Electronics OEM",
      icon: Cpu,
      color: "blue",
      description: "Specialized solutions for component lifecycle management, technology obsolescence, and multi-client production optimization.",
      features: [
        "Component Lifecycle Management",
        "Technology Obsolescence Alerts",
        "Quality Gate Performance"
      ],
      metric: {
        value: "40% → 85%",
        label: "Average Capacity Improvement"
      },
      bgColor: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      metricColor: "text-blue-600"
    },
    {
      name: "Paint & Chemicals",
      icon: Palette,
      color: "green",
      description: "Weather-integrated demand forecasting, color mixing optimization, and seasonal inventory management.",
      features: [
        "Seasonal Demand Prediction",
        "Color Mixing Optimization",
        "Weather API Integration"
      ],
      metric: {
        value: "45%",
        label: "Inventory Waste Reduction"
      },
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      metricColor: "text-green-600"
    },
    {
      name: "Pharmaceutical CMO",
      icon: FlaskConical,
      color: "purple",
      description: "Regulatory compliance tracking, technology transfer acceleration, and multi-client capacity optimization.",
      features: [
        "Regulatory Compliance Dashboard",
        "Tech Transfer Acceleration",
        "Multi-Client Balancing"
      ],
      metric: {
        value: "6 → 2 months",
        label: "Tech Transfer Timeline"
      },
      bgColor: "from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      metricColor: "text-purple-600"
    }
  ];

  return (
    <section id="industries" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Industry-Specific Solutions
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our AI adapts to different industries with specialized optimization algorithms and dashboards
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <Card 
                key={index} 
                className={`bg-gradient-to-br ${industry.bgColor} ${industry.borderColor} hover:shadow-lg transition-shadow`}
              >
                <CardContent className="p-8">
                  <div className={`w-12 h-12 ${industry.iconBg} rounded-lg flex items-center justify-center mb-6`}>
                    <IconComponent className={`w-6 h-6 ${industry.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4" data-testid={`text-industry-${index}`}>
                    {industry.name}
                  </h3>
                  
                  <p className="text-neutral-600 mb-6">{industry.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {industry.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm">
                        <CheckCircle className={`w-4 h-4 ${industry.iconColor} mr-2`} />
                        <span data-testid={`text-feature-${index}-${featureIndex}`}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Card className={`bg-white ${industry.borderColor}`}>
                    <CardContent className="p-4">
                      <div className={`text-2xl font-bold ${industry.metricColor} mb-1`} data-testid={`text-metric-${index}`}>
                        {industry.metric.value}
                      </div>
                      <div className="text-sm text-neutral-600">{industry.metric.label}</div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
