import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Clock, CheckCircle, Zap, TrendingUp, Shield } from "lucide-react";

export function SolutionShowcase() {
  const [activeTab, setActiveTab] = useState("pharma");

  const solutionExamples = {
    pharma: {
      title: "Pharmaceutical CMO Optimization Solution",
      subtitle: "Generated in 27 seconds • Industry: Pharmaceutical Contract Manufacturing",
      revenue: "₹150 Cr",
      metrics: {
        capacityImprovement: "40% → 85%",
        additionalRevenue: "₹32 Cr",
        costReduction: "₹8 Cr",
        roi: "480%"
      },
      dashboardComponents: [
        { name: "Multi-Client Capacity View", description: "Real-time capacity allocation across clients", icon: BarChart3, color: "primary" },
        { name: "Tech Transfer Accelerator", description: "Automated timeline optimization", icon: Clock, color: "secondary" },
        { name: "Compliance Dashboard", description: "Regulatory tracking and alerts", icon: Shield, color: "accent" },
        { name: "Production Balancer", description: "Dynamic resource allocation", icon: Zap, color: "primary" },
        { name: "Quality Gate Tracker", description: "Quality metrics monitoring", icon: CheckCircle, color: "secondary" },
        { name: "Risk Assessment Matrix", description: "Supplier and operational risks", icon: TrendingUp, color: "accent" }
      ],
      roadmap: [
        { phase: "Week 1-2: System Integration & Data Setup", description: "Configure APIs, import historical data, establish baselines", step: 1 },
        { phase: "Week 3-6: Algorithm Calibration & Testing", description: "Fine-tune algorithms, validate predictions, pilot testing", step: 2 },
        { phase: "Week 7-10: Team Training & Go-Live", description: "User training, full deployment, initial optimization", step: 3 },
        { phase: "Ongoing: Continuous Optimization", description: "AI learning, performance enhancement, new optimizations", step: "∞" }
      ]
    }
  };

  const currentSolution = solutionExamples[activeTab as keyof typeof solutionExamples];

  const dashboardMetrics = [
    { label: "Capacity Utilization", value: "67%", change: "+27% this month", icon: TrendingUp, color: "secondary" },
    { label: "Revenue Impact", value: "₹18.2 Cr", change: "YTD additional", icon: BarChart3, color: "primary" },
    { label: "Cost Savings", value: "₹4.7 Cr", change: "Operational savings", icon: CheckCircle, color: "accent" },
    { label: "Efficiency Score", value: "94/100", change: "Outstanding", icon: Zap, color: "purple" }
  ];

  return (
    <section id="solutions" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            AI-Generated Solutions & Dashboards
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Watch as our AI creates comprehensive solutions tailored to your industry and challenges
          </p>
        </div>

        {/* Solution Output Example */}
        <Card className="shadow-lg border-neutral-200 overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2" data-testid="text-solution-title">
                  {currentSolution.title}
                </h3>
                <p className="opacity-90">{currentSolution.subtitle}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold" data-testid="text-solution-revenue">
                  {currentSolution.revenue}
                </div>
                <div className="text-sm opacity-90">Annual Revenue</div>
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {Object.entries(currentSolution.metrics).map(([key, value], index) => (
                <div key={key} className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1" data-testid={`text-metric-${key}`}>
                    {value}
                  </div>
                  <div className="text-sm text-neutral-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                </div>
              ))}
            </div>

            {/* Generated Dashboard Components */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-neutral-900 mb-4">Generated Dashboard Components:</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentSolution.dashboardComponents.map((component, index) => {
                  const IconComponent = component.icon;
                  return (
                    <Card key={index} className="bg-neutral-50 border-neutral-200">
                      <CardContent className="p-4">
                        <div className="flex items-center mb-2">
                          <div className={`w-8 h-8 bg-${component.color}/10 rounded-lg flex items-center justify-center mr-3`}>
                            <IconComponent className={`w-4 h-4 text-${component.color}`} />
                          </div>
                          <span className="font-medium text-neutral-900" data-testid={`text-component-${index}`}>
                            {component.name}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600">{component.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Implementation Roadmap */}
            <div className="mb-8">
              <h4 className="text-xl font-bold text-neutral-900 mb-4">Implementation Roadmap:</h4>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-neutral-300"></div>
                
                <div className="space-y-6">
                  {currentSolution.roadmap.map((phase, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 relative z-10 ${
                        index === 0 ? 'bg-primary' : 
                        index === 1 ? 'bg-secondary' : 
                        index === 2 ? 'bg-accent' : 'bg-primary'
                      }`}>
                        {phase.step}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-neutral-900" data-testid={`text-roadmap-${index}`}>
                          {phase.phase}
                        </h5>
                        <p className="text-sm text-neutral-600">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="flex-1 bg-primary text-white hover:bg-primary/90"
                data-testid="button-download-solution"
              >
                Download Complete Solution
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-primary text-primary hover:bg-primary/10"
                data-testid="button-schedule-call"
              >
                Schedule Implementation Call
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Dashboard Preview */}
        <Card className="shadow-lg border-neutral-200 overflow-hidden">
          <div className="bg-neutral-900 p-6 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Live Dashboard Preview</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-sm">Real-time Updates</span>
              </div>
            </div>
          </div>

          <CardContent className="p-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {dashboardMetrics.map((metric, index) => {
                const IconComponent = metric.icon;
                return (
                  <Card key={index} className={`bg-gradient-to-br from-${metric.color}/10 to-${metric.color}/5 border-${metric.color}/20`}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-neutral-700">{metric.label}</span>
                        <IconComponent className={`w-4 h-4 text-${metric.color}`} />
                      </div>
                      <div className="text-2xl font-bold text-neutral-900" data-testid={`text-dashboard-${index}`}>
                        {metric.value}
                      </div>
                      <div className={`text-sm text-${metric.color}`}>{metric.change}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Chart Placeholder */}
            <Card className="bg-neutral-50 border-neutral-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-neutral-900">Capacity Utilization Trend</h4>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                      <span className="text-sm text-neutral-600">Actual</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-secondary rounded-full mr-2"></div>
                      <span className="text-sm text-neutral-600">Optimized</span>
                    </div>
                  </div>
                </div>
                {/* Simulated Chart */}
                <div 
                  className="h-64 bg-white rounded border border-neutral-200 flex items-end justify-between p-4"
                  style={{
                    backgroundImage: "linear-gradient(to top, #f1f5f9 0%, #f1f5f9 40%, transparent 40%, transparent 60%, #e2e8f0 60%, #e2e8f0 100%)"
                  }}
                  data-testid="chart-capacity-trend"
                >
                  <div className="flex items-end space-x-2 w-full">
                    {[60, 65, 70, 75, 80, 85, 87, 89, 91, 93].map((height, index) => (
                      <div 
                        key={index}
                        className={`rounded-t ${index < 5 ? 'bg-primary/40' : 'bg-secondary/80'}`}
                        style={{ height: `${height}%`, width: '8%' }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
