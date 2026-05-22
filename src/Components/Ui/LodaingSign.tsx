import { ImSpinner2 } from "react-icons/im";

interface LoadingProps {
  fullPage?: boolean; 
  message?: string; 
}

export default function Loading({ fullPage = false, message = "جاري التحميل..." }: LoadingProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center gap-3 transition-all ${
        fullPage ? "fixed inset-0 bg-white/80 backdrop-blur-sm z-50 w-screen h-screen" : "w-full h-full p-4"
      }`}
    >
      <ImSpinner2 className="animate-spin text-primary h-10 w-10 text-center" />
      
      {message && (
        <p className="text-sm font-medium text-gray-600 tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
