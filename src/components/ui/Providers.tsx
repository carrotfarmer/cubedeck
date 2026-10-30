import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiX, FiCheck, FiAlertCircle } from "react-icons/fi";

type ColorMode = "light" | "dark";
const ThemeContext = createContext<{
  colorMode: ColorMode;
  toggleColorMode: () => void;
}>({ colorMode: "light", toggleColorMode: () => undefined });
export const useColorMode = () => useContext(ThemeContext);
interface ToastOptions {
  title: string;
  description?: string;
  status?: "success" | "error" | "info" | "warning";
  duration?: number;
  isClosable?: boolean;
}
interface ToastEntry extends ToastOptions {
  id: number;
}
const ToastContext = createContext<(options: ToastOptions) => void>(
  () => undefined
);
export const useToast = () => useContext(ToastContext);
const Toast = ({
  item,
  dismiss,
}: {
  item: ToastEntry;
  dismiss: (id: number) => void;
}) => {
  useEffect(() => {
    const timeout = window.setTimeout(
      () => dismiss(item.id),
      item.duration || 4500
    );
    return () => window.clearTimeout(timeout);
  }, [item, dismiss]);
  return (
    <div
      role={item.status === "error" ? "alert" : "status"}
      className="panel pointer-events-auto flex gap-3 p-4 shadow-lg"
    >
      <span
        className={`mt-0.5 shrink-0 ${
          item.status === "error" ? "text-red-500" : "text-muted"
        }`}
      >
        {item.status === "error" ? (
          <FiAlertCircle size={16} />
        ) : (
          <FiCheck size={16} />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium">{item.title}</p>
        {item.description && (
          <p className="mt-1 text-xs text-muted">{item.description}</p>
        )}
      </div>
      <button
        className="shrink-0 text-muted hover:text-ink"
        onClick={() => dismiss(item.id)}
        aria-label="Dismiss notification"
      >
        <FiX size={15} />
      </button>
    </div>
  );
};
export const Providers = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const nextId = useRef(0);
  useEffect(() => {
    setColorMode(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);
  const toggleColorMode = useCallback(() => {
    setColorMode((current) => {
      const next = current === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("cubedeck-theme", next);
      } catch {
        /* Theme still works when storage is unavailable. */
      }
      return next;
    });
  }, []);
  const toast = useCallback((options: ToastOptions) => {
    const id = ++nextId.current;
    setToasts((current) => [...current.slice(-2), { ...options, id }]);
  }, []);
  const dismiss = useCallback(
    (id: number) =>
      setToasts((current) => current.filter((item) => item.id !== id)),
    []
  );
  return (
    <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
      <ToastContext.Provider value={toast}>
        {children}
        <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[calc(100%_-_2rem)] max-w-sm flex-col gap-2">
          {toasts.map((item) => (
            <Toast key={item.id} item={item} dismiss={dismiss} />
          ))}
        </div>
      </ToastContext.Provider>
    </ThemeContext.Provider>
  );
};
