import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, ClipboardList, Upload, CheckCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResult {
  problemCategories: string[];
  rootCauses: string[];
  severity: string;
  keyIssues: Array<{ issue: string; impact: string; priority: number }>;
}

export function ProblemInput() {
  const [activeTab, setActiveTab] = useState("natural");
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");
  const [industry, setIndustry] = useState("");
  const [revenue, setRevenue] = useState("");
  const [capacity, setCapacity] = useState("");
  const [facilities, setFacilities] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { toast } = useToast();

  const analyzeProblemMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/analyze-problem', data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setAnalysisResult(data.result);
        setAnalysisProgress(100);
        toast({
          title: "Analysis Complete",
          description: "Your manufacturing problem has been analyzed successfully.",
        });
      } else {
        throw new Error(data.error);
      }
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze problem",
        variant: "destructive",
      });
      setAnalysisProgress(0);
    }
  });

  const handleNaturalLanguageAnalysis = () => {
    if (!naturalLanguageInput.trim()) {
      toast({
        title: "Input Required",
        description: "Please describe your manufacturing challenge.",
        variant: "destructive",
      });
      return;
    }

    setAnalysisProgress(25);
    
    analyzeProblemMutation.mutate({
      problemDescription: naturalLanguageInput,
      industry: "General Manufacturing", // Default for natural language
      userId: null // For demo purposes
    });

    // Simulate progress updates
    setTimeout(() => setAnalysisProgress(50), 1000);
    setTimeout(() => setAnalysisProgress(75), 2000);
  };

  const handleStructuredAnalysis = () => {
    if (!industry || !naturalLanguageInput.trim()) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in the problem description and select an industry.",
        variant: "destructive",
      });
      return;
    }

    setAnalysisProgress(25);

    analyzeProblemMutation.mutate({
      problemDescription: naturalLanguageInput,
      industry,
      annualRevenue: revenue || null,
      currentCapacity: capacity ? parseInt(capacity) : null,
      facilities: facilities ? parseInt(facilities) : null,
      userId: null // For demo purposes
    });

    // Simulate progress updates
    setTimeout(() => setAnalysisProgress(50), 1000);
    setTimeout(() => setAnalysisProgress(75), 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 50MB.",
          variant: "destructive",
        });
        return;
      }
      setUploadedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} is ready for analysis.`,
      });
    }
  };

  const handleDocumentAnalyze = async () => {
    if (!uploadedFile) return;
    setIsUploading(true);
    setAnalysisProgress(25);

    const fileName = uploadedFile.name.toLowerCase();
    let industryGuess = "General Manufacturing";
    
    if (fileName.includes('pharma')) industryGuess = "pharmaceutical";
    else if (fileName.includes('electronic')) industryGuess = "electronics";
    else if (fileName.includes('paint')) industryGuess = "paint";

    analyzeProblemMutation.mutate({
      problemDescription: `Document analysis for ${uploadedFile.name} - Manufacturing optimization requirements based on uploaded data`,
      industry: industryGuess,
      userId: null
    });

    setTimeout(() => setAnalysisProgress(50), 1000);
    setTimeout(() => setAnalysisProgress(75), 2000);
    setIsUploading(false);
  };

  return (
    <section id="platform" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            Input Your Manufacturing Challenge
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our AI understands your problems through multiple input methods and generates customized solutions instantly
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Methods */}
          <div className="space-y-6">
            {/* Natural Language Input */}
            <Card className="bg-neutral-50 border-neutral-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">Natural Language Description</h3>
                </div>
                
                <div className="mb-4">
                  <Label htmlFor="problem-description" className="text-sm font-medium text-neutral-700 mb-2">
                    Describe your manufacturing challenge:
                  </Label>
                  <Textarea 
                    id="problem-description"
                    className="h-32 resize-none"
                    placeholder="Our pharma company has 40% capacity utilization, 6-month technology transfer times, and regulatory compliance issues..."
                    value={naturalLanguageInput}
                    onChange={(e) => setNaturalLanguageInput(e.target.value)}
                    data-testid="textarea-problem-description"
                  />
                </div>
                
                <Button 
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  onClick={handleNaturalLanguageAnalysis}
                  disabled={analyzeProblemMutation.isPending}
                  data-testid="button-analyze-natural"
                >
                  {analyzeProblemMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze with AI"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Structured Form Input */}
            <Card className="bg-neutral-50 border-neutral-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mr-3">
                    <ClipboardList className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">Structured Parameters</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="industry-select">Industry</Label>
                    <Select onValueChange={setIndustry} data-testid="select-industry">
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                        <SelectItem value="electronics">Electronics OEM</SelectItem>
                        <SelectItem value="paint">Paint & Chemicals</SelectItem>
                        <SelectItem value="automotive">Automotive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="revenue">Annual Revenue</Label>
                    <Select onValueChange={setRevenue} data-testid="select-revenue">
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="₹100-500 Cr">₹100-500 Cr</SelectItem>
                        <SelectItem value="₹50-100 Cr">₹50-100 Cr</SelectItem>
                        <SelectItem value="₹500+ Cr">₹500+ Cr</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="capacity">Current Capacity %</Label>
                    <Input 
                      id="capacity"
                      type="number" 
                      placeholder="40" 
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      data-testid="input-capacity"
                    />
                  </div>
                  <div>
                    <Label htmlFor="facilities">Facilities</Label>
                    <Input 
                      id="facilities"
                      type="number" 
                      placeholder="2" 
                      value={facilities}
                      onChange={(e) => setFacilities(e.target.value)}
                      data-testid="input-facilities"
                    />
                  </div>
                </div>

                <Button 
                  className="w-full bg-secondary text-white hover:bg-secondary/90"
                  onClick={handleStructuredAnalysis}
                  disabled={analyzeProblemMutation.isPending}
                  data-testid="button-analyze-structured"
                >
                  {analyzeProblemMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Solution"
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card className="bg-neutral-50 border-neutral-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mr-3">
                    <Upload className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">Document Analysis</h3>
                </div>

                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center mb-4">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf,.xlsx,.xls,.csv,.txt,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    data-testid="input-file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <p className="text-neutral-600">
                      {uploadedFile ? uploadedFile.name : "Upload annual reports, production data, or financial statements"}
                    </p>
                    <p className="text-sm text-neutral-500 mt-2">PDF, Excel, CSV, Word files supported</p>
                  </label>
                </div>

                <Button 
                  className="w-full bg-accent text-white hover:bg-accent/90"
                  onClick={handleDocumentAnalyze}
                  disabled={!uploadedFile || isUploading}
                  data-testid="button-upload-analyze"
                >
                  {isUploading ? "Analyzing..." : "Upload & Analyze"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* AI Analysis Visualization */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 border border-neutral-200">
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">AI Analysis in Progress</h3>
            
            {/* Analysis Steps */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  analysisProgress >= 25 ? 'bg-secondary' : 'bg-neutral-300'
                }`}>
                  {analysisProgress >= 25 ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-neutral-700">Problem categorization complete</span>
              </div>
              
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  analysisProgress >= 50 ? 'bg-secondary' : analysisProgress >= 25 ? 'bg-primary animate-pulse' : 'bg-neutral-300'
                }`}>
                  {analysisProgress >= 50 ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-neutral-700">Industry pattern recognition</span>
              </div>
              
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  analysisProgress >= 75 ? 'bg-secondary' : analysisProgress >= 50 ? 'bg-primary animate-pulse' : 'bg-neutral-300'
                }`}>
                  {analysisProgress >= 75 ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-neutral-700">Matching optimal DSB solutions...</span>
              </div>
              
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  analysisProgress >= 100 ? 'bg-secondary' : analysisProgress >= 75 ? 'bg-primary animate-pulse' : 'bg-neutral-300'
                }`}>
                  {analysisProgress >= 100 ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className={analysisProgress >= 100 ? "text-neutral-700" : "text-neutral-500"}>
                  Generating custom dashboard
                </span>
              </div>
            </div>

            {/* Identified Problems */}
            {analysisResult && (
              <Card className="bg-white border-neutral-200 mb-6">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-neutral-900 mb-3">Identified Key Issues:</h4>
                  <div className="space-y-2">
                    {analysisResult.keyIssues.slice(0, 3).map((issue, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className={`w-2 h-2 rounded-full mr-3 ${
                          issue.impact === 'high' ? 'bg-red-500' : 
                          issue.impact === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                        }`}></div>
                        <span data-testid={`text-issue-${index}`}>{issue.issue}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Progress Bar */}
            <div className="bg-neutral-200 rounded-full h-2 mb-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-1000"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-neutral-600" data-testid="text-analysis-progress">
              {analysisProgress === 100 ? "Analysis complete!" : 
               analyzeProblemMutation.isPending ? `Analysis ${analysisProgress}% complete - processing...` :
               "Ready to analyze your manufacturing challenge"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
