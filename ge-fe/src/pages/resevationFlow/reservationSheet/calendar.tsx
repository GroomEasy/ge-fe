import { useEffect, useMemo, useState } from "react";
import { DayPicker, useDayPicker, type MonthCaptionProps } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";

type TimeSlot = { id: string; label: string; disabled?: boolean };

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function IconChevron({
  dir = "left",
  className = "",
}: {
  dir?: "left" | "right";
  className?: string;
}) {
  const rotate = dir === "right" ? "rotate-180" : "";
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", rotate, className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function toKoreanTimeLabel(hour24: number, minute: 0 | 30) {
  const isAM = hour24 < 12;
  const meridiem = isAM ? "오전" : "오후";
  let hour12 = hour24 % 12;
  if (hour12 === 0) hour12 = 12;

  const mm = minute === 0 ? "00" : "30";
  return `${meridiem} ${hour12}:${mm}`;
}

function buildTimeSlots(startHour = 11, endHour = 22, stepMinutes: 30 | 60 = 30): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const totalStart = startHour * 60;
  const totalEnd = endHour * 60;

  for (let t = totalStart; t <= totalEnd; t += stepMinutes) {
    const h = Math.floor(t / 60);
    const m = (t % 60) as 0 | 30;
    const id = `t-${String(h).padStart(2, "0")}${m === 0 ? "00" : "30"}`;
    slots.push({ id, label: toKoreanTimeLabel(h, m) });
  }
  return slots;
}

function TimePill({
  label,
  selected,
  disabled,
  onClick,
}: {
  label: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "shrink-0 w-[88px] h-[36px] rounded-[6px] pre_cap_reg_13 transition",
        "active:scale-[0.98]",
        selected
          ? "bg-[#008BFF] text-white"
          : disabled
            ? "bg-[#F6F7F8] text-[#BFC4CC]"
            : "bg-[#F4F4F5] text-[#6B6F78] hover:bg-[#E9EBEF]",
      )}
    >
      {label}
    </button>
  );
}

/**
 * ✅ 스샷처럼 "가운데 월 텍스트 + 좌/우 화살표" 한 줄로 구성
 * (react-day-picker v9 => MonthCaption 사용)
 */
function MonthHeader(props: MonthCaptionProps) {
  const { calendarMonth } = props;
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();

  const label = `${calendarMonth.date.getFullYear()}년 ${calendarMonth.date.getMonth() + 1}월`;

  return (
    <div className="relative mb-4 flex items-center justify-center">
      <button
        type="button"
        aria-label="이전 달"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className={cn(
          "absolute left-0 inline-flex h-9 w-9 items-center justify-center rounded-full",
          "text-[#121214] active:bg-[#F1F2F4] disabled:opacity-30",
        )}
      >
        <IconChevron dir="left" />
      </button>

      <div className="text-[16px] font-extrabold text-[#121214]">{label}</div>

      <button
        type="button"
        aria-label="다음 달"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className={cn(
          "absolute right-0 inline-flex h-9 w-9 items-center justify-center rounded-full",
          "text-[#121214] active:bg-[#F1F2F4] disabled:opacity-30",
        )}
      >
        <IconChevron dir="right" />
      </button>
    </div>
  );
}

export default function DateTimeBottomSheet({
  open,
  onClose,
  onNext,
}: {
  open: boolean;
  onClose: () => void;
  onNext: (payload: { date: Date; timeId: string }) => void;
}) {
  // ✅ 오늘 = 진짜 현재 날짜
  const today = useMemo(() => startOfDay(new Date()), []);

  // ✅ 스샷처럼: 오늘 포함 과거 비활성(= 내일부터 가능)
  const disableBefore = useMemo(() => addDays(today, 1), [today]);

  // ✅ 초기 month = 이번 달
  const [month, setMonth] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );

  // ✅ 스샷처럼 기본 선택 상태(Next 활성) 원하면 "내일"을 기본 선택
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => addDays(today, 3)); // 필요 없으면 undefined로 바꿔도 됨
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>("t-1130");

  const timeSlots = useMemo(() => buildTimeSlots(11, 22, 30), []);

  // 열릴 때 스크롤 잠금
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC 닫기
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const canNext = Boolean(selectedDate && selectedTimeId);

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <button type="button" className="absolute inset-0 bg-black/45" onClick={onClose} />

      {/* sheet (스샷: 375px 폭, 둥근 상단) */}
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-[375px] rounded-t-[24px] bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.12)]">
        <div className="px-6 pt-6">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            month={month}
            onMonthChange={setMonth}
            showOutsideDays
            fixedWeeks
            locale={ko}
            weekStartsOn={0}
            today={today}
            disabled={{ before: disableBefore }}
            hideNavigation
            components={{
              MonthCaption: MonthHeader,
            }}
            formatters={{
              formatWeekdayName: (d) => ["일", "월", "화", "수", "목", "금", "토"][d.getDay()],
            }}
            className="w-full"
            classNames={{
              months: "w-full",
              month: "w-full",

              // ✅ table 유지(깨짐 방지)
              table: "w-full border-collapse",
              head_cell: "pb-3 text-center text-[12px] font-semibold text-[#6B6F78]",
              cell: "p-0 text-center align-middle",
              row: "h-11",

              // ✅ 날짜 버튼(스샷: 40px 원 / 선택 파랑 / 오늘 회색 원 / 과거 연회색)
              day_button: cn(
                "mx-auto flex h-10 w-10 items-center justify-center rounded-full",
                "text-[14px] font-semibold text-[#121214] transition",
                "hover:bg-[#EEF0F3]",
                "focus:outline-none",
                // 과거(비활성): 아주 연한 회색
                "[&:disabled]:text-[#E3E7EE] [&:disabled]:opacity-100 [&:disabled]:cursor-default [&:disabled]:hover:bg-transparent",
                // 선택: 파랑 원(#008BFF)
                "aria-[selected=true]:bg-[#008BFF] aria-[selected=true]:text-white aria-[selected=true]:hover:bg-[#008BFF]",
              ),

              // 오늘(회색 원) - disabled여도 원은 유지되게
              day_today:
                "bg-[#EEF0F3] text-[#121214] hover:bg-[#EEF0F3] [&:disabled]:bg-[#EEF0F3] [&:disabled]:text-[#BFC4CC]",

              // 달 밖 날짜(다음달 1일 등): 기본은 검정(비활성이면 위 disabled 스타일이 이김)
              day_outside: "text-[#121214] opacity-100",
            }}
          />

          {/* divider */}
          <div className="mt-4 h-[1px] w-full bg-[#EEF0F3]" />

          {/* times */}
          <div className="mt-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2">
              {timeSlots.map((t) => {
                const selected = selectedTimeId === t.id;
                return (
                  <TimePill
                    key={t.id}
                    label={t.label}
                    selected={selected}
                    disabled={t.disabled}
                    onClick={() => {
                      if (t.disabled) return;
                      setSelectedTimeId(t.id);
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* next (스샷: 54px, radius 4, 검정 버튼) */}
          <button
            type="button"
            disabled={!canNext}
            onClick={() => {
              if (!selectedDate || !selectedTimeId) return;
              onNext({ date: selectedDate, timeId: selectedTimeId });
            }}
            className={cn(
              "mt-5 mb-5 w-full h-[54px] rounded-[4px] pre_subtitle_semi_16",
              canNext ? "bg-[#0F0F10] text-white active:opacity-90" : "bg-[#E6E7EA] text-[#A9ADB6]",
            )}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
