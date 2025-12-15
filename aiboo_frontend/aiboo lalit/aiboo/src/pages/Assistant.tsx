import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CyberButton } from "@/components/ui/cyber-button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User,
  Settings,
  VolumeX,
  Volume2
} from "lucide-react";

const Assistant = () => {
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const [messages] = useState([
    { id: 1, type: "ai", content: "Hello! I'm AiBoO's AI Assistant. How can I help you secure your systems today?", timestamp: "10:30 AM" },
    { id: 2, type: "user", content: "Show me the current threat status", timestamp: "10:31 AM" },
    { id: 3, type: "ai", content: "Currently monitoring 3 active threats. The highest priority is a SQL injection attempt on Web Server 3. Would you like me to initiate automated mitigation?", timestamp: "10:31 AM" },
    { id: 4, type: "user", content: "Yes, please secure that server", timestamp: "10:32 AM" },
    { id: 5, type: "ai", content: "Firewall rules updated and SQL injection blocked. Server 3 is now secure. I've also scheduled a comprehensive security scan for tonight.", timestamp: "10:32 AM" },
  ]);

  const quickCommands = [
    "Show system status",
    "Run security scan",
    "Generate threat report",
    "Check server health",
    "Update firewall rules",
    "Enable surveillance mode"
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("");
    }
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Handle voice recognition logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyber-purple bg-clip-text text-transparent matrix-text">
            AI Assistant & Chatbot
          </h1>
          <p className="text-muted-foreground mt-1">Your intelligent cybersecurity companion</p>
        </div>
        <div className="flex space-x-3">
          <CyberButton variant="cyber" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </CyberButton>
          <CyberButton 
            variant={isSpeaking ? "neon" : "outline"} 
            size="sm"
            onClick={() => setIsSpeaking(!isSpeaking)}
          >
            {isSpeaking ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
            Voice {isSpeaking ? "On" : "Off"}
          </CyberButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Avatar Panel */}
        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-accent">
              <Bot className="w-5 h-5" />
              <span>AI Avatar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            {/* AI Avatar Visualization */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary/30 to-cyber-purple/30 border border-primary/50 flex items-center justify-center cyber-glow">
                <Bot className="w-16 h-16 text-primary animate-pulse-glow" />
              </div>
              
              {/* Animated rings */}
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-ping" />
                  <div className="absolute inset-0 rounded-full border-2 border-accent/20 animate-ping" style={{ animationDelay: "0.5s" }} />
                </>
              )}
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-lg font-bold text-primary matrix-text">AiBoO Assistant</h3>
              <p className="text-sm text-muted-foreground">
                {isListening ? "Listening..." : "Ready to help"}
              </p>
            </div>
            
            {/* Voice Controls */}
            <div className="flex space-x-2 w-full">
              <CyberButton 
                variant={isListening ? "neon" : "outline"}
                className="flex-1"
                onClick={handleVoiceToggle}
              >
                {isListening ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
                {isListening ? "Stop" : "Talk"}
              </CyberButton>
            </div>
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="cyber-border bg-card/80 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <MessageSquare className="w-5 h-5" />
              <span>Chat Interface</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <div className="h-80 bg-muted/30 rounded-lg p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.type === "user" 
                        ? "bg-primary/20 text-primary" 
                        : "bg-accent/20 text-accent"
                    }`}>
                      {msg.type === "user" ? 
                        <User className="w-4 h-4" /> : 
                        <Bot className="w-4 h-4" />
                      }
                    </div>
                    <div className={`p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-primary/20 border border-primary/30"
                        : "bg-muted/50 border border-accent/30"
                    }`}>
                      <p className="text-sm text-foreground">{msg.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me about security status, run commands, or get assistance..."
                className="flex-1 bg-input/50 border-primary/30 focus:border-primary"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <CyberButton onClick={handleSendMessage} size="sm">
                <Send className="w-4 h-4" />
              </CyberButton>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Commands */}
      <Card className="cyber-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyber-purple">
            <MessageSquare className="w-5 h-5" />
            <span>Quick Commands</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickCommands.map((command, index) => (
              <CyberButton 
                key={index}
                variant="hologram" 
                className="justify-start text-left h-auto p-3"
                onClick={() => setMessage(command)}
              >
                {command}
              </CyberButton>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assistant;