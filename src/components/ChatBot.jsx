import React, { useState, useEffect, useRef } from 'react';
import { chatWithAI } from '../appwrite/ai';
import appwriteService from '../appwrite/config';

function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hi! Ask me anything about the blog posts on this site.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [postsContext, setPostsContext] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        appwriteService.getPosts([]).then(posts => {
            if (posts && posts.documents && posts.documents.length > 0) {
                const context = posts.documents
                    .map(p => {
                        const plainContent = (p.content || "")
                            .replace(/<[^>]*>/g, " ")
                            .replace(/\s+/g, " ")
                            .trim()
                            .slice(0, 500);
                        return `Title: ${p.title}\nSummary: ${p.summary || "N/A"}\nContent: ${plainContent}`;
                    })
                    .join('\n\n---\n\n');
                setPostsContext(context);
            }
        });
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);
        const aiResponse = await chatWithAI(input, postsContext);
        setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
            {isOpen ? (
                <div className="bg-white w-[calc(100vw-2rem)] sm:w-80 h-[60vh] sm:h-96 max-h-[500px] rounded-lg shadow-xl flex flex-col border border-slate-200 overflow-hidden">
                    <div className="bg-slate-900 text-white p-3 flex justify-between items-center">
                        <h3 className="font-medium text-sm">Blog Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white text-lg leading-none">&times;</button>
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`p-2 rounded-md text-sm max-w-[85%] ${msg.role === 'user' ? 'bg-slate-900 text-white ml-auto' : 'bg-white border border-slate-200 text-slate-700'}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="bg-white border border-slate-200 text-slate-400 p-2 rounded-md text-sm w-fit">Thinking...</div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-2 border-t border-slate-200 flex bg-white">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="flex-1 border-none focus:ring-0 text-sm outline-none px-2"
                            placeholder="Ask a question..."
                        />
                        <button onClick={handleSend} disabled={isLoading} className="text-slate-900 hover:text-slate-600 px-3 font-medium text-sm disabled:opacity-50">Send</button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-slate-900 text-white p-4 rounded-full shadow-lg hover:bg-slate-800 transition-colors flex items-center justify-center"
                    aria-label="Open chat"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                </button>
            )}
        </div>
    );
}

export default ChatBot;