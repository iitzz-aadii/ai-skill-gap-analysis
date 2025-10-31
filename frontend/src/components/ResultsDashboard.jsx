import { CheckCircle, XCircle, AlertCircle, TrendingUp, Target, Lightbulb } from 'lucide-react';

export default function ResultsDashboard({ analysis }) {
  if (!analysis) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No analysis results available</p>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-50';
    if (score >= 60) return 'bg-yellow-50';
    return 'bg-red-50';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Summary Section */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-6">Profile Analysis Results</h2>
          <p className="text-primary-100 text-lg leading-relaxed">{analysis.analysis_summary}</p>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Fit Score */}
        <div className={`card-premium bg-gradient-to-br ${getScoreBgColor(analysis.profile_fit_score)} border-2`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-charcoal">Profile Fit Score</h3>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <Target className="w-7 h-7 text-primary-600" />
            </div>
          </div>
          <div className="flex items-baseline mb-4">
            <span className={`text-6xl font-bold ${getScoreColor(analysis.profile_fit_score)}`}>
              {analysis.profile_fit_score.toFixed(1)}
            </span>
            <span className="text-3xl text-mediumGrey ml-3">/ 100</span>
          </div>
          <div className="relative mt-6 bg-neutral-200 rounded-full h-4 overflow-hidden shadow-inner">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-600 to-primary-500 rounded-full transition-all duration-1000 shadow-md"
              style={{ width: `${analysis.profile_fit_score}%` }}
            />
          </div>
        </div>

        {/* Skill Match Percentage */}
        <div className={`card-premium bg-gradient-to-br ${getScoreBgColor(analysis.skill_match_percentage)} border-2`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-charcoal">Skill Match</h3>
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-primary-600" />
            </div>
          </div>
          <div className="flex items-baseline mb-4">
            <span className={`text-6xl font-bold ${getScoreColor(analysis.skill_match_percentage)}`}>
              {analysis.skill_match_percentage.toFixed(1)}
            </span>
            <span className="text-3xl text-mediumGrey ml-3">%</span>
          </div>
          <p className="text-base text-mediumGrey font-semibold mt-6">
            <span className="text-charcoal">{analysis.matched_skills.length}</span> of {analysis.matched_skills.length + analysis.missing_skills.length} skills matched
          </p>
        </div>
      </div>

      {/* Matched Skills */}
      {analysis.matched_skills.length > 0 && (
        <div className="card-premium">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-3">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal">Matched Skills</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {analysis.matched_skills.map((skill, index) => (
              <span
                key={index}
                className="badge-success text-base px-4 py-2 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                ✓ {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing Skills */}
      {analysis.missing_skills.length > 0 && (
        <div className="card-premium">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-3">
              <XCircle className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal">Missing Skills</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {analysis.missing_skills.map((skill, index) => (
              <span
                key={index}
                className={`badge text-base px-4 py-2 shadow-sm hover:shadow-md transition-all duration-200 ${
                  skill.importance === 'high' ? 'bg-red-100 text-red-800 border-2 border-red-300' :
                  skill.importance === 'medium' ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' :
                  'bg-neutral-100 text-neutral-800 border-2 border-neutral-300'
                }`}
              >
                {skill.skill}
                {skill.importance === 'high' && ' ⚠️'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Weak Skills */}
      {analysis.weak_skills && analysis.weak_skills.length > 0 && (
        <div className="card-premium">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-3">
              <AlertCircle className="w-7 h-7 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal">Skills to Strengthen</h3>
          </div>
          <div className="space-y-4">
            {analysis.weak_skills.map((skill, index) => (
              <div key={index} className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-charcoal text-lg">{skill.skill}</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-mediumGrey font-semibold">
                  <div>
                    <span className="text-xs text-mediumGrey">Current:</span>
                    <span className="ml-2 text-orange-700">{(skill.current_level * 100).toFixed(0)}%</span>
                  </div>
                  <div>
                    <span className="text-xs text-mediumGrey">Target:</span>
                    <span className="ml-2 text-green-700">{(skill.required_level * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvement Suggestions */}
      {analysis.improvement_suggestions && analysis.improvement_suggestions.length > 0 && (
        <div className="card-premium bg-gradient-to-br from-primary-50 to-white">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mr-3">
              <Lightbulb className="w-7 h-7 text-primary-600" />
            </div>
            <h3 className="text-2xl font-bold text-charcoal">Recommended Learning Path</h3>
          </div>
          <div className="space-y-8">
            {analysis.improvement_suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border-l-4 border-primary-600 shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-xl text-charcoal">{suggestion.skill}</h4>
                  <span className={`badge text-sm font-bold px-4 py-2 ${
                    suggestion.priority === 'high' ? 'bg-red-100 text-red-800 border-2 border-red-300' :
                    suggestion.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' :
                    'bg-blue-100 text-blue-800 border-2 border-blue-300'
                  }`}>
                    {suggestion.priority.toUpperCase()} PRIORITY
                  </span>
                </div>
                
                {/* Learning Path */}
                <div className="mb-5">
                  <p className="text-sm font-bold text-charcoal mb-3 flex items-center">
                    <span className="text-xl mr-2">🛤️</span> Learning Path:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-mediumGrey ml-8">
                    {suggestion.learning_path.map((step, stepIndex) => (
                      <li key={stepIndex} className="leading-relaxed">{step}</li>
                    ))}
                  </ol>
                </div>

                {/* Resources */}
                {suggestion.resources && suggestion.resources.length > 0 && (
                  <div className="mb-5">
                    <p className="text-sm font-bold text-charcoal mb-3 flex items-center">
                      <span className="text-xl mr-2">📚</span> Recommended Resources:
                    </p>
                    <div className="space-y-3">
                      {suggestion.resources.map((resource, resIndex) => (
                        <div key={resIndex} className="flex items-center justify-between p-4 bg-gradient-to-r from-neutral-50 to-white rounded-xl border border-neutral-200 hover:shadow-sm transition-all duration-200">
                          <div>
                            <p className="text-sm font-bold text-charcoal mb-1">{resource.title}</p>
                            <p className="text-xs text-mediumGrey">
                              {resource.provider} • {resource.type} • {resource.duration}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Estimated Time */}
                <div className="mt-4 p-4 bg-primary-50 rounded-xl">
                  <p className="text-sm text-charcoal font-semibold flex items-center">
                    <span className="text-lg mr-2">⏱️</span>
                    Estimated Time: <span className="ml-2 text-primary-600">{suggestion.estimated_time}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resume Rewrite Suggestions */}
      {analysis.resume_rewrite_suggestions && (
        <div className="card-premium bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-2xl font-bold text-charcoal">Resume Improvement Tips</h3>
          </div>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-mediumGrey font-sans leading-relaxed bg-white p-6 rounded-xl border border-neutral-200">
              {analysis.resume_rewrite_suggestions}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
