"use server";

export async function generateContent(keyword: string) {
  // Simulate processing time
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Generate 10 mock contents based on the keyword
  const results = Array.from({ length: 10 }).map((_, i) => ({
    id: i + 1,
    topic: `${keyword} 관련 최신 트렌드 ${i + 1}`,
    summary: `최근 24시간 동안 수집된 ${keyword}에 대한 주요 뉴스 및 인사이트입니다.`,
    instagram: {
      caption: `🔥 ${keyword} 트렌드 업데이트!\n\n최근 ${keyword}에 대한 놀라운 소식이 있습니다. 놓치지 마세요!\n\n#${keyword.replace(/\s+/g, "")} #트렌드 #인사이트`,
      imageUrl: `https://source.unsplash.com/random/800x800/?${encodeURIComponent(keyword)},${i}`,
    },
    x: {
      content: `🚨 [속보] ${keyword} 관련 최신 24시간 트렌드 분석.\n\n지금 바로 확인해보세요. ${keyword} 시장이 빠르게 변화하고 있습니다! 📈\n\n#${keyword.replace(/\s+/g, "")} #뉴스`,
    },
  }));

  return { success: true, data: results };
}
