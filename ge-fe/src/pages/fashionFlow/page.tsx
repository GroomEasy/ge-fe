import * as React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "./component/Footer";
import TopNav from "./component/TopNav";
import { PRICE_MAX, SIZE_OPTIONS } from "./constants";
import { uploadImageViaPresignV2 } from "@/lib/s3Upload";
import type { OutfitImage } from "./types";
import { Step1Guide } from "./Step1Guide";
import { Step2SidePhotos } from "./Step2SidePhotos";
import { Step3OutfitPhotos } from "./Step3OutfitPhotos";
import { Step4BodySize } from "./Step4BodySize";
import { Step6StylePreference } from "./Step6StylePreference";
import { Step7BodyFlaws } from "./Step7BodyFlaws";
import { Step8ItemBudget } from "./Step8ItemBudget";
import { Step9Purpose } from "./Step9Purpose";
import { reservationService } from "@/services/reservation.service";
import { useFashionFlowStore } from "@/stores/useFashionFlowStore";

const createPreview = (file: File) => ({
  id: crypto.randomUUID(),
  url: URL.createObjectURL(file),
  file,
});

type SizeOption = (typeof SIZE_OPTIONS)[number];

const releasePreview = (preview?: OutfitImage | null) => {
  if (preview?.url) {
    URL.revokeObjectURL(preview.url);
  }
};

