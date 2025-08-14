import React, { useState, useRef } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  X, 
  Upload, 
  Link as LinkIcon, 
  AlertTriangle,
  Image,
  Video,
  FileText
} from 'lucide-react';

interface VideoSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SubmissionData) => void;
}

interface SubmissionData {
  link: string;
  mediaFile: File | null;
  mediaType: 'video' | 'image' | null;
}

export const VideoSubmissionModal: React.FC<VideoSubmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [link, setLink] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<'video' | 'image' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('video/')) {
      setMediaType('video');
      setMediaFile(file);
    } else if (file.type.startsWith('image/')) {
      setMediaType('image');
      setMediaFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleSubmit = () => {
    if (link || mediaFile) {
      onSubmit({
        link,
        mediaFile,
        mediaType
      });
      // Reset form
      setLink('');
      setMediaFile(null);
      setMediaType(null);
      onClose();
    }
  };

  const getFileIcon = () => {
    if (mediaType === 'video') return Video;
    if (mediaType === 'image') return Image;
    return FileText;
  };

  const FileIcon = getFileIcon();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Create submission</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Warning Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800">
                  Only views after you submit count towards payout. Submit as soon as you post to get paid for all of your views.
                </p>
              </div>
            </div>
          </div>

          {/* Submission Form */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Submit your social media post</h3>
              <p className="text-sm text-gray-600 mb-4">
                Share your post link or upload your image or video below. Once approved, you'll start earning rewards based on the views your content generates.
              </p>
            </div>

            {/* Link Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Provide link *
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://www.instagram.com/reel/1234567890"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media *
              </label>
              
              {!mediaFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
                    isDragging 
                      ? 'border-teal-400 bg-teal-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Upload the original media file you posted (not a screenshot). For videos, upload the video file. For posts with multiple files, upload the first file.
                  </p>
                  <Button variant="secondary" className="mt-4">
                    Upload media
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center mr-3">
                        <FileIcon className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{mediaFile.name}</p>
                        <p className="text-sm text-gray-600">
                          {(mediaFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setMediaFile(null);
                        setMediaType(null);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!link && !mediaFile}
              className="flex-1"
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};