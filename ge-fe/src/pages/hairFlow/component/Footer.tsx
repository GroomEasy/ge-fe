// // export default function Footer({
// //   label = "다음",
// //   disabled,
// //   onClick,
// // }: {
// //   label?: string;
// //   disabled?: boolean;
// //   onClick: () => void;
// // }) {
// //   return (
// //     <div className="fixed inset-x-0 bottom-0 z-50">
// //       <div className="mx-auto w-full max-w-[420px] px-5 pb-[calc(env(safe-area-inset-bottom)+16px)]">
// //         <button
// //           type="button"
// //           disabled={disabled}
// //           onClick={onClick}
// //           className={[
// //             "h-[64px] w-full pre_subtitle_semi_16",
// //             disabled ? "bg-black/40 text-white/70" : "bg-black text-white active:bg-black/90",
// //           ].join(" ")}
// //         >
// //           {label}
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// export default function Footer({
//   label = "다음",
//   disabled,
//   onClick,
// }: {
//   label?: string;
//   disabled?: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <div
//       className="
//         fixed bottom-0 left-1/2 z-50 w-full max-w-[375px]
//         -translate-x-1/2
//       "
//     >
//       <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 " />

//       <button
//         type="button"
//         disabled={disabled}
//         onClick={onClick}
//         className={[
//           "h-[64px] w-full pre_subtitle_semi_16",
//           disabled ? "bg-black/40 text-white/70" : "bg-black text-white active:bg-black/90",
//         ].join(" ")}
//       >
//         {label}
//       </button>

//       {/* safe-area도 검정으로 채우기 (iOS 홈 인디케이터) */}
//       <div className="h-[env(safe-area-inset-bottom)] bg-black" />
//     </div>
//   );
// }

export default function Footer({
  label = "다음",
  disabled,
  onClick,
}: {
  label?: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    // ✅ 전체 폭을 덮는 검정 바(분단 방지 핵심)
    <div className="fixed inset-x-0 bottom-0 z-50 bg-black">
      {/* ✅ 가운데 max-width는 안쪽에서만 */}
      <div className="mx-auto w-full max-w-[420px]">
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          className={[
            "h-[64px] w-full pre_subtitle_semi_16",
            // ✅ disabled 배경을 '불투명'으로 (bg-black/40 금지)
            disabled ? "bg-[#2b2b2b] text-white/70" : "bg-black text-white active:bg-black/90",
          ].join(" ")}
        >
          {label}
        </button>

        {/* ✅ safe-area도 검정으로 채우기 */}
        <div className="h-[env(safe-area-inset-bottom)] bg-black" />
      </div>
    </div>
  );
}
