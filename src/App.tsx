import { useState } from 'react';
import LandingPage from './LandingPage';
import { Shield, ArrowLeft, Zap, FileText, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [showDemo, setShowDemo] = useState(false);

  const handleEnterApp = () => {
    setShowDemo(true);
  };

  const handleBackToLanding = () => {
    setShowDemo(false);
  };

  if (showDemo) {
    return <DemoApp onBack={handleBackToLanding} />;
  }

  return <LandingPage onEnterApp={handleEnterApp} />;
}

function DemoApp({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg">EvidenceForge</span>
          </div>
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Landing Page
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to EvidenceForge Demo</h1>
          <p className="text-zinc-400">This is a preview of the application dashboard</p>
        </div>

        {/* Success Message */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-emerald-400 mb-1">Demo Mode Active</h3>
              <p className="text-sm text-zinc-300">
                You've successfully navigated from the landing page! This demonstrates that all buttons and CTAs are working correctly.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 hover:border-blue-500/30 transition-colors">
            <Zap className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="font-semibold mb-2">AI Evidence Extraction</h3>
            <p className="text-sm text-zinc-400">
              Automatically extract and classify evidence from your construction documents with 94% accuracy.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 hover:border-emerald-500/30 transition-colors">
            <FileText className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="font-semibold mb-2">Source Citations</h3>
            <p className="text-sm text-zinc-400">
              Every piece of evidence links back to exact page numbers and paragraphs in your source documents.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 hover:border-violet-500/30 transition-colors">
            <CheckCircle2 className="w-8 h-8 text-violet-400 mb-4" />
            <h3 className="font-semibold mb-2">Audit Ready</h3>
            <p className="text-sm text-zinc-400">
              Generate professional PDF packages with full audit trails and source documentation.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-blue-400 mb-1">10x</p>
            <p className="text-sm text-zinc-400">Faster Claims</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-emerald-400 mb-1">94%</p>
            <p className="text-sm text-zinc-400">AI Accuracy</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-violet-400 mb-1">526</p>
            <p className="text-sm text-zinc-400">Documents Synced</p>
          </div>
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-xl p-6 text-center">
            <p className="text-3xl font-bold text-cyan-400 mb-1">100%</p>
            <p className="text-sm text-zinc-400">Audit Ready</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Landing Page
          </button>
        </div>
      </main>
    </div>
  );
}
