"use client";

import { ArrowLeft, ChevronLeft, MoreVertical, Plus } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ChatHeader from "./components/ChatHeader";

export function Chat() {
  return (
    <div className="flex flex-col w-full justify-center bg-[#f5f5f5] py-6">
      <ChatHeader />

      <header className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex flex-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="flex flex-col items-center flex-none">
            <span className="text-sm font-semibold text-slate-900">박오징</span>
            <span className="text-[11px] text-slate-500">패션</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0">
          <MoreVertical className="h-6 w-6" />
        </Button>
      </header>

      {/* 프로필 영역 */}
      <section className="flex flex-col items-center border-b border-slate-100 px-6 pb-6 pt-2">
        <Avatar className="h-[83px] w-[83px] bg-gray-200">
          <AvatarFallback className="text-xs text-gray-500">박오징</AvatarFallback>
        </Avatar>

        <div className="mt-3 text-sm font-semibold text-slate-900">박오징</div>
        <button className="mt-1 text-[11px] text-slate-500">전문가 프로필 보기</button>

        <div className="mt-4 rounded-full bg-slate-100 px-4 py-1">
          <span className="text-[11px] text-slate-500">2025년 11월 9일 일요일</span>
        </div>
      </section>

      {/* 채팅 영역 */}
      <main className="flex-1 space-y-4 bg-[#F5F6FA] px-4 py-6">
        {/* 오른쪽 말풍선 + 버튼 */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl bg-[#2F80FF] px-3 py-3 text-[13px] text-white">
            <p className="leading-relaxed">김바보님을 위한 고민지가 도착했습니다.</p>
            <button className="mt-2 w-full rounded-xl bg-white py-6 text-[13px] font-semibold text-[#2F80FF]">
              고민지 보기
            </button>
          </div>
        </div>

        {/* 왼쪽 말풍선 + 아바타 + 버튼 */}
        <div className="flex items-start gap-2">
          <Avatar className="h-7 w-7">
            <AvatarFallback />
          </Avatar>
          <div className="max-w-[75%] rounded-2xl bg-white px-3 py-3 text-[13px] text-slate-900 shadow-sm">
            <p className="leading-relaxed">김바보님을 위한 솔루션지가 도착했습니다.</p>
            <button className="mt-2 w-full rounded-xl bg-white py-6 text-[13px] font-semibold text-slate-700 border border-slate-200">
              솔루션지 보기
            </button>
          </div>
        </div>

        {/* 오른쪽 말풍선 – 짧은 텍스트 */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl bg-[#2F80FF] px-3 py-3 text-[13px] text-white">
            김바보님이 추가 질문을 보냈습니다.
          </div>
        </div>

        {/* 오른쪽 말풍선 – 긴 텍스트 */}
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-2xl bg-[#2F80FF] px-3 py-3 text-[13px] text-white">
            <p className="whitespace-pre-line leading-relaxed">
              제가 왜 깜마른이에요? 그리고 그런 옷 입으면 더 말라보이는거 아니에요? 이론 옷은 안
              돼요?
            </p>
          </div>
        </div>
      </main>

      {/* 하단 입력 영역 */}
      <footer className="flex items-center gap-2 border-t border-slate-200 bg-white px-4 py-3">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-100 p-0">
          <Plus className="h-4 w-4 text-slate-600" />
        </Button>

        <div className="flex-1 rounded-full bg-slate-100 px-4 py-2 text-[13px] text-slate-400">
          내용을 입력하세요
        </div>

        <Button className="h-9 rounded-full px-4 text-[13px] font-semibold">전송</Button>
      </footer>

      <div className="flex w-full max-w-sm items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full bg-slate-100 p-0">
          <Plus className="h-4 w-4 text-slate-600" />
        </Button>
        <Input type="email" placeholder="내용을 입력하세요" />
        <Button type="submit" variant="outline" size="sm">
          전송
        </Button>
      </div>
    </div>
  );
}

// "use client";

// import { Plus } from "lucide-react";

// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import ChatHeader from "./components/ChatHeader";

// type ChatMessage = {
//   id: number;
//   align: "left" | "right";
//   text: string;
//   action?: {
//     label: string;
//     variant: "primary" | "secondary";
//   };
// };

// const chatMessages: ChatMessage[] = [
//   {
//     id: 1,
//     align: "right",
//     text: "김바보님을 위한 고민지가 도착했습니다.",
//     action: { label: "고민지 보기", variant: "primary" },
//   },
//   {
//     id: 2,
//     align: "left",
//     text: "김바보님을 위한 솔루션지가 도착했습니다.",
//     action: { label: "솔루션지 보기", variant: "secondary" },
//   },
//   {
//     id: 3,
//     align: "right",
//     text: "김바보님이 추가 질문을 보냈습니다.",
//   },
//   {
//     id: 4,
//     align: "right",
//     text: "제가 왜 깜마른이에요? 그리고 그런 옷 입으면 더 말라보이는거 아니에요? 이런 옷은 안 돼요?",
//   },
// ];

// export function Chat() {
//   return (
//     <div className="min-h-screen w-full bg-[#DAE9FF] px-4 py-6">
//       <div className="mx-auto flex w-full max-w-sm flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(47,128,255,0.15)]">
//         <ChatHeader />

//         <section className="flex flex-col items-center border-b border-slate-100 px-6 pb-6 pt-2">
//           <Avatar className="h-[88px] w-[88px] bg-slate-100 text-slate-500">
//             <AvatarFallback className="text-xs text-gray-500">박오징</AvatarFallback>
//           </Avatar>
//           <div className="mt-3 text-sm font-semibold text-slate-900">박오징</div>
//           <button className="mt-1 text-[11px] text-slate-500" type="button">
//             전문가 프로필 보기
//           </button>
//           <div className="mt-4 rounded-full bg-slate-100 px-4 py-1">
//             <span className="text-[11px] text-slate-500">2025년 11월 9일 일요일</span>
//           </div>
//         </section>

//         <main className="flex-1 space-y-5 bg-[#F5F6FA] px-4 py-6">
//           {chatMessages.map((message) => (
//             <ChatBubble key={message.id} message={message} />
//           ))}
//         </main>

//         <footer className="flex items-center gap-3 border-t border-slate-100 bg-white px-4 py-3">
//           <button
//             type="button"
//             className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600"
//             aria-label="첨부"
//           >
//             <Plus className="h-5 w-5" />
//           </button>

//           <div className="flex-1 rounded-full bg-slate-100 px-4 py-3 text-[13px] text-slate-400">
//             내용을 입력하세요
//           </div>

//           <button
//             type="button"
//             className="flex h-10 items-center justify-center rounded-full bg-slate-200 px-4 text-[13px] font-semibold text-slate-600"
//           >
//             전송
//           </button>
//         </footer>
//       </div>
//     </div>
//   );
// }

// type ChatBubbleProps = {
//   message: ChatMessage;
// };

// function ChatBubble({ message }: ChatBubbleProps) {
//   const isLeft = message.align === "left";
//   const bubbleBase =
//     "max-w-[80%] rounded-[20px] px-4 py-3 text-[13px] leading-relaxed" +
//     (isLeft ? " bg-white text-slate-900 shadow-sm" : " bg-[#2F80FF] text-white");

//   const actionClasses = message.action
//     ? message.action.variant === "primary"
//       ? "bg-white text-[#2F80FF]"
//       : "bg-[#F8F8FC] text-slate-700 border border-slate-200"
//     : "";

//   return (
//     <div className={`flex ${isLeft ? "items-start gap-2" : "justify-end"}`}>
//       {isLeft && (
//         <Avatar className="mt-1 h-8 w-8 bg-[#D9D9D9] text-slate-600">
//           <AvatarFallback>박</AvatarFallback>
//         </Avatar>
//       )}
//       <div className={bubbleBase}>
//         <p className="whitespace-pre-line">{message.text}</p>
//         {message.action && (
//           <button
//             type="button"
//             className={`mt-3 w-full rounded-xl px-3 py-3 text-[13px] font-semibold ${actionClasses}`}
//           >
//             {message.action.label}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
