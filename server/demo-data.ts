// Demo data for testing the platform when OpenAI API is not available
export const demoAnalysisResult = {
  problemCategories: [
    "capacity optimization",
    "technology transfer acceleration", 
    "regulatory compliance",
    "multi-client resource balancing"
  ],
  rootCauses: [
    "Inefficient production scheduling across facilities",
    "Manual technology transfer processes causing delays", 
    "Lack of integrated compliance monitoring system",
    "No dynamic capacity allocation between clients"
  ],
  severity: "high" as const,
  industryPatterns: [
    "CMO capacity utilization typically 65-85% for optimal profitability",
    "Technology transfer times industry average: 3-4 months",
    "FDA compliance requires continuous monitoring systems", 
    "Peak season demand spikes require flexible capacity allocation"
  ],
  urgency: 8,
  keyIssues: [
    {
      issue: "Low capacity utilization (40%) significantly below industry standards",
      impact: "high" as const,
      priority: 9
    },
    {
      issue: "6-month technology transfer times double industry average", 
      impact: "high" as const,
      priority: 8
    },
    {
      issue: "Regulatory compliance gaps creating audit risks",
      impact: "medium" as const, 
      priority: 7
    },
    {
      issue: "Manual client production balancing during peak seasons",
      impact: "medium" as const,
      priority: 6
    }
  ]
};

export const demoDSBSolution = {
  solutionType: "Pharmaceutical CMO Optimization Solution",
  industrySpecific: true,
  customAlgorithms: [
    {
      name: "Multi-Client Capacity Optimizer",
      description: "Dynamic allocation algorithm balancing production schedules across clients based on priority, deadlines, and capacity constraints",
      implementation: "Real-time scheduling engine with constraint satisfaction optimization and predictive analytics for demand forecasting"
    },
    {
      name: "Technology Transfer Accelerator", 
      description: "Automated workflow system reducing transfer times through parallel processing and risk-based validation",
      implementation: "Digital twin technology with automated documentation, parallel validation streams, and AI-powered risk assessment"
    },
    {
      name: "Regulatory Compliance Monitor",
      description: "Continuous compliance tracking with predictive alerts for potential audit issues",
      implementation: "Integration with quality systems, automated document management, and ML-based anomaly detection for compliance deviations"
    }
  ],
  dashboardComponents: [
    {
      name: "Multi-Client Capacity View", 
      description: "Real-time visualization of capacity allocation across all clients with optimization recommendations",
      type: "optimization" as const,
      realTimeCapable: true
    },
    {
      name: "Technology Transfer Pipeline",
      description: "Progress tracking for all ongoing transfers with bottleneck identification and timeline predictions", 
      type: "chart" as const,
      realTimeCapable: true
    },
    {
      name: "Compliance Risk Dashboard",
      description: "Regulatory compliance scoring with predictive alerts for potential issues",
      type: "alert" as const, 
      realTimeCapable: true
    },
    {
      name: "Production Efficiency Metrics",
      description: "KPI tracking for utilization, throughput, quality, and client satisfaction scores",
      type: "metric" as const,
      realTimeCapable: true
    },
    {
      name: "Financial Impact Tracker", 
      description: "ROI monitoring showing revenue impact, cost savings, and profitability improvements",
      type: "chart" as const,
      realTimeCapable: false
    }
  ],
  implementationRoadmap: [
    {
      phase: "Foundation Setup (Weeks 1-3)",
      timeline: "3 weeks",
      activities: [
        "Install capacity monitoring sensors and data collection systems",
        "Integrate existing ERP and quality management systems", 
        "Establish baseline metrics and historical data analysis",
        "Set up development and testing environments"
      ],
      deliverables: [
        "Complete system integration architecture",
        "Baseline capacity utilization report",
        "Data quality assessment and cleansing plan"
      ]
    },
    {
      phase: "Core Algorithm Deployment (Weeks 4-8)", 
      timeline: "5 weeks",
      activities: [
        "Deploy multi-client capacity optimization algorithms",
        "Implement technology transfer acceleration workflows",
        "Configure regulatory compliance monitoring systems",
        "Begin pilot testing with select production lines"
      ],
      deliverables: [
        "Functioning capacity optimization system",
        "Automated technology transfer workflows", 
        "Compliance monitoring dashboard",
        "Pilot performance results and optimization plan"
      ]
    },
    {
      phase: "Full Deployment & Optimization (Weeks 9-12)",
      timeline: "4 weeks", 
      activities: [
        "Scale algorithms across all facilities and clients",
        "Fine-tune optimization parameters based on pilot results",
        "Train operations teams on new dashboards and processes",
        "Implement continuous improvement feedback loops"
      ],
      deliverables: [
        "Fully operational DSB optimization system",
        "Trained operations team",
        "Performance benchmarking report",
        "Continuous improvement framework"
      ]
    },
    {
      phase: "Continuous Intelligence (Ongoing)",
      timeline: "Ongoing",
      activities: [
        "Monitor performance metrics and optimization opportunities",
        "Implement machine learning improvements based on operational data", 
        "Expand optimization algorithms to new production areas",
        "Regular system updates and capability enhancements"
      ],
      deliverables: [
        "Monthly performance optimization reports",
        "Quarterly system enhancement updates", 
        "Annual strategic optimization roadmap"
      ]
    }
  ],
  roiProjections: {
    capacityImprovement: "40% → 78%", 
    additionalRevenue: "₹42 Cr annually",
    costReduction: "₹12 Cr annually", 
    firstYearROI: "485%",
    implementationCost: "₹8.5 Lakhs"
  },
  expectedResults: {
    shortTerm: [
      "25% improvement in capacity utilization within 6 months",
      "Technology transfer time reduction from 6 to 3.5 months",
      "90% reduction in compliance-related audit findings", 
      "35% improvement in multi-client scheduling efficiency"
    ],
    longTerm: [
      "Sustained 78% capacity utilization across both facilities",
      "Technology transfer times consistently under 3 months",
      "Zero critical compliance violations in FDA audits",
      "50% increase in client satisfaction scores"
    ],
    metrics: [
      {
        metric: "Capacity Utilization", 
        currentValue: "40%",
        targetValue: "78%",
        timeframe: "12 months"
      },
      {
        metric: "Technology Transfer Time",
        currentValue: "6 months", 
        targetValue: "3 months",
        timeframe: "6 months"
      },
      {
        metric: "Additional Annual Revenue",
        currentValue: "₹150 Cr",
        targetValue: "₹192 Cr", 
        timeframe: "18 months"
      },
      {
        metric: "Operational Cost Reduction", 
        currentValue: "Baseline",
        targetValue: "₹12 Cr savings",
        timeframe: "12 months"
      }
    ]
  }
};