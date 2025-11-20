// import { useLocation, useNavigate } from "react-router-dom";

// export default function ChatHeader() {
//   const nav = useNavigate();
//   const location = useLocation();
//   const { title } = (location.state ?? {}) as { title?: string };

//   return (
//     <header className="sticky top-0 z-10 !pt-2 !px-4 backdrop-blur !mb-6">
//       <div className="relative flex items-center justify-between px-4 py-3 pt-[env(safe-area-inset-top)]">
//         <div className="flex items-center gap-3">
//           <button onClick={() => nav(-1)} className="relative z-10 rounded p-1 active:scale-95">
//             <img src="/images/profile/profileLeftArrow.svg" className="h-6 w-6" />
//           </button>
//         </div>
//         <h1 className="pointer-events-none absolute inset-0 flex items-center justify-center !text-[18px] !font-semibold text-gray-800">
//           {title}
//         </h1>
//         <div className="flex items-center gap-4">
//           <button className="h-6 w-6 active:scale-95">
//             <img src="/images/magnifying.svg" alt="검색" />
//           </button>
//           <button className="h-6 w-6 active:scale-95">
//             <img src="/images/burger.svg" alt="메뉴" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

import { useLocation, useNavigate } from "react-router-dom";
import { BatteryFull, ChevronLeft, MoreVertical, SignalHigh, Wifi } from "lucide-react";

type ChatHeaderState = {
  title?: string;
  subtitle?: string;
};

export default function ChatHeader() {
  const nav = useNavigate();
  const location = useLocation();
  const { title, subtitle } = (location.state ?? {}) as ChatHeaderState;

  const displayName = title ?? "박오징";
  const displaySubtitle = subtitle ?? "패션";

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between px-6 pt-4 text-[12px] text-slate-500">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-1 text-slate-700">
          <SignalHigh className="h-4 w-4" />
          <Wifi className="h-4 w-4" />
          <BatteryFull className="h-4 w-4" />
        </div>
      </div>

      <div className="flex items-center justify-between px-4 pb-4 pt-3">
        <button
          type="button"
          onClick={() => nav(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm active:scale-95"
          aria-label="뒤로가기"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold text-gray-900">{displayName}</span>
          <span className="text-[11px] text-gray-500">{displaySubtitle}</span>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm active:scale-95"
          aria-label="메뉴"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
