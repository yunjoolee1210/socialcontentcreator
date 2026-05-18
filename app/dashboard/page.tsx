"use client";

import { 
  TrendingUp, 
  FileText, 
  Share2, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const mockData = [
  { name: "월", 수집: 120, 게시: 45 },
  { name: "화", 수집: 180, 게시: 62 },
  { name: "수", 수집: 150, 게시: 55 },
  { name: "목", 수집: 210, 게시: 85 },
  { name: "금", 수집: 190, 게시: 70 },
  { name: "토", 수집: 90, 게시: 30 },
  { name: "일", 수집: 110, 게시: 40 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">대시보드</h1>
        <p className="text-muted-foreground">
          자동화 파이프라인의 현재 상태와 주요 지표를 확인하세요.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "오늘 수집 기사",
            value: "148",
            trend: "+12.5%",
            isUp: true,
            icon: FileText,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
          },
          {
            title: "오늘 생성 게시글",
            value: "52",
            trend: "+8.2%",
            isUp: true,
            icon: Share2,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
          },
          {
            title: "업로드 성공률",
            value: "96.4%",
            trend: "-1.2%",
            isUp: false,
            icon: TrendingUp,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
          },
          {
            title: "실패 작업",
            value: "3",
            trend: "0%",
            isUp: true,
            icon: AlertCircle,
            color: "text-red-500",
            bg: "bg-red-500/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-border bg-card/50 glass relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <stat.icon className={`w-16 h-16 ${stat.color}`} />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <h3 className="font-medium text-muted-foreground">{stat.title}</h3>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className={`flex items-center text-sm font-medium mb-1 ${stat.isUp ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight className="w-4 h-4 mr-0.5" /> : <ArrowDownRight className="w-4 h-4 mr-0.5" />}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card/50 glass">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">주간 활동 내역</h2>
            <select className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option>최근 7일</option>
              <option>이번 달</option>
              <option>올해</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCrawled" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPosted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '0.75rem' }}
                  itemStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="수집" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorCrawled)" />
                <Area type="monotone" dataKey="게시" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorPosted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Keywords */}
        <div className="p-6 rounded-2xl border border-border bg-card/50 glass">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">인기 키워드</h2>
            <Link href="/dashboard/keywords" className="text-sm text-primary hover:underline">
              전체 보기
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { keyword: "AI 마케팅", count: 42, platforms: ["X", "IG"] },
              { keyword: "ChatGPT 활용", count: 38, platforms: ["X"] },
              { keyword: "B2B SaaS", count: 25, platforms: ["IG"] },
              { keyword: "자동화 트렌드", count: 18, platforms: ["X", "IG"] },
              { keyword: "콘텐츠 크리에이션", count: 15, platforms: ["X"] },
            ].map((kw, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border/50 bg-background/50 hover:bg-muted/50 transition-colors">
                <div>
                  <h4 className="font-medium">{kw.keyword}</h4>
                  <div className="flex gap-1 mt-1">
                    {kw.platforms.map(p => (
                      <span key={p} className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{kw.count}</div>
                  <div className="text-xs text-muted-foreground">기사</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
