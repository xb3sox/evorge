import { useState } from 'react';
import LandingPage from './LandingPage';
import {
  Shield, BarChart3, FolderOpen, Clock, CheckCircle2, Download,
  History, TrendingUp, Link2, Lock, Menu, X, ChevronRight,
  ArrowLeft, Search, Upload, Eye, AlertTriangle, Zap, FileText,
  AlertCircle, Flag, Users, Activity, DollarSign, ArrowRight
} from 'lucide-react';

// Mock Data
const projects = [
  { id: '1', name: 'Riverside Tower MEP', client: 'Turner Construction', status: 'active', claimType: 'Delay & Disruption', documentsCount: 47, evidenceCount: 23, completionPercent: 68 },
  { id: '2', name: 'Highway 401 Bridge', client: 'Ontario MTO', status: 'review', claimType: 'Differing Conditions', documentsCount: 89, evidenceCount: 52, completionPercent: 91 },
  { id: '3', name: 'Central Hospital Wing B', client: 'PCL Construction', status: 'active', claimType: 'Scope Creep', documentsCount: 31, evidenceCount: 12, completionPercent: 34 },
];

const documents = [
  { id: '1', name: 'Subcontract Agreement.pdf', type: 'contract', uploadDate: '2024-09-15', size: '2.4 MB', status: 'processed', projectId: '1', pages: 34 },
  { id: '2', name: 'RFI-042 Structural Conflict.pdf', type: 'rfi', uploadDate: '2024-10-03', size: '890 KB', status: 'processed', projectId: '1', pages: 3 },
  { id: '3', name: 'CO-007 Additional Ductwork.pdf', type: 'change_order', uploadDate: '2024-10-12', size: '1.1 MB', status: 'processed', projectId: '1', pages: 5 },
];

const evidence = [
  { id: '1', title: 'Access to Floor 12 delayed by 14 days', category: 'delay', date: '2024-10-03', confidence: 94, status: 'verified', sources: [{ documentId: '2', documentName: 'RFI-042.pdf', page: 1, excerpt: 'MEP rough-in cannot commence until structural steel is complete.', relevance: 0.96 }], description: 'The general contractor failed to provide access to Floor 12.', projectId: '1' },
  { id: '2', title: 'Additional ductwork scope added via CO-007', category: 'scope_change', date: '2024-10-12', confidence: 97, status: 'approved', sources: [{ documentId: '3', documentName: 'CO-007.pdf', page: 1, excerpt: 'Change Order #007: Additional supply ductwork required.', relevance: 0.98 }], description: 'Architect issued a design revision requiring additional ductwork.', projectId: '1' },
  { id: '3', title: 'Crew idle time: 84 man-days lost', category: 'cost', date: '2024-10-03', confidence: 88, status: 'pending_review', sources: [], description: 'Due to the 14-day access delay, the crew experienced significant idle time.', projectId: '1' },
];

