import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';
import hairIcon from '../../images/home/Hair.svg';
import fashionIcon from '../../images/home/Fashion.svg';
import makeupIcon from '../../images/home/MakeUp.svg';
import skinIcon from '../../images/home/Skin.svg';
import searchIcon from '../../images/home/search.svg';
import heartIcon from '../../images/mypage/heart.svg';
import homeIcon from '../../images/home/home.svg';
import exploreIcon from '../../images/home/search.svg';
import chatIcon from '../../images/home/chat.svg';
import communityIcon from '../../images/home/community.svg';
import mypageIcon from '../../images/home/mypage.svg';

type Banner = {
  id: number;
  title: string;
  subtitle: string;
  image?: string;
};

type Category = {
  id: string;
  label: string;
  icon?: string;
  route: string;
};

type TopExpert = {
  id: number;
  name: string;
  category: string;
  summary: string;
  avatar?: string;
};

type ReviewCard = {
  id: number;
  name: string;
  rating: number;
  date: string;
  content: string;
  category: string;
  concern: string;
  avatar?: string;
  images: string[];
};

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const [selectedTopTab, setSelectedTopTab] = useState('전체');

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const banners: Banner[] = [
    {
      id: 1,
      title: '박철웅이 알려주는',
      subtitle: '진짜 남자의 메이크업',
    },
    {
      id: 2,
      title: '전문가의 진짜 케어',
      subtitle: '트러블 피부 맞춤 상담',
    },
    {
      id: 3,
      title: '스타일링이 달라지는',
      subtitle: '퍼스널 컷 가이드',
    },
  ];

  const categories: Category[] = [
    { id: 'hair', label: 'Hair', route: '/category/hair', icon: hairIcon },
    { id: 'fashion', label: 'Fashion', route: '/category/fashion', icon: fashionIcon },
    { id: 'makeup', label: 'Makeup', route: '/category/makeup', icon: makeupIcon },
    { id: 'skin', label: 'Skin', route: '/category/skin', icon: skinIcon },
  ];

  const topTabs = ['전체', '헤어', '시스루 컷', '다운펌', '스핀'];

  const topExperts: TopExpert[] = [
    {
      id: 1,
      name: '김바보 상담사',
      category: '헤어',
      summary:
        '김바보님을 위한 솔루션지가 도착했어요. 24시간 내에 질문이 가능하며 시간이 지나면 질문이 불가능해요.',
    },
    {
      id: 2,
      name: '최지원 상담사',
      category: '헤어',
      summary:
        '이지지원님을 위한 솔루션지가 도착했어요. 24시간 내에 질문이 가능하며 시간이 지나면 질문이 불가능해요.',
    },
    {
      id: 3,
      name: '윤나영 상담사',
      category: '패션',
      summary:
        '윤나영님을 위한 솔루션지가 도착했어요. 24시간 내에 질문이 가능하며 시간이 지나면 질문이 불가능해요.',
    },
  ];

  const reviews: ReviewCard[] = [
    {
      id: 1,
      name: '용민호 전문가',
      rating: 4.7,
      date: '2025.10.08',
      content:
        '피부 결이 얇아서 메이크업 받으면 둥둥 떠보였는데 성정수 상담가님 덕분에 프로필 사진 촬영 잘했어요.',
      category: '메이크업',
      concern: '민감성 피부',
      images: ['', ''],
    },
    {
      id: 2,
      name: '이민기 전문가',
      rating: 4.7,
      date: '2025.10.08',
      content:
        '평소 붓기와 각질이 고민이었는데 관리법을 자세히 알려주셔서 효과가 확실했어요.',
      category: '스킨',
      concern: '각질 케어',
      images: ['', ''],
    },
  ];

  const handleMyPageClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="flex items-center justify-between px-4 pt-[14px]">
        <div className="flex items-center gap-1 text-[18px] font-semibold tracking-tight">
          <span>MENUAL</span>
          <span>.</span>
        </div>
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
        <section className="px-4 pt-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {banners.map((banner) => (
              <article
                key={banner.id}
                className="relative h-[184px] w-[300px] shrink-0 overflow-hidden rounded-[14px] bg-gradient-to-br from-[#7b7c7f] via-[#5b5c60] to-[#3c3d40] snap-start"
              >
                {banner.image && (
                  <img
                    src={banner.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-4 left-4 space-y-1 text-white">
                  <p className="text-[12px] font-medium">{banner.title}</p>
                  <p className="text-[18px] font-semibold leading-[1.35]">
                    {banner.subtitle}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 pt-5">
          <div className="flex items-start justify-between gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => navigate(category.route)}
                className="flex flex-1 flex-col items-center gap-2"
              >
                {category.icon ? (
                  <img src={category.icon} alt="" className="h-10 w-10" />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f4f5]" />
                )}
                <span className="text-[12px] text-[#505158]">{category.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="px-4 pt-7">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-[#0f0f10]">
              지금 가장 인기있는 전문가 TOP3
            </h2>
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {topTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTopTab(tab)}
                className={`rounded-full px-3 py-1 text-[12px] font-semibold transition-colors ${
                  selectedTopTab === tab
                    ? 'bg-[#0f0f10] text-white'
                    : 'border border-[#e1e2e4] text-[#505158]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-4">
            {topExperts.map((expert, index) => (
              <div key={expert.id} className="flex items-start gap-3">
                <span className="pt-1 text-[14px] font-semibold text-[#989ba2]">
                  {index + 1}
                </span>
                <div className="h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full bg-[#e1e2e4]">
                  {expert.avatar && (
                    <img src={expert.avatar} alt="" className="h-full w-full object-cover" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-[#0f0f10]">
                      {expert.name}
                    </span>
                    <span className="rounded-[2px] bg-[#e5f4ff] px-2 py-0.5 text-[12px] text-[#008bff]">
                      {expert.category}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-[13px] text-[#878a93]">
                    {expert.summary}
                  </p>
                </div>
                <button className="flex h-6 w-6 items-center justify-center">
                  <img src={heartIcon} alt="찜" className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-10">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-[16px] font-semibold text-[#0f0f10]">실시간 후기 확인하기</h2>
            <button className="flex items-center gap-1 text-[12px] text-[#989ba2]">
              전체보기
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide snap-x snap-mandatory">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="flex w-[300px] shrink-0 flex-col gap-4 rounded-[12px] border border-[#f4f4f5] bg-white pb-4 snap-start"
              >
                <div className="flex items-center gap-3 px-4 pt-4">
                  <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#e1e2e4]">
                    {review.avatar && (
                      <img src={review.avatar} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-[#0f0f10]">
                        {review.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-[#878a93]">
                      <div className="flex items-center gap-1 text-[#ffb800]">{'★★★★★'}</div>
                      <span className="text-[#989ba2]">{review.rating}</span>
                      <span className="text-[#e1e2e4]">|</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <div className="grid grid-cols-2 gap-2 overflow-hidden rounded-[10px]">
                    {review.images.map((image, index) => (
                      <div
                        key={`${review.id}-image-${index}`}
                        className="h-[96px] w-full bg-[#e1e2e4]"
                      >
                        {image && (
                          <img src={image} alt="" className="h-full w-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="px-4 text-[13px] text-[#505158]">{review.content}</p>
                <div className="flex gap-2 px-4">
                  <span className="rounded-[2px] bg-[#e5f4ff] px-2 py-0.5 text-[12px] text-[#008bff]">
                    {review.category}
                  </span>
                  <span className="rounded-[2px] bg-[#f4f4f5] px-2 py-0.5 text-[12px] text-[#46474c]">
                    {review.concern}
                  </span>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center">
            <div className="h-[3px] w-[55px] rounded-full bg-[#e1e2e4]">
              <div className="h-[3px] w-[20px] rounded-full bg-[#429ff0]" />
            </div>
          </div>
        </section>
      </main>

      <nav className="flex items-center justify-between border-t border-[#f4f4f5] px-4 pb-3 pt-2">
        <button className="flex flex-1 flex-col items-center gap-1 text-[#0f0f10]">
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
        <button
          onClick={handleMyPageClick}
          className="flex flex-1 flex-col items-center gap-1 text-[#aeb0b6]"
        >
          <img src={mypageIcon} alt="마이페이지" className="h-6 w-6" />
          <span className="text-[12px]">마이페이지</span>
        </button>
      </nav>
    </div>
  );
};

export default HomePage;
