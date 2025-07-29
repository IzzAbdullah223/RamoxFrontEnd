import { useState, useRef, useEffect } from 'react';
import chatCSS from './Chat.module.css';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

 
  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: language === 'en' 
          ? 'Hello! How can I help you today?' 
          : 'مرحبًا! كيف يمكنني مساعدتك اليوم؟',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate API call
    try {
      //   call   backend API here
      // const response = await fetch('/api/chat', { method: 'POST', body: ... })
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'en' 
          ? `I received your message: "${inputValue}". This is a simulated response as the backend isn't connected.` 
          : `لقد تلقيت رسالتك: "${inputValue}". هذه استجابة محاكاة حيث لم يتم توصيل الواجهة الخلفية.`,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'en' 
          ? 'Sorry, there was an error processing your request.' 
          : 'عذرًا، حدث خطأ أثناء معالجة طلبك.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  return (
    <div className={chatCSS.pageContainer} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className={chatCSS.header}>
        <h1 className={chatCSS.title}>
          {language === 'en' ? 'AI Assistant' : 'مساعد الذكاء الاصطناعي'}
        </h1>
        <button onClick={toggleLanguage} className={chatCSS.languageToggle}>
          {language === 'en' ? 'العربية' : 'English'}
        </button>
      </div>
      
      <div className={chatCSS.chatContainer}>
        <div className={chatCSS.messages}>
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`${chatCSS.message} ${message.sender === 'user' ? chatCSS.userMessage : chatCSS.aiMessage}`}
            >
              <div className={chatCSS.messageContent}>
                {message.text.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
              <div className={chatCSS.messageTime}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={`${chatCSS.message} ${chatCSS.aiMessage}`}>
              <div className={chatCSS.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className={chatCSS.inputArea}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={language === 'en' ? 'Type your message...' : 'اكتب رسالتك...'}
            className={chatCSS.messageInput}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={chatCSS.sendButton}
            disabled={isLoading || !inputValue.trim()}
          >
            {language === 'en' ? 'Send' : 'إرسال'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;