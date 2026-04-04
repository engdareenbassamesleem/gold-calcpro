import React, { useState } from 'react';
import { 
  Coins, 
  TrendingUp, 
  DollarSign, 
  Scale, 
  ArrowRightLeft, 
  Info, 
  CheckCircle2, 
  ChevronRight,
  Search,
  BarChart3,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Currency = 'USD' | 'QAR' | 'EUR' | 'GBP' | 'AED';
type Purity = 24 | 22 | 21 | 18;

interface CalculationResult {
  totalPrice: number;
  pricePerGram: number;
  currency: Currency;
  weight: number;
  purity: Purity;
}

// --- Constants ---
const CURRENCIES: { label: string; value: Currency; symbol: string; rate: number }[] = [
  { label: 'US Dollar', value: 'USD', symbol: '$', rate: 1 },
  { label: 'Qatari Riyal', value: 'QAR', symbol: 'ر.ق', rate: 3.64 },
  { label: 'Euro', value: 'EUR', symbol: '€', rate: 0.92 },
  { label: 'British Pound', value: 'GBP', symbol: '£', rate: 0.79 },
  { label: 'UAE Dirham', value: 'AED', symbol: 'د.إ', rate: 3.67 },
];

const PURITIES: { label: string; value: Purity; factor: number }[] = [
  { label: '24K (99.9%)', value: 24, factor: 1 },
  { label: '22K (91.6%)', value: 22, factor: 0.916 },
  { label: '21K (87.5%)', value: 21, factor: 0.875 },
  { label: '18K (75.0%)', value: 18, factor: 0.75 },
];

const PAIN_POINTS = [
  { keyword: "Live gold price today", volume: "High", intent: "Transactional" },
  { keyword: "Gold rate per gram 24k", volume: "High", intent: "Informational" },
  { keyword: "Gold price calculator with purity", volume: "Medium", intent: "Tool-seeking" },
  { keyword: "Scrap gold value calculator", volume: "Medium", intent: "Selling" },
  { keyword: "Gold investment for small business", volume: "Low", intent: "Strategic" },
  { keyword: "Gold price forecast 2024", volume: "High", intent: "Research" },
  { keyword: "How to calculate gold jewelry price", volume: "Medium", intent: "Educational" },
  { keyword: "Gold vs inflation protection", volume: "Medium", intent: "Investment" },
  { keyword: "Selling gold for cash near me", volume: "High", intent: "Local" },
  { keyword: "Gold purity testing methods", volume: "Low", intent: "Technical" },
  { keyword: "Current gold rate in QAR", volume: "Medium", intent: "Regional" },
  { keyword: "Gold market volatility trends", volume: "Low", intent: "Analysis" },
  { keyword: "Tax on gold sales", volume: "Medium", intent: "Legal" },
  { keyword: "Gold storage for businesses", volume: "Low", intent: "Operational" },
  { keyword: "Gold price conversion USD to QAR", volume: "Medium", intent: "Conversion" },
];

export default function App() {
  const [weight, setWeight] = useState<number>(10);
  const [purity, setPurity] = useState<Purity>(24);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [marketRate, setMarketRate] = useState<number>(75.50); // Mock USD per gram for 24K
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate processing
    setTimeout(() => {
      const purityFactor = PURITIES.find(p => p.value === purity)?.factor || 1;
      const currencyRate = CURRENCIES.find(c => c.value === currency)?.rate || 1;
      
      const pricePerGram = marketRate * purityFactor * currencyRate;
      const totalPrice = pricePerGram * weight;
      
      setResult({
        totalPrice,
        pricePerGram,
        currency,
        weight,
        purity
      });
      setIsCalculating(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#2C2C2C] text-white font-sans selection:bg-[#FFD700] selection:text-[#2C2C2C]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#2C2C2C]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-[#FFD700] p-2 rounded-lg">
              <Coins className="text-[#2C2C2C] w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              GoldCalc<span className="text-[#FFD700]">Pro</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#" className="hover:text-[#FFD700] transition-colors">Calculator</a>
            <a href="#" className="hover:text-[#FFD700] transition-colors">Market Analysis</a>
            <a href="#" className="hover:text-[#FFD700] transition-colors">Currency Rates</a>
          </nav>
          <button className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-[#1E90FF]/20">
            Get Pro Access
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
          >
            Precision Gold Pricing <br />
            <span className="text-[#FFD700]">For Modern Traders</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl mx-auto"
          >
            Instantly calculate gold value based on weight, purity, and live market rates. 
            Designed for small business owners to ensure accurate, fast, and reliable pricing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                <Scale className="text-[#FFD700] w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold">Calculation Details</h2>
            </div>

            <form onSubmit={handleCalculate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Gold Weight (Grams)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.01"
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    className="w-full bg-white text-[#2C2C2C] px-5 py-4 rounded-2xl focus:ring-2 focus:ring-[#1E90FF] outline-none text-lg font-semibold transition-all"
                    placeholder="Enter weight..."
                    required
                  />
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40 font-bold">G</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Gold Purity (Karat)</label>
                <div className="grid grid-cols-2 gap-3">
                  {PURITIES.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setPurity(p.value)}
                      className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                        purity === p.value 
                        ? 'bg-[#FFD700] border-[#FFD700] text-[#2C2C2C]' 
                        : 'bg-transparent border-white/10 text-white/70 hover:border-white/30'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Target Currency</label>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="w-full bg-white text-[#2C2C2C] px-5 py-4 rounded-2xl focus:ring-2 focus:ring-[#1E90FF] outline-none text-lg font-semibold appearance-none transition-all"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label} ({c.value})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/50 mb-2">Market Rate (USD/Gram 24K)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.01"
                    value={marketRate}
                    onChange={(e) => setMarketRate(parseFloat(e.target.value))}
                    className="w-full bg-white text-[#2C2C2C] px-5 py-4 rounded-2xl focus:ring-2 focus:ring-[#1E90FF] outline-none text-lg font-semibold transition-all"
                    placeholder="Current market rate..."
                    required
                  />
                  <DollarSign className="absolute right-5 top-1/2 -translate-y-1/2 text-[#2C2C2C]/40 w-5 h-5" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isCalculating}
                className="w-full bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white py-5 rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#1E90FF]/20 disabled:opacity-50"
              >
                {isCalculating ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <TrendingUp className="w-6 h-6" />
                    Calculate Price
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Section */}
          <div className="lg:col-span-7 space-y-8">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#FFD700] rounded-3xl p-10 text-[#2C2C2C] shadow-2xl shadow-[#FFD700]/10"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-1">Total Valuation</p>
                      <h3 className="text-6xl font-black">
                        {CURRENCIES.find(c => c.value === result.currency)?.symbol}
                        {result.totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </h3>
                    </div>
                    <div className="bg-[#2C2C2C] text-[#FFD700] px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter">
                      Live Estimate
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 border-t border-[#2C2C2C]/10 pt-8">
                    <div>
                      <p className="text-xs font-bold uppercase opacity-50 mb-1">Price Per Gram</p>
                      <p className="text-xl font-extrabold">
                        {CURRENCIES.find(c => c.value === result.currency)?.symbol}
                        {result.pricePerGram.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase opacity-50 mb-1">Weight</p>
                      <p className="text-xl font-extrabold">{result.weight} Grams</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase opacity-50 mb-1">Purity</p>
                      <p className="text-xl font-extrabold">{result.purity} Karat</p>
                    </div>
                  </div>

                  <div className="mt-10 bg-[#2C2C2C] rounded-2xl p-6 text-white flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FFD700] flex items-center justify-center">
                        <CheckCircle2 className="text-[#2C2C2C] w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Ready to Trade?</p>
                        <p className="text-xs text-white/60">Calculations based on current market data.</p>
                      </div>
                    </div>
                    <button className="bg-[#FFD700] text-[#2C2C2C] px-4 py-2 rounded-lg text-xs font-bold hover:scale-105 transition-transform">
                      Export PDF
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/5 border border-dashed border-white/20 rounded-3xl p-20 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <BarChart3 className="text-white/20 w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-white/40">Awaiting Input</h3>
                  <p className="text-white/20 max-w-xs mx-auto mt-2">Enter the gold details on the left to generate a professional valuation.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Steps / Suggestions */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#1E90FF]/10 flex items-center justify-center">
                  <ChevronRight className="text-[#1E90FF] w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold">What to do next?</h2>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-[#FFD700]/10 flex items-center justify-center shrink-0">
                    <ArrowRightLeft className="text-[#FFD700] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold group-hover:text-[#FFD700] transition-colors">Compare with Competitors</h4>
                    <p className="text-sm text-white/50">Check if your current supplier rates match the global market average.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl bg-[#1E90FF]/10 flex items-center justify-center shrink-0">
                    <Globe className="text-[#1E90FF] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold group-hover:text-[#1E90FF] transition-colors">Analyze Regional Trends</h4>
                    <p className="text-sm text-white/50">Switch currency to QAR or AED to see regional arbitrage opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Market Insights / Keywords Section */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Market Search Insights</h2>
              <p className="text-white/50">Top 15 pain points and keywords traders are searching for right now.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <Search className="w-4 h-4 text-[#FFD700]" />
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Global Trends</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAIN_POINTS.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[#FFD700] font-mono text-xs">#{idx + 1}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                    item.volume === 'High' ? 'bg-red-500/20 text-red-400' : 
                    item.volume === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {item.volume} Volume
                  </span>
                </div>
                <h4 className="font-bold mb-2 group-hover:text-[#FFD700] transition-colors">{item.keyword}</h4>
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3 text-white/30" />
                  <span className="text-[10px] text-white/40 font-medium uppercase tracking-widest">Intent: {item.intent}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-white/10 py-12 bg-[#2C2C2C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#FFD700] p-1.5 rounded">
              <Coins className="text-[#2C2C2C] w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              GoldCalc<span className="text-[#FFD700]">Pro</span>
            </span>
          </div>
          <p className="text-white/40 text-sm">© 2024 GoldCalc Pro. All market data is simulated for demonstration.</p>
          <div className="flex gap-6 text-white/40 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
