// src/pages/ReviewWritePage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { postReview } from "@/api/review";
import { uploadImageViaPresign } from "@/api/s3forFlow";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Star({ filled, onClick, label }: { filled: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="p-0.5">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        className={cn(
          "transition-colors",
          filled ? "fill-[#111111] text-[#111111]" : "fill-[#D1D1D6] text-[#D1D1D6]",
        )}
      >
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </button>
  );
}

type Draft = {
  rating: number;
  content: string;
  tags: string[];
  imageKeys: string[];
  savedAt: number;
};

export default function ReviewWritePage() {
  const nav = useNavigate();
  const location = useLocation();
  const params = useParams<{ consultationId?: string }>();

  // ✅ 1) URL param 우선, 없으면 location.state에서 받기
  const consultationIdRaw =
    params.consultationId ??
    (location.state as { consultationId?: string | number } | null)?.consultationId;

  // ✅ 2) API 스펙상 number라서 최종적으로 number로 변환해 사용
  const consultationId = useMemo(() => {
    if (consultationIdRaw == null) return null;
    const n = Number(consultationIdRaw);
    return Number.isFinite(n) ? n : null;
  }, [consultationIdRaw]);

  const DRAFT_KEY = useMemo(() => {
    // consultationId가 없으면 임시 키라도 하나 만들어두기
    return consultationId != null ? `reviewDraft:${consultationId}` : `reviewDraft:unknown`;
  }, [consultationId]);

  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // ✅ 서버로 보낼 값은 "업로드 후 받은 key"만
  const [imageKeys, setImageKeys] = useState<string[]>([]);
  // ✅ 화면 프리뷰는 objectURL로만 (로컬 표시용)
  const [previewByKey, setPreviewByKey] = useState<Record<string, string>>({});

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const objectUrlsRef = useRef<Set<string>>(new Set());

  const contentLen = content.length;
  const isContentValid = contentLen >= 30 && contentLen <= 1000;
  const isFormValid =
    rating >= 1 && isContentValid && imageKeys.length <= 5 && consultationId != null;

  // ✅ objectURL 정리
  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
    };
  }, []);

  // draft load
  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;

    try {
      const parsed = JSON.parse(raw) as Partial<Draft>;
      if (typeof parsed.rating === "number") setRating(parsed.rating);
      if (typeof parsed.content === "string") setContent(parsed.content);
      if (Array.isArray(parsed.tags)) setTags(parsed.tags.slice(0, 20));
      if (Array.isArray(parsed.imageKeys)) setImageKeys(parsed.imageKeys.slice(0, 5));
      // previewByKey는 로컬 objectURL이라 새로고침하면 복원 불가(정상)
    } catch {
      // ignore
    }
  }, [DRAFT_KEY]);

  const saveDraft = () => {
    const payload: Draft = {
      rating,
      content,
      tags,
      imageKeys,
      savedAt: Date.now(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
  };

  const addTag = (raw: string) => {
    const t = raw.trim();
    if (!t) return;
    const normalized = t.startsWith("#") ? t : `#${t}`;
    if (normalized.length > 20) return;

    setTags((prev) => {
      if (prev.includes(normalized)) return prev;
      if (prev.length >= 10) return prev;
      return [...prev, normalized];
    });
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const openFilePicker = () => fileRef.current?.click();

  const addFiles = async (files: File[]) => {
    if (!consultationId) return;
    if (!files.length) return;

    const remain = Math.max(0, 5 - imageKeys.length);
    const slice = files.slice(0, remain);
    if (!slice.length) return;

    setUploading(true);
    try {
      for (const file of slice) {
        // 로컬 프리뷰 먼저
        const localUrl = URL.createObjectURL(file);
        objectUrlsRef.current.add(localUrl);

        try {
          // ✅ presigned 업로드 → key 확보
          const { key } = await uploadImageViaPresign({
            file,
            resourceType: "review",
            resourceId: consultationId, // consultationId로 묶어서 관리
            imageType: "review",
          });

          setImageKeys((prev) => (prev.length >= 5 ? prev : [...prev, key]));
          setPreviewByKey((prev) => ({ ...prev, [key]: localUrl }));
        } catch (e) {
          // 업로드 실패 시 프리뷰 정리
          URL.revokeObjectURL(localUrl);
          objectUrlsRef.current.delete(localUrl);
          console.error(e);
          alert("업로드에 실패했어요. 다시 시도해주세요.");
        }
      }
    } finally {
      setUploading(false);
    }
  };

  const onPickFiles: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    await addFiles(files);
  };

  const removeImage = (key: string) => {
    setImageKeys((prev) => prev.filter((k) => k !== key));

    setPreviewByKey((prev) => {
      const url = prev[key];
      if (url) {
        URL.revokeObjectURL(url);
        objectUrlsRef.current.delete(url);
      }
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const submit = async () => {
    if (!isFormValid || submitting || consultationId == null) return;

    setSubmitting(true);
    try {
      const res = await postReview({
        consultationId,
        rating,
        content,
        imageUrls: imageKeys, // ✅ 서버로는 key만 전송
      });

      localStorage.removeItem(DRAFT_KEY);
      alert(res.data.message || "후기 작성이 완료됐어요.");
      nav(-1);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "요청 중 오류가 발생했어요.";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // consultationId가 없을 때 방어 UI
  if (consultationId == null) {
    return (
      <div className="min-h-screen bg-white px-5 pt-10">
        <div className="text-[16px] font-semibold text-[#111111]">잘못된 접근이에요.</div>
        <div className="mt-2 text-[13px] text-[#8E8E93]">
          consultationId가 없어서 후기 작성 페이지를 열 수 없어요.
        </div>
        <button
          type="button"
          onClick={() => nav(-1)}
          className="mt-6 h-11 w-full rounded-[12px] bg-[#111111] text-white font-semibold"
        >
          뒤로가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="px-5 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => nav(-1)}
              aria-label="뒤로가기"
              className="h-9 w-9 -ml-2 flex items-center justify-center"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" className="fill-none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="#111111"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="text-[17px] font-semibold tracking-[-0.2px] text-[#111111]">
              후기 작성
            </div>
          </div>

          <button
            type="button"
            onClick={saveDraft}
            className="text-[14px] font-medium text-[#B0B0B6]"
          >
            임시저장
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="px-5 pb-28">
        {/* TIP */}
        <section className="mt-8 text-center">
          <div className="text-[15px] font-semibold text-[#111111]">후기 작성 TIP</div>
          <div className="mt-2 text-[12px] leading-5 text-[#8E8E93]">
            상담 효과를 알 수 있도록 비포애프터 사진이나
            <br />
            솔루션지의 만족도를 알려주세요.
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-[74px] w-[74px] rounded-[8px] bg-[#8E8E93]" />
            <div className="h-[74px] w-[74px] rounded-[8px] bg-[#8E8E93]" />
            <div className="h-[74px] w-[74px] rounded-[8px] bg-[#8E8E93]" />
          </div>
        </section>

        {/* Rating */}
        <section className="mt-8">
          <div className="text-[14px] font-semibold text-[#111111]">별점</div>
          <div className="mt-3 flex items-center gap-3">
            {Array.from({ length: 5 }).map((_, i) => {
              const v = i + 1;
              return (
                <Star key={v} filled={rating >= v} onClick={() => setRating(v)} label={`${v}점`} />
              );
            })}
          </div>
        </section>

        {/* Content */}
        <section className="mt-8">
          <div className="text-[14px] font-semibold text-[#111111]">후기를 작성해주세요.</div>

          <div className="relative mt-3 rounded-[10px] bg-[#F2F2F7] px-4 pb-10 pt-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value.slice(0, 1000))}
              placeholder="최소 30자 이상 입력해주세요."
              className="h-[150px] w-full resize-none bg-transparent text-[14px] leading-6 text-[#111111] outline-none placeholder:text-[#B0B0B6]"
            />

            <div className="absolute bottom-3 right-4 flex items-center gap-1 text-[12px]">
              <span className={cn(isContentValid ? "text-[#8E8E93]" : "text-[#FF3B30]")}>
                {contentLen}
              </span>
              <span className="text-[#8E8E93]">|</span>
              <span className="text-[#8E8E93]">1,000</span>
            </div>
          </div>
        </section>

        {/* Hashtag */}
        <section className="mt-8">
          <div className="text-[14px] font-semibold text-[#111111]">해시태그</div>

          <div className="mt-3 w-fit">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(tagInput);
                  setTagInput("");
                }
              }}
              placeholder="#태그추가"
              className="h-9 w-[92px] rounded-[6px] border border-[#E5E5EA] bg-white px-3 text-[13px] text-[#111111] outline-none placeholder:text-[#B0B0B6]"
            />
          </div>

          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => removeTag(t)}
                  className="rounded-full bg-[#F2F2F7] px-3 py-1 text-[12px] text-[#111111]"
                  title="탭하면 삭제"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </section>

        {/* Photo/Video */}
        <section className="mt-8">
          <div className="text-[14px] font-semibold text-[#111111]">사진/영상</div>

          <div className="mt-3 flex items-start gap-3 overflow-x-auto pb-1">
            {/* camera box */}
            <button
              type="button"
              onClick={openFilePicker}
              disabled={uploading || imageKeys.length >= 5}
              className={cn(
                "flex h-[86px] w-[86px] shrink-0 flex-col items-center justify-center rounded-[10px] border border-[#E5E5EA] bg-white",
                (uploading || imageKeys.length >= 5) && "opacity-60",
              )}
            >
              <div className="flex h-8 w-8 items-center justify-center">
                <svg width="26" height="26" viewBox="0 0 24 24" className="fill-none">
                  <path
                    d="M9 7l1.2-2h3.6L15 7"
                    stroke="#111111"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 7h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3Z"
                    stroke="#111111"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    stroke="#111111"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-1 text-[12px] text-[#8E8E93]">{imageKeys.length}/5</div>
            </button>

            {/* thumbnails */}
            {imageKeys.map((key) => {
              const url = previewByKey[key];
              return (
                <div
                  key={key}
                  className="relative h-[86px] w-[86px] shrink-0 overflow-hidden rounded-[10px] bg-[#F2F2F7]"
                >
                  {url ? (
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[11px] text-[#8E8E93]">
                      업로드 완료
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(key)}
                    aria-label="이미지 삭제"
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/55"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" className="fill-none">
                      <path
                        d="M18 6 6 18M6 6l12 12"
                        stroke="#FFFFFF"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={onPickFiles}
            />
          </div>
        </section>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <div className="mx-auto max-w-[420px] px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-3">
          <button
            type="button"
            onClick={submit}
            disabled={!isFormValid || submitting}
            className={cn(
              "h-[52px] w-full rounded-[12px] text-[16px] font-semibold",
              !isFormValid || submitting
                ? "bg-[#D1D1D6] text-white"
                : "bg-[#111111] text-white active:opacity-90",
            )}
          >
            {submitting ? "작성 중..." : "작성 완료"}
          </button>
        </div>
      </div>
    </div>
  );
}