type View = 'dashboard' | 'documents' | 'timeline' | 'review' | 'export' | 'audit' | 'roi' | 'integrations' | 'security';

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (showLanding) {
    return <LandingPage onEnterApp={() => setShowLanding(false)} />;
  }

  return (
    <div className="flex h-screen bg-[var(--bg)] overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-14'} bg-[var(--panel)] border-r border-[var(--border)] flex flex-col transition-all duration-200`}>
        <div className="h-14 px-3 flex items-center gap-2.5 border-b border-[var(--border)]">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && <span className="font-semibold text-[var(--fg)] text-sm">EvidenceForge</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-[var(--muted)] hover:text-[var(--fg)] p-1">
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-0.5">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'documents', icon: FolderOpen, label: 'Documents' },
            { id: 'timeline', icon: Clock, label: 'Timeline' },
            { id: 'review', icon: CheckCircle2, label: 'Review' },
            { id: 'export', icon: Download, label: 'Export' },
            { id: 'audit', icon: History, label: 'Audit Log' },
            { id: 'roi', icon: TrendingUp, label: 'ROI Dashboard' },
            { id: 'integrations', icon: Link2, label: 'Integrations' },
            { id: 'security', icon: Lock, label: 'Security' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id as View)}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] transition-colors ${
                currentView === id ? 'bg-[var(--hover)] text-[var(--fg)] font-medium' : 'text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)]'
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-[var(--border)]">
          <button
            onClick={() => setShowLanding(true)}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-[var(--muted)] hover:bg-[var(--hover)] hover:text-[var(--fg)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Back to Landing</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto flex flex-col">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-[var(--border)]">
          <div className="flex items-center justify-between h-14 px-6">
            <div className="flex items-center gap-2 min-w-0">
              <nav className="flex items-center gap-1.5 text-sm">
                <button onClick={() => setCurrentView('dashboard')} className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors">
                  Dashboard
                </button>
                {currentView !== 'dashboard' && (
                  <>
                    <ChevronRight className="w-3 h-3 text-[var(--muted)]" />
                    <span className="text-[var(--fg)] font-medium capitalize">{currentView.replace('-', ' ')}</span>
                  </>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-1">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--muted)] bg-[var(--panel)] border border-[var(--border)] rounded-lg hover:border-[var(--border-hover)] transition-colors">
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search...</span>
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1 py-0.5 text-[10px] bg-[var(--bg)] border border-[var(--border)] rounded font-mono">⌘K</kbd>
              </button>
            </div>
          </div>
        </div>

        {/* View Content */}
        <div className="flex-1 overflow-auto">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'documents' && <DocumentsView />}
          {currentView === 'timeline' && <TimelineView />}
          {currentView === 'review' && <ReviewView />}
          {currentView === 'export' && <ExportView />}
          {currentView === 'audit' && <AuditView />}
          {currentView === 'roi' && <ROIDashboardView />}
          {currentView === 'integrations' && <IntegrationsView />}
          {currentView === 'security' && <SecurityView />}
        </div>
      </main>
    </div>
  );
}

// Dashboard View
function DashboardView() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--fg)] tracking-tight">Projects</h1>
          <p className="text-sm text-[var(--muted)] mt-1">Manage your claim evidence packages</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
          <Upload className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="space-y-2">
        {projects.map((project) => (
          <div key={project.id} className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--border-hover)] transition-all cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                project.status === 'active' ? 'bg-blue-500/10 text-blue-400' :
                project.status === 'review' ? 'bg-amber-500/10 text-amber-400' :
                'bg-[var(--hover)] text-[var(--muted)]'
              }`}>
                <FolderOpen className="w-6 h-6" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-[var(--fg)] truncate">{project.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    project.status === 'active' ? 'bg-blue-500/10 text-blue-400' :
                    project.status === 'review' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-[var(--hover)] text-[var(--muted)]'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-[var(--muted)]">{project.client} • {project.claimType}</p>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-medium text-[var(--fg)]">{project.documentsCount}</p>
                  <p className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Documents</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-[var(--fg)]">{project.evidenceCount}</p>
                  <p className="text-[10px] text-[var(--muted)] uppercase tracking-wider">Evidence</p>
                </div>
                <div className="w-24">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-[var(--fg)]">{project.completionPercent}%</span>
                  </div>
                  <div className="h-1.5 bg-[var(--hover)] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full" style={{ width: `${project.completionPercent}%` }} />
                  </div>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-[var(--muted)] group-hover:text-[var(--fg)] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4">
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--fg)]">291</p>
          <p className="text-xs text-[var(--muted)] mt-1">Total Documents</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--fg)]">165</p>
          <p className="text-xs text-[var(--muted)] mt-1">Evidence Items</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-4 text-center">
          <p className="text-2xl font-bold text-[var(--fg)]">94%</p>
          <p className="text-xs text-[var(--muted)] mt-1">Avg. Confidence</p>
        </div>
      </div>
    </div>
  );
}

// Documents View
function DocumentsView() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--fg)] tracking-tight">Documents</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{documents.length} documents</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] overflow-hidden">
        <div className="divide-y divide-[var(--border)]">
          {documents.map((doc) => (
            <div key={doc.id} className="p-4 flex items-center gap-4 hover:bg-[var(--hover)] transition-colors group">
              <div className="w-10 h-10 bg-[var(--hover)] rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[var(--muted)]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[var(--fg)] truncate text-sm">{doc.name}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{doc.pages} pages • {doc.size}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  doc.status === 'processed' ? 'bg-emerald-500/10 text-emerald-400' :
                  doc.status === 'processing' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-[var(--hover)] text-[var(--muted)]'
                }`}>
                  {doc.status === 'processed' ? '✓ Processed' : doc.status === 'processing' ? '⟳ Processing' : '○ Pending'}
                </span>
                <button className="text-[var(--muted)] hover:text-[var(--fg)] p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Timeline View
