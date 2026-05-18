"use client";

import { useState } from "react";
import { 
  Sparkles, 
  Search, 
  Clock, 
  CheckCircle2, 
  Instagram, 
  Twitter, 
  Send,
  Loader2,
  RefreshCw,
  Image as ImageIcon
} from "lucide-react";
import { generateContent } from "../actions";

export default function DashboardPage() {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [results, setResults] = useState<any[] | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setResults(null);
    setStep(1); // 검색 중
    
    setTimeout(() => setStep(2), 1000); // 토픽 추출 중
    setTimeout(() => setStep(3), 2000); // 생성 중

    try {
      const res = await generateContent(keyword);
      if (res.success) {
        setResults(res.data);
        setStep(4); // 완료
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          핵심 기능: AI 콘텐츠 자동 생성
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          키워드만 입력하세요.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            24시간 트렌드 분석 & Top 10 콘텐츠 생성
          </span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          최근 24시간 동안의 뉴스와 데이터를 수집하여, 가장 트렌디한 10개의 토픽을 추출하고 인스타그램/X 맞춤형 게시글을 작성합니다.
        </p>
      </div>

      <div className="bg-card/50 glass rounded-3xl p-6 border border-border shadow-xl">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="예: AI 마케팅, 비트코인, 테슬라..."
              className="w-full h-14 pl-12 pr-4 rounded-2xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !keyword.trim()}
            className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            Top 10 생성하기
          </button>
        </form>

        {/* Loading Steps */}
        {loading && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: 1, title: "24시간 데이터 검색", icon: Clock },
              { id: 2, title: "핵심 토픽 추출", icon: RefreshCw },
              { id: 3, title: "콘텐츠 자동 작성", icon: Sparkles },
            ].map((s) => (
              <div 
                key={s.id} 
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-500 ${
                  step >= s.id 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-border bg-muted/30 text-muted-foreground'
                }`}
              >
                {step > s.id ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : step === s.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <s.icon className="w-5 h-5" />
                )}
                <span className="font-medium">{s.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6 pt-8 border-t border-border/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              생성 완료: Top 10 콘텐츠
            </h2>
            <button className="text-sm px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg font-medium transition-colors">
              모두 자동 게시
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {results.map((item) => (
              <div key={item.id} className="rounded-2xl border border-border bg-card/50 glass overflow-hidden flex flex-col">
                <div className="p-5 border-b border-border/50 bg-muted/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-primary text-primary-foreground">
                      TOP {item.id}
                    </span>
                    <h3 className="font-semibold text-lg truncate">{item.topic}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.summary}</p>
                </div>

                <div className="p-5 flex-1 space-y-6">
                  {/* Instagram Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-pink-500 font-medium text-sm">
                      <Instagram className="w-4 h-4" /> Instagram용
                    </div>
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 border border-border overflow-hidden relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.instagram.imageUrl} alt="preview" className="absolute inset-0 w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm bg-muted/30 p-3 rounded-xl whitespace-pre-wrap h-24 overflow-y-auto border border-border/50">
                          {item.instagram.caption}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* X Preview */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-blue-500 font-medium text-sm">
                      <Twitter className="w-4 h-4" /> X (Twitter)용
                    </div>
                    <p className="text-sm bg-muted/30 p-3 rounded-xl whitespace-pre-wrap border border-border/50">
                      {item.x.content}
                    </p>
                  </div>
                </div>

                <div className="p-4 border-t border-border/50 bg-muted/10 grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors text-sm">
                    <Instagram className="w-4 h-4" /> IG 게시
                  </button>
                  <button className="flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors text-sm">
                    <Twitter className="w-4 h-4" /> X 게시
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
