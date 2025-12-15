import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CyberButton } from "@/components/ui/cyber-button";
import { 
  Lock, 
  Unlock, 
  Shield, 
  Key, 
  Users, 
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle
} from "lucide-react";

const Security = () => {
  const digitalGates = [
    { id: 1, name: "Main Firewall", status: "secured", type: "Network", lastCheck: "2 min ago" },
    { id: 2, name: "Database Access", status: "secured", type: "Database", lastCheck: "5 min ago" },
    { id: 3, name: "API Gateway", status: "at-risk", type: "Application", lastCheck: "1 min ago" },
    { id: 4, name: "Admin Panel", status: "secured", type: "Web", lastCheck: "3 min ago" },
    { id: 5, name: "File Server", status: "unsecured", type: "Storage", lastCheck: "8 min ago" },
    { id: 6, name: "Email Server", status: "secured", type: "Communication", lastCheck: "4 min ago" }
  ];

  const accessControls = [
    { user: "admin@company.com", role: "Super Admin", permissions: ["Full Access"], status: "active" },
    { user: "security@company.com", role: "Security Officer", permissions: ["Security Panel", "Reports"], status: "active" },
    { user: "developer@company.com", role: "Developer", permissions: ["API Access", "Dev Tools"], status: "active" },
    { user: "guest@company.com", role: "Guest", permissions: ["Read Only"], status: "inactive" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "secured":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "unsecured":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "at-risk":
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      default:
        return <Lock className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "secured":
        return <Badge className="bg-success/20 text-success border-success/30">Secured</Badge>;
      case "unsecured":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Unsecured</Badge>;
      case "at-risk":
        return <Badge className="bg-warning/20 text-warning border-warning/30">At Risk</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyber-purple bg-clip-text text-transparent matrix-text">
            Security Center & Digital Lock Gates
          </h1>
          <p className="text-muted-foreground mt-1">Holographic representation of system security states</p>
        </div>
        <div className="flex space-x-3">
          <CyberButton variant="cyber" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Secure All
          </CyberButton>
          <CyberButton variant="neon" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </CyberButton>
        </div>
      </div>

      {/* Digital Lock Gates */}
      <Card className="cyber-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <Lock className="w-5 h-5" />
            <span>Digital Lock Gates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalGates.map((gate) => (
              <Card key={gate.id} className="cyber-border bg-muted/30 hover:bg-muted/40 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(gate.status)}
                      <div>
                        <h3 className="font-medium text-foreground">{gate.name}</h3>
                        <p className="text-xs text-muted-foreground">{gate.type}</p>
                      </div>
                    </div>
                    {getStatusBadge(gate.status)}
                  </div>
                  
                  {/* Holographic Gate Visualization */}
                  <div className="relative h-32 bg-background/50 rounded-lg border border-primary/30 mb-4 overflow-hidden">
                    <div className="absolute inset-0 holographic-bg" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {gate.status === "secured" ? (
                        <Lock className="w-12 h-12 text-success animate-pulse-glow" />
                      ) : gate.status === "unsecured" ? (
                        <Unlock className="w-12 h-12 text-destructive animate-pulse" />
                      ) : (
                        <AlertTriangle className="w-12 h-12 text-warning animate-pulse" />
                      )}
                    </div>
                    
                    {/* Animated security lines */}
                    {gate.status === "secured" && (
                      <div className="absolute inset-0">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute bg-success/30 h-px animate-pulse-glow"
                            style={{
                              width: "100%",
                              top: `${25 + (i * 15)}%`,
                              animationDelay: `${i * 0.3}s`
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>Last Check: {gate.lastCheck}</span>
                  </div>
                  
                  <CyberButton 
                    variant={gate.status === "secured" ? "outline" : "neon"} 
                    size="sm" 
                    className="w-full"
                  >
                    {gate.status === "secured" ? (
                      <>
                        <Shield className="w-3 h-3 mr-2" />
                        Maintain
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 mr-2" />
                        Secure Now
                      </>
                    )}
                  </CyberButton>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Access Control Panel */}
        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-accent">
              <Users className="w-5 h-5" />
              <span>Access Control</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accessControls.map((control, index) => (
                <div key={index} className="p-3 rounded-lg bg-muted/30 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Key className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{control.user}</span>
                    </div>
                    <Badge 
                      className={control.status === "active" 
                        ? "bg-success/20 text-success border-success/30" 
                        : "bg-muted text-muted-foreground"
                      }
                    >
                      {control.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{control.role}</p>
                  <p className="text-xs text-muted-foreground">{control.permissions.join(", ")}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Metrics */}
        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-cyber-purple">
              <Shield className="w-5 h-5" />
              <span>Security Metrics</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Security Score</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-muted/30 rounded-full h-2">
                    <div className="h-2 rounded-full bg-success w-3/4" />
                  </div>
                  <span className="text-sm font-bold text-success matrix-text">85%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Active Firewalls</span>
                <span className="text-sm font-bold text-primary matrix-text">12/14</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Encrypted Connections</span>
                <span className="text-sm font-bold text-success matrix-text">98%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Failed Login Attempts</span>
                <span className="text-sm font-bold text-warning matrix-text">23</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Last Security Audit</span>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Security;