function TimelineView() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--fg)] tracking-tight">Timeline</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{evidence.length} evidence items</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-2xl font-bold text-[var(--fg)]">{evidence.length}</p>
          <p className="text-xs text-[var(--muted)] mt-1">Evidence Items</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-2xl font-bold text-[var(--fg)]">{evidence.reduce((acc, e) => acc + e.sources.length, 0)}</p>
          <p className="text-xs text-[var(--muted)] mt-1">Source Citations</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-4">
          <p className="text-2xl font-bold text-[var(--fg)]">{Math.round(evidence.reduce((acc, e) => acc + e.confidence, 0) / evidence.length)}%</p>
          <p className="text-xs text-[var(--muted)] mt-1">Avg. Confidence</p>
        </div>
      </div>

      <div className="space-y-4">
        {evidence.map((item) => (
          <div key={item.id} className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--border-hover)] transition-colors">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-[var(--muted)]">{item.date}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    item.category === 'delay' ? 'bg-red-500/10 text-red-400' :
                    item.category === 'cost' ? 'bg-amber-500/10 text-amber-400' :
                    item.category === 'scope_change' ? 'bg-purple-500/10 text-purple-400' :
                    'bg-[var(--hover)] text-[var(--muted)]'
                  }`}>
                    {item.category.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="font-medium text-[var(--fg)] text-sm">{item.title}</h3>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-[var(--muted)]">{item.confidence}%</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  item.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                  item.status === 'verified' ? 'bg-blue-500/10 text-blue-400' :
                  item.status === 'pending_review' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-red-500/10 text-red-400'
                }`}>
                  {item.status === 'approved' ? '✓ Approved' : item.status === 'verified' ? '✓ Verified' : item.status === 'pending_review' ? '○ Pending' : '⚑ Flagged'}
                </span>
              </div>
            </div>
            <p className="text-sm text-[var(--fg-secondary)] mb-3">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Review View
