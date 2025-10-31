import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

export default function ResumeUploader({ onFileSelect, onTextChange, resumeText }) {
  const [uploadMode, setUploadMode] = useState('file'); // 'file' or 'text'
  const [selectedFile, setSelectedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    multiple: false
  });

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex space-x-3 p-1 bg-neutral-100 rounded-xl">
        <button
          onClick={() => setUploadMode('file')}
          className={`flex-1 px-5 py-3 font-semibold text-sm rounded-lg transition-all duration-200 ${
            uploadMode === 'file'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-mediumGrey hover:text-charcoal'
          }`}
        >
          <Upload className="w-4 h-4 inline mr-2" />
          Upload File
        </button>
        <button
          onClick={() => setUploadMode('text')}
          className={`flex-1 px-5 py-3 font-semibold text-sm rounded-lg transition-all duration-200 ${
            uploadMode === 'text'
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-mediumGrey hover:text-charcoal'
          }`}
        >
          <FileText className="w-4 h-4 inline mr-2" />
          Paste Text
        </button>
      </div>

      {/* File Upload Mode */}
      {uploadMode === 'file' && (
        <div>
          {!selectedFile ? (
            <div
              {...getRootProps()}
              className={`border-3 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 ${
                isDragActive
                  ? 'border-primary-500 bg-primary-50 scale-105 shadow-md'
                  : 'border-neutral-300 hover:border-primary-400 hover:bg-neutral-50 hover:shadow-sm'
              }`}
            >
              <input {...getInputProps()} />
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                isDragActive ? 'bg-primary-100' : 'bg-neutral-100'
              }`}>
                <Upload className={`w-10 h-10 ${
                  isDragActive ? 'text-primary-600 animate-bounce' : 'text-mediumGrey'
                }`} />
              </div>
              {isDragActive ? (
                <p className="text-primary-600 font-bold text-lg">Drop your resume here</p>
              ) : (
                <>
                  <p className="text-charcoal font-bold text-lg mb-3">
                    Drag & drop your resume here
                  </p>
                  <p className="text-sm text-mediumGrey mb-4">
                    or click to browse from your computer
                  </p>
                  <div className="flex items-center justify-center space-x-2 text-xs text-mediumGrey">
                    <span className="px-3 py-1 bg-neutral-100 rounded-full">PDF</span>
                    <span className="px-3 py-1 bg-neutral-100 rounded-full">TXT</span>
                    <span className="px-3 py-1 bg-neutral-100 rounded-full">DOCX</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="border-2 border-green-400 bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 shadow-md">
              <div className="flex items-start justify-between">
                <div className="flex items-center flex-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-green-800 font-bold text-lg">✅ Resume Uploaded Successfully</span>
                    </div>
                    <p className="font-semibold text-charcoal mb-1">{selectedFile.name}</p>
                    <p className="text-sm text-mediumGrey">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeFile}
                  className="text-mediumGrey hover:text-red-600 hover:bg-red-100 p-2 rounded-xl transition-all duration-200"
                  title="Remove File"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={removeFile}
                className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-semibold hover:underline"
              >
                🔄 Change File
              </button>
            </div>
          )}
        </div>
      )}

      {/* Text Paste Mode */}
      {uploadMode === 'text' && (
        <div>
          <textarea
            value={resumeText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Paste your resume content here...\n\nInclude:\n• Contact information\n• Work experience\n• Education\n• Skills and certifications\n• Projects and achievements"
            className="input-field h-72 resize-none font-mono text-sm"
          />
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-mediumGrey">
              📝 Paste the complete text of your resume
            </p>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
              resumeText.trim().split(/\s+/).filter(w => w.length > 0).length < 50 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {resumeText.trim().split(/\s+/).filter(w => w.length > 0).length} words
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
