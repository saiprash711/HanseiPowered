import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  company: text("company"),
  industry: text("industry"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const problemAnalyses = pgTable("problem_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  problemDescription: text("problem_description").notNull(),
  industry: text("industry").notNull(),
  annualRevenue: text("annual_revenue"),
  currentCapacity: integer("current_capacity"),
  facilities: integer("facilities"),
  analysisResult: json("analysis_result"),
  status: text("status").default("pending"), // pending, analyzing, completed, failed
  createdAt: timestamp("created_at").defaultNow(),
});

export const solutions = pgTable("solutions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  problemAnalysisId: varchar("problem_analysis_id").references(() => problemAnalyses.id),
  solutionType: text("solution_type").notNull(), // pharmaceutical, electronics, paint, etc.
  customAlgorithms: json("custom_algorithms"),
  dashboardComponents: json("dashboard_components"),
  implementationRoadmap: json("implementation_roadmap"),
  roiProjections: json("roi_projections"),
  expectedResults: json("expected_results"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const subscriptions = pgTable("subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  planType: text("plan_type").notNull(), // basic, professional, enterprise
  status: text("status").default("active"), // active, cancelled, expired
  startDate: timestamp("start_date").defaultNow(),
  endDate: timestamp("end_date"),
  monthlyGenerations: integer("monthly_generations").default(0),
  maxGenerations: integer("max_generations"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertProblemAnalysisSchema = createInsertSchema(problemAnalyses).omit({
  id: true,
  createdAt: true,
  analysisResult: true,
  status: true,
});

export const insertSolutionSchema = createInsertSchema(solutions).omit({
  id: true,
  createdAt: true,
});

export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  startDate: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertProblemAnalysis = z.infer<typeof insertProblemAnalysisSchema>;
export type ProblemAnalysis = typeof problemAnalyses.$inferSelect;
export type InsertSolution = z.infer<typeof insertSolutionSchema>;
export type Solution = typeof solutions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;
