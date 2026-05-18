import { z } from "zod";

export const keywordSchema = z.object({
  keyword: z.string().min(1, "키워드를 입력해주세요").max(100),
  category: z.string().min(1, "카테고리를 선택해주세요"),
  tone: z.string().min(1, "톤을 선택해주세요"),
  platforms: z.array(z.string()).min(1, "최소 1개 플랫폼을 선택해주세요"),
  postingTime: z.string().min(1, "게시 시간을 선택해주세요"),
  ontologyDomain: z.string().optional(),
  semanticKeywords: z.array(z.string()).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일을 입력해주세요"),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "이름은 최소 2자 이상이어야 합니다"),
  email: z.string().email("올바른 이메일을 입력해주세요"),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});

export type KeywordFormData = z.infer<typeof keywordSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
