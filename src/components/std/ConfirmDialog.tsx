import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Button } from "../ui";
import { useRef } from "react";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  loading = false,
  confirmLabel = "Delete",
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  loading?: boolean;
  confirmLabel?: string;
}) => {
  const previousFocus = useRef<HTMLElement | null>(null);
  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !loading) onClose();
      }}
    >
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-40 bg-black/50" />
        <AlertDialog.Content
          onOpenAutoFocus={() => {
            previousFocus.current = document.activeElement as HTMLElement;
          }}
          onCloseAutoFocus={(event) => {
            if (previousFocus.current?.isConnected) {
              event.preventDefault();
              previousFocus.current.focus();
            }
          }}
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%_-_2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border border-line bg-panel p-6 shadow-xl"
        >
          <AlertDialog.Title className="font-display text-2xl">
            {title}
          </AlertDialog.Title>
          <AlertDialog.Description className="mt-3 text-xs leading-relaxed text-muted">
            {description}
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <Button variant="secondary" disabled={loading}>
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <Button variant="danger" onClick={onConfirm} loading={loading}>
              {confirmLabel}
            </Button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
