import { ImSpinner2 } from "react-icons/im";

interface LoadingProps {
  fullPage?: boolean; // خيار لجعل التحميل يغطي الشاشة كاملة أو يملأ الحاوية فقط
  message?: string;   // نص اختياري يظهر أسفل أيقونة التحميل
}

export default function Loading({ fullPage = false, message = "جاري التحميل..." }: LoadingProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center gap-3 transition-all ${
        fullPage ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 w-screen h-screen" : "w-full h-full p-4"
      }`}
    >
      {/* أيقونة التحميل الملتفة مع فئات التدوير والتلوين من Tailwind */}
      <ImSpinner2 className="animate-spin text-primary h-10 w-10 text-center" />
      
      {/* النص الإرشادي المرافق للحركة */}
      {message && (
        <p className="text-sm font-medium text-gray-600 tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