function ReviewView() {
  const pendingItems = evidence.filter(e => e.status === 'pending_review' || e.status === 'flagged');
  const approvedItems = evidence.filter(e => e.status === 'approved' || e.status === 'verified');
  const totalItems = pendingItems.length + approvedItems.length;
  const progressPercent = Math.round((approvedItems.length / totalItems) * 100);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--fg)] tracking-tight">Review</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Verify AI-extracted evidence before export</p>
      </div>

      <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-medium text-[var(--fg)]">Review Progress</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">{approvedItems.length} of {totalItems} items approved</p>
          </div>
          <p className="text-2xl font-bold text-[var(--fg)]">{progressPercent}%</p>
        </div>
        <div className="h-2 bg-[var(--hover)] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {pendingItems.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-semibold text-[var(--fg)]">Pending Review</h2>
            <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full font-medium">{pendingItems.length}</span>
          </div>
          <div className="space-y-3">
            {pendingItems.map((item) => (
              <div key={item.id} className="bg-[var(--panel)] rounded-xl border border-amber-500/20 p-5">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-[var(--fg)] text-sm mb-1">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-[var(--muted)]">
                      <span>{item.date}</span>
                      <span>•</span>
                      <span>{item.confidence}% confidence</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[var(--fg-secondary)] mb-4">{item.description}</p>
                <div className="flex items-center gap-2 pt-3 border-t border-[var(--border)]">
                  <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve
                  </button>
                  <button className="px-3 py-1.5 bg-[var(--panel)] border border-[var(--border)] text-[var(--fg-secondary)] text-xs font-medium rounded-lg hover:border-[var(--border-hover)] transition-colors flex items-center gap-1.5">
                    <Flag className="w-3.5 h-3.5" />
                    Flag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <h2 className="text-sm font-semibold text-[var(--fg)]">Approved</h2>
          <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-medium">{approvedItems.length}</span>
        </div>
        <div className="space-y-2">
          {approvedItems.map((item) => (
            <div key={item.id} className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-4 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--fg)] truncate">{item.title}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{item.date} • {item.confidence}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Export View
function ExportView() {
  return (
    <div className="p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--fg)] tracking-tight">Export</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Generate professional evidence packages</p>
      </div>

      <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-[var(--fg)]">Delay & Disruption Claim</h2>
            <p className="text-sm text-[var(--muted)]">Evidence Package v3 • Riverside Tower</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[var(--hover)] rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-[var(--fg)]">{evidence.length}</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">Evidence Items</p>
          </div>
          <div className="bg-[var(--hover)] rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-[var(--fg)]">{evidence.reduce((acc, e) => acc + e.sources.length, 0)}</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">Citations</p>
          </div>
          <div className="bg-[var(--hover)] rounded-lg p-3 text-center">
            <p className="text-xl font-bold text-[var(--fg)]">89</p>
            <p className="text-xs text-[var(--muted)] mt-0.5">Pages</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--hover)]">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-amber-400">Review required</p>
            <p className="text-xs text-[var(--muted)]">1 item pending approval</p>
          </div>
        </div>
      </div>

      <button className="w-full px-6 py-3.5 bg-[var(--hover)] text-[var(--muted)] font-medium rounded-xl flex items-center justify-center gap-2 cursor-not-allowed">
        <Download className="w-5 h-5" />
        Approve All Items to Export
      </button>
    </div>
  );
}

// Audit View
function AuditView() {
  const auditLog = [
    { id: '1', timestamp: '2024-11-01 14:32:05', user: 'alex.chen@meppro.com', action: 'Document Uploaded', target: 'Weather Report Oct 2024.pdf', details: 'Uploaded 12-page PDF document' },
    { id: '2', timestamp: '2024-11-01 14:28:17', user: 'alex.chen@meppro.com', action: 'Evidence Approved', target: 'CO-007 Additional Ductwork', details: 'Approved evidence item with 97% confidence' },
    { id: '3', timestamp: '2024-11-01 13:15:42', user: 'system', action: 'AI Processing Complete', target: 'GC Meeting Minutes Oct 15.pdf', details: 'Extracted 3 evidence items, 2 citations' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--fg)] tracking-tight">Activity</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Recent actions and system events</p>
      </div>

      <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] overflow-hidden">
        <div className="divide-y divide-[var(--border)]">
          {auditLog.map((entry) => (
            <div key={entry.id} className="p-4 hover:bg-[var(--hover)] transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  entry.action.includes('Upload') ? 'bg-blue-500/10 text-blue-400' :
                  entry.action.includes('Approved') ? 'bg-emerald-500/10 text-emerald-400' :
                  'bg-[var(--hover)] text-[var(--muted)]'
                }`}>
                  {entry.action.includes('Upload') ? <Upload className="w-4 h-4" /> :
                   entry.action.includes('Approved') ? <CheckCircle2 className="w-4 h-4" /> :
                   <Zap className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-[var(--fg)]">{entry.action}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      entry.user === 'system' ? 'bg-violet-500/10 text-violet-400' : 'bg-blue-500/10 text-blue-400'
                    }`}>
                      {entry.user === 'system' ? 'System' : 'User'}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--fg-secondary)] truncate">{entry.target}</p>
                  <p className="text-xs text-[var(--muted)] mt-0.5">{entry.details}</p>
                </div>
                <p className="text-xs text-[var(--muted)] font-mono whitespace-nowrap flex-shrink-0">{entry.timestamp.split(' ')[1]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ROI Dashboard View
function ROIDashboardView() {
  const roiMetrics = [
    { id: '1', project: 'Riverside Tower - MEP Package', timeSaved: 48, evidenceDiscovered: 23, claimValue: 285000, preparationTime: 12, aiAccuracy: 94 },
    { id: '2', project: 'Highway 401 Bridge Rehab', timeSaved: 72, evidenceDiscovered: 52, claimValue: 1240000, preparationTime: 18, aiAccuracy: 96 },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--fg)]">ROI Dashboard</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Measure the impact of AI-powered claim preparation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <Clock className="w-5 h-5 text-blue-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">252h</p>
          <p className="text-xs text-[var(--muted)] mt-1">Time Saved</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <Zap className="w-5 h-5 text-amber-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">165</p>
          <p className="text-xs text-[var(--muted)] mt-1">Evidence Discovered</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <DollarSign className="w-5 h-5 text-emerald-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">$3.8M</p>
          <p className="text-xs text-[var(--muted)] mt-1">Claim Value Supported</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <TrendingUp className="w-5 h-5 text-violet-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">94.5%</p>
          <p className="text-xs text-[var(--muted)] mt-1">AI Accuracy</p>
        </div>
      </div>

      <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)]">
        <div className="p-5 border-b border-[var(--border)]">
          <h2 className="font-semibold text-[var(--fg)]">Project ROI Breakdown</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Time saved and claim value by project</p>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {roiMetrics.map((metric) => (
            <div key={metric.id} className="p-5 hover:bg-[var(--hover)] transition-colors">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[var(--fg)] text-sm mb-1">{metric.project}</h3>
                  <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
                    <span>{metric.preparationTime}h preparation</span>
                    <span>•</span>
                    <span>{metric.aiAccuracy}% AI accuracy</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-400">${(metric.claimValue / 1000).toFixed(0)}K</p>
                  <p className="text-[10px] text-[var(--muted)]">claim value</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-[var(--muted)] mb-1">Time Saved</p>
                  <p className="text-sm font-semibold text-[var(--fg)]">{metric.timeSaved}h</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)] mb-1">Evidence Found</p>
                  <p className="text-sm font-semibold text-[var(--fg)]">{metric.evidenceDiscovered}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)] mb-1">Efficiency Gain</p>
                  <p className="text-sm font-semibold text-[var(--fg)]">{Math.round((metric.timeSaved / (metric.timeSaved + metric.preparationTime)) * 100)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Integrations View
function IntegrationsView() {
  const integrations = [
    { id: '1', name: 'Aconex', category: 'project_management', status: 'connected', lastSync: '2 hours ago', documentsSynced: 47, description: 'Project management and document control', icon: '🏗️' },
    { id: '2', name: 'Procore', category: 'project_management', status: 'connected', lastSync: '1 day ago', documentsSynced: 89, description: 'Construction management platform', icon: '🔨' },
    { id: '3', name: 'Microsoft Outlook', category: 'communication', status: 'connected', lastSync: '30 minutes ago', documentsSynced: 156, description: 'Email and calendar integration', icon: '📧' },
    { id: '4', name: 'SharePoint', category: 'storage', status: 'connected', lastSync: '4 hours ago', documentsSynced: 234, description: 'Document library and collaboration', icon: '📁' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--fg)]">Integrations</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Connect your project management and communication tools</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <Link2 className="w-5 h-5 text-blue-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">4</p>
          <p className="text-xs text-[var(--muted)] mt-1">Connected Services</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <FileText className="w-5 h-5 text-emerald-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">526</p>
          <p className="text-xs text-[var(--muted)] mt-1">Documents Synced</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <Activity className="w-5 h-5 text-amber-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">Live</p>
          <p className="text-xs text-[var(--muted)] mt-1">Sync Status</p>
        </div>
      </div>

      <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)]">
        <div className="p-5 border-b border-[var(--border)]">
          <h2 className="font-semibold text-[var(--fg)]">Available Integrations</h2>
          <p className="text-xs text-[var(--muted)] mt-1">Connect your tools to automatically sync documents and data</p>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {integrations.map((integration) => (
            <div key={integration.id} className="p-5 hover:bg-[var(--hover)] transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-[var(--hover)] rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    {integration.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-[var(--fg)]">{integration.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        integration.status === 'connected' ? 'bg-emerald-500/10 text-emerald-400' :
                        integration.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-[var(--hover)] text-[var(--muted)]'
                      }`}>
                        {integration.status === 'connected' ? '✓ Connected' : integration.status === 'pending' ? '○ Pending' : '○ Disconnected'}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--muted)] mb-2">{integration.description}</p>
                    {integration.status === 'connected' && integration.lastSync && (
                      <div className="flex items-center gap-3 text-xs text-[var(--muted)]">
                        <span>Last sync: {integration.lastSync}</span>
                        {integration.documentsSynced && (
                          <>
                            <span>•</span>
                            <span>{integration.documentsSynced} documents</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  integration.status === 'connected'
                    ? 'bg-[var(--hover)] text-[var(--fg-secondary)] hover:bg-[var(--border)]'
                    : 'bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
                }`}>
                  {integration.status === 'connected' ? 'Configure' : 'Connect'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Security View
function SecurityView() {
  const users = [
    { id: '1', name: 'Alex Chen', email: 'alex.chen@meppro.com', role: 'admin', lastActive: '2 hours ago', status: 'active' },
    { id: '2', name: 'Sarah Kim', email: 'sarah.kim@meppro.com', role: 'manager', lastActive: '1 day ago', status: 'active' },
    { id: '3', name: 'Marcus Rivera', email: 'marcus.rivera@meppro.com', role: 'reviewer', lastActive: '3 days ago', status: 'active' },
  ];

  const securityEvents = [
    { id: '1', timestamp: '2024-11-01 14:32:05', type: 'login', user: 'alex.chen@meppro.com', details: 'Successful login from 192.168.1.100', severity: 'info' },
    { id: '2', timestamp: '2024-11-01 14:28:17', type: 'data_access', user: 'alex.chen@meppro.com', details: 'Accessed project: Riverside Tower - MEP Package', severity: 'info' },
    { id: '3', timestamp: '2024-11-01 11:02:33', type: 'permission_change', user: 'sarah.kim@meppro.com', details: 'Role changed from viewer to reviewer', severity: 'warning' },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--fg)]">Security & Compliance</h1>
        <p className="text-sm text-[var(--muted)] mt-1">Manage users, monitor access, and review security events</p>
      </div>

      <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5 text-emerald-400" />
          <h2 className="font-semibold text-[var(--fg)]">Encryption Status</h2>
          <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-medium">Active</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">At Rest</p>
            <p className="text-sm font-semibold text-[var(--fg)]">AES-256</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">In Transit</p>
            <p className="text-sm font-semibold text-[var(--fg)]">TLS 1.3</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">Key Management</p>
            <p className="text-sm font-semibold text-[var(--fg)]">AWS KMS</p>
          </div>
          <div>
            <p className="text-xs text-[var(--muted)] mb-1">Last Key Rotation</p>
            <p className="text-sm font-semibold text-[var(--fg)]">2024-10-15</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <p className="text-xs text-[var(--muted)] mb-2">Compliance Certifications</p>
          <div className="flex items-center gap-2">
            {['SOC 2 Type II', 'GDPR', 'CCPA'].map((cert) => (
              <span key={cert} className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full font-medium">{cert}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <Users className="w-5 h-5 text-blue-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">3</p>
          <p className="text-xs text-[var(--muted)] mt-1">Active Users</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <Shield className="w-5 h-5 text-emerald-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">4</p>
          <p className="text-xs text-[var(--muted)] mt-1">RBAC Roles</p>
        </div>
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)] p-5">
          <AlertTriangle className="w-5 h-5 text-red-400 mb-3" />
          <p className="text-2xl font-bold text-[var(--fg)]">0</p>
          <p className="text-xs text-[var(--muted)] mt-1">Critical Events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)]">
          <div className="p-5 border-b border-[var(--border)]">
            <h2 className="font-semibold text-[var(--fg)]">User Management</h2>
            <p className="text-xs text-[var(--muted)] mt-1">Role-based access control</p>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {users.map((user) => (
              <div key={user.id} className="p-4 hover:bg-[var(--hover)] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--fg)]">{user.name}</p>
                      <p className="text-xs text-[var(--muted)]">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      user.role === 'admin' ? 'bg-red-500/10 text-red-400' :
                      user.role === 'manager' ? 'bg-amber-500/10 text-amber-400' :
                      user.role === 'reviewer' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-[var(--hover)] text-[var(--muted)]'
                    }`}>
                      {user.role}
                    </span>
                    <p className="text-[10px] text-[var(--muted)] mt-1">{user.lastActive}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[var(--panel)] rounded-xl border border-[var(--border)]">
          <div className="p-5 border-b border-[var(--border)]">
            <h2 className="font-semibold text-[var(--fg)]">Recent Security Events</h2>
            <p className="text-xs text-[var(--muted)] mt-1">Audit log of security-related actions</p>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {securityEvents.map((event) => (
              <div key={event.id} className="p-4 hover:bg-[var(--hover)] transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    event.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                    event.severity === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-[var(--hover)] text-[var(--muted)]'
                  }`}>
                    {event.type === 'login' ? <Shield className="w-4 h-4" /> :
                     event.type === 'logout' ? <Lock className="w-4 h-4" /> :
                     event.type === 'failed_login' ? <AlertTriangle className="w-4 h-4" /> :
                     event.type === 'export' ? <Download className="w-4 h-4" /> :
                     <Activity className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-[var(--fg)]">{event.type.replace('_', ' ')}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        event.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                        event.severity === 'warning' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-[var(--hover)] text-[var(--muted)]'
                      }`}>
                        {event.severity}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--fg-secondary)] truncate">{event.details}</p>
                    <p className="text-[10px] text-[var(--muted)] mt-1">{event.user} • {event.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
