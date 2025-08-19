import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "sk-default"
});

export interface ProblemAnalysisInput {
  problemDescription: string;
  industry: string;
  annualRevenue?: string;
  currentCapacity?: number;
  facilities?: number;
}

export interface AnalysisResult {
  problemCategories: string[];
  rootCauses: string[];
  severity: "low" | "medium" | "high" | "critical";
  industryPatterns: string[];
  urgency: number; // 1-10
  keyIssues: Array<{
    issue: string;
    impact: "low" | "medium" | "high";
    priority: number;
  }>;
}

export interface DSBSolution {
  solutionType: string;
  industrySpecific: boolean;
  customAlgorithms: Array<{
    name: string;
    description: string;
    implementation: string;
  }>;
  dashboardComponents: Array<{
    name: string;
    description: string;
    type: "chart" | "metric" | "alert" | "optimization";
    realTimeCapable: boolean;
  }>;
  implementationRoadmap: Array<{
    phase: string;
    timeline: string;
    activities: string[];
    deliverables: string[];
  }>;
  roiProjections: {
    capacityImprovement: string;
    additionalRevenue: string;
    costReduction: string;
    firstYearROI: string;
    implementationCost: string;
  };
  expectedResults: {
    shortTerm: string[];
    longTerm: string[];
    metrics: Array<{
      metric: string;
      currentValue: string;
      targetValue: string;
      timeframe: string;
    }>;
  };
}

export async function analyzeProblem(input: ProblemAnalysisInput): Promise<AnalysisResult> {
  try {
    const prompt = `You are an expert manufacturing optimization consultant with deep knowledge of DSB (Dynamic Strategic Balancing) methodology. Analyze the following manufacturing problem and provide a comprehensive analysis.

Problem Details:
- Description: ${input.problemDescription}
- Industry: ${input.industry}
- Annual Revenue: ${input.annualRevenue || "Not specified"}
- Current Capacity: ${input.currentCapacity ? `${input.currentCapacity}%` : "Not specified"}
- Number of Facilities: ${input.facilities || "Not specified"}

Provide analysis in the following JSON format:
{
  "problemCategories": ["capacity optimization", "regulatory compliance", etc.],
  "rootCauses": ["detailed root cause analysis"],
  "severity": "low|medium|high|critical",
  "industryPatterns": ["industry-specific patterns identified"],
  "urgency": 1-10,
  "keyIssues": [
    {
      "issue": "specific issue description",
      "impact": "low|medium|high",
      "priority": 1-10
    }
  ]
}

Focus on identifying actual manufacturing optimization opportunities using DSB principles.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert manufacturing optimization consultant specializing in DSB (Dynamic Strategic Balancing) methodology. Provide detailed, actionable analysis based on real manufacturing optimization principles."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as AnalysisResult;
  } catch (error) {
    throw new Error(`Failed to analyze problem: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateDSBSolution(
  analysis: AnalysisResult, 
  input: ProblemAnalysisInput
): Promise<DSBSolution> {
  try {
    const prompt = `Based on the problem analysis, generate a comprehensive DSB (Dynamic Strategic Balancing) solution for this manufacturing optimization challenge.

Original Problem:
- Description: ${input.problemDescription}
- Industry: ${input.industry}
- Annual Revenue: ${input.annualRevenue || "Not specified"}
- Current Capacity: ${input.currentCapacity ? `${input.currentCapacity}%` : "Not specified"}

Analysis Results:
- Problem Categories: ${analysis.problemCategories.join(", ")}
- Root Causes: ${analysis.rootCauses.join(", ")}
- Severity: ${analysis.severity}
- Key Issues: ${analysis.keyIssues.map(i => i.issue).join(", ")}

Generate a complete DSB solution in the following JSON format:
{
  "solutionType": "industry-specific solution name",
  "industrySpecific": true/false,
  "customAlgorithms": [
    {
      "name": "algorithm name",
      "description": "what it does",
      "implementation": "how it works"
    }
  ],
  "dashboardComponents": [
    {
      "name": "component name",
      "description": "what it shows",
      "type": "chart|metric|alert|optimization",
      "realTimeCapable": true/false
    }
  ],
  "implementationRoadmap": [
    {
      "phase": "phase name",
      "timeline": "time duration",
      "activities": ["activity list"],
      "deliverables": ["deliverable list"]
    }
  ],
  "roiProjections": {
    "capacityImprovement": "X% → Y%",
    "additionalRevenue": "₹X Cr",
    "costReduction": "₹X Cr",
    "firstYearROI": "X%",
    "implementationCost": "₹X Lakhs"
  },
  "expectedResults": {
    "shortTerm": ["results in 3-6 months"],
    "longTerm": ["results in 12-24 months"],
    "metrics": [
      {
        "metric": "metric name",
        "currentValue": "current state",
        "targetValue": "target state",
        "timeframe": "achievement timeline"
      }
    ]
  }
}

Make the solution specific to the ${input.industry} industry and address the identified problems with concrete, implementable DSB solutions.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a DSB (Dynamic Strategic Balancing) solution architect with expertise in manufacturing optimization. Generate practical, industry-specific solutions that can be implemented to achieve real business results."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.4,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result as DSBSolution;
  } catch (error) {
    throw new Error(`Failed to generate DSB solution: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function optimizeExistingSolution(
  solutionId: string,
  performanceData: any,
  feedback: string
): Promise<any> {
  try {
    const prompt = `Optimize the existing DSB solution based on performance data and user feedback.

Performance Data: ${JSON.stringify(performanceData)}
User Feedback: ${feedback}

Provide optimization recommendations in JSON format with specific improvements, timeline adjustments, and enhanced algorithms.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a continuous improvement specialist for DSB solutions. Analyze performance data and provide actionable optimization recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error) {
    throw new Error(`Failed to optimize solution: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
