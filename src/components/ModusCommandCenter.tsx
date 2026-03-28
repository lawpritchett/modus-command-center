"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  Menu,
  X,
  Home,
  Inbox,
  CheckSquare,
  Users,
  Building2,
  TrendingUp,
  Zap,
  Calendar,
  ChevronDown,
  Plus,
  Filter,
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
  Circle,
  ArrowRight,
  Trash2,
  Flag,
  MessageSquare,
  Phone,
  Mail,
  Shield,
  Archive,
  Send,
  Pause,
  Play,
  Target,
  Layers,
  Lightbulb,
  MapPin,
  DollarSign,
  RefreshCw,
  ChevronRight,
  MoreVertical,
  Tag,
  User2,
  Briefcase,
} from "lucide-react";

// Type Definitions
interface Priority {
  id: number;
  text: string;
  priority: "critical" | "high";
}

interface WeekPriority {
  id: number;
  text: string;
  owner: string;
}

interface StrategicInitiative {
  id: number;
  name: string;
  status: string;
  progress: number;
  description: string;
}

interface Blocker {
  id: number;
  text: string;
  type: "blocker" | "waiting";
  age: string;
}

interface DelegatedTask {
  id: number;
  task: string;
  owner: string;
  daysAgo: number;
  status: "in-progress" | "overdue" | "complete";
}

interface RelationshipToday {
  id: number;
  name: string;
  role: string;
  context: string;
  lastContact: string;
}

interface Deal {
  id: number;
  name: string;
  location: string;
  units: string;
  value: string;
  counterparty: string;
  stage: string;
  risk: "low" | "medium" | "high";
  nextAction: string;
}

interface Recruit {
  id: number;
  name: string;
  source: string;
  strength: number;
  fitScore: number;
  lastTouch: string;
  nextAction: string;
}

interface Relationship {
  id: number;
  name: string;
  role: string;
  company: string;
  strength: number;
  lastContact: string;
  value: "strategic" | "critical" | "high" | "medium" | "low";
  nextTouch: string;
}

interface Idea {
  id: number;
  title: string;
  description: string;
  stage: "Raw" | "Exploring" | "Scoping" | "Building" | "Active" | "Archived";
  impact: "high" | "medium" | "low";
  effort: "high" | "medium" | "low";
  fit: "critical" | "high" | "medium" | "low";
}

interface SweepItem {
  id: number;
  title: string;
  category: string;
  recommendation: string;
}

interface DelegationItem {
  id: number;
  task: string;
  owner: string;
  dueDate: string;
  status: "assigned" | "in-progress" | "waiting" | "overdue" | "complete";
  daysActive: number;
  importance: "critical" | "high" | "medium";
  lastActivity: string;
}

interface EnergyBlock {
  time: string;
  label: string;
  color: string;
  icon: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className: string }>;
}

interface CaptureFeedback {
  input: string;
  classification: {
    urgency: string;
    priority: string;
    category: string;
    action: string;
    delegate: boolean;
  };
}

interface PipelineStats {
  total: number;
  deals: number;
  avgDeal: number;
}

interface DelegationStats {
  total: number;
  onTrack: number;
  atRisk: number;
  overdue: number;
}

interface RecentCapture {
  text: string;
  category: string;
  time: string;
}

