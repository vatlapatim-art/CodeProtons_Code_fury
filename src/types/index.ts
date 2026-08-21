export interface RiskAnswers {
  incomeStability: 'salaried' | 'freelance' | 'business' | 'variable';
  primaryGoal: 'wealth' | 'income' | 'preservation' | 'specific';
  timeHorizon: '<1y' | '1-3y' | '3-5y' | '5-10y' | '10y+';
  lossTolerance: '0-5%' | '5-15%' | '15-30%' | '30%+';
  experience: 'none' | 'beginner' | 'intermediate' | 'advanced';
  liquidityNeed: 'immediate' | '1m' | '3m' | '6m' | '1y+';
}

export type RiskTier = 'conservative' | 'moderate' | 'aggressive';

export interface RiskProfile {
  tier: RiskTier;
  allocation: {
    equity: number;
    debt: number;
    gold: number;
    cash: number;
  };
  confidence: number;
  score: number;
}

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  platform: string;
  assetClass: 'equity' | 'debt' | 'gold' | 'cash';
  top10Stocks?: string[];
}

export interface Allocation {
  equity: number;
  debt: number;
  gold: number;
  cash: number;
}

export interface OverlapPair {
  fundA: string;
  fundB: string;
  commonStocks: string[];
  overlapPct: number;
}

export interface OverlapReport {
  pairs: OverlapPair[];
  severity: 'low' | 'medium' | 'high';
}

export interface BenchmarkData {
  nifty50: number[];
  nifty500: number[];
  gold: number[];
}

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  targetDate: string;
  priority: 'essential' | 'aspirational';
  currentAmount: number;
  monthlySIP: number;
  confidencePct: number;
  createdAt: string;
}

export type InsightType = 'positive' | 'warning' | 'info';

export interface Insight {
  type: InsightType;
  title: string;
  detail: string;
}

export interface InsightContext {
  sharpe: number;
  maxHoldingPct: number;
  overlapSeverity: 'low' | 'medium' | 'high';
  startedSIPWithoutQuiz: boolean;
  hasEmergencyFund: boolean;
  portfolioReturn: number;
  benchmarkReturn: number;
}

export interface RedFlag {
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
}

export interface User {
  id: string;
  email: string;
  riskProfile?: RiskProfile;
  onboardingCompleted: boolean;
}