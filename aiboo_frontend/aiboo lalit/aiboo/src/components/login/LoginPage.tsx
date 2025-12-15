import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CyberButton } from "@/components/ui/cyber-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, EyeOff, Fingerprint } from "lucide-react";
import { toast } from "sonner";
import cyberHero from "@/assets/cyber-hero.jpg";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [twoFA, setTwoFA] = useState("");
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username.trim()) {
      toast.error("Please enter your username");
      return;
    }
    
    if (!password.trim()) {
      toast.error("Please enter your password");
      return;
    }
    
    // Simulate authentication
    setStep("2fa");
    toast.success("Credentials verified. Enter 2FA code.");
  };

  const handleTwoFA = () => {
    if (!twoFA || twoFA.length !== 6) {
      toast.error("Please enter a valid 6-digit 2FA code");
      return;
    }
    
    // Simulate 2FA verification
    toast.success("Authentication successful! Welcome to AiBoO");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cyber Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${cyberHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
      
      {/* Animated Elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-accent rounded-full animate-pulse-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-cyber-purple rounded-full animate-pulse-glow" style={{ animationDelay: "2s" }} />
      
      {/* Scan Line Effect */}
      <div className="absolute inset-0 scan-effect pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md p-6">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 mb-4">
            <Shield className="w-12 h-12 text-primary animate-pulse-glow" />
            <h1 className="text-4xl font-bold matrix-text bg-gradient-to-r from-primary to-cyber-purple bg-clip-text text-transparent">
              AiBoO
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">
            AI-Powered Cybersecurity Platform
          </p>
        </div>

        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <Lock className="w-5 h-5" />
              <span>{step === "credentials" ? "Secure Access" : "Two-Factor Authentication"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === "credentials" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-input/50 border-primary/30 focus:border-primary transition-all duration-300"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                  {/* Demo credentials helper */}
                  <p className="text-xs text-muted-foreground">
                    Demo: Use any username and password
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-input/50 border-primary/30 focus:border-primary pr-10 transition-all duration-300"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <CyberButton 
                  variant="cyber" 
                  className="w-full" 
                  onClick={handleLogin}
                  disabled={!username.trim() || !password.trim()}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Authenticate
                </CyberButton>
                
                {/* Quick Demo Login */}
                <CyberButton 
                  variant="outline" 
                  className="w-full text-xs" 
                  onClick={() => {
                    setUsername("demo@aiboo.com");
                    setPassword("secure123");
                    toast.success("Demo credentials filled!");
                  }}
                >
                  Fill Demo Credentials
                </CyberButton>
              </>
            ) : (
              <>
                <div className="text-center space-y-4">
                  <Fingerprint className="w-16 h-16 text-primary mx-auto animate-pulse-glow" />
                  <p className="text-sm text-muted-foreground">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="2fa" className="text-foreground">2FA Code</Label>
                  <Input
                    id="2fa"
                    type="text"
                    value={twoFA}
                    onChange={(e) => setTwoFA(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="bg-input/50 border-primary/30 focus:border-primary text-center text-xl tracking-widest matrix-text"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>

                <div className="flex space-x-3">
                  <CyberButton 
                    variant="outline" 
                    className="flex-1" 
                    onClick={() => setStep("credentials")}
                  >
                    Back
                  </CyberButton>
                  <CyberButton 
                    variant="neon" 
                    className="flex-1" 
                    onClick={handleTwoFA}
                  >
                    <Fingerprint className="w-4 h-4 mr-2" />
                    Verify
                  </CyberButton>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Digital Lock Gates Animation */}
        <div className="mt-8 flex justify-center space-x-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 bg-gradient-to-t from-primary/30 to-primary/80 rounded-full animate-pulse-glow"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          © 2024 AiBoO Security Systems. All rights reserved.
        </p>
      </div>
    </div>
  );
};