import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import {
  ButtonHTMLAttributes,
  forwardRef,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useState,
  useRef,
} from "react";
import { FiX } from "react-icons/fi";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
const buttonVariants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger",
};
export const buttonClass = (
  variant: ButtonVariant = "primary",
  small = false
) => `btn ${buttonVariants[variant]}${small ? " btn-small" : ""}`;
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  small?: boolean;
  loading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      small = false,
      loading = false,
      className = "",
      children,
      disabled,
      type = "button",
      ...props
    }: ButtonProps,
    ref
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={`${buttonClass(variant, small)} ${className}`}
        {...props}
      >
        {loading && <span className="spinner" aria-hidden="true" />}
        {children}
      </button>
    );
  }
);
export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input(
  { className = "", ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref
) {
  return <input ref={ref} className={`input ${className}`} {...props} />;
});
export const Field = ({
  id,
  label,
  required = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
}) => (
  <div>
    <label className="field-label" htmlFor={id}>
      {label}
      {required && (
        <span className="ml-1 text-muted" aria-hidden="true">
          *
        </span>
      )}
    </label>
    {children}
  </div>
);

export const Dialog = ({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  trigger?: ReactElement;
  children: ReactNode;
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <DialogPrimitive.Content
          ref={contentRef}
          onOpenAutoFocus={(event) => {
            previousFocus.current = document.activeElement as HTMLElement;
            const field = contentRef.current?.querySelector<HTMLElement>(
              "input, select, textarea"
            );
            if (field) {
              event.preventDefault();
              field.focus();
            }
          }}
          onCloseAutoFocus={(event) => {
            if (previousFocus.current?.isConnected) {
              event.preventDefault();
              previousFocus.current.focus();
            }
          }}
          className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100dvh-32px)] w-[calc(100%_-_2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-line bg-panel p-6 shadow-xl"
        >
          <DialogPrimitive.Title className="pr-6 font-display text-2xl">
            {title}
          </DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description className="mt-2 text-xs text-muted">
              {description}
            </DialogPrimitive.Description>
          ) : (
            <DialogPrimitive.Description className="sr-only">
              {title}
            </DialogPrimitive.Description>
          )}
          <DialogPrimitive.Close
            className="icon-btn absolute right-3 top-3"
            aria-label="Close dialog"
          >
            <FiX size={17} />
          </DialogPrimitive.Close>
          <div className="mt-5">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
export const DialogActions = ({ children }: { children: ReactNode }) => (
  <div className="mt-6 flex justify-end gap-2">{children}</div>
);
export const Tabs = ({
  tabs,
  label,
  defaultValue,
}: {
  tabs: { value: string; label: string; content: ReactNode }[];
  label: string;
  defaultValue?: string;
}) => (
  <TabsPrimitive.Root defaultValue={defaultValue || tabs[0].value}>
    <TabsPrimitive.List
      aria-label={label}
      className="mb-5 inline-flex max-w-full gap-1 overflow-x-auto rounded-md border border-line bg-soft p-1"
    >
      {tabs.map((tab) => (
        <TabsPrimitive.Trigger
          key={tab.value}
          value={tab.value}
          className="tab-trigger"
        >
          {tab.label}
        </TabsPrimitive.Trigger>
      ))}
    </TabsPrimitive.List>
    {tabs.map((tab) => (
      <TabsPrimitive.Content
        key={tab.value}
        value={tab.value}
        className="outline-none"
      >
        {tab.content}
      </TabsPrimitive.Content>
    ))}
  </TabsPrimitive.Root>
);
export const Avatar = ({
  name = "",
  src,
  size = "md",
}: {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
}) => {
  const [failedSrc, setFailedSrc] = useState<string>();
  const sizes = {
    xs: "h-5 w-5 text-[9px]",
    sm: "h-7 w-7 text-[10px]",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
  };
  const initials =
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part[0])
      .slice(0, 2)
      .join("") || "?";
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-soft font-medium text-muted ${sizes[size]}`}
      title={name}
    >
      {src && src !== failedSrc ? (
        // eslint-disable-next-line @next/next/no-img-element -- Avatar URLs are user-provided and rendered at a fixed, small size.
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setFailedSrc(src)}
        />
      ) : (
        <span aria-label={name}>{initials}</span>
      )}
    </span>
  );
};
export const Notice = ({
  children,
  error = false,
}: {
  children: ReactNode;
  error?: boolean;
}) => (
  <p
    role={error ? "alert" : undefined}
    className={`py-6 text-sm ${
      error ? "text-red-600 dark:text-red-300" : "text-muted"
    }`}
  >
    {children}
  </p>
);
