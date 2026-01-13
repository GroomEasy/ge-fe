// import { useState } from "react";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";

// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";

// const quillModules = {
//   toolbar: [
//     [{ header: [1, 2, 3, false] }],
//     ["bold", "italic", "underline", "strike"],
//     [{ color: [] }, { background: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     [{ align: [] }],
//     ["link"],
//     ["clean"],
//   ],
// };

// const quillFormats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "color",
//   "background",
//   "list",
//   "bullet",
//   "align",
//   "link",
// ];

// export default function EditorPage() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const send = () => {
//     console.log({ title, content });
//   };

//   return (
//     <main className="min-h-full flex items-center justify-center bg-slate-50 px-4 py-10 overflow-y-auto scrollbar-hide">
//       <Card className="w-full max-w-3xl border-slate-200 shadow-sm">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-lg font-semibold text-slate-900">
//             "박오징"님에 대한 솔루션지 작성
//           </CardTitle>
//           <CardDescription className="text-sm text-slate-500">
//             제가 왜 깡마른이에요? 그리고 그런 옷 입으면 더 말라보이는거 아니에요? 이론 옷은 안
//             돼요?제가 왜 깡마른이에요? 그리고 그런 옷 입으면 더 말라보이는거 아니에요? 이론 옷은 안
//             돼요?제가 왜 깡마른이에요? 그리고 그런 옷 입으면 더 말라보이는거 아니에요? 이론 옷은 안
//             돼요?제가 왜 깡마른이에요? 그리고 그런 옷 입으면 더 말라보이는거 아니에요? 이론 옷은 안
//             돼요?
//           </CardDescription>
//         </CardHeader>

//         <Separator />

//         <CardContent className="space-y-6 pt-6">
//           <div className="space-y-2">
//             <Label htmlFor="title" className="text-sm font-medium text-slate-700">
//               제목
//             </Label>
//             <Input
//               id="title"
//               placeholder="제목을 입력하세요"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="border-slate-200 text-sm"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label className="text-sm font-medium text-slate-700">내용</Label>

//             <ReactQuill
//               theme="snow"
//               value={content}
//               onChange={setContent}
//               modules={quillModules}
//               formats={quillFormats}
//               placeholder="내용을 입력하세요..."
//               className="
//                 mt-1
//                 rounded-xl border border-slate-200 bg-white
//                 [&_.ql-toolbar]:rounded-t-xl
//                 [&_.ql-toolbar]:border-b-slate-200
//                 [&_.ql-toolbar]:bg-slate-50
//                 [&_.ql-container]:rounded-b-xl
//                 [&_.ql-container]:border-0
//                 [&_.ql-editor]:min-h-[260px]
//                 [&_.ql-editor]:text-sm
//               "
//             />
//           </div>

//           <div className="flex items-center justify-end pt-2">
//             <div className="flex items-center gap-2">
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="h-9 rounded-lg border-slate-200 px-4 text-xs font-medium text-slate-600"
//               >
//                 임시 저장
//               </Button>
//               <Button
//                 type="button"
//                 onClick={send}
//                 className="h-9 rounded-lg bg-slate-900 px-5 text-xs font-semibold text-white hover:bg-slate-800"
//               >
//                 전송하기
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </main>
//   );
// }

import { useCallback, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { uploadImageViaPresignedUrl } from "@/lib/s3forWrite";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useParams } from "react-router-dom";

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "list",
  //"bullet",
  "align",
  "link",
  "image", // ✅ 추가
];

export default function EditorPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const { consultationId } = useParams();

  const quillRef = useRef<ReactQuill | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const insertImage = useCallback(async (file: File) => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setIsUploadingImage(true);
    try {
      const { url } = await uploadImageViaPresignedUrl({
        file,
        resourceType: "consultation",
        imageType: "hairstyle",
        resourceId: 1234,
        signal: ac.signal,
      });

      const editor = quillRef.current?.getEditor?.();
      if (!editor) return;

      const range = editor.getSelection?.(true);
      const index = range?.index ?? editor.getLength?.() ?? 0;

      editor.insertEmbed(index, "image", url, "user");
      editor.setSelection(index + 1, 0, "silent");
    } catch (e) {
      if ((e as any)?.name !== "AbortError") {
        console.error(e);
        alert("이미지 업로드에 실패했어요. (버킷이 private면 downloadUrl 발급이 필요할 수 있어요)");
      }
    } finally {
      setIsUploadingImage(false);
    }
  }, []);

  const onToolbarImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["link", "image"], // ✅ image 추가
          ["clean"],
        ],
        handlers: {
          image: onToolbarImage, // ✅ 커스텀 핸들러 연결
        },
      },
    }),
    [onToolbarImage],
  );

  const onPickImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = ""; // 같은 파일 다시 선택 가능
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드할 수 있어요.");
        return;
      }

      // (선택) 용량 제한
      const MAX_MB = 10;
      if (file.size > MAX_MB * 1024 * 1024) {
        alert(`이미지는 최대 ${MAX_MB}MB까지 업로드할 수 있어요.`);
        return;
      }

      await insertImage(file);
    },
    [insertImage],
  );

  const send = () => {
    console.log({ title, content });
  };

  return (
    <main className="min-h-full flex items-center justify-center bg-slate-50 px-4 py-10 overflow-y-auto scrollbar-hide">
      <Card className="w-full max-w-3xl border-slate-200 shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-lg font-semibold text-slate-900">
            "박오징"님에 대한 솔루션지 작성
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">... (생략)</CardDescription>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium text-slate-700">
              제목
            </Label>
            <Input
              id="title"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-slate-200 text-sm"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-slate-700">내용</Label>
              {isUploadingImage && (
                <span className="text-xs text-slate-500">이미지 업로드 중…</span>
              )}
            </div>

            {/* ✅ 파일 선택 input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onPickImage}
            />

            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={quillModules}
              formats={quillFormats}
              placeholder="내용을 입력하세요..."
              className="
                mt-1
                rounded-xl border border-slate-200 bg-white
                [&_.ql-toolbar]:rounded-t-xl
                [&_.ql-toolbar]:border-b-slate-200
                [&_.ql-toolbar]:bg-slate-50
                [&_.ql-container]:rounded-b-xl
                [&_.ql-container]:border-0
                [&_.ql-editor]:min-h-[260px]
                [&_.ql-editor]:text-sm
              "
            />
          </div>

          <div className="flex items-center justify-end pt-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-9 rounded-lg border-slate-200 px-4 text-xs font-medium text-slate-600"
                disabled={isUploadingImage}
              >
                임시 저장
              </Button>
              <Button
                type="button"
                onClick={send}
                className="h-9 rounded-lg bg-slate-900 px-5 text-xs font-semibold text-white hover:bg-slate-800"
                disabled={isUploadingImage}
              >
                전송하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
