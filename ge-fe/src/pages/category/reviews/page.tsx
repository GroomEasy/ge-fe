import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

type ReviewItem = {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  tags: string[];
  images: string[];
};

const CategoryBestReviewsPage = () => {
  const navigate = useNavigate();

  const reviews: ReviewItem[] = [
    {
      id: 1,
      author: '박덕호',
      rating: 4.7,
      date: '2025.10.08',
      content:
        '머리가 악성곱슬이어서 너무 고민이었는데 옹민호 전문가님 만나고 광명찾았어요. 원래는 2주만 지나도 바로 곱슬곱슬해지는데 지금 한 달이 지나도 직모예요.',
      tags: ['헤어', '메세지 상담', '탈모'],
      images: ['', ''],
    },
    {
      id: 2,
      author: '김민준',
      rating: 5.0,
      date: '2025.06.12',
      content:
        '자꾸 앞머리가 휘어서 고민이 많았는데 가영쌤 덕분에 멋있게 앞머리 내릴 수 있어서 너무 만족스러워요. 다음에도 방문해서 모류교정을 받을게요!',
      tags: ['헤어', '메세지 상담', '모류교정'],
      images: ['', ''],
    },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex items-center gap-3 px-4 pt-[14px]">
        <button
          onClick={() => navigate(-1)}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-50"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-[18px] font-semibold text-[#0f0f10]">베스트 후기</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-8 scrollbar-hide">
        <section className="px-4 pt-4">
          <div className="rounded-[8px] bg-[#e5f4ff] px-4 py-3 text-[12px] text-[#505158]">
            가장 많은 조회수를 기록한 리뷰입니다.
          </div>
        </section>

        <section className="px-4 pt-4">
          <button
            onClick={() => navigate('/experts/1')}
            className="flex w-full items-center justify-between rounded-[12px] border border-[#f4f4f5] bg-white px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#e1e2e4]" />
              <div className="text-left">
                <p className="text-[12px] font-medium text-[#008bff]">최근 후기 63건</p>
                <div className="flex items-center gap-2 text-[13px]">
                  <span className="font-semibold text-[#0f0f10]">옹민호 전문가</span>
                  <span className="text-[#ffb800]">★</span>
                  <span className="text-[#989ba2]">4.7</span>
                </div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-[#aeb0b6]" />
          </button>
        </section>

        <section className="px-4 pt-6 space-y-6">
          {reviews.map((review) => (
            <article key={review.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-[#0f0f10]">{review.author}</p>
                  <div className="flex items-center gap-2 text-[12px] text-[#989ba2]">
                    <span className="text-[#ffb800]">★★★★★</span>
                    <span>{review.rating}</span>
                    <span className="text-[#e1e2e4]">|</span>
                    <span>{review.date}</span>
                  </div>
                </div>
                <button className="rounded-full p-1 text-[#aeb0b6] hover:bg-gray-50">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {review.images.map((image, index) => (
                  <div
                    key={`${review.id}-image-${index}`}
                    className="h-[120px] w-full overflow-hidden rounded-[8px] bg-[#e1e2e4]"
                  >
                    {image && (
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                ))}
              </div>

              <p className="text-[13px] leading-[1.5] text-[#505158]">{review.content}</p>

              <div className="flex flex-wrap gap-2">
                {review.tags.map((tag) => (
                  <span
                    key={`${review.id}-${tag}`}
                    className={`rounded-[4px] px-2 py-1 text-[12px] ${
                      tag === '헤어'
                        ? 'bg-[#e5f4ff] text-[#008bff]'
                        : 'bg-[#f4f4f5] text-[#505158]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
};

export default CategoryBestReviewsPage;
