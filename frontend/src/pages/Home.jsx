import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumeUploader from '../components/ResumeUploader';
import ResultsDashboard from '../components/ResultsDashboard';
import { FileSearch, Zap, TrendingUp, CheckCircle } from 'lucide-react';

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    // Validation
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }

    if (!resumeText.trim() && !resumeFile) {
      setError('Please upload your resume or paste resume text');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setProgress(0);
    setProgressMessage('Starting analysis...');
    setAnalysisResult(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('job_description', jobDescription);
      
      if (resumeFile) {
        formData.append('resume_file', resumeFile);
      } else {
        formData.append('resume_text', resumeText);
      }

      // Stream analysis with progress
      const response = await fetch('/api/analysis/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = JSON.parse(line.substring(6));

            if (data.error) {
              throw new Error(data.error);
            }

            if (data.progress !== undefined) {
              setProgress(data.progress);
              setProgressMessage(data.message || 'Processing...');
            }

            if (data.result) {
              setAnalysisResult(data.result);
              setIsAnalyzing(false);
              // Scroll to results
              setTimeout(() => {
                document.getElementById('results-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }, 100);
            }
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.');
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  const handleReset = () => {
    setJobDescription('');
    setResumeText('');
    setResumeFile(null);
    setAnalysisResult(null);
    setError(null);
    setProgress(0);
    setProgressMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-charcoal mb-6 leading-tight">
          AI-Powered Skill Gap Analysis
        </h1>
        <p className="text-xl text-mediumGrey max-w-3xl mx-auto leading-relaxed">
          Upload your resume and job description to get instant insights, skill matching analysis, 
          and personalized learning recommendations powered by AI.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="card-premium text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FileSearch className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-charcoal mb-3">Skill Matching</h3>
          <p className="text-mediumGrey">
            AI analyzes your resume against job requirements to identify matching and missing skills
          </p>
        </div>
        
        <div className="card-premium text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-charcoal mb-3">Gap Analysis</h3>
          <p className="text-mediumGrey">
            Get detailed breakdown of skill gaps with priority levels and improvement strategies
          </p>
        </div>
        
        <div className="card-premium text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-charcoal mb-3">Learning Path</h3>
          <p className="text-mediumGrey">
            Receive personalized learning roadmaps with curated resources to bridge your skill gaps
          </p>
        </div>
      </div>

      {/* Main Analysis Form */}
      <div className="card-premium mb-12">
        <h2 className="text-3xl font-bold text-charcoal mb-8 flex items-center">
          <span className="text-4xl mr-3">📋</span>
          Start Your Analysis
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 font-semibold">
            ⚠️ {error}
          </div>
        )}

        {/* Job Description */}
        <div className="mb-8">
          <label className="block text-lg font-bold text-charcoal mb-3">
            📄 Job Description *
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here...&#10;&#10;Include:&#10;• Required skills and qualifications&#10;• Responsibilities&#10;• Preferred experience&#10;• Technical requirements"
            className="input-field h-64 resize-none"
            disabled={isAnalyzing}
          />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-mediumGrey">
              💡 Tip: Include the complete job posting for best results
            </p>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
              jobDescription.trim().split(/\s+/).filter(w => w.length > 0).length < 30
                ? 'bg-red-100 text-red-700'
                : 'bg-green-100 text-green-700'
            }`}>
              {jobDescription.trim().split(/\s+/).filter(w => w.length > 0).length} words
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="mb-8">
          <label className="block text-lg font-bold text-charcoal mb-3">
            📄 Your Resume *
          </label>
          <ResumeUploader
            onFileSelect={setResumeFile}
            onTextChange={setResumeText}
            resumeText={resumeText}
          />
        </div>

        {/* Analyze Button */}
        <div className="flex gap-4">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className={`btn-primary flex-1 text-lg py-4 ${
              isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="inline-block w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Analyzing...
              </>
            ) : (
              <>
                <FileSearch className="w-6 h-6 inline mr-2" />
                Analyze My Profile
              </>
            )}
          </button>

          {analysisResult && !isAnalyzing && (
            <button
              onClick={handleReset}
              className="btn-secondary text-lg py-4 px-8"
            >
              🔄 New Analysis
            </button>
          )}
        </div>

        {/* Progress Bar */}
        {isAnalyzing && (
          <div className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl border-2 border-primary-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center mr-3 animate-pulse">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-bold text-charcoal">
                    {progressMessage}
                  </p>
                  <p className="text-sm text-mediumGrey">
                    This may take a few moments...
                  </p>
                </div>
              </div>
              <div className="text-3xl font-bold text-primary-600">
                {progress}%
              </div>
            </div>
            <div className="relative bg-neutral-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-blue-500 rounded-full transition-all duration-500 shadow-md"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Individual Feature Progress */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                progress >= 30 ? 'bg-green-50 border-green-300' : 'bg-white border-neutral-200'
              }`}>
                <div className="flex items-center">
                  {progress >= 30 ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-neutral-300 rounded-full mr-2"></div>
                  )}
                  <span className="text-sm font-semibold text-charcoal">Skill Matching</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                progress >= 65 ? 'bg-green-50 border-green-300' : 'bg-white border-neutral-200'
              }`}>
                <div className="flex items-center">
                  {progress >= 65 ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-neutral-300 rounded-full mr-2"></div>
                  )}
                  <span className="text-sm font-semibold text-charcoal">Gap Analysis</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                progress >= 90 ? 'bg-green-50 border-green-300' : 'bg-white border-neutral-200'
              }`}>
                <div className="flex items-center">
                  {progress >= 90 ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-neutral-300 rounded-full mr-2"></div>
                  )}
                  <span className="text-sm font-semibold text-charcoal">Learning Path</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Section */}
      {analysisResult && !isAnalyzing && (
        <div id="results-section" className="mb-12">
          <div className="mb-8 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl text-white shadow-xl">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Analysis Complete! ✨</h2>
                <p className="text-green-100 text-lg">
                  Your personalized skill gap analysis is ready below
                </p>
              </div>
            </div>
          </div>
          <ResultsDashboard analysis={analysisResult} />
        </div>
      )}

      {/* CTA Section */}
      {!analysisResult && !isAnalyzing && (
        <div className="card-premium bg-gradient-to-br from-primary-50 to-blue-50 text-center border-2 border-primary-200">
          <h3 className="text-2xl font-bold text-charcoal mb-4">
            Ready to Discover Your Skill Gaps?
          </h3>
          <p className="text-lg text-mediumGrey mb-6 max-w-2xl mx-auto">
            Get instant AI-powered insights into how well your profile matches your dream job. 
            Receive personalized recommendations to bridge your skill gaps and advance your career.
          </p>
          <button
            onClick={() => document.querySelector('textarea')?.focus()}
            className="btn-primary text-lg px-8 py-4"
          >
            Get Started Now →
          </button>
        </div>
      )}
    </div>
  );
}
