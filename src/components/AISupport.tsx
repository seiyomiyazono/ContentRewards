import React, { useState, useRef, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles,
  MessageCircle,
  HelpCircle,
  Lightbulb,
  Zap,
  Users,
  Bell,
  ChevronRight
} from 'lucide-react';
import { formatTimeAgo } from '../utils/formatters';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: string;
}

interface ChatThread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export const AISupport: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'support' | 'community'>('support');
  const [selectedThread, setSelectedThread] = useState<string>('platform-support');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! How can I help you today?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatThreads: ChatThread[] = [
    {
      id: 'platform-support',
      title: 'Platform Support',
      lastMessage: 'Get help with any issues',
      timestamp: '10:30 AM',
      unread: false
    },
    {
      id: 'payment-support',
      title: 'Payment Support',
      lastMessage: 'I have a question about payment processing',
      timestamp: '9:31 AM',
      unread: true
    },
    {
      id: 'technical-support',
      title: 'Technical Support',
      lastMessage: 'Upload issues resolved',
      timestamp: 'Yesterday',
      unread: false
    }
  ];

  const notifications = [
    {
      id: '1',
      type: 'info',
      title: '新機能リリース',
      message: '動画アップロード機能が改善されました',
      timestamp: '2時間前',
      read: false
    },
    {
      id: '2',
      type: 'success',
      title: '支払い完了',
      message: '案件「AIツール解説動画」の支払いが完了しました',
      timestamp: '5時間前',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: '期限間近',
      message: '案件「プロダクトレビュー」の期限が明日です',
      timestamp: '1日前',
      read: true
    }
  ];

  const faqItems = [
    {
      question: '支払いはいつ処理されますか？',
      answer: '支払いは承認後24時間以内に処理されます。特定の支払いについてお待ちの場合はお知らせください。'
    },
    {
      question: '動画のアップロード要件は何ですか？',
      answer: '動画は1080p以上、MP4形式、最大5GBまでアップロード可能です。'
    },
    {
      question: 'プロジェクトのステータスを確認するには？',
      answer: 'プロジェクトダッシュボードから現在のステータスと進捗を確認できます。'
    },
    {
      question: 'グループに参加するには？',
      answer: '招待を受けるか、公開グループに申請することで参加できます。'
    }
  ];

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('payment') || message.includes('支払い')) {
      return 'I can help with that! Payments are processed within 24 hours of approval. Is there a specific payment you\'re waiting for?';
    }
    
    if (message.includes('upload') || message.includes('アップロード')) {
      return 'For uploads, please ensure your video is in MP4 format, 1080p or higher, and under 5GB. Are you experiencing any specific upload issues?';
    }
    
    return 'Thank you for your message! I\'m here to help with any questions about the platform. Could you provide more details about what you need assistance with?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">サポート</h2>
          <p className="text-gray-600 mt-1">ヘルプとサポート</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          {/* Tab Navigation */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex space-x-1">
              {[
                { id: 'projects', label: 'Projects', icon: MessageCircle },
                { id: 'support', label: 'Support', icon: HelpCircle },
                { id: 'community', label: 'Community', icon: Users }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-teal-100 text-teal-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content based on active tab */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'support' && (
              <div className="p-4 space-y-2">
                {chatThreads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedThread(thread.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedThread === thread.id
                        ? 'bg-teal-50 border border-teal-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{thread.title}</h4>
                      {thread.unread && (
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{thread.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">{thread.timestamp}</p>
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'community' && (
              <div className="p-4 space-y-3">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      !notification.read 
                        ? 'bg-teal-50 border-teal-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {notification.timestamp}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-teal-500 rounded-full mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="p-4">
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">プロジェクト関連のチャットがここに表示されます</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {activeTab === 'support' && (
            <>
              {/* FAQ Section */}
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-bold text-gray-900 mb-4">よくある質問</h3>
                <div className="space-y-3">
                  {faqItems.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                      <button className="w-full text-left flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{item.question}</h4>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </button>
                      <p className="text-sm text-gray-600 mt-2">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Section */}
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mr-3">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Platform Support</h3>
                      <p className="text-sm text-gray-600">Get help with any issues</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start max-w-xs lg:max-w-md ${
                        message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.type === 'user' 
                            ? 'bg-teal-500 ml-2' 
                            : 'bg-gray-500 mr-2'
                        }`}>
                          {message.type === 'user' ? (
                            <User className="h-4 w-4 text-white" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div className={`px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-teal-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-teal-100' : 'text-gray-500'
                          }`}>
                            {formatTimeAgo(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-2">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-4 bg-white">
                  <div className="flex gap-2">
                    <input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="rounded-full px-4"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'community' && (
            <div className="flex-1 p-6">
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">通知</h3>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-teal-500' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                            notification.type === 'info' ? 'bg-blue-100' :
                            notification.type === 'success' ? 'bg-green-100' :
                            notification.type === 'warning' ? 'bg-yellow-100' : 'bg-gray-100'
                          }`}>
                            <Bell className={`h-5 w-5 ${
                              notification.type === 'info' ? 'text-blue-600' :
                              notification.type === 'success' ? 'text-green-600' :
                              notification.type === 'warning' ? 'text-yellow-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">プロジェクトチャット</h3>
                <p className="text-gray-600">プロジェクト関連のメッセージがここに表示されます</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};