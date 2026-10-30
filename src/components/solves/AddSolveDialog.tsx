import { FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button, Dialog, DialogActions, Field, Input } from "../ui";
import { useToast } from "../ui/Providers";

export const AddSolveDialog = ({
  onSave,
}: {
  onSave: (minutes: number, seconds: number) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState("0"),
    [seconds, setSeconds] = useState("");
  const [saving, setSaving] = useState(false);
  const toast = useToast();
  const valid =
    minutes !== "" &&
    seconds !== "" &&
    Number.isInteger(Number(minutes)) &&
    Number.isInteger(Number(seconds)) &&
    Number(minutes) >= 0 &&
    Number(minutes) < 60 &&
    Number(seconds) >= 0 &&
    Number(seconds) < 60 &&
    Number(minutes) * 60 + Number(seconds) > 0;
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid || saving) return;
    setSaving(true);
    try {
      await onSave(Number(minutes), Number(seconds));
      setMinutes("0");
      setSeconds("");
      setOpen(false);
      toast({ title: "Solve added", status: "success" });
    } catch {
      toast({
        title: "Could not add solve",
        description: "Please try again.",
        status: "error",
      });
    } finally {
      setSaving(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="Add solve"
      trigger={
        <button
          type="button"
          className="flex h-24 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-line text-muted transition-colors hover:border-[#bba34f] hover:bg-soft hover:text-ink"
        >
          <FiPlus size={18} />
          <span className="text-xs">Add solve</span>
        </button>
      }
    >
      <form onSubmit={submit}>
        <div className="grid grid-cols-2 gap-4">
          <Field id="solve-minutes" label="Minutes">
            <Input
              id="solve-minutes"
              type="number"
              inputMode="numeric"
              min={0}
              max={59}
              step={1}
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
          </Field>
          <Field id="solve-seconds" label="Seconds" required>
            <Input
              id="solve-seconds"
              required
              type="number"
              inputMode="numeric"
              min={0}
              max={59}
              step={1}
              placeholder="e.g. 15"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            />
          </Field>
        </div>
        <p className="mt-3 text-[11px] text-muted">
          1 second to 59 minutes, 59 seconds.
        </p>
        <DialogActions>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" disabled={!valid} loading={saving}>
            Add solve
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
