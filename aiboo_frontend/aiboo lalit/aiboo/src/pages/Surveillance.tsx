import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CyberButton } from "@/components/ui/cyber-button";
import { 
  Eye, 
  Camera, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle,
  Users,
  Settings
} from "lucide-react";

const Surveillance = () => {
  const cameras = [
    { id: 1, name: "Main Entrance", location: "Building A", status: "active", alerts: 0 },
    { id: 2, name: "Server Room", location: "Data Center", status: "active", alerts: 1 },
    { id: 3, name: "Parking Lot", location: "Exterior", status: "active", alerts: 0 },
    { id: 4, name: "Emergency Exit", location: "Building B", status: "offline", alerts: 0 },
    { id: 5, name: "Reception Area", location: "Lobby", status: "active", alerts: 0 },
    { id: 6, name: "Warehouse", location: "Storage", status: "active", alerts: 2 }
  ];

  const recentAlerts = [
    { id: 1, camera: "Server Room", type: "Motion Detected", time: "2 min ago", severity: "medium" },
    { id: 2, camera: "Warehouse", type: "Unauthorized Access", time: "15 min ago", severity: "high" },
    { id: 3, camera: "Warehouse", type: "Face Recognition Match", time: "18 min ago", severity: "low" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-cyber-purple bg-clip-text text-transparent matrix-text">
            Surveillance Center
          </h1>
          <p className="text-muted-foreground mt-1">AI-powered monitoring and threat detection</p>
        </div>
        <div className="flex space-x-3">
          <CyberButton variant="cyber" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View All
          </CyberButton>
          <CyberButton variant="neon" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </CyberButton>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map((camera) => (
          <Card key={camera.id} className="cyber-border bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-primary" />
                  <span>{camera.name}</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  {camera.alerts > 0 && (
                    <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-xs">
                      {camera.alerts} Alert{camera.alerts > 1 ? 's' : ''}
                    </Badge>
                  )}
                  <div className={`w-2 h-2 rounded-full ${
                    camera.status === 'active' ? 'bg-success animate-pulse-glow' : 'bg-destructive'
                  }`} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{camera.location}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Video Feed Placeholder */}
              <div className="aspect-video bg-muted/30 rounded-lg relative overflow-hidden cyber-border">
                <div className="absolute inset-0 flex items-center justify-center">
                  {camera.status === 'active' ? (
                    <div className="text-center space-y-2">
                      <Eye className="w-8 h-8 text-primary mx-auto animate-pulse-glow" />
                      <p className="text-xs text-muted-foreground">Live Feed</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <Camera className="w-8 h-8 text-destructive mx-auto" />
                      <p className="text-xs text-destructive">Offline</p>
                    </div>
                  )}
                </div>
                
                {/* Recording indicator */}
                {camera.status === 'active' && (
                  <div className="absolute top-2 left-2 flex items-center space-x-1 bg-destructive/20 rounded px-2 py-1">
                    <div className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" />
                    <span className="text-xs text-destructive">REC</span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex space-x-2">
                <CyberButton variant="outline" size="sm" disabled={camera.status !== 'active'}>
                  <Play className="w-3 h-3" />
                </CyberButton>
                <CyberButton variant="outline" size="sm" disabled={camera.status !== 'active'}>
                  <Pause className="w-3 h-3" />
                </CyberButton>
                <CyberButton variant="outline" size="sm" disabled={camera.status !== 'active'}>
                  <RotateCcw className="w-3 h-3" />
                </CyberButton>
                <CyberButton variant="ghost" size="sm" className="ml-auto">
                  <Settings className="w-3 h-3" />
                </CyberButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              <span>Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-primary/20">
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant={alert.severity === "high" ? "destructive" : alert.severity === "medium" ? "secondary" : "outline"}
                      className="text-xs"
                    >
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium">{alert.type}</p>
                      <p className="text-xs text-muted-foreground">{alert.camera}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recognition Stats */}
        <Card className="cyber-border bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-accent">
              <Users className="w-5 h-5" />
              <span>AI Recognition Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                <span className="text-sm">Face Recognition</span>
                <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                <span className="text-sm">Motion Detection</span>
                <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                <span className="text-sm">Anomaly Detection</span>
                <Badge className="bg-warning/20 text-warning border-warning/30">Learning</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                <span className="text-sm">Object Tracking</span>
                <Badge className="bg-success/20 text-success border-success/30">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Surveillance;