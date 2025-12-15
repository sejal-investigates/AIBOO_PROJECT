import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Activity, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Server,
  Eye,
  Bug,
  MessageSquare,
  Lock
} from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { Progress } from "@/components/ui/progress";

export const Dashboard = () => {
  const [activeThreats] = useState(3);
  const [systemHealth] = useState(98);
  const [activeUsers] = useState(1247);
  const [vulnerabilities] = useState(12);

  const recentThreats = [
    { id: 1, type: "Malware", severity: "High", target: "Web Server 3", time: "2 min ago" },
    { id: 2, type: "Phishing", severity: "Medium", target: "Email Gateway", time: "15 min ago" },
    { id: 3, type: "Brute Force", severity: "Low", target: "SSH Service", time: "1 hour ago" },
  ];

  const aiRecommendations = [
    "Update firewall rules for port 443",
    "Patch critical vulnerability in Apache server",
    "Review user access permissions for admin accounts",
    "Implement rate limiting on API endpoints"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyber-purple bg-clip-text text-transparent matrix-text">
            Security Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Real-time threat monitoring and system analytics</p>
        </div>
        <div className="flex space-x-3">
          <CyberButton variant="cyber" size="sm">
            <Activity className="w-4 h-4 mr-2" />
            Live Scan
          </CyberButton>
          <CyberButton variant="neon" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Generate Report
          </CyberButton>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Threats</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive matrix-text">{activeThreats}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              +2 from last hour
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">System Health</CardTitle>
            <Activity className="h-4 w-4 text-success animate-pulse-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success matrix-text">{systemHealth}%</div>
            <Progress value={systemHealth} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
            <Users className="h-4 w-4 text-primary animate-pulse-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary matrix-text">{activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across 12 systems
            </p>
          </CardContent>
        </Card>

        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Vulnerabilities</CardTitle>
            <Bug className="h-4 w-4 text-warning animate-pulse-glow" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning matrix-text">{vulnerabilities}</div>
            <p className="text-xs text-muted-foreground">
              3 critical, 9 medium
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Threats */}
        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <AlertTriangle className="w-5 h-5" />
              <span>Recent Threats</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentThreats.map((threat) => (
                <div key={threat.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={threat.severity === "High" ? "destructive" : threat.severity === "Medium" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {threat.severity}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{threat.type}</p>
                      <p className="text-xs text-muted-foreground">{threat.target}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{threat.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-accent">
              <MessageSquare className="w-5 h-5" />
              <span>AI Security Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiRecommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 animate-pulse-glow" />
                  <p className="text-sm flex-1">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Modules */}
      <Card className="cyber-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-primary">Quick Access</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CyberButton variant="hologram" className="h-20 flex-col space-y-2">
              <Server className="w-6 h-6" />
              <span className="text-xs">Server Center</span>
            </CyberButton>
            <CyberButton variant="hologram" className="h-20 flex-col space-y-2">
              <Eye className="w-6 h-6" />
              <span className="text-xs">Surveillance</span>
            </CyberButton>
            <CyberButton variant="hologram" className="h-20 flex-col space-y-2">
              <Bug className="w-6 h-6" />
              <span className="text-xs">Pen Testing</span>
            </CyberButton>
            <CyberButton variant="hologram" className="h-20 flex-col space-y-2">
              <Lock className="w-6 h-6" />
              <span className="text-xs">Digital Gates</span>
            </CyberButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};