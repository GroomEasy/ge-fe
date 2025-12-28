import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Instagram,
  MapPin,
  MessageCircle,
  Star,
  Video,
} from 'lucide-react';
import heartIcon from '../../../images/mypage/heart.svg';

type ReviewCard = {
  id: number;
  title: string;
  rating: number;
  content: string;
};

type PortfolioItem = {
  id: number;
  title: string;
  tags: string[];
};

type 상담Item = {
  id: number;
  title: string;
  description: string;
  price: string;
  icon: JSX.Element;
};

const ExpertInfoPage = () => {
  const navigate = useNavigate();

  const reviews: ReviewCard[] = [
    {
      id: 1,
      title: '이민기 상담 후기',
      rating: 4.8,
      content:
        '친절하게 알려주시고 제 고민을 이해해 주셔서 큰 도움이 되었어요. 추천드립니다.',
    },
    {
      id: 2,
      title: '윤아 상담 후기',
      rating: 4.7,
      content:
        '디테일한 피드백 덕분에 스타일링이 쉬워졌어요. 다음에도 상담 받고 싶습니다.',
    },
  ];

  const portfolio: PortfolioItem[] = [
    {
      id: 1,
      title: '첫 소개팅 커플 헤어',
      tags: ['매쉬 펌', '레이어드 컷'],
    },
  ];

  const 상담목록: 상담Item[] = [
    {
      id: 1,
      title: '실시간 화상 상담',
      description: '실시간으로 스타일링 방향을 함께 정리합니다.',
      price: '10만원',
      icon: <Video className="h-4 w-4 text-[#008bff]" />,
    },
    {
      id: 2,
      title: '메세지 상담',
      description: '이미지와 메시지로 상세 피드백을 드립니다.',
      price: '10만원',
      icon: <MessageCircle className="h-4 w-4 text-[#008bff]" />,
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
        <h1 className="text-[16px] font-semibold text-[#0f0f10]">전문가 프로필</h1>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        <section className="px-4 pt-4">
          <div className="relative h-[120px] overflow-hidden rounded-[12px] bg-[#d2d4d8]">
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </section>

        <section className="px-4 pt-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-[40px] w-[40px] rounded-full bg-[#e1e2e4]" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-semibold text-[#0f0f10]">김이슬 전문가</span>
                  <span className="rounded-[2px] bg-[#e5f4ff] px-2 py-0.5 text-[12px] text-[#008bff]">
                    헤어
                  </span>
                </div>
                <p className="text-[12px] text-[#878a93]">헤어 디자이너</p>
              </div>
            </div>
            <button className="flex items-center gap-1 text-[#aeb0b6]">
              <img src={heartIcon} alt="찜" className="h-5 w-5" />
              <span className="text-[12px]">32</span>
            </button>
          </div>
        </section>

        <section className="px-4 pt-5">
          <h2 className="text-[14px] font-semibold text-[#0f0f10]">전문가</h2>
          <p className="mt-2 text-[13px] leading-[1.5] text-[#505158]">
            트렌디하면서도 손질이 쉬운 스타일을 제안합니다. 얼굴형과 라이프스타일에 맞춰
            오래 유지되는 디자인을 약속드립니다.
          </p>
        </section>

        <section className="px-4 pt-6">
          <h2 className="text-[14px] font-semibold text-[#0f0f10]">경력 정보</h2>
          <div className="mt-3 space-y-2 text-[13px] text-[#505158]">
            <div className="flex items-center gap-2">
              <Instagram className="h-4 w-4 text-[#989ba2]" />
              <span>instagram.com/menual.hair</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#989ba2]" />
              <span>서울 강남구 청담동, 트렌디 헤어살롱</span>
            </div>
          </div>
        </section>

        <section className="px-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-[#0f0f10]">시술 후기 32</h2>
            <button className="flex items-center gap-1 text-[12px] text-[#989ba2]">
              전체보기
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 space-y-3">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-[10px] border border-[#f4f4f5] p-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[#ffb800]" />
                  <span className="text-[13px] font-semibold text-[#0f0f10]">
                    {review.title}
                  </span>
                  <span className="text-[12px] text-[#989ba2]">{review.rating}</span>
                </div>
                <p className="mt-2 text-[12px] text-[#505158]">{review.content}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-[#0f0f10]">포트폴리오</h2>
            <button className="flex items-center gap-1 text-[12px] text-[#989ba2]">
              전체보기
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 rounded-[12px] border border-[#f4f4f5] p-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="h-[92px] rounded-[8px] bg-[#e1e2e4]" />
              <div className="h-[92px] rounded-[8px] bg-[#e1e2e4]" />
            </div>
            <div className="mt-3">
              {portfolio.map((item) => (
                <div key={item.id}>
                  <p className="text-[13px] font-semibold text-[#0f0f10]">{item.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={`${item.id}-${tag}`}
                        className="rounded-[4px] bg-[#f4f4f5] px-2 py-1 text-[12px] text-[#505158]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-6">
          <h2 className="text-[14px] font-semibold text-[#0f0f10]">가능한 상담 종류</h2>
          <div className="mt-3 space-y-3">
            {상담목록.map((item) => (
              <div
                key={item.id}
                className="rounded-[12px] border border-[#f4f4f5] bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-[13px] font-semibold text-[#0f0f10]">{item.title}</span>
                  </div>
                  <span className="text-[13px] font-semibold text-[#008bff]">{item.price}</span>
                </div>
                <p className="mt-2 text-[12px] text-[#505158]">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[14px] font-semibold text-[#0f0f10]">Q&A 8</h2>
            <ChevronRight className="h-4 w-4 text-[#989ba2]" />
          </div>
          <div className="mt-3 rounded-[12px] border border-[#f4f4f5] bg-white p-4">
            <p className="text-[12px] text-[#505158]">이런 헤어 전문가를 원하세요?</p>
            <div className="mt-3 flex gap-3">
              <div className="h-9 w-9 rounded-full bg-[#e1e2e4]" />
              <div className="h-9 w-9 rounded-full bg-[#e1e2e4]" />
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-1/2 w-[375px] -translate-x-1/2 bg-white px-4 pb-6 pt-3">
        <button className="w-full rounded-[12px] bg-[#008bff] py-3 text-[14px] font-semibold text-white">
          상담 신청하기
        </button>
      </div>
    </div>
  );
};

export default ExpertInfoPage;
