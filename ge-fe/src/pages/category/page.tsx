import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import searchIcon from '../../images/home/search.svg';
import heartIcon from '../../images/mypage/heart.svg';
import homeIcon from '../../images/home/home.svg';
import exploreIcon from '../../images/home/search.svg';
import chatIcon from '../../images/home/chat.svg';
import communityIcon from '../../images/home/community.svg';
import mypageIcon from '../../images/home/mypage.svg';

type TopExpert = {
  id: number;
  name: string;
  category: string;
  summary: string;
  avatar?: string;
};

type ExpertCard = {
  id: number;
  name: string;
  category: string;
  summary: string;
  avatar?: string;
  available: boolean;
};

const CategoryLandingPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const categoryKey = params.category ?? 'hair';

  const categoryLabel = useMemo(() => {
    const map: Record<string, string> = {
      hair: 'HAIR',
      fashion: 'FASHION',
      makeup: 'MAKEUP',
      skin: 'SKIN',
    };
    return map[categoryKey] ?? 'HAIR';
  }, [categoryKey]);

  const topExperts: TopExpert[] = [
    {
      id: 1,
      name: '김이슬 전문가',
      category: '헤어',
      summary:
        '바쁜 아침, 트렌디 머리로 간편한 스타일링을 알려드릴게요.',
    },
    {
      id: 2,
      name: '박규영 전문가',
      category: '헤어',
      summary:
        '얼굴 라인 고민까지 디자인으로 해결, 연속 칼맞춤 디자인으로…',
    },
    {
      id: 3,
      name: '이민준 전문가',
      category: '헤어',
      summary: '어울리는 머리가 뭔지 몰라서 고민이신 분들! 인생머리 찾아드려요.',
    },
  ];

  const expertList: ExpertCard[] = [
    {
      id: 1,
      name: '이가영',
      category: '헤어',
      summary:
        '고객님의 두상 유형을 정확히 파악하고 얼굴형에 맞게 디자인해서 스타일링해드립니다.',
      available: true,
    },
    {
      id: 2,
      name: '이재훈',
      category: '헤어',
      summary:
        '각 모질에 따른 손질법 및 얼굴형 타입에 맞는 디자인을 찾아드립니다.',
      available: true,
    },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex items-center justify-between px-4 pt-[14px]">
        <button className="flex items-center gap-1 text-[16px] font-semibold text-[#0f0f10]">
          <span>{categoryLabel}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-[14px]">
          <button className="flex h-6 w-6 items-center justify-center">
            <img src={searchIcon} alt="검색" className="h-6 w-6" />
          </button>
          <button className="flex h-6 w-6 items-center justify-center">
            <img src={heartIcon} alt="찜" className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
        <section className="px-4 pt-3">
          <div className="relative h-[246px] overflow-hidden rounded-[16px] bg-[#d2d4d8]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
            <div className="absolute left-4 top-12 max-w-[220px] text-white">
              <p className="text-[12px] font-medium">이제 슬슬 준비해야지</p>
              <p className="mt-1 text-[18px] font-semibold leading-[1.35]">
                소개팅 필수 헤어스타일
                <br />‘스핀 스왈로브펌’
              </p>
              <div className="mt-3 inline-flex items-center gap-2 bg-[#008bff] px-2 py-1 text-[12px] font-semibold">
                <span>박서령</span>
                <span className="h-[7px] w-px bg-white/80" />
                <span className="text-[10px] font-medium">헤어디자이너</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 rounded-full bg-black/50 px-2 py-1 text-[12px] text-white">
              1/12
            </div>
          </div>
        </section>

        <section className="px-4 pt-6">
          <h2 className="text-[16px] font-semibold text-[#0f0f10]">
            지금 가장 인기있는 헤어 전문가 TOP3
          </h2>
          <div className="mt-4 space-y-4">
            {topExperts.map((expert, index) => (
              <div key={expert.id} className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="pt-1 text-[18px] font-semibold text-[#656870]">
                    {index + 1}
                  </span>
                  <div className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-[#e1e2e4]">
                    {expert.avatar && (
                      <img src={expert.avatar} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded-[2px] bg-[#e5f4ff] px-2 py-0.5 text-[12px] text-[#008bff]">
                        {expert.category}
                      </span>
                      <span className="text-[14px] font-semibold text-[#292a2d]">
                        {expert.name}
                      </span>
                    </div>
                    <p className="line-clamp-2 max-w-[184px] text-[13px] text-[#878a93]">
                      {expert.summary}
                    </p>
                  </div>
                </div>
                <button className="flex h-6 w-6 items-center justify-center">
                  <img src={heartIcon} alt="찜" className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 bg-[#f4f8fb] px-4 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] font-semibold text-[#0f0f10]">베스트 후기</h2>
            <button
              onClick={() => navigate(`/category/${categoryKey}/reviews`)}
              className="flex items-center gap-1 text-[14px] text-[#70737c]"
            >
              전체보기
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 rounded-[12px] border border-[#dbdcdf] bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-[34px] w-[34px] shrink-0 rounded-full bg-[#e1e2e4]" />
                <div className="space-y-1">
                  <p className="text-[12px] font-medium text-[#008bff]">최근 후기 63건</p>
                  <div className="flex items-center gap-2 text-[13px] text-[#989ba2]">
                    <span className="text-[14px] font-semibold text-[#0f0f10]">옹민호 상담사</span>
                    <span className="text-[#ffb800]">★★★★★</span>
                    <span>4.7</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate('/experts/1')}
                className="rounded-full p-1 text-[#aeb0b6] hover:bg-gray-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 h-px bg-[#e1e2e4]" />
            <div className="mt-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`best-image-${index}`}
                  className="relative h-[72px] w-[72px] overflow-hidden rounded-[4px] bg-[#e1e2e4]"
                >
                  {index === 3 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-[14px] font-medium text-white">
                      +16
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-[14px] text-[#505158]">
              저는 완전 악성곱슬이었는데요. 옹민호 상담사님 만나고 광명 찾았습니다. 어딜 가도 머리 곱슬기가 안
              빠졌는데 매직 시술 받았더니 2개월 지나도 아직도 직모처럼…
            </p>
          </div>
        </section>

        <section className="px-4 pt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[#0f0f10]">전문가 리스트</h2>
            <button className="flex items-center gap-1 text-[12px] text-[#989ba2]">
              전체보기
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {expertList.map((expert) => (
              <article
                key={expert.id}
                className="rounded-[12px] border border-[#f4f4f5] bg-white p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="h-[52px] w-[52px] shrink-0 rounded-full bg-[#e1e2e4]" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded-[2px] bg-[#e5f4ff] px-2 py-0.5 text-[12px] text-[#008bff]">
                          {expert.category}
                        </span>
                        <span className="text-[14px] font-semibold text-[#0f0f10]">
                          {expert.name}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#878a93]">{expert.summary}</p>
                      {expert.available && (
                        <span className="inline-flex items-center rounded-full bg-[#e5f4ff] px-2 py-1 text-[12px] text-[#008bff]">
                          바로 상담 가능
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button className="flex h-6 w-6 items-center justify-center">
                      <img src={heartIcon} alt="찜" className="h-6 w-6" />
                    </button>
                    <button className="rounded-full bg-[#0f0f10] px-3 py-1 text-[12px] font-medium text-white">
                      상담 예약
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <nav className="flex items-center justify-between border-t border-[#f4f4f5] px-4 pb-3 pt-2">
        <button
          onClick={() => navigate('/')}
          className="flex flex-1 flex-col items-center gap-1 text-[#0f0f10]"
        >
          <img src={homeIcon} alt="홈" className="h-6 w-6" />
          <span className="text-[12px] font-semibold">홈</span>
        </button>
        <button className="flex flex-1 flex-col items-center gap-1 text-[#aeb0b6]">
          <img src={exploreIcon} alt="탐색" className="h-6 w-6" />
          <span className="text-[12px]">탐색</span>
        </button>
        <button
          onClick={() => navigate('/chat')}
          className="flex flex-1 flex-col items-center gap-1 text-[#aeb0b6]"
        >
          <img src={chatIcon} alt="채팅" className="h-6 w-6" />
          <span className="text-[12px]">채팅</span>
        </button>
        <button className="flex flex-1 flex-col items-center gap-1 text-[#aeb0b6]">
          <img src={communityIcon} alt="커뮤니티" className="h-6 w-6" />
          <span className="text-[12px]">커뮤니티</span>
        </button>
        <button className="flex flex-1 flex-col items-center gap-1 text-[#aeb0b6]">
          <img src={mypageIcon} alt="마이페이지" className="h-6 w-6" />
          <span className="text-[12px]">마이페이지</span>
        </button>
      </nav>
    </div>
  );
};

export default CategoryLandingPage;
