import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, TrendingUp } from 'lucide-react';
import ResultsDashboard from '../components/ResultsDashboard';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;

  if (!analysis) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No analysis results found</p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Start New Analysis
        </button>
      </div>
    );
  }

  const handleDownloadReport = () => {
    // Create a simple text report
    const report = `
AI Skill Gap Analysis Report
============================

Profile Fit Score: ${analysis.profile_fit_score.toFixed(1)}/100
Skill Match: ${analysis.skill_match_percentage.toFixed(1)}%

Summary:
${analysis.analysis_summary}

Matched Skills (${analysis.matched_skills.length}):
${analysis.matched_skills.map(s => `- ${s.name}`).join('\n')}

Missing Skills (${analysis.missing_skills.length}):
${analysis.missing_skills.map(s => `- ${s.skill} (${s.importance} priority)`).join('\n')}

Improvement Suggestions:
${analysis.improvement_suggestions.map((s, i) => `
${i + 1}. ${s.skill} (${s.priority} priority)
   Learning Path:
   ${s.learning_path.map((step, j) => `   ${j + 1}. ${step}`).join('\n')}
   Estimated Time: ${s.estimated_time}
`).join('\n')}

${analysis.resume_rewrite_suggestions ? `Resume Improvement Tips:\n${analysis.resume_rewrite_suggestions}` : ''}
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skill-gap-analysis-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          New Analysis
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => navigate('/progress', { 
              state: { skills: analysis.missing_skills?.map(s => s.skill) || [] } 
            })}
            className="btn-secondary flex items-center"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Track Progress
          </button>
          <button
            onClick={handleDownloadReport}
            className="btn-secondary flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </button>
        </div>
      </div>

      {/* Results Dashboard */}
      <ResultsDashboard analysis={analysis} />

      {/* CTA Section */}
      <div className="mt-12 card bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Want Personalized Guidance?
          </h3>
          <p className="text-gray-700 mb-6">
            Chat with our AI Career Coach for customized advice on your learning journey
          </p>
          <button
            onClick={() => navigate('/chat', { state: { context: analysis } })}
            className="btn-primary"
          >
            Talk to AI Coach
          </button>
        </div>
      </div>
    </div>
  );
}
