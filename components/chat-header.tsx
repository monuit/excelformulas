"use client";

import { BugIcon, CodeIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo } from "react";
import { useWindowSize } from "usehooks-ts";
import { KofiButton } from "@/components/kofi-button";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "./ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const router = useRouter();
  const { open } = useSidebar();

  const { width: windowWidth } = useWindowSize();

  return (
    <header className="sticky top-0 z-10 border-b bg-background">
      <div className="flex items-center gap-2 px-4 py-3 md:px-6">
        <SidebarToggle />

        {(!open || windowWidth < 768) && (
          <Button
            className="order-2 ml-auto h-9 px-3 md:order-1 md:ml-0"
            onClick={() => {
              router.push("/chat");
              router.refresh();
            }}
            size="sm"
            variant="outline"
          >
            <PlusIcon className="size-4" />
            <span className="md:sr-only">New Chat</span>
          </Button>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Link href="/generators">
            <Button className="hidden md:flex" size="sm" variant="ghost">
              <CodeIcon className="mr-2 size-4" />
              Generators
            </Button>
          </Link>
          <Link href="/debug">
            <Button className="hidden md:flex" size="sm" variant="ghost">
              <BugIcon className="mr-2 size-4" />
              Debug
            </Button>
          </Link>
          <KofiButton />
          {!isReadonly && (
            <VisibilitySelector
              chatId={chatId}
              className="order-1"
              selectedVisibilityType={selectedVisibilityType}
            />
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
