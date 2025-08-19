import { 
  type User, 
  type InsertUser, 
  type ProblemAnalysis, 
  type InsertProblemAnalysis,
  type Solution,
  type InsertSolution,
  type Subscription,
  type InsertSubscription 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Problem Analysis operations
  createProblemAnalysis(analysis: InsertProblemAnalysis): Promise<ProblemAnalysis>;
  getProblemAnalysis(id: string): Promise<ProblemAnalysis | undefined>;
  getProblemAnalysesByUserId(userId: string): Promise<ProblemAnalysis[]>;
  updateProblemAnalysisStatus(id: string, status: string, result?: any): Promise<ProblemAnalysis | undefined>;
  
  // Solution operations
  createSolution(solution: InsertSolution): Promise<Solution>;
  getSolution(id: string): Promise<Solution | undefined>;
  getSolutionsByProblemAnalysisId(problemAnalysisId: string): Promise<Solution[]>;
  getSolutionsByUserId(userId: string): Promise<Solution[]>;
  
  // Subscription operations
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscriptionByUserId(userId: string): Promise<Subscription | undefined>;
  updateSubscriptionUsage(userId: string, generationsUsed: number): Promise<Subscription | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private problemAnalyses: Map<string, ProblemAnalysis>;
  private solutions: Map<string, Solution>;
  private subscriptions: Map<string, Subscription>;

  constructor() {
    this.users = new Map();
    this.problemAnalyses = new Map();
    this.solutions = new Map();
    this.subscriptions = new Map();
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser,
      company: insertUser.company || null,
      industry: insertUser.industry || null,
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  // Problem Analysis operations
  async createProblemAnalysis(insertAnalysis: InsertProblemAnalysis): Promise<ProblemAnalysis> {
    const id = randomUUID();
    const analysis: ProblemAnalysis = {
      ...insertAnalysis,
      userId: insertAnalysis.userId || null,
      annualRevenue: insertAnalysis.annualRevenue || null,
      currentCapacity: insertAnalysis.currentCapacity || null,
      facilities: insertAnalysis.facilities || null,
      id,
      status: "pending",
      analysisResult: null,
      createdAt: new Date()
    };
    this.problemAnalyses.set(id, analysis);
    return analysis;
  }

  async getProblemAnalysis(id: string): Promise<ProblemAnalysis | undefined> {
    return this.problemAnalyses.get(id);
  }

  async getProblemAnalysesByUserId(userId: string): Promise<ProblemAnalysis[]> {
    return Array.from(this.problemAnalyses.values()).filter(
      (analysis) => analysis.userId === userId
    );
  }

  async updateProblemAnalysisStatus(id: string, status: string, result?: any): Promise<ProblemAnalysis | undefined> {
    const analysis = this.problemAnalyses.get(id);
    if (analysis) {
      analysis.status = status;
      if (result) {
        analysis.analysisResult = result;
      }
      this.problemAnalyses.set(id, analysis);
      return analysis;
    }
    return undefined;
  }

  // Solution operations
  async createSolution(insertSolution: InsertSolution): Promise<Solution> {
    const id = randomUUID();
    const solution: Solution = {
      ...insertSolution,
      problemAnalysisId: insertSolution.problemAnalysisId || null,
      customAlgorithms: insertSolution.customAlgorithms || null,
      dashboardComponents: insertSolution.dashboardComponents || null,
      implementationRoadmap: insertSolution.implementationRoadmap || null,
      roiProjections: insertSolution.roiProjections || null,
      expectedResults: insertSolution.expectedResults || null,
      id,
      createdAt: new Date()
    };
    this.solutions.set(id, solution);
    return solution;
  }

  async getSolution(id: string): Promise<Solution | undefined> {
    return this.solutions.get(id);
  }

  async getSolutionsByProblemAnalysisId(problemAnalysisId: string): Promise<Solution[]> {
    return Array.from(this.solutions.values()).filter(
      (solution) => solution.problemAnalysisId === problemAnalysisId
    );
  }

  async getSolutionsByUserId(userId: string): Promise<Solution[]> {
    const userAnalyses = await this.getProblemAnalysesByUserId(userId);
    const analysisIds = userAnalyses.map(a => a.id);
    
    return Array.from(this.solutions.values()).filter(
      (solution) => solution.problemAnalysisId && analysisIds.includes(solution.problemAnalysisId)
    );
  }

  // Subscription operations
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const id = randomUUID();
    const subscription: Subscription = {
      ...insertSubscription,
      userId: insertSubscription.userId || null,
      status: insertSubscription.status || "active",
      endDate: insertSubscription.endDate || null,
      maxGenerations: insertSubscription.maxGenerations || null,
      id,
      startDate: new Date(),
      monthlyGenerations: 0
    };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async getSubscriptionByUserId(userId: string): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find(
      (subscription) => subscription.userId === userId
    );
  }

  async updateSubscriptionUsage(userId: string, generationsUsed: number): Promise<Subscription | undefined> {
    const subscription = Array.from(this.subscriptions.values()).find(
      (sub) => sub.userId === userId
    );
    
    if (subscription) {
      subscription.monthlyGenerations = generationsUsed;
      this.subscriptions.set(subscription.id, subscription);
      return subscription;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
