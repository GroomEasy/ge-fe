import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Instagram,
  Star,
} from 'lucide-react';
import heartIcon from '../../../images/mypage/heart.svg';

type ReviewCard = {
  id: number;
  title: string;
  content: string;
};

type PortfolioCard = {
  id: number;
  title: string;
  tags: string[];
  concern: string;
  solution: string;
};

type RelatedExpert = {
  id: number;
  name: string;
  summary: string;
};

const ExpertInfoPage = () => {
  const navigate = useNavigate();

  const reviewCards: ReviewCard[] = [
    {
      id: 1,
      title: '스핀 스왈로브펌',
      content: '아 너무 좋아요. 소개팅 나갔는데 머리 예쁘다고 어제부터 사귀기로 했어요.',
    },
    {
      id: 2,
      title: '앞머리 다운펌',
      content: '곱슬머리 너무 심했는데 전문가님이 잘 잡아주셔서 덕분에 잘...',
    },
  ];

  const portfolioCards: PortfolioCard[] = [
    {
      id: 1,
      title: '스핀 스왈로브펌',
      tags: ['탈모', '스타일링', '키워드', '+2'],
      concern:
        '나이 들면서 정수리쪽 탈모가 너무 심해져서 걱정이에요. 다음주에 당장 딸내미 결혼식이 있는데 어떻게 파마를 해서 탈모를 가릴 방법은 없을까요?',
      solution:
        '이미 탈모가 많이 진행된 상태여서 열처리를 해야하는 강한 펌은 시술이 불가능하지만 열처리 없는 스핀 스왈로프펌으로 진행하여 정수리쪽 탈모를 가리는 솔루션을 드렸습니다.',
    },
  ];

  const relatedExperts: RelatedExpert[] = [
    {
      id: 1,
      name: '이민지 전문가',
      summary:
        '누구보다 나다울 수 있도록 스타일에 당신의 온도를 담아드립니다. 자연스럽지만 분명히 특별한 당신만의 분위기를 만들어드릴게요',
    },
    {
      id: 2,
      name: '지규영 전문가',
      summary: '어울리는 머리가 뭔지 몰라서 고민이신 분들! 제가 인생머리 찾아드릴게요',
    },
    {
      id: 3,
      name: '김병철 전문가',
      summary:
        '짧은 머리부터 긴머리까지 남자머리의 정석, 오래 유지되는 디자인으로 얼굴형에 어울리는 맞춤형으로 디자인 해드리겠습니다.',
    },
  ];

  return (
    <div className="flex h-full flex-col bg-white">
      <main className="relative flex-1 overflow-y-auto pb-[120px] scrollbar-hide">
        <div className="relative mx-auto h-[2545px] w-[375px] bg-white">
          <div className="absolute left-[16px] top-[53px] flex items-center gap-[15px]">
            <button
              onClick={() => navigate(-1)}
              className="flex h-[24px] w-[24px] items-center justify-center"
            >
              <ChevronLeft className="h-[24px] w-[24px]" />
            </button>
            <h1 className="text-[20px] font-semibold text-[#0f0f10]">전문가 프로필</h1>
          </div>

          <div className="absolute left-0 top-[100px] h-[220px] w-[375px] bg-[#d2d4d8]" />

          <div className="absolute left-0 top-[311px] h-[460px] w-[375px]">
            <div className="absolute left-[16px] top-[40px] flex w-[342px] items-end justify-between">
              <div className="flex items-end gap-[12px]">
                <div className="h-[52px] w-[52px] rounded-full bg-[#e1e2e4]" />
                <div className="flex flex-col gap-[4px]">
                  <span className="inline-flex rounded-[2px] bg-[#f5f9fd] px-[6px] py-[4px] text-[12px] text-[#429ff0]">
                    헤어
                  </span>
                  <span className="text-[18px] font-semibold text-[#292a2d]">
                    옹민호 전문가
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-[2px]">
                <img src={heartIcon} alt="찜" className="h-[24px] w-[24px]" />
                <span className="text-[13px] text-[#878a93]">32</span>
              </div>
            </div>

            <div className="absolute left-[16px] top-[114px] h-px w-[343px] bg-[#f4f4f5]" />

            <div className="absolute left-[16px] top-[134px] flex w-[338px] flex-col gap-[14px]">
              <div className="flex items-start gap-[8px]">
                <CheckCircle2 className="h-[24px] w-[24px] text-[#008bff]" />
                <div className="flex flex-col gap-[6px]">
                  <p className="text-[16px] font-semibold text-[#292a2d]">전문분야</p>
                  <p className="text-[13px] leading-[1.4] text-[#878a93]">
                    짧은 머리부터 긴머리까지 남자머리의 정석, 오래 유지되는 디자인으로 얼굴형에 어울리는 맞춤형으로 디자인
                    해드리겠습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <Instagram className="h-[24px] w-[24px] text-[#292a2d]" />
                <span className="text-[14px] text-[#429ff0]">instagram link</span>
              </div>
              <div className="flex items-start gap-[8px]">
                <ClipboardList className="h-[24px] w-[24px] text-[#292a2d]" />
                <div className="flex flex-col gap-[6px]">
                  <p className="text-[16px] font-semibold text-[#292a2d]">경력 정보</p>
                  <div className="text-[14px] leading-[1.4] text-[#878a93]">
                    <p>탈모 헤어스타일링 전문가</p>
                    <p>2021~2023 청담동 후고바버샵 근무</p>
                    <p>전)옹스샵 원장</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-[16px] top-[380px] flex h-[40px] w-[342px] items-center justify-center gap-[4px] rounded-[8px] border border-[#f4f4f5]">
              <span className="text-[12px] font-medium text-[#666]">더보기</span>
              <ChevronDown className="h-[24px] w-[24px] text-[#666]" />
            </div>
          </div>

          <div className="absolute left-0 top-[771px] h-[8px] w-[375px] bg-[#f4f4f5]" />

          <div className="absolute left-0 top-[779px] h-[216px] w-[375px]">
            <div className="absolute left-[17px] top-[30px] flex w-[342px] items-center justify-between">
              <div className="flex items-center gap-[6px] text-[18px] font-semibold">
                <span className="text-[#0f0f10]">시술 후기</span>
                <span className="text-[#429ff0]">32</span>
              </div>
              <button className="flex items-center gap-[2px] text-[14px] text-[#70737c]">
                전체보기
                <ChevronRight className="h-[24px] w-[24px]" />
              </button>
            </div>
            <div className="absolute left-[16px] top-[60px] flex items-center gap-[8px]">
              <Star className="h-[24px] w-[24px] text-[#ffb800]" />
              <span className="text-[14px] font-semibold text-[#292a2d]">9.8</span>
            </div>
            <div className="absolute left-[16px] top-[100px] flex w-[335px] gap-[12px] overflow-x-auto scrollbar-hide">
              {reviewCards.map((review) => (
                <article
                  key={review.id}
                  className="flex h-[87px] w-[240px] shrink-0 items-center gap-[10px] rounded-[8px] border border-[#e1e2e4] bg-white p-[12px]"
                >
                  <div className="h-[57px] w-[57px] rounded-[4px] bg-[#e1e2e4]" />
                  <div className="flex flex-1 flex-col gap-[4px]">
                    <div className="flex items-center gap-[6px]">
                      <span className="rounded-[4px] bg-[#f5f9fd] px-[8px] py-[2px] text-[12px] text-[#429ff0]">
                        Best
                      </span>
                      <span className="text-[14px] font-medium text-[#46474c]">
                        {review.title}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-[13px] leading-[1.3] text-[#878a93]">
                      {review.content}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="absolute left-0 top-[1003px] h-[8px] w-[375px] bg-[#f4f4f5]" />

          <div className="absolute left-0 top-[1011px] h-[610px] w-[375px] bg-white">
            <div className="absolute left-[15px] top-[40px] flex w-[343px] items-center justify-between">
              <h2 className="text-[18px] font-semibold text-[#0f0f10]">포트폴리오</h2>
              <button className="flex items-center gap-[2px] text-[14px] text-[#70737c]">
                전체보기
                <ChevronRight className="h-[24px] w-[24px]" />
              </button>
            </div>
            <div className="absolute left-[16px] top-[86px] flex gap-[12px] overflow-x-auto scrollbar-hide">
              {portfolioCards.map((card) => (
                <article
                  key={card.id}
                  className="h-[439px] w-[322px] shrink-0 rounded-[12px] border border-[#e1e2e4] bg-white p-[16px]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[14px] font-semibold text-[#292a2d]">{card.title}</p>
                      <p className="mt-[4px] text-[13px] text-[#878a93]">Before / After</p>
                    </div>
                    <button className="rounded-full p-1 text-[#aeb0b6]">
                      <ChevronRight className="h-[20px] w-[20px]" />
                    </button>
                  </div>
                  <div className="mt-[12px] flex gap-[6px]">
                    <div className="h-[130px] w-[130px] rounded-[4px] bg-[#e1e2e4]" />
                    <div className="h-[130px] w-[130px] rounded-[4px] bg-[#e1e2e4]" />
                  </div>
                  <div className="mt-[12px] flex flex-wrap gap-[6px]">
                    {card.tags.map((tag) => (
                      <span
                        key={`${card.id}-${tag}`}
                        className="rounded-[2px] bg-[#f4f4f5] px-[6px] py-[4px] text-[12px] text-[#46474c]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-[12px] space-y-[6px]">
                    <p className="text-[14px] font-semibold text-[#292a2d]">고객의 고민</p>
                    <p className="text-[13px] leading-[1.4] text-[#505158]">{card.concern}</p>
                  </div>
                  <div className="mt-[12px] space-y-[6px]">
                    <p className="text-[14px] font-semibold text-[#292a2d]">솔루션</p>
                    <p className="text-[13px] leading-[1.4] text-[#505158]">{card.solution}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="absolute left-1/2 top-[551px] h-[3px] w-[55px] -translate-x-1/2 bg-[#e1e2e4]">
              <div className="h-[3px] w-[18px] bg-[#429ff0]" />
            </div>
          </div>

          <div className="absolute left-0 top-[1621px] w-[375px]">
            <div className="h-[8px] w-full bg-[#f4f4f5]" />
            <div className="mx-auto mt-[40px] w-[343px] space-y-[12px]">
              <h2 className="text-[18px] font-semibold text-[#0f0f10]">가능한 상담 종류</h2>
              <div className="rounded-[12px] border border-[#e1e2e4] bg-white p-[16px]">
                <p className="text-[16px] font-semibold text-[#292a2d]">실시간 화상 상담</p>
                <p className="mt-[4px] text-[13px] leading-[1.4] text-[#878a93]">
                  전문가와 화상으로 15분 상담을 진행합니다. 상담한 내용을 바탕으로 전문가가 작성한 솔루션지는 상담이 끝나고
                  한 시간 내로 전송해드립니다.
                </p>
                <div className="my-[12px] h-px bg-[#e1e2e4]" />
                <div className="flex items-center justify-between text-[13px] text-[#878a93]">
                  <span>상담 비용</span>
                  <span className="text-[14px] font-semibold text-[#008bff]">10만원</span>
                </div>
              </div>
              <div className="rounded-[12px] border border-[#e1e2e4] bg-white p-[16px]">
                <p className="text-[16px] font-semibold text-[#292a2d]">메세지 상담</p>
                <p className="mt-[4px] text-[13px] leading-[1.4] text-[#878a93]">
                  상담 신청 시 진행되는 설문조사 답변을 바탕으로 전문가가 24시간 내로 솔루션지를 보내드립니다. 솔루션지를
                  읽고 생기는 추가 질문은 채팅을 통해 한 번 더 질문할 수 있습니다.
                </p>
                <div className="my-[12px] h-px bg-[#e1e2e4]" />
                <div className="flex items-center justify-between text-[13px] text-[#878a93]">
                  <span>상담 비용</span>
                  <span className="text-[14px] font-semibold text-[#008bff]">10만원</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-[2074px] w-[375px]">
            <div className="h-[8px] w-full bg-[#f4f4f5]" />
            <div className="mx-auto mt-[24px] flex w-[343px] items-center justify-between">
              <div className="flex items-center gap-[6px] text-[18px] font-semibold">
                <span className="text-[#0f0f10]">Q&amp;A</span>
                <span className="text-[#429ff0]">8</span>
              </div>
              <ChevronDown className="h-[24px] w-[24px] text-[#70737c]" />
            </div>
          </div>

          <div className="absolute left-0 top-[2154px] w-[375px]">
            <div className="h-[8px] w-full bg-[#f4f4f5]" />
            <div className="mx-auto mt-[40px] w-[343px]">
              <h2 className="text-[18px] font-semibold text-[#0f0f10]">
                이런 <span className="text-[#008bff]">헤어</span> 전문가는 어떠세요?
              </h2>
              <div className="mt-[12px] flex gap-[12px] overflow-x-auto scrollbar-hide">
                {relatedExperts.map((expert) => (
                  <article
                    key={expert.id}
                    className="h-[163px] w-[156px] shrink-0 rounded-[12px] border border-[#e1e2e4] bg-white"
                  >
                    <div className="mx-auto mt-[16px] h-[52px] w-[52px] rounded-full bg-[#e1e2e4]" />
                    <div className="mt-[12px] px-[16px] text-center">
                      <p className="text-[14px] font-semibold text-[#292a2d]">{expert.name}</p>
                      <p className="mt-[6px] h-[36px] w-[124px] line-clamp-2 text-[13px] leading-[1.4] text-[#878a93]">
                        {expert.summary}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute left-1/2 top-[2414px] h-[3px] w-[55px] -translate-x-1/2 bg-[#e1e2e4]">
            <div className="h-[3px] w-[18px] bg-[#429ff0]" />
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-1/2 w-[375px] -translate-x-1/2 bg-white px-[16px] py-[10px]">
        <button className="h-[44px] w-full rounded-[4px] bg-[#008bff] text-[16px] font-semibold text-white">
          상담 신청하기
        </button>
      </div>
    </div>
  );
};

export default ExpertInfoPage;
