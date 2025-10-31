import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp, CheckCircle, Clock, Target, Trash2, Plus } from 'lucide-react';
import { getUserProgress, createProgress, updateProgress, deleteProgress } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Progress() {
  const location = useLocation();
  const { user } = useAuth();
  const initialSkills = location.state?.skills || [];
  
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [targetLevel, setTargetLevel] = useState(3);
  const userId = user?.id || 'default_user'; // Use actual user ID

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    // Auto-add skills from analysis
    if (initialSkills.length > 0) {
      initialSkills.forEach(skill => {
        addSkillToProgress(skill);
      });
    }
  }, [initialSkills]);

  const loadProgress = async () => {
    try {
      setLoading(true);
      const data = await getUserProgress(userId);
      setProgressList(data);
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSkillToProgress = async (skill) => {
    // Check if skill already exists
    const exists = progressList.some(p => p.skill.toLowerCase() === skill.toLowerCase());
    if (exists) return;

    try {
      const newProgress = await createProgress({
        user_id: userId,
        skill: skill,
        target_level: 3.0
      });
      setProgressList(prev => [...prev, newProgress]);
    } catch (error) {
      console.error('Failed to add skill:', error);
    }
  };

  const handleAddSkill = async () => {
    if (!newSkill.trim()) return;

    try {
      const newProgress = await createProgress({
        user_id: userId,
        skill: newSkill.trim(),
        target_level: targetLevel
      });
      setProgressList(prev => [...prev, newProgress]);
      setNewSkill('');
      setTargetLevel(3);
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add skill:', error);
    }
  };

  const handleUpdateLevel = async (progressId, newLevel) => {
    try {
      const updated = await updateProgress(progressId, { current_level: newLevel });
      setProgressList(prev => prev.map(p => p.id === progressId ? updated : p));
    } catch (error) {
      console.error('Failed to update level:', error);
    }
  };

  const handleDelete = async (progressId) => {
    if (!confirm('Are you sure you want to delete this skill tracking?')) return;

    try {
      await deleteProgress(progressId);
      setProgressList(prev => prev.filter(p => p.id !== progressId));
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const getLevelLabel = (level) => {
    if (level === 0) return 'Not Started';
    if (level < 1) return 'Beginner';
    if (level < 2) return 'Learning';
    if (level < 3) return 'Intermediate';
    if (level < 4) return 'Advanced';
    return 'Expert';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Skill Progress Tracker</h1>
          <p className="text-gray-600">Track your learning journey and skill development</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Skill
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card bg-blue-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Skills</p>
              <p className="text-2xl font-bold text-gray-900">{progressList.length}</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <div className="card bg-green-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {progressList.filter(p => p.current_level >= p.target_level).length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="card bg-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {progressList.filter(p => p.current_level > 0 && p.current_level < p.target_level).length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        <div className="card bg-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {progressList.length > 0
                  ? Math.round(
                      progressList.reduce((acc, p) => acc + getProgressPercentage(p.current_level, p.target_level), 0) /
                        progressList.length
                    )
                  : 0}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Progress List */}
      {progressList.length === 0 ? (
        <div className="card text-center py-12">
          <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills tracked yet</h3>
          <p className="text-gray-600 mb-4">
            Add skills from your gap analysis or manually add new ones
          </p>
          <button onClick={() => setShowAddModal(true)} className="btn-primary">
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {progressList.map((progress) => {
            const percentage = getProgressPercentage(progress.current_level, progress.target_level);
            const isCompleted = progress.current_level >= progress.target_level;

            return (
              <div key={progress.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{progress.skill}</h3>
                      {isCompleted && (
                        <span className="ml-3 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <span>Current: {getLevelLabel(progress.current_level)}</span>
                      <span>•</span>
                      <span>Target: {getLevelLabel(progress.target_level)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(progress.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span className="font-semibold">{Math.round(percentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-300 ${
                        isCompleted ? 'bg-green-500' : 'bg-primary-600'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Level Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Current Level
                  </label>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => handleUpdateLevel(progress.id, level)}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          progress.current_level === level
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level === 0 ? 'None' : level}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    0: Not Started • 1: Beginner • 2: Learning • 3: Intermediate • 4: Advanced • 5: Expert
                  </p>
                </div>

                {/* Timestamps */}
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-xs text-gray-500">
                  <span>Started: {new Date(progress.started_at).toLocaleDateString()}</span>
                  <span>Updated: {new Date(progress.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Add New Skill</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skill Name
              </label>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g., React, Python, Docker"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Level: {getLevelLabel(targetLevel)}
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={targetLevel}
                onChange={(e) => setTargetLevel(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSkill}
                disabled={!newSkill.trim()}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
