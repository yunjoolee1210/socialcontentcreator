import * as XLSX from "xlsx";

export function exportToExcel(data: any[], filename: string, sheetName: string = "Sheet1"): Buffer {
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Auto-size columns
  const colWidths = Object.keys(data[0] || {}).map((key) => ({
    wch: Math.max(
      key.length,
      ...data.map((row) => String(row[key] || "").length)
    ),
  }));
  worksheet["!cols"] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" }) as Buffer;
}

export function formatArticlesForExport(articles: any[]) {
  return articles.map((article) => ({
    제목: article.title,
    요약: article.summary,
    출처: article.sourceUrl,
    카테고리: article.keyword?.category || "",
    감정: article.sentiment || "",
    트렌드점수: article.trendScore || 0,
    게시일: article.publishedAt,
    수집일: article.createdAt,
  }));
}

export function formatPostsForExport(posts: any[]) {
  return posts.map((post) => ({
    플랫폼: post.platform,
    내용: post.content,
    해시태그: post.hashtags?.join(", ") || "",
    상태: post.status,
    예약시간: post.scheduledAt || "",
    생성일: post.createdAt,
  }));
}
