import { useEffect, useMemo, useState } from "react";
import { DayPicker, useDayPicker, type MonthCaptionProps } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/style.css"; // ✅ v9 권장 경로 :contentReference[oaicite:1]{index=1}

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
 * ✅ 스샷처럼 "가운데 월 텍스트 + 좌/우 화살표" 한 줄
 */
function MonthHeader(props: MonthCaptionProps) {
  const { calendarMonth } = props;
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();

  const label = `${calendarMonth.date.getFullYear()}년 ${calendarMonth.date.getMonth() + 1}월`;

  return (
    <div className="relative mb-4 flex items-center justify-center">
      {/* ✅ 1) 왼쪽 화살표: 과거니까 회색 */}
      <button
        type="button"
        aria-label="이전 달"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className={cn(
          "absolute left-0 inline-flex h-9 w-9 items-center justify-center rounded-full",
          "text-[#C9CDD5] active:bg-[#F1F2F4]",
          "disabled:opacity-100 disabled:text-[#C9CDD5]",
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
          "text-[#121214] active:bg-[#F1F2F4]",
          "disabled:text-[#C9CDD5] disabled:opacity-100",
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
  const today = useMemo(() => startOfDay(new Date()), []);

  // 오늘 포함 과거 비활성(= 내일부터 선택 가능)
  const disableBefore = useMemo(() => addDays(today, 1), [today]);

  // ✅ 이전 달로 못 가게 (v9는 startMonth) :contentReference[oaicite:2]{index=2}
  const startMonth = useMemo(() => new Date(today.getFullYear(), today.getMonth(), 1), [today]);

  const [month, setMonth] = useState<Date>(() => startMonth);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => addDays(today, 3));
  const [selectedTimeId, setSelectedTimeId] = useState<string | null>("t-1130");

  const timeSlots = useMemo(() => buildTimeSlots(11, 22, 30), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
      <button type="button" className="absolute inset-0 bg-black/45" onClick={onClose} />

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
            startMonth={startMonth}
            hideNavigation
            components={{ MonthCaption: MonthHeader }}
            formatters={{
              formatWeekdayName: (d) => ["일", "월", "화", "수", "목", "금", "토"][d.getDay()],
            }}
            className="w-full"
            classNames={{
              months: "w-full",
              month: "w-full",
              month_grid: "w-full border-collapse",
              weekday: "pb-3 text-center text-[12px] font-semibold text-[#6B6F78]",
              day: "p-0 text-center align-middle", // day에는 스타일 최소화

              /**
               * 🔥 핵심 수정 부분
               * 버튼 자체의 클래스(day_button) 안에서 '기본', '호버', '선택됨' 상태를 모두 정의합니다.
               */
              day_button: cn(
                // 1. 공통 레이아웃
                "mx-auto flex h-10 w-10 items-center justify-center rounded-full transition focus:outline-none",
                "pre_cap_reg_14",

                // 2. [기본 상태] (선택 안됐을 때)
                // aria-selected가 없을 때만 적용되도록 설정하지 않아도 되지만,
                // 아래 aria-selected 스타일이 덮어쓰도록 순서를 배치합니다.
                "text-[#0f0f10] hover:bg-[#EEF0F3]",

                // 3. [선택된 상태] (Tailwind 'aria-selected' Modifier 사용)
                // React-day-picker는 선택된 날짜 버튼에 자동으로 aria-selected="true"를 붙입니다.
                // Tailwind는 이를 감지하여 스타일을 적용합니다.
                "aria-selected:bg-![#008BFF] aria-selected:!text-white",

                // 선택된 상태에서는 호버해도 파란색 유지 (기본 회색 호버 덮어쓰기)
                "aria-selected:hover:bg-[#008BFF]",

                // 4. [비활성 상태] (날짜가 disable 되었을 때)
                "disabled:text-[#AEB0B6] disabled:cursor-default disabled:hover:bg-transparent",
              ),

              // 나머지는 비워두거나 최소화
              selected: "",
              today: "",
              disabled: "",
              outside: "opacity-100",
            }}
          />

          <div className="mt-4 h-[1px] w-full bg-[#EEF0F3]" />

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
