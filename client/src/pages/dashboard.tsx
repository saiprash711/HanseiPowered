import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart3, TrendingUp, Zap, CheckCircle, AlertCircle, Clock, Users } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [problemDescription, setProblemDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [currentUser] = useState({ id: "demo-user", name: "Demo User" }); // Demo user
  const { toast } = useToast();

  // Fetch user's analyses
  const { data: analyses, refetch: refetchAnalyses } = useQuery({
    queryKey: ["/api/user", currentUser.id, "analyses"],
    enabled: !!currentUser.id,
  });

  // Fetch user's solutions
  const { data: solutions } = useQuery({
    queryKey: ["/api/user", currentUser.id, "solutions"],
    enabled: !!currentUser.id,
  });

  // Generate new analysis
  const generateAnalysisMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/analyze-problem', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Analysis Started",
        description: "Your manufacturing problem is being analyzed.",
      });
      refetchAnalyses();
      setProblemDescription("");
      setIndustry("");
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to start analysis",
        variant: "destructive",
      });
    }
  });

  const handleGenerateAnalysis = () => {
    if (!problemDescription.trim() || !industry) {
      toast({
        title: "Missing Information",
        description: "Please provide problem description and select an industry.",
        variant: "destructive",
      });
      return;
    }

    generateAnalysisMutation.mutate({
      problemDescription,
      industry,
      userId: currentUser.id
    });
  };

  // Mock dashboard metrics for demonstration
  const dashboardMetrics = [
    { 
      title: "Active Solutions", 
      value: (solutions as any)?.solutions?.length || 0, 
      icon: Zap, 
      color: "text-primary",
      change: "+2 this month" 
    },
    { 
      title: "Total Analyses", 
      value: (analyses as any)?.analyses?.length || 0, 
      icon: BarChart3, 
      color: "text-secondary",
      change: "+5 this week" 
    },
    { 
      title: "Average ROI", 
      value: "385%", 
      icon: TrendingUp, 
      color: "text-accent",
      change: "Industry leading" 
    },
    { 
      title: "Implementation Time", 
      value: "8 weeks", 
      icon: Clock, 
      color: "text-purple-600",
      change: "50% faster" 
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-neutral-900">DSB GENIUS</span>
                  <span className="text-xs text-neutral-500 block -mt-1">Dashboard</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-700" data-testid="text-user-name">{currentUser.name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-neutral-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-neutral-900" data-testid={`text-metric-${index}`}>
                        {metric.value}
                      </p>
                      <p className="text-xs text-neutral-500">{metric.change}</p>
                    </div>
                    <IconComponent className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs defaultValue="new-analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="new-analysis" data-testid="tab-new-analysis">New Analysis</TabsTrigger>
            <TabsTrigger value="my-solutions" data-testid="tab-solutions">My Solutions</TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">History</TabsTrigger>
          </TabsList>

          {/* New Analysis Tab */}
          <TabsContent value="new-analysis">
            <Card>
              <CardHeader>
                <CardTitle>Generate New DSB Solution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="problem-desc">Problem Description</Label>
                  <Textarea
                    id="problem-desc"
                    placeholder="Describe your manufacturing challenge in detail..."
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                    className="h-32"
                    data-testid="textarea-problem-desc"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="industry-select">Industry</Label>
                    <Select onValueChange={setIndustry} data-testid="select-industry-dashboard">
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                        <SelectItem value="electronics">Electronics OEM</SelectItem>
                        <SelectItem value="paint">Paint & Chemicals</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                        <SelectItem value="textile">Textile</SelectItem>
                        <SelectItem value="food">Food Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleGenerateAnalysis}
                  disabled={generateAnalysisMutation.isPending}
                  className="w-full bg-primary hover:bg-primary/90"
                  data-testid="button-generate-analysis"
                >
                  {generateAnalysisMutation.isPending ? "Generating Analysis..." : "Generate DSB Solution"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Solutions Tab */}
          <TabsContent value="my-solutions">
            <Card>
              <CardHeader>
                <CardTitle>Your DSB Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                {(solutions as any)?.solutions?.length > 0 ? (
                  <div className="space-y-4">
                    {(solutions as any).solutions.map((solution: any, index: number) => (
                      <Card key={solution.id} className="border-neutral-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-neutral-900" data-testid={`text-solution-${index}`}>
                                {solution.solutionType || "Manufacturing Optimization Solution"}
                              </h4>
                              <p className="text-sm text-neutral-600">
                                Created: {new Date(solution.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary">Active</Badge>
                              <Button size="sm" variant="outline" data-testid={`button-view-${index}`}>
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Zap className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Solutions Yet</h3>
                    <p className="text-neutral-600 mb-4">Generate your first DSB solution to get started.</p>
                    <Button onClick={() => (document.querySelector('[data-testid="tab-new-analysis"]') as HTMLElement)?.click()}>
                      Create Solution
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Analysis History</CardTitle>
              </CardHeader>
              <CardContent>
                {(analyses as any)?.analyses?.length > 0 ? (
                  <div className="space-y-4">
                    {(analyses as any).analyses.map((analysis: any, index: number) => (
                      <Card key={analysis.id} className="border-neutral-200">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge 
                                  variant={
                                    analysis.status === 'completed' ? 'default' : 
                                    analysis.status === 'analyzing' ? 'secondary' : 
                                    analysis.status === 'failed' ? 'destructive' : 'outline'
                                  }
                                >
                                  {analysis.status}
                                </Badge>
                                <span className="text-sm text-neutral-500">{analysis.industry}</span>
                              </div>
                              <p className="text-sm text-neutral-900 mb-1" data-testid={`text-analysis-${index}`}>
                                {analysis.problemDescription.substring(0, 100)}...
                              </p>
                              <p className="text-xs text-neutral-500">
                                {new Date(analysis.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {analysis.status === 'completed' && (
                                <CheckCircle className="w-5 h-5 text-secondary" />
                              )}
                              {analysis.status === 'analyzing' && (
                                <Clock className="w-5 h-5 text-primary animate-pulse" />
                              )}
                              {analysis.status === 'failed' && (
                                <AlertCircle className="w-5 h-5 text-destructive" />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BarChart3 className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Analysis History</h3>
                    <p className="text-neutral-600">Your analysis history will appear here once you start generating solutions.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
