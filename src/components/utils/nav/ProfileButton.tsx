import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaGoogle } from "react-icons/fa";
import { FiLogOut, FiBookOpen } from "react-icons/fi";
import { auth } from "../../../firebase.config";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import Router from "next/router";
import { useEffect } from "react";
import { Avatar, Button } from "../../ui";
import { useToast } from "../../ui/Providers";

export const LoginButton = ({ label = "Sign in" }: { label?: string }) => {
  const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);
  const [user, loadingUser] = useAuthState(auth);
  const toast = useToast();
  useEffect(() => {
    if (
      error &&
      error.code !== "auth/popup-closed-by-user" &&
      error.code !== "auth/cancelled-popup-request"
    )
      toast({
        title: "Could not sign in",
        description: "Please try again.",
        status: "error",
      });
  }, [error, toast]);
  if (user)
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label="Open account menu"
            className="rounded-full"
          >
            <Avatar name={user.displayName} src={user.photoURL} size="sm" />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={10}
            className="z-50 min-w-[190px] rounded-lg border border-line bg-panel p-1 shadow-lg"
          >
            <DropdownMenu.Label className="max-w-[220px] truncate px-3 py-2 text-xs text-muted">
              {user.displayName || user.email}
            </DropdownMenu.Label>
            <DropdownMenu.Separator className="my-1 h-px bg-line" />
            <DropdownMenu.Item
              className="menu-item"
              onSelect={() => Router.push("/guide")}
            >
              <FiBookOpen />
              Guide
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="menu-item"
              onSelect={async () => {
                try {
                  await auth.signOut();
                  await Router.push("/");
                } catch {
                  toast({ title: "Could not sign out", status: "error" });
                }
              }}
            >
              <FiLogOut />
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  return (
    <Button
      variant="secondary"
      small
      loading={loading || loadingUser}
      onClick={() => signInWithGoogle()}
    >
      <FaGoogle size={11} />
      {label}
    </Button>
  );
};
