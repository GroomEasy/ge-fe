export type CreateReviewRequest = {
  consultationId: number;
  rating: number; // 1~5
  content: string; // 30~1000자
  imageUrls: string[]; // 최대 5개
};

export type CreateReviewResponse = {
  statusCode: number;
  message: string;
  data: {
    reviewId: number;
    consultationId: number;
    message: string;
  };
};

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function postReview(payload: CreateReviewRequest): Promise<CreateReviewResponse> {
  const res = await fetch(`${API_BASE}/review`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `리뷰 작성 실패 (HTTP ${res.status})`);
  }

  return (await res.json()) as CreateReviewResponse;
}