const ModusCommandCenter = () => {
  const [activeView, setActiveView] = useState<string>("command-center");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [captureInput, setCaptureInput] = useState<string>("");
  const [captureTags, setCaptureTags] = useState<string[]>([]);
  const [showCaptureFeedback, setShowCaptureFeedback] = useState<CaptureFeedback | null>(null);
  const [todayCheckmarks, setTodayCheckmarks] = useState<Record<number, boolean>>({});
  const [sweepIndex, setSweepIndex] = useState<number>(0);
  const [delegationFilter, setDelegationFilter] = useState<string>("all");
  const [taskFilter, setTaskFilter] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "morning" : currentHour < 18 ? "afternoon" : "evening";
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  // Sample Data
  const topPriorities: Priority[] = [
    { id: 1, text: "Close Mueller site acquisition â legal review needed", priority: "critical" },
    { id: 2, text: "Q2 budget review with CFO", priority: "high" },
    { id: 3, text: "Interview 3 top agent candidates", priority: "high" },
  ];

  const weekPriorities: WeekPriority[] = [
    { id: 1, text: "Mueller acquisition close â conditional due diligence", owner: "Sarah Chen" },
    { id: 2, text: "Domain mixed-use site negotiation â value engineering call", owner: "Marcus Reid" },
    { id: 3, text: "East Austin 50-unit renovation â contractor bid evaluation", owner: "Jessica Park" },
    { id: 4, text: "Agent onboarding for South Congress team launch", owner: "Kyle Thompson" },
    { id: 5, text: "Investor relations call â quarterly update prep", owner: "David" },
  ];

  const strategicInitiatives: StrategicInitiative[] = [
    { id: 1, name: "Mueller Central Development", status: "active", progress: 75, description: "Mixed-use development, 200+ units" },
    { id: 2, name: "South Congress Brokerage Launch", status: "in-progress", progress: 60, description: "New team, recruitment phase" },
    { id: 3, name: "East Austin Renovation Portfolio", status: "active", progress: 45, description: "4 properties, $12M value" },
    { id: 4, name: "Tech Integration Initiative", status: "planning", progress: 20, description: "CRM + deal management system" },
  ];

  const blockers: Blocker[] = [
    { id: 1, text: "Mueller land title clarification â county records pending", type: "blocker", age: "3 days" },
    { id: 2, text: "Waiting for agent term sheet feedback â Chase Martinez", type: "waiting", age: "2 days" },
    { id: 3, text: "Financing contingency documentation â lender checklist incomplete", type: "blocker", age: "1 day" },
  ];

  const delegatedTasks: DelegatedTask[] = [
    { id: 1, task: "Prepare Mueller due diligence report", owner: "Sarah Chen", daysAgo: 1, status: "in-progress" },
    { id: 2, task: "Schedule agent interviews â South Congress team", owner: "Kyle Thompson", daysAgo: 3, status: "overdue" },
    { id: 3, task: "East Austin contractor bid analysis", owner: "Jessica Park", daysAgo: 0, status: "in-progress" },
  ];

  const relationshipsToday: RelationshipToday[] = [
    { id: 1, name: "David Lamm", role: "Investor / Partner", context: "Quarterly touchpoint â Mueller updates", lastContact: "March 15" },
    { id: 2, name: "Sarah Chen", role: "Legal Counsel", context: "Title review sign-off needed", lastContact: "Today" },
    { id: 3, name: "Marcus Reid", role: "Development Manager", context: "Domain negotiation strategy", lastContact: "March 26" },
  ];

  const deals: Deal[] = [
    { id: 1, name: "Mueller Central Development", location: "Mueller, Austin", units: "200+ mixed-use", value: "$45M", counterparty: "City of Austin", stage: "Negotiating", risk: "medium", nextAction: "Title review" },
    { id: 2, name: "Domain Mixed-Use Site", location: "The Domain, Austin", units: "85 residential + retail", value: "$32M", counterparty: "Endeavor Real Estate", stage: "Evaluating", risk: "low", nextAction: "Value engineering" },
    { id: 3, name: "East Austin Renovation Portfolio", location: "East Austin", units: "4 properties, 50 units", value: "$12M", counterparty: "Private owners", stage: "Under Contract", risk: "medium", nextAction: "Contractor selection" },
    { id: 4, name: "South Congress Land Play", location: "South Congress", units: "Land, development potential", value: "$8.5M", counterparty: "Martinez Family Trust", stage: "Lead", risk: "high", nextAction: "Initial meeting" },
    { id: 5, name: "Lakeway Office Campus", location: "Lakeway, Austin", units: "120K SF office", value: "$28M", counterparty: "Pinnacle Properties", stage: "Closed", risk: "low", nextAction: "Asset management" },
  ];

  const recruits: Recruit[] = [
    { id: 1, name: "Chase Martinez", source: "Referral - David Lamm", strength: 5, fitScore: 92, lastTouch: "March 26", nextAction: "Offer negotiation" },
    { id: 2, name: "Emma Torres", source: "LinkedIn", strength: 3, fitScore: 78, lastTouch: "March 24", nextAction: "Second interview" },
    { id: 3, name: "James Wilson", source: "Brokerage recruit", strength: 4, fitScore: 85, lastTouch: "March 20", nextAction: "Reference checks" },
    { id: 4, name: "Priya Patel", source: "University of Texas networking", strength: 2, fitScore: 68, lastTouch: "March 15", nextAction: "First meeting" },
  ];

  const relationships: Relationship[] = [
    { id: 1, name: "David Lamm", role: "Investor", company: "Lamm Capital Partners", strength: 5, lastContact: "March 15", value: "strategic", nextTouch: "April 1" },
    { id: 2, name: "Sarah Chen", role: "Legal Counsel", company: "Chen & Associates Law", strength: 5, lastContact: "Today", value: "critical", nextTouch: "As needed" },
    { id: 3, name: "Marcus Reid", role: "Development Manager", company: "Pritchett Operations", strength: 5, lastContact: "March 26", value: "critical", nextTouch: "Daily" },
    { id: 4, name: "Jessica Park", role: "Project Manager", company: "Pritchett Operations", strength: 4, lastContact: "March 27", value: "high", nextTouch: "Twice weekly" },
    { id: 5, name: "Kyle Thompson", role: "Recruitment Lead", company: "Pritchett Operations", strength: 4, lastContact: "March 27", value: "high", nextTouch: "Twice weekly" },
    { id: 6, name: "Michael Chen", role: "Financing Partner", company: "Austin First Capital", strength: 4, lastContact: "March 20", value: "high", nextTouch: "April 5" },
    { id: 7, name: "Angela Reeves", role: "Broker", company: "Endeavor Real Estate", strength: 3, lastContact: "March 18", value: "medium", nextTouch: "April 10" },
    { id: 8, name: "Tom Bradley", role: "City Council Member", company: "City of Austin", strength: 2, lastContact: "March 10", value: "medium", nextTouch: "April 15" },
  ];

  const ideas: Idea[] = [
    { id: 1, title: "Austin Mixed-Use Urban Model", description: "Repeatable model for Mueller-style developments", stage: "Exploring", impact: "high", effort: "high", fit: "critical" },
    { id: 2, title: "Agent-Tech Integration Platform", description: "Custom CRM + deal tracking for in-house agents", stage: "Scoping", impact: "high", effort: "high", fit: "high" },
    { id: 3, title: "South Congress District Operations Hub", description: "Operations center for SC team expansion", stage: "Building", impact: "medium", effort: "medium", fit: "high" },
    { id: 4, title: "East Austin Renovation Playbook", description: "Documented playbook for 50-unit renovations", stage: "Active", impact: "medium", effort: "low", fit: "high" },
    { id: 5, title: "Real Estate AI Decision Support", description: "ML model for deal scoring and risk assessment", stage: "Raw", impact: "high", effort: "high", fit: "strategic" as any },
    { id: 6, title: "Lakeway Campus Tech Upgrade", description: "Modernize existing office asset", stage: "Raw", impact: "low", effort: "medium", fit: "medium" },
  ];

  const sweepItems: SweepItem[] = [
    { id: 1, title: "Approve Mueller contractor bids (3 options)", category: "decision", recommendation: "Decide now" },
    { id: 2, title: "Review agent onboarding schedule with Kyle", category: "meeting", recommendation: "Delegate" },
    { id: 3, title: "Evaluate alternative financing options â Mueller", category: "analysis", recommendation: "Delegate to Michael Chen" },
    { id: 4, title: "East Austin renovation photo documentation complete", category: "update", recommendation: "Archive" },
    { id: 5, title: "Domain site risk assessment from engineering", category: "decision", recommendation: "Decide now" },
    { id: 6, title: "Schedule quarterly investor call", category: "logistics", recommendation: "Schedule" },
  ];

  const delegationItems: DelegationItem[] = [
    { id: 1, task: "Mueller due diligence report", owner: "Sarah Chen", dueDate: "Mar 30", status: "assigned", daysActive: 3, importance: "critical", lastActivity: "Today" },
    { id: 2, task: "Domain value engineering analysis", owner: "Marcus Reid", dueDate: "Mar 29", status: "in-progress", daysActive: 2, importance: "high", lastActivity: "2 hours ago" },
    { id: 3, task: "Agent interview schedule & materials", owner: "Kyle Thompson", dueDate: "Mar 28", status: "overdue", daysActive: 4, importance: "high", lastActivity: "3 days ago" },
    { id: 4, task: "Contractor bid analysis â East Austin", owner: "Jessica Park", dueDate: "Mar 30", status: "in-progress", daysActive: 1, importance: "high", lastActivity: "Today" },
    { id: 5, task: "Financing documentation checklist", owner: "Sarah Chen", dueDate: "Apr 1", status: "waiting", daysActive: 2, importance: "medium", lastActivity: "Yesterday" },
    { id: 6, task: "South Congress team location scouting", owner: "Kyle Thompson", dueDate: "Apr 5", status: "in-progress", daysActive: 5, importance: "medium", lastActivity: "2 days ago" },
    { id: 7, task: "Mueller title documentation compiled", owner: "Sarah Chen", dueDate: "Mar 27", status: "complete", daysActive: 6, importance: "critical", lastActivity: "Yesterday" },
  ];

  const energyBlocks: EnergyBlock[] = [
    { time: "5:30-8:00 AM", label: "Deep Work", color: "bg-blue-900", icon: "â¡" },
    { time: "8:00-10:00 AM", label: "Team & Delegation", color: "bg-green-600", icon: "ð¥" },
    { time: "10:00-12:00 PM", label: "Relationships & Revenue", color: "bg-amber-500", icon: "ð¤" },
    { time: "12:00-1:00 PM", label: "Lunch / Reset", color: "bg-gray-400", icon: "ð¥" },
    { time: "1:00-3:00 PM", label: "Operations & Decisions", color: "bg-purple-600", icon: "âï¸" },
    { time: "3:00-5:00 PM", label: "Recruiting & Partnerships", color: "bg-teal-500", icon: "ð¯" },
    { time: "5:00-5:30 PM", label: "End-of-Day Closeout", color: "bg-red-500", icon: "â" },
    { time: "5:30 PM+", label: "Family Time", color: "bg-slate-700", icon: "ð " },
  ];

  // Nav Items
  const navItems: NavItem[] = [
    { id: "command-center", label: "Command Center", icon: Home },
    { id: "capture", label: "Capture", icon: Inbox },
    { id: "daily-sweep", label: "Daily Sweep", icon: CheckSquare },
    { id: "delegation", label: "Delegation", icon: Users },
    { id: "deals", label: "Deals & Development", icon: Building2 },
    { id: "recruiting", label: "Recruiting", icon: TrendingUp },
    { id: "relationships", label: "Relationships", icon: Users },
    { id: "ideas", label: "Ideas", icon: Lightbulb },
    { id: "calendar", label: "Calendar & Energy", icon: Calendar },
  ];

  // Helper Functions
  const toggleTopPriority = (id: number) => {
    setTodayCheckmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCapture = () => {
    if (captureInput.trim()) {
      setShowCaptureFeedback({
        input: captureInput,
        classification: {
          urgency: "High",
          priority: "P1",
          category: captureTags.length > 0 ? captureTags[0] : "Task",
          action: "Schedule review with team â impacts Mueller timeline",
          delegate: false,
        },
      });
      setTimeout(() => {
        setCaptureInput("");
        setCaptureTags([]);
        setShowCaptureFeedback(null);
      }, 3000);
    }
  };

  const toggleCaptureTag = (tag: string) => {
    setCaptureTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const navigateSweep = (direction: "next" | "prev") => {
    if (direction === "next" && sweepIndex < sweepItems.length - 1) {
      setSweepIndex(sweepIndex + 1);
    } else if (direction === "prev" && sweepIndex > 0) {
      setSweepIndex(sweepIndex - 1);
    }
  };

  // Filtered and Computed Data
  const filteredDelegationItems = useMemo(() => {
    let filtered = delegationItems;
    if (delegationFilter !== "all") {
      filtered = filtered.filter((item) => item.status === delegationFilter);
    }
    return filtered;
  }, [delegationFilter]);

  const delegationStats = useMemo<DelegationStats>(() => ({
    total: delegationItems.length,
    onTrack: delegationItems.filter((i) => ["assigned", "in-progress"].includes(i.status) && i.importance !== "critical").length,
    atRisk: delegationItems.filter((i) => i.importance === "critical" && i.status !== "complete").length,
    overdue: delegationItems.filter((i) => i.status === "overdue").length,
  }), []);

  const pipelineStats = useMemo<PipelineStats>(() => {
    const total = deals.reduce((sum, deal) => sum + (parseInt(deal.value.replace(/\D/g, "")) || 0), 0);
    return {
      total,
      deals: deals.length,
      avgDeal: Math.round(total / deals.length),
    };
  }, []);

  // View Components
  const CommandCenterView = () => (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-light text-slate-900">Good {greeting}, Lawrence</h1>
          <p className="text-sm text-slate-500 mt-1">{today}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 mb-2">AI Executive Brief</p>
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-md text-sm leading-relaxed text-slate-700">
            Mueller title review on track for this week's close window. Three contractor bids require your decision today. South Congress recruitment heat is building â Chase's offer ready.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Today's Top 3 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Today's Top 3</h2>
            <div className="space-y-3">
              {topPriorities.map((priority) => (
                <div key={priority.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={todayCheckmarks[priority.id] || false}
                    onChange={() => toggleTopPriority(priority.id)}
                    className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        todayCheckmarks[priority.id] ? "line-through text-slate-400" : "text-slate-700"
                      }`}
                    >
                      {priority.text}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded font-medium ${
                      priority.priority === "critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {priority.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* This Week's Top 5 */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">This Week's Top 5</h2>
            <div className="space-y-2">
              {weekPriorities.map((priority, idx) => (
                <div key={priority.id} className="flex items-center gap-3 p-2 text-sm">
                  <span className="text-xs font-semibold text-slate-400">{idx + 1}</span>
                  <div className="flex-1">
                    <p className="text-slate-700">{priority.text}</p>
                    <p className="text-xs text-slate-500">{priority.owner}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Initiatives */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Active Strategic Initiatives</h2>
            <div className="space-y-4">
              {strategicInitiatives.map((init) => (
                <div key={init.id} className="pb-4 border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-900">{init.name}</h3>
                    <span className="text-xs font-semibold text-blue-600">{init.progress}%</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{init.description}</p>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${init.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          {/* Blockers & Waiting */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Blockers & Waiting</h2>
            <div className="space-y-3">
              {blockers.map((blocker) => (
                <div key={blocker.id} className="p-3 rounded-lg bg-slate-50 border-l-2 border-red-400">
                  <p className="text-xs font-semibold text-red-700 mb-1">{blocker.type.toUpperCase()}</p>
                  <p className="text-sm text-slate-700">{blocker.text}</p>
                  <p className="text-xs text-slate-500 mt-2">{blocker.age} old</p>
                </div>
              ))}
            </div>
          </div>

          {/* Overdue Delegated */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Overdue Delegated</h2>
            <div className="space-y-3">
              {delegatedTasks
                .filter((t) => t.status === "overdue")
                .map((task) => (
                  <div key={task.id} className="p-3 rounded-lg bg-amber-50">
                    <p className="text-sm font-medium text-slate-900">{task.task}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-slate-600">{task.owner}</p>
                      <span className="text-xs font-semibold text-amber-700">{task.daysAgo}d ago</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Relationships to Touch */}
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Relationships to Touch</h2>
            <div className="space-y-3">
              {relationshipsToday.map((rel) => (
                <div key={rel.id} className="p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100">
                  <p className="font-medium text-slate-900 text-sm">{rel.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{rel.role}</p>
                  <p className="text-xs text-slate-600 mt-2">{rel.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Revenue Pipeline Summary</h2>
          <div className="space-y-3">
            {deals.slice(0, 3).map((deal) => (
              <div key={deal.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div>
                  <p className="font-medium text-slate-900 text-sm">{deal.name}</p>
                  <p className="text-xs text-slate-500">{deal.value}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">{deal.stage}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
            <p className="text-xs text-slate-600 mb-1">Total Pipeline Value</p>
            <p className="text-2xl font-semibold text-blue-600">${pipelineStats.total}M</p>
            <p className="text-xs text-slate-500 mt-1">{pipelineStats.deals} active deals</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50">
              <p className="text-xs text-slate-600 mb-1">Open Tasks</p>
              <p className="text-3xl font-light text-slate-900">18</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50">
              <p className="text-xs text-slate-600 mb-1">Delegated Items</p>
              <p className="text-3xl font-light text-slate-900">7</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50">
              <p className="text-xs text-slate-600 mb-1">Ideas in Pipeline</p>
              <p className="text-3xl font-light text-slate-900">6</p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50">
              <p className="text-xs text-slate-600 mb-1">Active Deals</p>
              <p className="text-3xl font-light text-slate-900">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CaptureView = () => (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-4xl font-light text-slate-900 mb-2">Capture</h1>
        <p className="text-slate-600">Your unfiltered input. We'll organize it.</p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-8">
        <textarea
          value={captureInput}
          onChange={(e) => setCaptureInput(e.target.value)}
          placeholder="What's on your mind, Lawrence?"
          className="w-full h-40 text-lg focus:outline-none resize-none font-light"
        />

        <div className="mt-6 pt-6 border-t border-slate-200">
          <p className="text-xs font-semibold text-slate-600 mb-3">Quick Tag</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Task", "Idea", "Delegation", "Follow-up", "Deal", "Relationship", "Meeting Note"].map((tag) => (
              <button
                key={tag}
                onClick={() => toggleCaptureTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  captureTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <button
            onClick={handleCapture}
            disabled={!captureInput.trim()}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed"
          >
            Capture & Classify
          </button>
        </div>
      </div>

      {showCaptureFeedback && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 animate-in fade-in">
          <div className="flex items-start gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900">Captured & Classified</h3>
              <p className="text-sm text-green-800 mt-1">"{showCaptureFeedback.input}"</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-slate-600 mb-1">Urgency</p>
              <p className="font-semibold text-slate-900">{showCaptureFeedback.classification.urgency}</p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <p className="text-xs text-slate-600 mb-1">Priority</p>
              <p className="font-semibold text-slate-900">{showCaptureFeedback.classification.priority}</p>
            </div>
            <div className="bg-white rounded-lg p-3 col-span-2">
              <p className="text-xs text-slate-600 mb-1">Suggested Action</p>
              <p className="text-sm text-slate-900">{showCaptureFeedback.classification.action}</p>
            </div>
            <div className="col-span-2 bg-slate-100 rounded-lg p-3">
              <p className="text-xs text-slate-600 mb-1">Recommendation</p>
              <p className="text-sm font-medium text-slate-900">
                {showCaptureFeedback.classification.delegate ? "â Delegate" : "â Handle personally"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Captures (This Week)</h2>
        <div className="space-y-3">
          {[
            { text: "Mueller contractor bids due", category: "Task", time: "Today" },
            { text: "Schedule Davis investor call", category: "Follow-up", time: "Yesterday" },
            { text: "AI decision support system exploration", category: "Idea", time: "2 days ago" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50">
              <div>
                <p className="text-sm font-medium text-slate-900">{item.text}</p>
                <p className="text-xs text-slate-500 mt-1">{item.time}</p>
              </div>
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DailySweepView = () => (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-4xl font-light text-slate-900 mb-2">Daily Sweep</h1>
        <p className="text-slate-600">Process today's decisions quickly and decisively.</p>
      </div>

      <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all"
          style={{ width: `${((sweepIndex + 1) / sweepItems.length) * 100}%` }}
        />
      </div>
      <p className="text-sm text-slate-600">
        {sweepIndex + 1} of {sweepItems.length} reviewed
      </p>

      {/* Current Card */}
      {sweepItems[sweepIndex] && (
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-4">
              {sweepItems[sweepIndex].category.toUpperCase()}
            </span>
            <h2 className="text-2xl font-light text-slate-900 mb-3">{sweepItems[sweepIndex].title}</h2>
            <p className="text-sm text-slate-600 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              AI Recommends: <span className="font-semibold text-slate-900">{sweepItems[sweepIndex].recommendation}</span>
            </p>
          </div>

          <div className="grid grid-cols-5 gap-3 mt-8">
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition-colors">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <span className="text-xs font-semibold text-slate-700">Decide Now</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition-colors">
              <Users className="w-6 h-6 text-purple-600" />
              <span className="text-xs font-semibold text-slate-700">Delegate</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition-colors">
              <Calendar className="w-6 h-6 text-amber-600" />
              <span className="text-xs font-semibold text-slate-700">Schedule</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition-colors">
              <Pause className="w-6 h-6 text-slate-600" />
              <span className="text-xs font-semibold text-slate-700">Defer</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-slate-200 hover:bg-blue-50 hover:border-blue-300 transition-colors">
              <Archive className="w-6 h-6 text-slate-400" />
              <span className="text-xs font-semibold text-slate-700">Archive</span>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between">
            <button
              onClick={() => navigateSweep("prev")}
              disabled={sweepIndex === 0}
              className="px-6 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => navigateSweep("next")}
              disabled={sweepIndex === sweepItems.length - 1}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const DelegationView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-light text-slate-900 mb-2">Delegation Pipeline</h1>
        <p className="text-slate-600">Track delegated work across ownership lifecycle.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 mb-2">Total Delegated</p>
          <p className="text-3xl font-light text-slate-900">{delegationStats.total}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 mb-2">On Track</p>
          <p className="text-3xl font-light text-green-600">{delegationStats.onTrack}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 mb-2">At Risk</p>
          <p className="text-3xl font-light text-red-600">{delegationStats.atRisk}</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <p className="text-xs text-slate-600 mb-2">Overdue</p>
          <p className="text-3xl font-light text-amber-600">{delegationStats.overdue}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {["all", "assigned", "in-progress", "waiting", "overdue", "complete"].map((status) => (
          <button
            key={status}
            onClick={() => setDelegationFilter(status)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              delegationFilter === status
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Kanban */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {["assigned", "in-progress", "waiting", "overdue", "complete"].map((status) => {
          const items = filteredDelegationItems.filter((item) => item.status === status);
          return (
            <div key={status} className="bg-slate-50 rounded-lg p-4 min-h-96">
              <h3 className="font-semibold text-slate-900 mb-4 text-sm">
                {status === "in-progress" ? "In Progress" : status.charAt(0).toUpperCase() + status.slice(1)}
                <span className="ml-2 text-xs font-normal text-slate-500">({items.length})</span>
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${
                      item.status === "overdue"
                        ? "border-red-200 bg-red-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <p className="text-sm font-medium text-slate-900 mb-2">{item.task}</p>
                    <div className="space-y-1 text-xs">
                      <p className="text-slate-600">{item.owner}</p>
                      <p className="text-slate-500">{item.dueDate}</p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            item.importance === "critical"
                              ? "bg-red-100 text-red-700"
                              : item.importance === "high"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {item.importance}
                        </span>
                        <span className="text-slate-500">{item.daysActive}d</span>
                      </div>
                    </div>
                    {item.daysActive > 2 && item.status !== "complete" && (
                      <div className="mt-2 flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">
                        <AlertCircle className="w-3 h-3" /> Stale
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const DealsView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-light text-slate-900 mb-2">Deals & Development</h1>
        <p className="text-slate-600">Real estate pipeline and active negotiations.</p>
      </div>

      {/* Pipeline Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-xs text-slate-600 mb-2">Total Pipeline Value</p>
          <p className="text-4xl font-light text-slate-900">${pipelineStats.total}M</p>
          <p className="text-xs text-slate-500 mt-2">{pipelineStats.deals} active deals</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-xs text-slate-600 mb-2">Average Deal Size</p>
          <p className="text-4xl font-light text-slate-900">${pipelineStats.avgDeal}M</p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-xs text-slate-600 mb-2">Stages Active</p>
          <p className="text-4xl font-light text-slate-900">5</p>
          <p className="text-xs text-slate-500 mt-2">Lead to Closed</p>
        </div>
      </div>

      {/* Deals by Stage */}
      <div className="space-y-4">
        {["Lead", "Evaluating", "Negotiating", "Under Contract", "Closing", "Closed"].map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          if (stageDeals.length === 0) return null;
          return (
            <div key={stage}>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 px-1">{stage}</h3>
              <div className="grid gap-3">
                {stageDeals.map((deal) => (
                  <div key={deal.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-900">{deal.name}</h4>
                        <p className="text-xs text-slate-600 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {deal.location}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          deal.risk === "low"
                            ? "bg-green-100 text-green-700"
                            : deal.risk === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {deal.risk} risk
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <p className="text-xs text-slate-600">Size</p>
                        <p className="font-medium text-slate-900">{deal.units}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Value</p>
                        <p className="font-medium text-slate-900">{deal.value}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Counterparty</p>
                        <p className="text-sm text-slate-700">{deal.counterparty}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600">Next Action</p>
                        <p className="text-sm font-medium text-blue-600">{deal.nextAction}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const RecruitingView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-light text-slate-900 mb-2">Recruiting</h1>
        <p className="text-slate-600">Agent pipeline and recruitment opportunities.</p>
      </div>

      {/* Pipeline Stages */}
      <div className="space-y-4">
        {["New Lead", "First Meeting", "Follow-up", "Negotiating", "Committed", "Onboarded"].map((stage) => {
          const filtered = recruits.slice(0, 1);
          return (
            <div key={stage}>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 px-1">{stage}</h3>
              {filtered.map((recruit) => (
                <div key={recruit.id} className="bg-white rounded-lg border border-slate-200 p-4 mb-3 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-900">{recruit.name}</h4>
                      <p className="text-xs text-slate-600 mt-1">{recruit.source}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-600 mb-1">Fit Score</p>
                      <p className="text-lg font-semibold text-blue-600">{recruit.fitScore}%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-slate-600 mb-1">Relationship Strength</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${i < recruit.strength ? "bg-blue-600" : "bg-slate-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-600">Last Touch</p>
                      <p className="text-sm font-medium text-slate-900">{recruit.lastTouch}</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-600 mb-1">Next Action</p>
                    <p className="text-sm font-medium text-slate-900">{recruit.nextAction}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  const RelationshipsView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-light text-slate-900 mb-2">Relationships</h1>
        <p className="text-slate-600">Intelligence system for key strategic relationships.</p>
      </div>

      {/* AI Suggestion Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">AI Suggestion</h3>
            <p className="text-sm text-blue-800 mb-3">
              <strong>Reach out to Michael Chen</strong> â dormant 8 days, high strategic value (Mueller financing discussions)
            </p>
            <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Send message â</button>
          </div>
        </div>
      </div>

      {/* Contacts by Category */}
      {["Investors", "Developers", "Agents", "Partners", "Team"].map((category) => {
        const toShow = relationships.filter((r) => r.value !== "low").slice(0, 3);

        return (
          <div key={category}>
            <h3 className="text-sm font-semibold text-slate-700 mb-3 px-1">{category}</h3>
            <div className="space-y-3">
              {toShow.map((rel) => (
                <div key={rel.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-900">{rel.name}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        {rel.role} â¢ {rel.company}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        rel.value === "strategic"
                          ? "bg-red-100 text-red-700"
                          : rel.value === "critical"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {rel.value}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs mb-3">
                    <div>
                      <p className="text-slate-600 mb-1">Strength</p>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < rel.strength ? "bg-blue-600" : "bg-slate-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1">Last Contact</p>
                      <p className="font-medium text-slate-900">{rel.lastContact}</p>
                    </div>
                    <div>
                      <p className="text-slate-600 mb-1">Next Touch</p>
                      <p className="font-medium text-slate-900">{rel.nextTouch}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const IdeasView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-light text-slate-900 mb-2">Ideas</h1>
        <p className="text-slate-600">Idea to execution pipeline.</p>
      </div>

      {/* Idea Overload Warning */}
      {ideas.filter((i) => i.stage === "Raw").length > 5 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-amber-900 text-sm">Idea Overload</p>
            <p className="text-sm text-amber-800">
              You have {ideas.filter((i) => i.stage === "Raw").length} ideas in Raw stage. Consider exploring or archiving.
            </p>
          </div>
        </div>
      )}

      {/* Ideas by Stage */}
      <div className="space-y-6">
        {["Raw", "Exploring", "Scoping", "Building", "Active", "Archived"].map((stage) => {
          const stageIdeas = ideas.filter((i) => i.stage === stage);
          if (stageIdeas.length === 0) return null;

          return (
            <div key={stage}>
              <h3 className="text-sm font-semibold text-slate-700 mb-3 px-1">{stage}</h3>
              <div className="grid gap-3">
                {stageIdeas.map((idea) => (
                  <div key={idea.id} className="bg-white rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition-colors">
                    <div className="mb-3">
                      <h4 className="font-semibold text-slate-900 mb-1">{idea.title}</h4>
                      <p className="text-sm text-slate-600">{idea.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          idea.impact === "high"
                            ? "bg-red-100 text-red-700"
                            : idea.impact === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        Impact: {idea.impact}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          idea.effort === "high"
                            ? "bg-red-100 text-red-700"
                            : idea.effort === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        Effort: {idea.effort}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          idea.fit === "critical" ? "bg-blue-100 text-blue-700" : idea.fit === "high" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        Fit: {idea.fit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const CalendarView = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-light text-slate-900 mb-2">Calendar & Energy</h1>
        <p className="text-slate-600">Your daily time blocks and energy allocation.</p>
      </div>

      {/* Energy Timeline */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Daily Time Structure</h2>
        <div className="space-y-2">
          {energyBlocks.map((block, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-32">
                <p className="text-sm font-semibold text-slate-900">{block.time}</p>
              </div>
              <div className={`${block.color} rounded-lg px-4 py-3 text-white flex-1`}>
                <p className="text-sm font-semibold">{block.label}</p>
              </div>
              <div className="text-2xl">{block.icon}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-sm text-slate-600 mb-2">Current Energy Level</p>
          <p className="text-4xl font-light text-blue-600 mb-4">8/10</p>
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full ${i < 8 ? "bg-blue-600" : "bg-slate-200"}`}
                style={{ flex: 1 }}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-3">Post deep work session</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-sm text-slate-600 mb-2">Fragmentation Score</p>
          <p className="text-4xl font-light text-amber-600 mb-4">3</p>
          <p className="text-xs text-slate-600 mb-3">Context switches today</p>
          <p className="text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-2 rounded">
            â  Consider protecting 2:00-3:00 PM block
          </p>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">AI Recommendation</h3>
            <p className="text-sm text-blue-800">
              You have 3 meetings before 10am (Sarah, Kyle, Marcus). Consider moving the 8:30 call with Kyle to 10:30 to protect your deep work block.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Render
  const getViewComponent = () => {
    switch (activeView) {
      case "command-center":
        return <CommandCenterView />;
      case "capture":
        return <CaptureView />;
      case "daily-sweep":
        return <DailySweepView />;
      case "delegation":
        return <DelegationView />;
      case "deals":
        return <DealsView />;
      case "recruiting":
        return <RecruitingView />;
      case "relationships":
        return <RelationshipsView />;
      case "ideas":
        return <IdeasView />;
      case "calendar":
        return <CalendarView />;
      default:
        return <CommandCenterView />;
    }
  };

  return (
    <div
      className="flex h-screen bg-white text-slate-900 font-sans"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif' }}
    >
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-50 border-r border-slate-200 transition-all duration-300 flex flex-col hidden md:flex`}
      >
        <div className={`${sidebarOpen ? "px-4" : "px-3"} py-8 border-b border-slate-200`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
          >
            {sidebarOpen ? <Menu className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  activeView === item.id
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className={`${sidebarOpen ? "px-3" : "px-3"} py-6 border-t border-slate-200`}>
          <div className={`flex items-center gap-3 ${!sidebarOpen && "justify-center"}`}>
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
              LP
            </div>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="text-sm font-semibold">Lawrence</p>
                <p className="text-xs text-slate-500">Founder</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <h1 className="text-lg font-semibold">MODUS</h1>
        <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
          LP
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-30 overflow-y-auto">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeView === item.id
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Spacing */}
        <div className="md:hidden h-16" />

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">{getViewComponent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ModusCommandCenter;
