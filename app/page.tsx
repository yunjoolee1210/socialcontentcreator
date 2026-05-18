import Link from "next/link";
import {
  Sparkles,
  Zap,
  BarChart3,
  Globe,
  ArrowRight,
  Bot,
  Newspaper,
  Share2,
  TrendingUp,
  Shield,
  Clock,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">ContentCreator AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">기능</a>
            <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition-colors">워크플로우</a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">가격</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              무료 시작
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-muted/50 text-sm mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              AI 마케팅 자동화 플랫폼
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in stagger-1">
              키워드 하나로{" "}
              <span className="gradient-text">마케팅 전체를</span>
              <br />
              자동화하세요
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in stagger-2">
              뉴스 수집부터 AI 요약, SNS 게시글 생성, Instagram/X 자동 업로드,
              통계 분석까지. 키워드만 등록하면 모든 것이 자동으로 처리됩니다.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in stagger-3">
              <Link
                href="/register"
                className="group flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/25"
              >
                무료로 시작하기
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="flex items-center gap-2 px-8 py-3 border border-border rounded-xl text-foreground hover:bg-muted/50 transition-colors"
              >
                자세히 알아보기
              </Link>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 max-w-5xl mx-auto animate-fade-in stagger-4">
            <div className="relative rounded-2xl border border-border/50 bg-card/50 glass overflow-hidden shadow-2xl">
              {/* Fake browser bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="w-64 h-6 bg-muted rounded-md mx-auto" />
                </div>
              </div>
              {/* Preview content */}
              <div className="p-6 grid grid-cols-4 gap-4">
                <div className="col-span-1 space-y-3">
                  <div className="h-8 bg-muted rounded-md w-3/4" />
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-6 bg-muted/50 rounded-md" />
                    ))}
                  </div>
                </div>
                <div className="col-span-3 space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "오늘 수집 기사", value: "127", color: "from-purple-500 to-blue-500" },
                      { label: "생성 게시글", value: "48", color: "from-pink-500 to-rose-500" },
                      { label: "업로드 성공률", value: "96%", color: "from-emerald-500 to-teal-500" },
                    ].map((card, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-border/50 bg-gradient-to-br from-muted/50 to-transparent"
                      >
                        <p className="text-xs text-muted-foreground">{card.label}</p>
                        <p className={`text-2xl font-bold mt-1 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                          {card.value}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="h-40 rounded-xl border border-border/50 bg-muted/30 flex items-end p-4 gap-1">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm opacity-80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              모든 마케팅 워크플로우를{" "}
              <span className="gradient-text">자동화</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              키워드 등록 하나로 뉴스 수집, AI 콘텐츠 생성, SNS 자동 게시까지 완전 자동화
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Newspaper,
                title: "스마트 뉴스 수집",
                description: "RSS, NewsAPI, Firecrawl, Playwright를 활용한 멀티소스 뉴스 자동 수집. 중복 제거 및 품질 필터링 적용.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Bot,
                title: "AI 콘텐츠 생성",
                description: "GPT-5 기반 SEO 요약, Instagram 캡션, X 게시글, 해시태그 자동 생성. 브랜드 톤 유지.",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Share2,
                title: "SNS 자동 업로드",
                description: "Instagram, X(Twitter) 자동 게시. 예약 게시, 이미지 업로드, 실패 재시도 지원.",
                gradient: "from-pink-500 to-rose-500",
              },
              {
                icon: TrendingUp,
                title: "트렌드 분석",
                description: "온톨로지 기반 의미 검색, 트렌드 점수 산출, 감정 분석, 엔티티 추출.",
                gradient: "from-amber-500 to-orange-500",
              },
              {
                icon: BarChart3,
                title: "실시간 분석",
                description: "수집/게시 통계, 성공률 추적, 인기 키워드 분석, Excel 다운로드.",
                gradient: "from-emerald-500 to-teal-500",
              },
              {
                icon: Shield,
                title: "엔터프라이즈 보안",
                description: "RBAC, API 암호화, Rate Limiting, CSRF 보호, 에러 모니터링.",
                gradient: "from-indigo-500 to-violet-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              자동화 <span className="gradient-text">파이프라인</span>
            </h2>
            <p className="text-muted-foreground">
              키워드 등록부터 SNS 게시까지 완전 자동화된 워크플로우
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              { step: "01", title: "키워드 등록", desc: "타겟 키워드, 카테고리, 톤, 플랫폼 설정", icon: Sparkles },
              { step: "02", title: "뉴스 자동 수집", desc: "RSS + NewsAPI + Firecrawl 멀티소스 크롤링", icon: Globe },
              { step: "03", title: "AI 콘텐츠 생성", desc: "GPT-5 기반 요약, 캡션, 해시태그 자동 생성", icon: Bot },
              { step: "04", title: "SNS 자동 업로드", desc: "Instagram/X 자동 게시 및 예약", icon: Share2 },
              { step: "05", title: "분석 & 리포트", desc: "실시간 통계, Excel 다운로드, 트렌드 분석", icon: BarChart3 },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 mb-8 last:mb-0">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  {i < 4 && (
                    <div className="absolute top-14 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-purple-500/30 to-transparent" />
                  )}
                </div>
                <div className="pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-mono text-purple-400">{item.step}</span>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-pink-500/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-muted-foreground mb-8">
              키워드만 등록하면 AI가 모든 마케팅 작업을 대신합니다.
              무료 플랜으로 시작해보세요.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90 transition-all shadow-lg shadow-primary/25 text-lg"
            >
              <Sparkles className="w-5 h-5" />
              무료로 시작하기
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-semibold">ContentCreator AI</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 ContentCreator AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
