
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Linkedin } from "lucide-react";

const ResumeUpload = () => {
  const [uploadMethod, setUploadMethod] = useState<"resume" | "linkedin" | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf" || selectedFile.name.endsWith(".pdf")) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = async () => {
    if (uploadMethod === "resume" && !file) {
      toast({
        title: "No file selected",
        description: "Please upload your resume first.",
        variant: "destructive"
      });
      return;
    }

    if (uploadMethod === "linkedin" && !linkedinUrl) {
      toast({
        title: "LinkedIn URL required",
        description: "Please enter your LinkedIn profile URL.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate upload/import process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile imported successfully!",
        description: uploadMethod === "resume" 
          ? "Your resume has been processed." 
          : "Your LinkedIn profile has been imported.",
      });
      navigate("/onboarding");
    }, 2000);
  };

  const handleSkip = () => {
    navigate("/onboarding");
  };

  if (!uploadMethod) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Import Your Profile</h1>
            <p className="text-gray-600">Upload your resume or import from LinkedIn to get personalized job matches</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setUploadMethod("resume")}
              className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Upload Resume</h3>
                  <p className="text-sm text-gray-600">Upload your PDF resume</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setUploadMethod("linkedin")}
              className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Linkedin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">Import from LinkedIn</h3>
                  <p className="text-sm text-gray-600">Connect your LinkedIn profile</p>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-8">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full"
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <button
            onClick={() => setUploadMethod(null)}
            className="text-gray-600 mb-4"
          >
            ← Back
          </button>
          <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            {uploadMethod === "resume" ? (
              <FileText className="w-8 h-8 text-white" />
            ) : (
              <Linkedin className="w-8 h-8 text-white" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {uploadMethod === "resume" ? "Upload Your Resume" : "Import from LinkedIn"}
          </h1>
          <p className="text-gray-600">
            {uploadMethod === "resume" 
              ? "Upload your resume in PDF format" 
              : "Enter your LinkedIn profile URL"
            }
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          {uploadMethod === "resume" ? (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  {file ? file.name : "Choose a PDF file or drag and drop"}
                </p>
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile URL
                </label>
                <Input
                  type="url"
                  placeholder="https://linkedin.com/in/yourprofile"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex space-x-3 mt-6">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={isLoading || (uploadMethod === "resume" && !file) || (uploadMethod === "linkedin" && !linkedinUrl)}
            >
              {isLoading ? (
                uploadMethod === "resume" ? "Processing..." : "Importing..."
              ) : (
                uploadMethod === "resume" ? "Upload Resume" : "Import Profile"
              )}
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              disabled={isLoading}
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;
