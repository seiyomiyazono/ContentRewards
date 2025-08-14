import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="text-center max-w-md mx-auto">
        <div className="space-y-6">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              案件が見つかりません
            </h1>
            <p className="text-gray-600">
              お探しの案件は存在しないか、削除された可能性があります。
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/projects">
              <Button className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                案件一覧に戻る
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" className="w-full">
                ダッシュボードに戻る
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};