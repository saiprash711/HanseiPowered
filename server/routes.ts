import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeProblem, generateDSBSolution, type ProblemAnalysisInput } from "./openai";
import { insertProblemAnalysisSchema, insertSolutionSchema, insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Problem analysis endpoint
  app.post("/api/analyze-problem", async (req, res) => {
    try {
      const input = insertProblemAnalysisSchema.parse(req.body);
      
      // Create problem analysis record
      const analysis = await storage.createProblemAnalysis({
        ...input,
        userId: req.body.userId || null
      });

      // Update status to analyzing
      await storage.updateProblemAnalysisStatus(analysis.id, "analyzing");

      // Perform AI analysis
      try {
        const analysisInput: ProblemAnalysisInput = {
          problemDescription: input.problemDescription,
          industry: input.industry,
          annualRevenue: input.annualRevenue || undefined,
          currentCapacity: input.currentCapacity || undefined,
          facilities: input.facilities || undefined
        };

        const analysisResult = await analyzeProblem(analysisInput);
        
        // Update with results
        const updatedAnalysis = await storage.updateProblemAnalysisStatus(
          analysis.id, 
          "completed", 
          analysisResult
        );

        res.json({
          success: true,
          analysis: updatedAnalysis,
          result: analysisResult
        });
      } catch (aiError) {
        await storage.updateProblemAnalysisStatus(analysis.id, "failed");
        throw aiError;
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Analysis failed"
      });
    }
  });

  // Generate DSB solution endpoint
  app.post("/api/generate-solution", async (req, res) => {
    try {
      const { problemAnalysisId } = req.body;
      
      if (!problemAnalysisId) {
        return res.status(400).json({
          success: false,
          error: "Problem analysis ID is required"
        });
      }

      const analysis = await storage.getProblemAnalysis(problemAnalysisId);
      if (!analysis || !analysis.analysisResult) {
        return res.status(404).json({
          success: false,
          error: "Problem analysis not found or incomplete"
        });
      }

      // Generate DSB solution using AI
      const problemInput: ProblemAnalysisInput = {
        problemDescription: analysis.problemDescription,
        industry: analysis.industry,
        annualRevenue: analysis.annualRevenue || undefined,
        currentCapacity: analysis.currentCapacity || undefined,
        facilities: analysis.facilities || undefined
      };

      const dsbSolution = await generateDSBSolution(analysis.analysisResult as any, problemInput);

      // Save solution to storage
      const solution = await storage.createSolution({
        problemAnalysisId: analysis.id,
        solutionType: dsbSolution.solutionType,
        customAlgorithms: dsbSolution.customAlgorithms,
        dashboardComponents: dsbSolution.dashboardComponents,
        implementationRoadmap: dsbSolution.implementationRoadmap,
        roiProjections: dsbSolution.roiProjections,
        expectedResults: dsbSolution.expectedResults
      });

      res.json({
        success: true,
        solution: solution,
        dsbSolution: dsbSolution
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Solution generation failed"
      });
    }
  });

  // Get user's problem analyses
  app.get("/api/user/:userId/analyses", async (req, res) => {
    try {
      const { userId } = req.params;
      const analyses = await storage.getProblemAnalysesByUserId(userId);
      
      res.json({
        success: true,
        analyses: analyses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch analyses"
      });
    }
  });

  // Get user's solutions
  app.get("/api/user/:userId/solutions", async (req, res) => {
    try {
      const { userId } = req.params;
      const solutions = await storage.getSolutionsByUserId(userId);
      
      res.json({
        success: true,
        solutions: solutions
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch solutions"
      });
    }
  });

  // Get specific solution
  app.get("/api/solution/:solutionId", async (req, res) => {
    try {
      const { solutionId } = req.params;
      const solution = await storage.getSolution(solutionId);
      
      if (!solution) {
        return res.status(404).json({
          success: false,
          error: "Solution not found"
        });
      }

      res.json({
        success: true,
        solution: solution
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch solution"
      });
    }
  });

  // User registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: "User with this email already exists"
        });
      }

      const user = await storage.createUser(userData);
      
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          company: user.company,
          industry: user.industry
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Registration failed"
      });
    }
  });

  // Industry insights endpoint
  app.get("/api/industry-insights/:industry", async (req, res) => {
    try {
      const { industry } = req.params;
      
      // Get all analyses for this industry
      const allAnalyses = Array.from(storage['problemAnalyses'].values())
        .filter(analysis => analysis.industry.toLowerCase() === industry.toLowerCase());

      const insights = {
        industry: industry,
        totalAnalyses: allAnalyses.length,
        commonProblems: [],
        averageROI: "380%",
        successRate: "94%",
        averageImplementationTime: "8-12 weeks"
      };

      res.json({
        success: true,
        insights: insights
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch industry insights"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