export default function FashionFlowPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [frontImage, setFrontImage] = React.useState<OutfitImage | null>(null);
  const [leftImage, setLeftImage] = React.useState<OutfitImage | null>(null);
  const [rightImage, setRightImage] = React.useState<OutfitImage | null>(null);
  const [outfits, setOutfits] = React.useState<OutfitImage[]>([]);
  const [purposeImages, setPurposeImages] = React.useState<OutfitImage[]>([]);
  const {
    step,
    introStage,
    heightValue,
    weightValue,
    topSize,
    bottomSize,
    colorSelections,
    fitSelection,
    imageStyleSelections,
    imageStyleEtc,
    bodySelections,
    bodyEtc,
    itemSelections,
    priceMin,
    priceMax,
    purposeText,
    setStep,
    setIntroStage,
    setHeightValue,
    setWeightValue,
    setTopSize,
    setBottomSize,
    toggleColorSelection,
    setFitSelection,
    toggleImageStyleSelection,
    setImageStyleEtc,
    toggleBodySelection,
    setBodyEtc,
    toggleItemSelection,
    setPriceMin,
    setPriceMax,
    setPurposeText,
  } = useFashionFlowStore();

  const reservationIdRaw =
    searchParams.get("reservationId") ??
    searchParams.get("reservation_id") ??
    (location.state as { reservationId?: number } | null)?.reservationId;
  const reservationId = reservationIdRaw ? Number(reservationIdRaw) : null;

  const frontInputRef = React.useRef<HTMLInputElement | null>(null);
  const leftInputRef = React.useRef<HTMLInputElement | null>(null);
  const rightInputRef = React.useRef<HTMLInputElement | null>(null);
  const outfitInputRef = React.useRef<HTMLInputElement | null>(null);
  const purposeInputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const stepParam = Number(searchParams.get("step"));
    if (!Number.isNaN(stepParam) && stepParam >= 1 && stepParam <= 6) {
      setStep(stepParam);
      setIntroStage(1);
    }
  }, [searchParams, setStep, setIntroStage]);

  const colorSelectionSet = React.useMemo(
    () => new Set(colorSelections),
    [colorSelections],
  );
  const imageStyleSelectionSet = React.useMemo(
    () => new Set(imageStyleSelections),
    [imageStyleSelections],
  );
  const bodySelectionSet = React.useMemo(() => new Set(bodySelections), [bodySelections]);
  const itemSelectionSet = React.useMemo(() => new Set(itemSelections), [itemSelections]);

  React.useEffect(() => {
    return () => {
      releasePreview(frontImage);
      releasePreview(leftImage);
      releasePreview(rightImage);
      outfits.forEach((item) => releasePreview(item));
      purposeImages.forEach((item) => releasePreview(item));
    };
  }, [frontImage, leftImage, rightImage, outfits, purposeImages]);

  const handleSingleUpload = (
    files: FileList | null,
    setter: React.Dispatch<React.SetStateAction<OutfitImage | null>>,
  ) => {
    const file = files?.[0];
    if (!file) return;
    setter((prev) => {
      releasePreview(prev);
      return createPreview(file);
    });
  };

  const handleOutfitUpload = (files: FileList | null) => {
    if (!files?.length) return;
    setOutfits((prev) => {
      const remainingSlots = Math.max(0, 5 - prev.length);
      const next = Array.from(files)
        .slice(0, remainingSlots)
        .map(createPreview);
      return [...prev, ...next];
    });
  };

  const removeOutfit = (id: string) => {
    setOutfits((prev) => {
      const target = prev.find((item) => item.id === id);
      releasePreview(target ?? null);
      return prev.filter((item) => item.id !== id);
    });
  };

  const removeSingleImage = (
    setter: React.Dispatch<React.SetStateAction<OutfitImage | null>>,
  ) => {
    setter((prev) => {
      releasePreview(prev);
      return null;
    });
  };

  const formatNumeric = (value: string) => value.replace(/[^0-9]/g, "");

  const applyUnit = (value: string, unit: "cm" | "kg") => {
    const numeric = formatNumeric(value);
    if (!numeric) return "";
    return unit === "cm" ? `${numeric} cm` : `${numeric}kg`;
  };

  const formatPrice = (value: number) => {
    if (value >= PRICE_MAX) return "40만원 이상";
    if (value === 0) return "0원";
    return `${value}만원`;
  };

  const formatPriceRange = () => `${formatPrice(priceMin)} ~ ${formatPrice(priceMax)}`;

  const handlePriceMin = (value: number) => {
    setPriceMin(Math.min(value, priceMax));
  };

  const handlePriceMax = (value: number) => {
    setPriceMax(Math.max(value, priceMin));
  };

  const handlePurposeUpload = (files: FileList | null) => {
    if (!files?.length) return;
    setPurposeImages((prev) => {
      const remainingSlots = Math.max(0, 3 - prev.length);
      const next = Array.from(files)
        .slice(0, remainingSlots)
        .map(createPreview);
      return [...prev, ...next];
    });
  };

  const removePurposeImage = (id: string) => {
    setPurposeImages((prev) => {
      const target = prev.find((item) => item.id === id);
      releasePreview(target ?? null);
      return prev.filter((item) => item.id !== id);
    });
  };

  const canProceed = () => {
    if (step === 1) {
      return introStage === 1
        ? true
        : Boolean(frontImage && leftImage && rightImage && outfits.length >= 2);
    }
    if (step === 2) {
      const hasHeight = Boolean(formatNumeric(heightValue));
      const hasWeight = Boolean(formatNumeric(weightValue));
      return hasHeight && hasWeight && Boolean(topSize) && Boolean(bottomSize);
    }
    if (step === 3) return bodySelections.length > 0;
    if (step === 4) {
      return (
        colorSelections.length > 0 && Boolean(fitSelection) && imageStyleSelections.length > 0
      );
    }
    if (step === 5) return itemSelections.length > 0;
    if (step === 6) return purposeText.trim().length > 0;
    return false;
  };

  const mapBodyType = (value: string) => {
    const map: Record<string, string> = {
      "좁은 어깨": "좁은어깨",
      "얇은 다리": "얇은다리",
      "얇은 팔": "얇은팔",
      "볼록한 배": "볼록한배",
      "굵은 다리": "굵은다리",
      "큰 몸통": "큰몸통",
      "얄상한 몸": "얄상한몸",
      "상하체 비율": "상하체비율",
      "머리 크기": "머리크기",
    };
    return map[value] ?? value;
  };

  const uploadFashionImage = async (file: File, imageType: string) => {
    const { key } = await uploadImageViaPresignV2({
      file,
      resourceType: "consultation",
      imageType,
    });
    return key;
  };

  const submitFashionConcern = async () => {
    if (!reservationId) {
      window.alert("예약 ID가 없습니다. 다시 시도해주세요.");
      return false;
    }
    if (!frontImage || !leftImage || !rightImage) return false;

    setIsSubmitting(true);

    try {
      const [frontKey, leftKey, rightKey] = await Promise.all([
        uploadFashionImage(frontImage.file, "frontFullBody"),
        uploadFashionImage(leftImage.file, "leftFullBody"),
        uploadFashionImage(rightImage.file, "rightFullBody"),
      ]);

      const favoriteKeys = await Promise.all(
        outfits.map((item) => uploadFashionImage(item.file, "favoriteOutfit")),
      );

      const consultationKeys = await Promise.all(
        purposeImages.map((item) =>
          uploadFashionImage(item.file, "consultationPurpose"),
        ),
      );

      const bodyTypeDisadvantages = bodySelections.map(mapBodyType);
      const styleColors = colorSelections;
      const styleImages = imageStyleSelections;

      await reservationService.updateFashionConcern(reservationId, {
        fashion: {
          height: Number(formatNumeric(heightValue)),
          weight: Number(formatNumeric(weightValue)),
          topSize: topSize ?? "M",
          bottomSize: bottomSize ?? "M",
          bodyTypeDisadvantages,
          bodyTypeEtcText: bodyEtc.trim() ? bodyEtc : undefined,
          styleColors,
          styleFits: fitSelection ? [fitSelection] : [],
          styleImages,
          styleEtcText: imageStyleEtc.trim() ? imageStyleEtc : undefined,
          outfitItems: itemSelections,
          outfitPriceRange: {
            minPrice: priceMin * 10000,
            maxPrice: priceMax * 10000,
          },
          images: {
            frontFullBody: [frontKey],
            leftFullBody: [leftKey],
            rightFullBody: [rightKey],
            favoriteOutfit: favoriteKeys,
            consultationPurpose: consultationKeys.length ? consultationKeys : undefined,
          },
        },
      });
      return true;
    } catch (error) {
      console.error(error);
      window.alert("고민지 저장에 실패했어요. 다시 시도해주세요.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    if (!canProceed()) return;
    if (step === 1 && introStage === 1) {
      setIntroStage(2);
      return;
    }
    if (step < 6) {
      setStep((prev) => prev + 1);
      if (step === 1) {
        setIntroStage(1);
      }
      return;
    }
    const submitted = await submitFashionConcern();
    if (!submitted) return;
    navigate("/payment/order", {
      state: {
        from: `${location.pathname}${location.search}`,
        category: "패션",
        step: 6,
      },
    });
  };

  const handlePreviewNext = () => {
    if (step === 1 && introStage === 1) {
      setIntroStage(2);
      return;
    }
    if (step < 6) {
      setStep((prev) => prev + 1);
      if (step === 1) {
        setIntroStage(1);
      }
      return;
    }
    navigate("/payment/order", { state: { category: "패션", step: 6 } });
  };

  const handleBack = () => {
    if (step === 1) {
      if (introStage === 2) {
        setIntroStage(1);
        return;
      }
      navigate(-1);
      return;
    }
    if (step === 2) {
      setStep(1);
      setIntroStage(2);
      return;
    }
    setStep((prev) => prev - 1);
  };

  const minPercent = (priceMin / PRICE_MAX) * 100;
  const maxPercent = (priceMax / PRICE_MAX) * 100;

  return (
    <div className="flex min-h-full flex-col bg-white text-[#0f0f10]">
      <TopNav onBack={handleBack} />

      <main className="hide-scrollbar flex-1 overflow-y-auto px-[16px] pb-[160px]">
        {step === 1 && (
          <>
            <Step1Guide
              introStage={introStage}
              frontImage={frontImage}
              frontInputRef={frontInputRef}
              onRemoveFront={() => removeSingleImage(setFrontImage)}
              onUploadFront={(files) => handleSingleUpload(files, setFrontImage)}
            />
            {introStage === 2 && (
              <>
                <Step2SidePhotos
                  leftImage={leftImage}
                  rightImage={rightImage}
                  leftInputRef={leftInputRef}
                  rightInputRef={rightInputRef}
                  onRemoveLeft={() => removeSingleImage(setLeftImage)}
                  onRemoveRight={() => removeSingleImage(setRightImage)}
                  onUploadLeft={(files) => handleSingleUpload(files, setLeftImage)}
                  onUploadRight={(files) => handleSingleUpload(files, setRightImage)}
                />
                <Step3OutfitPhotos
                  outfits={outfits}
                  outfitInputRef={outfitInputRef}
                  onUploadOutfits={handleOutfitUpload}
                  onRemoveOutfit={removeOutfit}
                />
              </>
            )}
          </>
        )}
        {step === 2 && (
          <Step4BodySize
            heightValue={heightValue}
            weightValue={weightValue}
            topSize={topSize as SizeOption | null}
            bottomSize={bottomSize as SizeOption | null}
            onHeightChange={(value) => setHeightValue(formatNumeric(value))}
            onHeightBlur={() => setHeightValue((prev) => applyUnit(prev, "cm"))}
            onHeightFocus={() => setHeightValue((prev) => formatNumeric(prev))}
            onWeightChange={(value) => setWeightValue(formatNumeric(value))}
            onWeightBlur={() => setWeightValue((prev) => applyUnit(prev, "kg"))}
            onWeightFocus={() => setWeightValue((prev) => formatNumeric(prev))}
            onTopSizeChange={(value) =>
              setTopSize(topSize === value ? null : value)
            }
            onBottomSizeChange={(value) =>
              setBottomSize(bottomSize === value ? null : value)
            }
          />
        )}
        {step === 3 && (
          <Step7BodyFlaws
            selections={bodySelectionSet}
            onToggle={toggleBodySelection}
            etcValue={bodyEtc}
            onEtcChange={setBodyEtc}
          />
        )}
        {step === 4 && (
          <Step6StylePreference
            colorSelections={colorSelectionSet}
            fitSelection={fitSelection}
            imageStyleSelections={imageStyleSelectionSet}
            imageStyleEtc={imageStyleEtc}
            onToggleColor={toggleColorSelection}
            onFitChange={(value) => setFitSelection(fitSelection === value ? null : value)}
            onToggleImageStyle={toggleImageStyleSelection}
            onImageStyleEtcChange={setImageStyleEtc}
          />
        )}
        {step === 5 && (
          <Step8ItemBudget
            selections={itemSelectionSet}
            onToggle={toggleItemSelection}
            priceMin={priceMin}
            priceMax={priceMax}
            minPercent={minPercent}
            maxPercent={maxPercent}
            onPriceMinChange={handlePriceMin}
            onPriceMaxChange={handlePriceMax}
            onPricePreset={(min, max) => {
              setPriceMin(min);
              setPriceMax(max);
            }}
            formatPriceRange={formatPriceRange}
          />
        )}
        {step === 6 && (
          <Step9Purpose
            purposeText={purposeText}
            purposeImages={purposeImages}
            purposeInputRef={purposeInputRef}
            onPurposeTextChange={setPurposeText}
            onUploadPurpose={handlePurposeUpload}
            onRemovePurpose={removePurposeImage}
          />
        )}
      </main>

      <Footer
        disabled={!canProceed() || isSubmitting}
        onNext={handleNext}
        onPreviewNext={handlePreviewNext}
      />
    </div>
  );
}
