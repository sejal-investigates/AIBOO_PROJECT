import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CyberButton } from "@/components/ui/cyber-button";
import { 
  Server, 
  Wifi, 
  WifiOff, 
  Shield, 
  AlertTriangle, 
  Activity,
  Scan,
  Download
} from "lucide-react";

const ServerCenter = () => {
  const servers = [
    { id: 1, name: "Web Server 01", ip: "192.168.1.100", status: "online", security: "secure", load: 65 },
    { id: 2, name: "Database Server", ip: "192.168.1.101", status: "online", security: "secure", load: 42 },
    { id: 3, name: "API Gateway", ip: "192.168.1.102", status: "online", security: "at-risk", load: 78 },
    { id: 4, name: "File Server", ip: "192.168.1.103", status: "offline", security: "unknown", load: 0 },
    { id: 5, name: "Backup Server", ip: "192.168.1.104", status: "online", security: "secure", load: 23 },
    { id: 6, name: "Mail Server", ip: "192.168.1.105", status: "online", security: "at-risk", load: 56 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <Wifi className="w-4 h-4 text-success" />;
      case "offline":
        return <WifiOff className="w-4 h-4 text-destructive" />;
      default:
        return <Activity className="w-4 h-4 text-warning" />;
    }
  };

  const getSecurityBadge = (security: string) => {
    switch (security) {
      case "secure":
        return <Badge className="bg-success/20 text-success border-success/30">Secure</Badge>;
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
            Server Connection Center
          </h1>
          <p className="text-muted-foreground mt-1">Monitor and manage all connected servers</p>
        </div>
        <div className="flex space-x-3">
          <CyberButton variant="cyber" size="sm">
            <Scan className="w-4 h-4 mr-2" />
            Scan All
          </CyberButton>
          <CyberButton variant="neon" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Deploy Patches
          </CyberButton>
        </div>
      </div>

      {/* Server Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <Card key={server.id} className="cyber-border bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Server className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{server.name}</span>
                </CardTitle>
                {getStatusIcon(server.status)}
              </div>
              <p className="text-sm text-muted-foreground font-mono">{server.ip}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Security Status</span>
                {getSecurityBadge(server.security)}
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">CPU Load</span>
                  <span className="matrix-text">{server.load}%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      server.load > 80 ? 'bg-destructive' :
                      server.load > 60 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${server.load}%` }}
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <CyberButton variant="outline" size="sm" className="flex-1">
                  <Shield className="w-3 h-3 mr-1" />
                  Scan
                </CyberButton>
                <CyberButton 
                  variant="ghost" 
                  size="sm" 
                  className="flex-1"
                  disabled={server.status === "offline"}
                >
                  <Activity className="w-3 h-3 mr-1" />
                  Monitor
                </CyberButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Map */}
      <Card className="cyber-border bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <Activity className="w-5 h-5" />
            <span>Network Topology</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="text-center space-y-4">
              <Activity className="w-16 h-16 text-primary mx-auto animate-pulse-glow" />
              <p className="text-muted-foreground">Interactive network map coming soon</p>
              <p className="text-sm text-muted-foreground">Visualize server connections and data flow</p>
            </div>
            
            {/* Animated network lines */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-primary rounded-full animate-pulse-glow"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${30 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServerCenter;