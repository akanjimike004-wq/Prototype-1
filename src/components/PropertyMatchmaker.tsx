import React from "react";
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Send, Bot, User, RefreshCcw } from "lucide-react";
import Markdown from "react-markdown";
import { Property } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const PropertyMatchmaker = () => {
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI Property Matchmaker. Tell me about your dream home—location, budget, style, or any specific features you're looking for—and I'll find the perfect match from our exclusive collection.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    fetch("/api/properties")
      .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error("Failed to fetch properties for AI", err));
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const model = "gemini-3-flash-preview";
      const systemInstruction = `
        You are a luxury real estate expert and concierge for LuxeEstate.
        Your goal is to help users find their perfect property from our available listings.
        
        Available Properties:
        ${JSON.stringify(properties, null, 2)}
        
        Instructions:
        1. Analyze the user's request.
        2. Recommend 1-2 properties from the list that best match their criteria.
        3. Explain WHY you chose these properties.
        4. If no perfect match exists, suggest the closest options and explain why they might still be interesting.
        5. Keep your tone professional, sophisticated, and helpful.
        6. Use Markdown for formatting (bolding property names, using bullet points).
        7. Always format prices in Naira (₦) and use appropriate values for the Nigerian luxury market.
        8. If the user asks something unrelated to real estate, politely redirect them back to finding a home.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: messages.concat({ role: "user", content: userMessage }).map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const aiResponse = response.text || "I apologize, but I'm having trouble connecting to my database. Please try again in a moment.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "I encountered an error while processing your request. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="matchmaker" className="py-24 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white mb-6 border border-white/10">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                AI Powered Concierge
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[0.9]">
                Your Personal <br />
                <span className="italic font-serif font-light text-white/60">Property Matchmaker</span>
              </h2>
              <p className="text-lg text-white/60 mb-8 max-w-md font-light leading-relaxed">
                Experience a new way to find your home. Our advanced AI understands 
                your lifestyle needs and matches you with properties that truly resonate.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <RefreshCcw className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Real-time Analysis</h4>
                    <p className="text-xs text-white/40">Matches based on current market data and your unique preferences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <Bot className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Expert Guidance</h4>
                    <p className="text-xs text-white/40">Sophisticated insights into neighborhood trends and property values.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Chat Interface */}
            <div className="bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden flex flex-col h-[600px] shadow-2xl shadow-emerald-500/5">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                    <Bot className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">Luxe Concierge</p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[10px] text-white/40 font-medium">Online & Ready</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex items-start gap-3 max-w-[85%]",
                        msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center border",
                        msg.role === "assistant" 
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                          : "bg-white/10 border-white/20 text-white"
                      )}>
                        {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <div className={cn(
                        "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                        msg.role === "assistant" 
                          ? "bg-white/5 text-white/80 border border-white/10" 
                          : "bg-emerald-500 text-white font-medium"
                      )}>
                        <div className="markdown-body prose prose-invert prose-sm max-w-none">
                          <Markdown>{msg.content}</Markdown>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl flex gap-1">
                      <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1 h-1 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white/5 border-t border-white/10">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Describe your ideal home..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-emerald-500/50 transition-colors placeholder:text-white/20"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-center mt-3 text-white/20 font-medium">
                  Powered by LuxeEstate AI • Personalized for you
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
