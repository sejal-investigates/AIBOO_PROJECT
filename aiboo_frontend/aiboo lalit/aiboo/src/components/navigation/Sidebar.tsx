import { NavLink, useLocation } from "react-router-dom";
import { 
  Shield, 
  LayoutDashboard, 
  Server, 
  Eye, 
  Bug, 
  Lock, 
  MessageSquare,
  LogOut,
  Settings
} from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";
import { cn } from "@/lib/utils";

const navigationItems = [
  { 
    title: "Dashboard", 
    href: "/dashboard", 
    icon: LayoutDashboard,
    description: "Security Overview"
  },
  { 
    title: "Server Center", 
    href: "/servers", 
    icon: Server,
    description: "Connection Hub"
  },
  { 
    title: "Surveillance", 
    href: "/surveillance", 
    icon: Eye,
    description: "Live Monitoring"
  },
  { 
    title: "Pen Testing", 
    href: "/pentest", 
    icon: Bug,
    description: "Vulnerability Tests"
  },
  { 
    title: "Digital Gates", 
    href: "/security", 
    icon: Lock,
    description: "Access Control"
  },
  { 
    title: "AI Assistant", 
    href: "/assistant", 
    icon: MessageSquare,
    description: "Virtual Support"
  },
];

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="w-64 h-screen bg-card/80 backdrop-blur-sm border-r border-primary/30 flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-primary/30">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-primary animate-pulse-glow" />
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-cyber-purple bg-clip-text text-transparent matrix-text">
              AiBoO
            </h2>
            <p className="text-xs text-muted-foreground">Security Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group relative overflow-hidden",
                active 
                  ? "bg-primary/20 text-primary border border-primary/30 cyber-glow" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:border-primary/20 border border-transparent"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 transition-all duration-300",
                active ? "animate-pulse-glow" : "group-hover:text-primary"
              )} />
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium",
                  active ? "matrix-text" : ""
                )}>
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              
              {/* Active indicator */}
              {active && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-cyber-purple" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-primary/30 space-y-2">
        <CyberButton variant="ghost" className="w-full justify-start" size="sm">
          <Settings className="w-4 h-4 mr-3" />
          Settings
        </CyberButton>
        <CyberButton variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" size="sm">
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </CyberButton>
      </div>

      {/* Status Indicator */}
      <div className="p-4 bg-muted/30">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse-glow" />
          <span className="text-xs text-muted-foreground">System Secure</span>
        </div>
      </div>
    </div>
  );
};