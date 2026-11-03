import { useState, useEffect, useRef, Component, ErrorInfo, ReactNode } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Shield, FileText, Clock, AlertTriangle, CheckCircle2,
  Zap, ArrowRight, ChevronDown, ChevronUp, Menu, X,
  Upload, Download, Lock, TrendingUp,
  Check, Play, Globe, Layers,
  ArrowUpRight, Quote, CircleDot, BookOpen,
  GitBranch, Target, Twitter, Linkedin, Github, ArrowUp, Star,
  BarChart3, FolderOpen
} from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

/* ===================== ERROR BOUNDARY ===================== */
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Landing page error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-zinc-400 mb-6">We're sorry, but something unexpected happened. Please try refreshing the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function LandingPage({ onEnterApp }: LandingPageProps) {
  return (
    <ErrorBoundary>
      <LandingPageContent onEnterApp={onEnterApp} />
    </ErrorBoundary>
  );
}

function LandingPageContent({ onEnterApp }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulate loading for skeleton screens
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Track page view
  useEffect(() => {
    console.log('Landing page loaded');
    // In production, you would add analytics here
    // analytics.track('page_view', { page: 'landing' });
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#09090b] text-white antialiased overflow-x-hidden selection:bg-blue-500/30 scroll-smooth">
      {/* Skip to content - Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-lg">
        Skip to main content
      </a>

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <Nav scrolled={scrolled} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} closeMobileMenu={closeMobileMenu} onEnterApp={onEnterApp} />
      
      <main id="main-content">
        {!isLoaded ? (
          <LoadingSkeleton />
        ) : (
          <>
            <Hero onEnterApp={onEnterApp} />
            <LogoMarquee />
            <Stats />
            <BentoShowcase />
            <FeatureDeepDive />
            <HowItWorks onEnterApp={onEnterApp} />
            <TrustSection />
            <ComparisonTable />
            <Testimonials />
            <Pricing onEnterApp={onEnterApp} billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />
            <Faq openFaq={openFaq} setOpenFaq={setOpenFaq} />
            <FinalCta onEnterApp={onEnterApp} />
          </>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

/* ===================== SCROLL PROGRESS ===================== */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500 z-50 origin-left"
      aria-hidden="true"
    />
  );
}

/* ===================== LOADING SKELETON ===================== */
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#09090b] pt-20">
      {/* Hero Skeleton */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="h-8 bg-white/[0.05] rounded-lg w-3/4 mx-auto mb-6 animate-pulse" />
          <div className="h-12 bg-white/[0.05] rounded-lg w-full mx-auto mb-4 animate-pulse" />
          <div className="h-12 bg-white/[0.05] rounded-lg w-2/3 mx-auto mb-8 animate-pulse" />
          <div className="h-6 bg-white/[0.05] rounded-lg w-1/2 mx-auto mb-12 animate-pulse" />
          <div className="flex gap-4 justify-center">
            <div className="h-12 bg-white/[0.05] rounded-xl w-40 animate-pulse" />
            <div className="h-12 bg-white/[0.05] rounded-xl w-40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Skeleton */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <div className="h-16 bg-white/[0.05] rounded-lg w-32 mx-auto mb-4 animate-pulse" />
                <div className="h-6 bg-white/[0.05] rounded-lg w-24 mx-auto mb-2 animate-pulse" />
                <div className="h-4 bg-white/[0.05] rounded-lg w-20 mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Skeleton */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 bg-white/[0.05] rounded-lg w-1/2 mx-auto mb-16 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`bg-white/[0.05] rounded-2xl p-8 animate-pulse ${i < 2 ? 'md:col-span-3 h-64' : 'md:col-span-2 h-48'}`} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===================== NAVIGATION ===================== */
function Nav({ scrolled, mobileMenuOpen, setMobileMenuOpen, closeMobileMenu, onEnterApp }: {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  closeMobileMenu: () => void;
  onEnterApp: () => void;
}) {
  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Clickable */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-[15px] tracking-tight">EvidenceForge</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="text-sm text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-md hover:bg-white/[0.04] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#09090b]">
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <button onClick={onEnterApp} className="text-sm text-zinc-400 hover:text-white font-medium px-3 py-1.5 transition-colors">
              Sign in
            </button>
            <button onClick={onEnterApp}
              className="text-sm bg-white hover:bg-zinc-100 text-zinc-900 font-medium px-4 py-1.5 rounded-lg transition-all">
              Get started
            </button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg" aria-label="Menu">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-white/[0.06]">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} onClick={(e) => {
                  e.preventDefault();
                  closeMobileMenu();
                  const element = document.querySelector(link.href);
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                  className="text-sm text-zinc-400 py-2.5 px-2 rounded-md hover:bg-white/[0.04]">{link.label}</a>
              ))}
              <div className="flex gap-2 mt-3">
                <button onClick={() => { onEnterApp(); closeMobileMenu(); }}
                  className="flex-1 text-sm text-zinc-400 border border-white/[0.08] py-2.5 rounded-lg">
                  Sign in
                </button>
                <button onClick={() => { onEnterApp(); closeMobileMenu(); }}
                  className="flex-1 text-sm bg-white text-zinc-900 font-medium py-2.5 rounded-lg">
                  Get started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

/* ===================== HERO ===================== */
function Hero({ onEnterApp }: { onEnterApp: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 px-6 overflow-hidden">
      {/* Simplified, focused background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-blue-500/20 via-violet-500/10 to-transparent rounded-full blur-[120px]" />
      </div>

      {/* Clean grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_50%,transparent_100%)]" />

      <motion.div 
        style={{ y, opacity }} 
        className="relative max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Premium badge with glow */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-white/[0.1] px-5 py-2 rounded-full mb-8 backdrop-blur-xl shadow-lg shadow-blue-500/5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-lg shadow-emerald-500/50" />
          </span>
          <span className="text-sm text-zinc-200 font-medium">New: Aconex & Procore integrations</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
        </motion.div>

        {/* Enhanced headline with sophisticated gradient */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
          <span className="block text-white">Build winning claims</span>
          <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            in days, not weeks
          </span>
        </motion.h1>

        {/* Refined subheadline */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg lg:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          AI-powered evidence extraction with exact source citations.
        </motion.p>

        {/* Premium CTAs with enhanced styling */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={onEnterApp}
            className="group relative w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-zinc-50 text-zinc-900 font-semibold rounded-xl transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)] flex items-center justify-center gap-2 text-[15px] overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#09090b]">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Start free trial</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={(e) => {
            e.preventDefault();
            const element = document.querySelector('#how-it-works');
            if (element) {
              const offset = 80;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - offset;
              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }}
            className="group w-full sm:w-auto px-8 py-3.5 bg-gradient-to-br from-white/[0.08] to-white/[0.03] hover:from-white/[0.12] hover:to-white/[0.05] text-white font-medium rounded-xl border border-white/[0.1] transition-all backdrop-blur-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#09090b]">
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            See how it works
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-500" /> Trusted by 2,400+ subcontractors
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-500" /> Enterprise-grade security
          </span>
        </motion.div>
      </motion.div>

      {/* Premium product screenshot with depth */}
      <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
        className="relative max-w-6xl mx-auto mt-16 lg:mt-20">
        {/* Simplified glow effect */}
        <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/20 via-violet-500/10 to-cyan-500/20 rounded-[2rem] blur-3xl opacity-60" />

        <div className="relative bg-gradient-to-b from-[#0f0f11] to-[#0a0a0c] rounded-2xl border border-white/[0.12] shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
          {/* Subtle top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-gradient-to-b from-[#0f0f11] to-[#0c0c0e]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
            </div>
            <div className="flex-1 mx-8">
              <div className="bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-1.5 text-xs text-zinc-400 max-w-sm mx-auto text-center font-mono flex items-center justify-center gap-2">
                <Lock className="w-3 h-3 text-emerald-400" />
                app.evidenceforge.io/timeline
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="flex min-h-[360px] sm:min-h-[420px]">
            {/* Sidebar */}
            <div className="hidden sm:block w-56 border-r border-white/[0.06] p-4 bg-gradient-to-b from-[#0a0a0c] to-[#08080a]">
              <div className="flex items-center gap-2.5 mb-6 px-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Shield className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-zinc-200">EvidenceForge</span>
              </div>
              <div className="space-y-1">
                {[
                  { label: 'Dashboard', icon: BarChart3 },
                  { label: 'Documents', icon: FolderOpen, badge: '47' },
                  { label: 'Timeline', icon: Clock, active: true },
                  { label: 'Review', icon: CheckCircle2, badge: '2' },
                  { label: 'Export', icon: Download },
                  { label: 'ROI', icon: TrendingUp },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-all ${
                        item.active 
                          ? 'bg-gradient-to-r from-blue-500/20 to-transparent text-white border border-blue-500/20' 
                          : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300'
                      }`}>
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.label}</span>
                      {item.badge && (
                        <span className="ml-auto text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-semibold">{item.badge}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">Evidence Timeline</h3>
                  <p className="text-xs text-zinc-500">5 events • 12 citations • 94% avg confidence</p>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-medium">2 approved</span>
                  <span className="text-xs px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20 font-medium">1 pending</span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Floor 12 access delayed 14 days', status: 'verified', conf: 94, date: 'Oct 3' },
                  { title: 'Additional ductwork scope — $47,500', status: 'approved', conf: 97, date: 'Oct 12' },
                  { title: 'Crew idle time: 84 man-days lost', status: 'pending', conf: 88, date: 'Oct 3' },
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 flex items-start gap-3 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      item.status === 'approved' ? 'bg-emerald-500' :
                      item.status === 'verified' ? 'bg-blue-500' : 'bg-amber-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-zinc-200 mb-1.5 group-hover:text-white transition-colors">{item.title}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-zinc-500">{item.date}</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-500">{item.conf}% confidence</span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-500">3 citations</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ===================== INTEGRATION LOGO COMPONENT ===================== */
function IntegrationLogo({ name, size = 28 }: { name: string; size?: number }) {
  const logos: Record<string, JSX.Element> = {
    Aconex: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Aconex logo">
        <path d="M14 2L3 8.5V19.5L14 26L25 19.5V8.5L14 2Z" fill="#E85D4A"/>
        <path d="M14 5L6 10V18L14 23L22 18V10L14 5Z" fill="#C74634"/>
        <path d="M14 8L9 11V17L14 20L19 17V11L14 8Z" fill="#E85D4A"/>
        <text x="14" y="16.5" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold" fontFamily="Arial, sans-serif">A</text>
      </svg>
    ),
    Procore: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Procore logo">
        <circle cx="14" cy="14" r="12" fill="#006BFF"/>
        <circle cx="14" cy="14" r="10" fill="#0052CC"/>
        <path d="M10 9H16C17.1 9 18 9.9 18 11C18 12.1 17.1 13 16 13H12V19H10V9ZM12 11V13H16C16.55 13 17 12.55 17 12C17 11.45 16.55 11 16 11H12Z" fill="white"/>
      </svg>
    ),
    Outlook: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Outlook logo">
        <rect x="3" y="5" width="22" height="18" rx="2" fill="#0078D4"/>
        <path d="M3 7L14 15L25 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="7" cy="21" r="4" fill="#0078D4" stroke="white" strokeWidth="2"/>
        <text x="7" y="23.5" textAnchor="middle" fill="white" fontSize="5" fontWeight="bold" fontFamily="Arial, sans-serif">O</text>
      </svg>
    ),
    SharePoint: (
      <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SharePoint logo">
        <circle cx="14" cy="14" r="12" fill="#038387"/>
        <circle cx="14" cy="9" r="3" fill="white"/>
        <circle cx="9" cy="17" r="3" fill="white"/>
        <circle cx="19" cy="17" r="3" fill="white"/>
        <path d="M14 12V17M9 17L14 12M19 17L14 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };
  return logos[name] || null;
}

/* ===================== LOGO MARQUEE ===================== */
function LogoMarquee() {
  const customers = ['Turner', 'PCL', 'Ledcor', 'EllisDon', 'Clark', 'Balfour Beatty', 'AECOM', 'Skanska'];
  const integrations = ['Aconex', 'Procore', 'Outlook', 'SharePoint'];

  return (
    <motion.section 
      className="py-24 lg:py-32 border-y border-white/[0.04]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Customer logos */}
        <motion.p 
          className="text-center text-sm text-zinc-600 mb-8 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Trusted by 2,400+ subcontractors
        </motion.p>
        <div className="relative overflow-hidden mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#09090b] to-transparent z-10" />
          <div className="flex gap-12 animate-marquee">
            {[...customers, ...customers].map((name, i) => (
              <motion.div 
                key={i} 
                className="flex items-center gap-2 flex-shrink-0 opacity-40 hover:opacity-70"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-white/[0.06] rounded-lg border border-white/[0.08] flex items-center justify-center">
                  <span className="text-xs font-bold text-zinc-400">{name[0]}</span>
                </div>
                <span className="text-sm font-medium text-zinc-400 whitespace-nowrap">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Integration partners - simplified */}
        <p className="text-center text-xs text-zinc-600 mb-6 uppercase tracking-widest">
          Integrates with your tools
        </p>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {integrations.map((name) => (
            <motion.div 
              key={name} 
              className="flex items-center gap-2 opacity-60 hover:opacity-100"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-white rounded-lg border border-white/[0.08] flex items-center justify-center">
                <IntegrationLogo name={name} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 45s linear infinite; }
      `}</style>
    </motion.section>
  );
}

/* ===================== ANIMATED STATS ===================== */
function Stats() {
  const stats = [
    { value: 10, suffix: 'x', label: 'Faster claims', description: 'from weeks to days', color: 'blue' },
    { value: 94, suffix: '%', label: 'AI accuracy', description: 'with source citations', color: 'emerald' },
    { value: 526, suffix: '', label: 'Documents synced', description: 'from your tools', color: 'violet' },
    { value: 100, suffix: '%', label: 'Audit ready', description: 'every citation verified', color: 'cyan' },
  ];

  const colorMap = {
    blue: { gradient: 'from-blue-400 to-blue-600', glow: 'shadow-blue-500/20' },
    emerald: { gradient: 'from-emerald-400 to-emerald-600', glow: 'shadow-emerald-500/20' },
    violet: { gradient: 'from-violet-400 to-violet-600', glow: 'shadow-violet-500/20' },
    cyan: { gradient: 'from-cyan-400 to-cyan-600', glow: 'shadow-cyan-500/20' },
  };

  return (
    <motion.section 
      className="relative py-24 lg:py-32 px-6 border-b border-white/[0.04] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, suffix, label, description, color }, i) => {
            const colors = colorMap[color as keyof typeof colorMap];
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="relative">
                  <motion.div 
                    className="mb-2"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className={`text-5xl lg:text-6xl font-bold bg-gradient-to-b ${colors.gradient} bg-clip-text text-transparent drop-shadow-lg`}>
                      <AnimatedCounter value={value} />
                      {suffix}
                    </span>
                  </motion.div>
                  <p className="text-lg font-semibold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">{label}</p>
                  <p className="text-sm text-zinc-500 mt-1">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

/* Animated counter component */
function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}</span>;
}

/* ===================== BENTO SHOWCASE ===================== */
function BentoShowcase() {
  return (
    <section id="features" className="py-24 lg:py-32 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Everything you need to build winning claims
          </h2>
        </div>

        {/* Bento Grid - Premium design with rich visuals */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* AI Extraction - Large with Document Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3 } }}
            className="md:col-span-3 relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/[0.08] p-8 hover:border-blue-500/40 transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                <Zap className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">AI Evidence Extraction</h3>
              
              {/* Visual: Document with extraction highlights */}
              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-xl p-4 border border-white/[0.06]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-zinc-500 font-mono">RFI-042.pdf</span>
                    <span className="ml-auto text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Processing</span>
                  </div>
                  {[
                    { text: 'Floor 12 access delayed 14 days', conf: 94, type: 'delay' },
                    { text: 'Additional ductwork scope $47,500', conf: 97, type: 'scope' },
                    { text: 'Formal notice sent within 5-day window', conf: 99, type: 'notice' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 bg-white/[0.04] rounded-lg px-3 py-2 border border-white/[0.06] hover:border-blue-500/30 transition-all"
                    >
                      <CircleDot className={`w-3.5 h-3.5 flex-shrink-0 ${
                        item.type === 'delay' ? 'text-red-400' : 
                        item.type === 'scope' ? 'text-violet-400' : 'text-emerald-400'
                      }`} />
                      <span className="text-sm text-zinc-300 flex-1">{item.text}</span>
                      <span className="text-xs text-zinc-500 font-mono">{item.conf}%</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Source Citations - with Document Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3 } }}
            className="md:col-span-3 relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/[0.08] p-8 hover:border-emerald-500/40 transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
                <BookOpen className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Exact Source Citations</h3>
              
              {/* Visual: Document with citation markers */}
              <div className="bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-xl p-4 border border-white/[0.06]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/[0.06]">
                    <div className="w-6 h-6 bg-emerald-500/20 rounded flex items-center justify-center">
                      <FileText className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-xs text-zinc-400 font-medium">Source Document</span>
                    <span className="ml-auto text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">Verified</span>
                  </div>
                  
                  {/* Citation 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/[0.04] rounded-lg p-3 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-emerald-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-emerald-400">1</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-emerald-400 font-mono mb-1">RFI-042.pdf — Page 1, Paragraph 3</p>
                        <p className="text-sm text-zinc-400 italic leading-relaxed">"MEP rough-in cannot commence until structural steel on Floor 12 is complete and inspected."</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Citation 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/[0.04] rounded-lg p-3 border border-emerald-500/20 hover:border-emerald-500/40 transition-all"
                  >
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-emerald-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-emerald-400">2</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-emerald-400 font-mono mb-1">Schedule-Rev3.pdf — Page 2, Row 14</p>
                        <p className="text-sm text-zinc-400 italic leading-relaxed">"Original start: Oct 3 → Revised start: Oct 17. Impact: 14 calendar days."</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gap Detection - with Warning Panel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.15 }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3 } }}
            className="md:col-span-2 relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/[0.08] p-8 hover:border-amber-500/40 transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-300">
                <Target className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Gap Detection</h3>
              
              {/* Visual: Warning panel with gaps */}
              <div className="bg-gradient-to-br from-amber-500/[0.03] to-transparent rounded-xl p-4 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-500/10">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="text-xs text-amber-400 font-medium">3 Gaps Detected</span>
                </div>
                <div className="space-y-2">
                  {[
                    { type: 'Critical', text: 'No time impact analysis', severity: 'high' },
                    { type: 'Warning', text: 'Missing daily logs Oct 6-7', severity: 'medium' },
                    { type: 'Info', text: 'No mitigation evidence', severity: 'low' },
                  ].map((gap, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 bg-white/[0.04] rounded-lg px-3 py-2 border border-white/[0.06]"
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        gap.severity === 'high' ? 'bg-red-400' :
                        gap.severity === 'medium' ? 'bg-amber-400' : 'bg-blue-400'
                      }`} />
                      <span className="text-xs text-zinc-500 font-medium">{gap.type}</span>
                      <span className="text-sm text-zinc-400 flex-1">{gap.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Auto Timeline - with Visual Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3 } }}
            className="md:col-span-2 relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/[0.08] p-8 hover:border-violet-500/40 transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/20 transition-all duration-300">
                <GitBranch className="w-7 h-7 text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Auto Timeline</h3>
              
              {/* Visual: Timeline with events */}
              <div className="bg-gradient-to-br from-violet-500/[0.03] to-transparent rounded-xl p-4 border border-violet-500/20">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent" />
                  
                  {/* Timeline events */}
                  <div className="space-y-3">
                    {[
                      { date: 'Oct 3', event: 'Access delay started', color: 'red' },
                      { date: 'Oct 7', event: 'Notice sent', color: 'blue' },
                      { date: 'Oct 12', event: 'Change order issued', color: 'violet' },
                      { date: 'Oct 17', event: 'Access restored', color: 'emerald' },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start gap-3 pl-6 relative"
                      >
                        <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-[#09090b] ${
                          item.color === 'red' ? 'bg-red-500' :
                          item.color === 'blue' ? 'bg-blue-500' :
                          item.color === 'violet' ? 'bg-violet-500' : 'bg-emerald-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-xs text-violet-400 font-mono mb-0.5">{item.date}</p>
                          <p className="text-sm text-zinc-400">{item.event}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* One-Click Export - with PDF Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.25 }}
            whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.3 } }}
            className="md:col-span-2 relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/[0.08] p-8 hover:border-cyan-500/40 transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300">
                <Download className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">One-Click Export</h3>
              
              {/* Visual: PDF Preview */}
              <div className="bg-gradient-to-br from-cyan-500/[0.03] to-transparent rounded-xl p-4 border border-cyan-500/20">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-cyan-500/10">
                  <div className="w-10 h-12 bg-white/[0.06] rounded-lg border border-white/[0.08] flex items-center justify-center">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-300 font-medium">Evidence_Package_v3.pdf</p>
                    <p className="text-xs text-zinc-500">89 pages • 12 citations</p>
                  </div>
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <Download className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white/[0.04] rounded-lg p-2 text-center border border-white/[0.06]">
                    <p className="text-sm font-bold text-white">5</p>
                    <p className="text-xs text-zinc-500">Events</p>
                  </div>
                  <div className="bg-white/[0.04] rounded-lg p-2 text-center border border-white/[0.06]">
                    <p className="text-sm font-bold text-white">12</p>
                    <p className="text-xs text-zinc-500">Citations</p>
                  </div>
                  <div className="bg-white/[0.04] rounded-lg p-2 text-center border border-white/[0.06]">
                    <p className="text-sm font-bold text-white">89</p>
                    <p className="text-xs text-zinc-500">Pages</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Native Integrations - Enhanced with Product Logos */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.3 }}
            whileHover={{ y: -6, scale: 1.005, transition: { duration: 0.3 } }}
            className="md:col-span-6 relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/[0.08] p-8 hover:border-violet-500/40 transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="w-14 h-14 bg-gradient-to-br from-violet-500/20 to-violet-600/10 border border-violet-500/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/20 transition-all duration-300">
                    <Layers className="w-7 h-7 text-violet-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Native Integrations</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-emerald-400 font-medium">All systems operational</span>
                </div>
              </div>
              
              {/* Visual: Integration Cards with Logos */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  { name: 'Aconex', docs: 47, color: 'blue', status: 'synced' },
                  { name: 'Procore', docs: 89, color: 'orange', status: 'synced' },
                  { name: 'Outlook', docs: 156, color: 'blue', status: 'synced' },
                  { name: 'SharePoint', docs: 234, color: 'cyan', status: 'synced' },
                ].map((integration, i) => (
                  <motion.div
                    key={integration.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06] hover:border-violet-500/30 hover:bg-white/[0.06] transition-all duration-200 group/integration"
                  >
                    {/* Product Logo */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white">
                        <IntegrationLogo name={integration.name} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{integration.name}</p>
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                          <span className="text-xs text-emerald-400">Connected</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sync Stats */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500">Documents synced</span>
                        <span className="text-sm font-bold text-white">{integration.docs}</span>
                      </div>
                      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.3, duration: 0.8 }}
                          className={`h-full rounded-full ${
                            integration.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-blue-400' :
                            integration.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-400' :
                            'bg-gradient-to-r from-cyan-500 to-cyan-400'
                          }`}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-zinc-500">
                        <span>Last sync: 2m ago</span>
                        <span className="text-emerald-400">Live</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Bottom Stats */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-zinc-500">Total synced</p>
                    <p className="text-lg font-bold text-white">526 docs</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Active integrations</p>
                    <p className="text-lg font-bold text-white">4/4</p>
                  </div>
                </div>
                <button className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 group/button">
                  View all integrations
                  <ArrowRight className="w-3 h-3 group-hover/button:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===================== FEATURE DEEP DIVE ===================== */
function FeatureDeepDive() {
  const features = [
    {
      title: 'AI-Powered Evidence Extraction',
      bullets: [
        'Extracts key facts and dates automatically',
        'Flags items for human review',
      ],
      icon: Zap,
      color: 'blue',
    },
    {
      title: 'Exact Source Citations',
      bullets: [
        'Page-level citations for every claim',
        'Full audit trail of AI decisions',
      ],
      icon: BookOpen,
      color: 'emerald',
    },
    {
      title: 'Native Integrations',
      bullets: [
        'Sync with Aconex, Procore & Outlook',
        'Real-time updates when files change',
      ],
      icon: Layers,
      color: 'violet',
    },
  ];

  const colorMap = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/20',
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20',
    },
    violet: {
      bg: 'bg-gradient-to-br from-violet-500/20 to-violet-600/10',
      border: 'border-violet-500/30',
      text: 'text-violet-400',
      glow: 'shadow-violet-500/20',
    },
  };

  return (
    <section id="how-it-works-deep" className="relative py-24 lg:py-32 px-6 border-b border-white/[0.04] overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">Deep Dive</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Built for construction claims
          </h2>
        </div>

        <div className="space-y-32">
          {features.map(({ title, bullets, icon: Icon, color }, i) => {
            const colors = colorMap[color as keyof typeof colorMap];
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.01 }}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className={isEven ? '' : 'lg:order-2'}>
                  <div className={`w-14 h-14 ${colors.bg} border ${colors.border} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${colors.glow}`}>
                    <Icon className={`w-7 h-7 ${colors.text}`} />
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6 tracking-tight">
                    {title}
                  </h3>
                  <ul className="space-y-4">
                    {bullets.map((bullet, j) => (
                      <li key={j} className="flex items-start gap-3 group">
                        <div className={`w-6 h-6 ${colors.bg} border ${colors.border} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                          <Check className={`w-3.5 h-3.5 ${colors.text}`} />
                        </div>
                        <span className="text-zinc-300 text-base leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual */}
                <div className={`relative ${isEven ? '' : 'lg:order-1'}`}>
                  {/* Enhanced glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} rounded-3xl blur-3xl opacity-30`} />
                  
                  {/* Premium card with depth */}
                  <div className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.1] rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
                    {/* Top highlight */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    {/* Mock UI */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-4 pb-5 border-b border-white/[0.08]">
                        <div className={`w-10 h-10 ${colors.bg} border ${colors.border} rounded-xl flex items-center justify-center shadow-lg ${colors.glow}`}>
                          <Icon className={`w-5 h-5 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="h-2.5 bg-gradient-to-r from-white/[0.1] to-white/[0.05] rounded w-36 mb-2" />
                          <div className="h-2 bg-white/[0.06] rounded w-28" />
                        </div>
                      </div>
                      {[...Array(3)].map((_, j) => (
                        <motion.div 
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: j * 0.1 }}
                          className="flex items-start gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.05] transition-all duration-200"
                        >
                          <div className={`w-8 h-8 ${colors.bg} border ${colors.border} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <div className={`w-2.5 h-2.5 ${colors.text.replace('text', 'bg')} rounded-full shadow-lg ${colors.glow}`} />
                          </div>
                          <div className="flex-1">
                            <div className="h-2.5 bg-gradient-to-r from-white/[0.1] to-white/[0.05] rounded w-full mb-2.5" />
                            <div className="h-2 bg-white/[0.06] rounded w-3/4" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===================== HOW IT WORKS ===================== */
function HowItWorks({ onEnterApp }: { onEnterApp: () => void }) {
  const steps = [
    { num: '01', title: 'Upload documents', icon: Upload, color: 'blue' },
    { num: '02', title: 'AI extracts evidence', icon: Zap, color: 'violet' },
    { num: '03', title: 'Review & verify', icon: CheckCircle2, color: 'emerald' },
    { num: '04', title: 'Export package', icon: Download, color: 'cyan' },
  ];

  const colorMap = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-500/20 to-blue-600/10',
      border: 'border-blue-500/30',
      text: 'text-blue-400',
      glow: 'shadow-blue-500/20',
    },
    violet: {
      bg: 'bg-gradient-to-br from-violet-500/20 to-violet-600/10',
      border: 'border-violet-500/30',
      text: 'text-violet-400',
      glow: 'shadow-violet-500/20',
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      glow: 'shadow-emerald-500/20',
    },
    cyan: {
      bg: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/20',
    },
  };

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 px-6 border-t border-white/[0.04] overflow-hidden scroll-mt-20">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">How it works</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Four steps to a winning claim
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, title, icon: Icon, color }, i) => {
            const colors = colorMap[color as keyof typeof colorMap];
            return (
              <motion.div 
                key={num}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.05, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Step number */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-sm font-mono font-bold text-zinc-400 bg-white/[0.06] px-3 py-1.5 rounded-lg border border-white/[0.08]">{num}</span>
                  {i < steps.length - 1 && <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent hidden lg:block" />}
                </div>
                
                {/* Icon with enhanced styling */}
                <div className={`w-16 h-16 ${colors.bg} border ${colors.border} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${colors.glow} group-hover:scale-110 transition-all duration-300`}>
                  <Icon className={`w-8 h-8 ${colors.text}`} />
                </div>
                
                <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button onClick={onEnterApp}
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-zinc-50 text-zinc-900 font-bold rounded-xl transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.2)] text-[15px] overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Start your free trial</span>
            <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ===================== TRUST SECTION ===================== */
function TrustSection() {
  const compliance = [
    { name: 'SOC 2 Type II', description: 'Annual audit completed' },
    { name: 'GDPR', description: 'EU data protection compliant' },
    { name: 'CCPA', description: 'California privacy compliant' },
  ];

  const security = [
    { icon: Lock, title: 'AES-256 Encryption', description: 'Military-grade encryption at rest' },
    { icon: Shield, title: 'TLS 1.3', description: 'Secure data in transit' },
    { icon: Clock, title: '99.9% Uptime', description: 'Enterprise-grade reliability' },
  ];

  return (
    <section className="relative py-24 lg:py-32 px-6 border-b border-white/[0.04] overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.02] via-transparent to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-sm font-medium text-emerald-400 uppercase tracking-wider mb-3">Security & Compliance</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Enterprise-grade security
          </h2>
        </div>

        {/* Security features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {security.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] rounded-2xl p-7 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
                  <Icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compliance badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-3xl p-10 lg:p-14 backdrop-blur-xl overflow-hidden"
        >
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <h3 className="text-2xl font-bold text-white mb-10 text-center tracking-tight">Compliance Certifications</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {compliance.map(({ name, description }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/20 transition-all duration-300">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <p className="text-base font-bold text-white mb-1.5 tracking-tight">{name}</p>
                <p className="text-sm text-zinc-500">{description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== COMPARISON TABLE ===================== */
function ComparisonTable() {
  const comparisons = [
    { feature: 'Evidence extraction time', manual: '40-80 hours', evidenceforge: '4-8 hours', improvement: '90% faster' },
    { feature: 'Source citations', manual: 'Manual tracking', evidenceforge: 'Automatic with page numbers', improvement: '100% accurate' },
    { feature: 'Missing evidence detection', manual: 'Easy to miss', evidenceforge: 'AI-powered alerts', improvement: 'Zero gaps' },
    { feature: 'Document organization', manual: 'Scattered files', evidenceforge: 'Centralized & synced', improvement: 'Always current' },
    { feature: 'Export & reporting', manual: 'Manual compilation', evidenceforge: 'One-click PDF export', improvement: 'Instant delivery' },
  ];

  return (
    <section className="relative py-24 lg:py-32 px-6 border-t border-white/[0.04] overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">Comparison</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            EvidenceForge vs. Manual Process
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            See why subcontractors choose automation over manual work
          </p>
        </div>

        <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/[0.08] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 p-6 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="text-sm font-semibold text-zinc-400">Feature</div>
            <div className="text-sm font-semibold text-zinc-400 text-center">Manual Process</div>
            <div className="text-sm font-semibold text-blue-400 text-center">EvidenceForge</div>
            <div className="text-sm font-semibold text-emerald-400 text-center">Improvement</div>
          </div>

          {/* Rows */}
          {comparisons.map(({ feature, manual, evidenceforge, improvement }, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-4 gap-4 p-6 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] hover:scale-[1.02] transition-all duration-300"
            >
              <div className="text-sm font-medium text-white">{feature}</div>
              <div className="text-sm text-zinc-500 text-center">{manual}</div>
              <div className="text-sm text-blue-300 text-center font-medium">{evidenceforge}</div>
              <div className="text-sm text-emerald-400 text-center font-semibold">{improvement}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
function Testimonials() {
  const testimonials = [
    { quote: "We used to spend 3 weeks compiling evidence packages manually. With EvidenceForge, we had a verified package with exact source citations in just 2 days. The AI caught details we would have missed.", name: 'Marcus Rivera', role: 'VP Operations', company: 'Rivera MEP', metric: '93% faster', avatar: 'MR' },
    { quote: "The Procore and Aconex integrations are game-changers. Documents sync automatically, and we've saved over 200 hours in the first quarter alone. No more manual file hunting.", name: 'Sarah Kim', role: 'Project Director', company: 'Pacific Coast Elec.', metric: '200+ hours saved', avatar: 'SK' },
    { quote: "Since implementing EvidenceForge, we've had zero disputes on our last 12 claims. The audit trail and source citations give our legal team complete confidence in every submission.", name: 'David Okafor', role: 'Claims Manager', company: 'Great Lakes Const.', metric: '0 disputes', avatar: 'DO' },
  ];

  return (
    <section className="relative py-24 lg:py-32 px-6 border-t border-white/[0.04] overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Trusted by claims professionals
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, company, metric, avatar }, i) => (
            <motion.div 
              key={name}
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
              className="group relative bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/[0.08] p-8 hover:border-white/[0.15] transition-all duration-300 overflow-hidden"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-white/[0.08] mb-5" />
                
                {/* Quote text */}
                <p className="text-base text-zinc-300 leading-relaxed mb-8">&ldquo;{quote}&rdquo;</p>
                
                {/* Author and metric */}
                <div className="flex items-center justify-between pt-6 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-gradient-to-br from-blue-500/30 to-violet-500/30 rounded-full flex items-center justify-center border border-white/[0.1] shadow-lg">
                      <span className="text-xs font-bold text-white">{avatar}</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{name}</p>
                      <p className="text-xs text-zinc-500">{role}, {company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">{metric}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== PRICING ===================== */
function Pricing({ onEnterApp, billingPeriod, setBillingPeriod }: {
  onEnterApp: () => void;
  billingPeriod: 'monthly' | 'annual';
  setBillingPeriod: (period: 'monthly' | 'annual') => void;
}) {
  const plans = [
    {
      name: 'Starter', 
      monthlyPrice: 149, 
      annualPrice: 119,
      desc: 'For small teams',
      features: ['3 active projects', '100 documents/month', 'AI evidence extraction', 'Email support'],
      cta: 'Start free trial', 
      highlighted: false,
    },
    {
      name: 'Professional', 
      monthlyPrice: 399,
      annualPrice: 319,
      desc: 'For growing firms',
      features: ['15 active projects', 'Unlimited documents', 'AI extraction + gap detection', 'Aconex & Procore integrations', 'Priority support'],
      cta: 'Start free trial', 
      highlighted: true,
    },
    {
      name: 'Enterprise', 
      monthlyPrice: null,
      annualPrice: null,
      desc: 'For large organizations',
      features: ['Unlimited everything', 'All integrations', 'RBAC & audit logging', 'API access', 'SLA guarantee'],
      cta: 'Contact sales', 
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 lg:py-32 px-6 border-t border-white/[0.04] scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">Start free. Scale as you grow. Cancel anytime.</p>
        </div>

        {/* Billing toggle */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              billingPeriod === 'monthly' ? 'bg-white text-zinc-900' : 'bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              billingPeriod === 'annual' ? 'bg-white text-zinc-900' : 'bg-white/[0.04] text-zinc-400 hover:bg-white/[0.08]'
            }`}
          >
            Annual
            <span className="ml-2 text-xs text-emerald-400">Save 20%</span>
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map(({ name, monthlyPrice, annualPrice, desc, features, cta, highlighted }, i) => {
            const price = billingPeriod === 'annual' ? annualPrice : monthlyPrice;
            return (
              <motion.div 
                key={name}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: highlighted ? 1.06 : 1.02, transition: { duration: 0.3 } }}
                className={`group relative rounded-2xl p-8 transition-all duration-300 ${
                  highlighted
                    ? 'bg-gradient-to-b from-blue-500/[0.15] to-blue-500/[0.05] border-2 border-blue-500/50 shadow-[0_0_60px_rgba(59,130,246,0.3)] scale-105 z-10'
                    : 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] hover:border-white/[0.15]'
                }`}
              >
                {/* Subtle glow on hover for non-highlighted */}
                {!highlighted && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                
                {/* Highlighted badge */}
                {highlighted && (
                  <>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                      <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-full shadow-[0_8px_30px_rgba(59,130,246,0.5)] whitespace-nowrap">
                        <Star className="w-3.5 h-3.5 fill-white" />
                        <span className="text-xs font-bold uppercase tracking-wide">Most Popular</span>
                      </div>
                    </div>
                    {/* Top highlight */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
                  </>
                )}
                
                <div className="relative">
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{name}</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    {price !== null ? (
                      <>
                        <span className="text-5xl font-bold bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">${price}</span>
                        <span className="text-sm text-zinc-500">/mo</span>
                      </>
                    ) : (
                      <span className="text-5xl font-bold bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent">Custom</span>
                    )}
                  </div>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{desc}</p>

                  <ul className="mt-8 space-y-4">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                          highlighted ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-white/[0.06] border border-white/[0.08]'
                        }`}>
                          <Check className={`w-3 h-3 ${highlighted ? 'text-blue-400' : 'text-zinc-400'}`} />
                        </div>
                        <span className="leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={onEnterApp}
                    className={`mt-8 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#09090b] ${
                      highlighted
                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-[0_8px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.5)]'
                        : 'bg-white/[0.08] text-white hover:bg-white/[0.12] border border-white/[0.1]'
                    }`}>
                    {cta}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm text-zinc-500 mt-8">
          All plans include 14-day free trial • No credit card required • 30-day money-back guarantee
        </p>
      </div>
    </section>
  );
}

/* ===================== FAQ ===================== */
function Faq({ openFaq, setOpenFaq }: { openFaq: number | null; setOpenFaq: (n: number | null) => void }) {
  const faqs = [
    { q: 'Is my data secure?', a: 'Yes, with AES-256 encryption and enterprise-grade security. Your data never trains our models.' },
    { q: 'How accurate is the AI?', a: '94% accuracy with exact page citations. Uncertain items are flagged for review.' },
    { q: 'What integrations do you support?', a: 'Aconex, Procore, Outlook, and SharePoint. Custom integrations on Enterprise.' },
    { q: 'How do you measure ROI?', a: 'Dashboard tracks time saved, evidence discovered, and claim value supported.' },
    { q: 'Do you offer a free trial?', a: 'Yes, with full access to all features. No credit card required to start.' },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 px-6 border-t border-white/[0.04] scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map(({ q, a }, i) => (
            <motion.div 
              key={i} 
              className="bg-white/[0.02] rounded-xl border border-white/[0.06] overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-xl">
                <span className="text-base font-medium text-white pr-4">{q}</span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-5 pb-5 overflow-hidden"
                  >
                    <p className="text-sm text-zinc-400 leading-relaxed">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center bg-white/[0.02] rounded-2xl border border-white/[0.06] p-8">
          <p className="text-lg font-semibold text-white mb-2">Still have questions?</p>
          <p className="text-sm text-zinc-400 mb-4">Can't find what you're looking for? Contact our team.</p>
          <a href="mailto:support@evidenceforge.io" className="text-sm text-blue-400 hover:text-blue-300 font-medium">
            support@evidenceforge.io →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===================== FINAL CTA ===================== */
function FinalCta({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <section className="relative py-24 lg:py-32 px-6 border-t border-white/[0.04] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.03] to-transparent" />
      
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Multi-layer gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-violet-700" />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-violet-500/20" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          {/* Static glow effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-[100px]" />
          
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="relative p-12 lg:p-20 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-5 tracking-tight">
              Ready to get started?
            </h2>
            <p className="text-lg lg:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start your free trial.
            </p>
            <button onClick={onEnterApp}
              className="group relative inline-flex items-center gap-2 px-10 py-4 bg-white hover:bg-zinc-50 text-zinc-900 font-bold rounded-xl transition-all shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.3)] text-[15px] overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Start your free trial</span>
              <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-8 text-sm text-blue-200">
              14-day free trial • No credit card • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.04] py-16 px-6 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.01] to-transparent" />
      
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-base tracking-tight">EvidenceForge</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs mb-6">
              AI-powered claim evidence preparation for construction subcontractors.
            </p>
            <div className="flex items-center gap-3 mb-5">
              <a href="#" className="w-9 h-9 bg-white/[0.04] border border-white/[0.06] rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/[0.04] border border-white/[0.06] rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-white/[0.04] border border-white/[0.06] rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Github className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md font-medium">SOC 2</span>
              <span className="text-xs text-zinc-500 bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-md font-medium">GDPR</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5 tracking-tight">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Pricing', 'Integrations', 'Changelog'].map((link) => (
                <li key={link}><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5 tracking-tight">Company</h4>
            <ul className="space-y-3">
              {['About', 'Contact', 'Status'].map((link) => (
                <li key={link}><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-white mb-5 tracking-tight">Legal</h4>
            <ul className="space-y-3">
              {['Privacy', 'Terms', 'Security'].map((link) => (
                <li key={link}><a href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-600">&copy; {currentYear} EvidenceForge Inc. All rights reserved.</p>
          <a href="#" className="w-9 h-9 bg-white/[0.04] border border-white/[0.06] rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.1] transition-all">
            <Globe className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ===================== BACK TO TOP ===================== */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-10 h-10 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.08] rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#09090b]"
      aria-label="Back to top"
    >
      <ArrowUp className="w-4 h-4 text-white" />
    </motion.button>
  );
}
