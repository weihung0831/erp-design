"use client";

import { Link } from "@inertiajs/react";
import { ChevronDown, ChevronLeft, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { createContext, useContext, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

export interface SidebarLinkItem {
  label: string;
  href?: string;
  icon: React.ReactNode;
  isActive?: boolean;
  badge?: string | number;
  tone?: string;
  iconClassName?: string;
}

export interface SidebarGroupItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  tone?: string;
  accent?: string;
  links: SidebarLinkItem[];
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hovered: string | null;
  setHovered: React.Dispatch<React.SetStateAction<string | null>>;
  highlightId: string;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

function readStored<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value === null ? fallback : (JSON.parse(value) as T);
  } catch {
    return fallback;
  }
}

function writeStored(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

export function usePersistentState<T>(key: string, fallback: T) {
  const [state, setState] = useState<T>(fallback);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setState(readStored(key, fallback));
    setIsHydrated(true);
  }, [key]);

  useEffect(() => {
    if (isHydrated) {
      writeStored(key, state);
    }
  }, [key, state, isHydrated]);

  return [state, setState] as const;
}

export const SidebarProvider = ({
  children,
  storageKey = "erp-sidebar-open",
}: {
  children: React.ReactNode;
  storageKey?: string;
}) => {
  const [open, setOpen] = usePersistentState(storageKey, true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const highlightId = useId();

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, mobileOpen, setMobileOpen, hovered, setHovered, highlightId }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const SidebarBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <DesktopSidebar className={className}>{children}</DesktopSidebar>
      <MobileSidebar className={className}>{children}</MobileSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const { open, setOpen, setHovered } = useSidebar();
  return (
    <motion.aside
      className={cn(
        "group/sidebar-btn relative hidden h-dvh shrink-0 flex-col px-3 py-4 md:flex",
        className,
      )}
      initial={false}
      animate={{ width: open ? 264 : 72 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseLeave={() => setHovered(null)}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "收合側邊欄" : "展開側邊欄"}
        className={cn(
          "absolute top-6 -right-2.5 z-40 flex size-5 cursor-pointer items-center justify-center rounded-sm border border-neutral-200 bg-white opacity-0 shadow-sm transition duration-200 group-hover/sidebar-btn:opacity-100 focus-visible:opacity-100 dark:border-neutral-700 dark:bg-neutral-900",
          open ? "rotate-0" : "rotate-180",
        )}
      >
        <ChevronLeft className="size-3.5 text-neutral-700 dark:text-neutral-200" />
      </button>
      {children}
    </motion.aside>
  );
};

export const MobileSidebar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const context = useSidebar();
  const { mobileOpen, setMobileOpen } = context;

  return (
    <AnimatePresence>
      {mobileOpen && (
        <div className="fixed inset-0 z-100 md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-(--admin-canvas) px-3 py-4 dark:bg-neutral-950",
              className,
            )}
          >
            <button
              type="button"
              aria-label="關閉選單"
              className="absolute top-4 right-4 z-50 grid size-8 place-items-center rounded-md text-neutral-800 hover:bg-neutral-200 dark:text-neutral-200 dark:hover:bg-neutral-800"
              onClick={() => setMobileOpen(false)}
            >
              <X className="size-4.5" />
            </button>
            <SidebarContext.Provider value={{ ...context, open: true, highlightId: `${context.highlightId}-mobile` }}>
              {children}
            </SidebarContext.Provider>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export const SidebarLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open } = useSidebar();
  return (
    <motion.span
      initial={false}
      animate={{
        display: open ? "inline-block" : "none",
        opacity: open ? 1 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn("m-0! p-0! whitespace-pre", className)}
    >
      {children}
    </motion.span>
  );
};

const ToneChip = ({ tone, children }: { tone: string; children: React.ReactNode }) => {
  return (
    <span
      className={cn(
        "-my-0.5 grid size-6 shrink-0 place-items-center rounded-md bg-linear-to-b text-white shadow-sm ring-1 ring-white/20 ring-inset transition-transform duration-200 group-hover/sidebar:scale-105 [&_svg]:size-3.5",
        tone,
      )}
    >
      {children}
    </span>
  );
};

const HoverHighlight = ({ id }: { id: string }) => {
  const { hovered, highlightId } = useSidebar();
  return (
    <AnimatePresence>
      {hovered === id && (
        <motion.span
          layoutId={highlightId}
          className="absolute inset-0 z-0 rounded-lg bg-(--admin-accent)/[0.13] dark:bg-white/[0.08]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.1 } }}
        />
      )}
    </AnimatePresence>
  );
};

export const SidebarLink = ({
  link,
  className,
  nested = false,
}: {
  link: SidebarLinkItem;
  className?: string;
  nested?: boolean;
}) => {
  const { open, setMobileOpen, setHovered } = useSidebar();
  const id = `link-${link.label}`;
  const classes = cn(
    "group/sidebar relative flex items-center justify-start rounded-lg px-2.5 py-2 text-sm",
    nested && "py-1.5",
    !link.href && "cursor-default",
    className,
  );
  const content = (
    <>
      <HoverHighlight id={id} />
      {link.isActive && (
        <span className="absolute inset-0 z-0 rounded-lg bg-white shadow-[0_1px_3px_rgba(75,107,251,0.12)] ring-1 ring-(--admin-accent)/12 dark:bg-white/[0.06] dark:shadow-none dark:ring-white/8">
          <span className="absolute inset-y-2 -left-3 w-1 rounded-r-full bg-linear-to-b from-[#6d8bff] to-(--admin-accent) shadow-[0_0_12px_2px] shadow-(--admin-accent)/50" />
        </span>
      )}
      <span className="relative z-10 flex w-full items-center gap-2.5">
        {link.tone ? (
          <ToneChip tone={link.tone}>{link.icon}</ToneChip>
        ) : (
          <span
            className={cn(
              "grid size-5 shrink-0 place-items-center transition-colors [&_svg]:size-4",
              link.iconClassName ??
                (link.isActive
                  ? "text-(--admin-accent-ink)"
                  : "text-neutral-500 group-hover/sidebar:text-neutral-800 dark:text-neutral-400 dark:group-hover/sidebar:text-neutral-100"),
            )}
          >
            {link.icon}
          </span>
        )}
        <SidebarLabel
          className={cn(
            "flex-1 text-left transition duration-150 group-hover/sidebar:translate-x-1",
            link.isActive
              ? "font-medium text-neutral-900 dark:text-white"
              : "text-neutral-600 group-hover/sidebar:text-neutral-900 dark:text-neutral-300 dark:group-hover/sidebar:text-white",
          )}
        >
          {link.label}
        </SidebarLabel>
        {link.badge !== undefined && open && (
          <span className="rounded-full bg-linear-to-b from-[#6d8bff] to-(--admin-accent) px-1.5 text-[11px] leading-4.5 font-medium text-white tabular-nums shadow-sm shadow-(--admin-accent)/40">
            {link.badge}
          </span>
        )}
      </span>
      {link.badge !== undefined && !open && (
        <span className="absolute top-1.5 right-1.5 z-10 size-2 rounded-full bg-(--admin-accent) ring-2 ring-(--admin-canvas) dark:ring-neutral-950" />
      )}
    </>
  );

  const hoverHandlers = {
    onMouseEnter: () => setHovered(id),
    onMouseLeave: () => setHovered(null),
  };

  if (!link.href) {
    return (
      <span role="link" aria-disabled="true" title={`${link.label}（規劃中）`} className={classes} {...hoverHandlers}>
        {content}
      </span>
    );
  }

  return (
    <Link
      href={link.href}
      title={open ? undefined : link.label}
      aria-current={link.isActive ? "page" : undefined}
      onClick={() => setMobileOpen(false)}
      className={classes}
      {...hoverHandlers}
    >
      {content}
    </Link>
  );
};

export const SidebarGroupSection = ({
  group,
  expanded,
  onToggle,
}: {
  group: SidebarGroupItem;
  expanded: boolean;
  onToggle: () => void;
}) => {
  const { open, setOpen, setHovered } = useSidebar();
  const id = `group-${group.id}`;

  const handleClick = () => {
    if (open) {
      onToggle();
      return;
    }
    setOpen(true);
    if (!expanded) {
      onToggle();
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHovered(id)}
        onMouseLeave={() => setHovered(null)}
        aria-expanded={expanded}
        title={open ? undefined : group.label}
        className="group/sidebar relative flex w-full cursor-pointer items-center rounded-lg px-2.5 py-2 text-sm"
      >
        <HoverHighlight id={id} />
        <span
          className={cn(
            "relative z-10 flex w-full items-center gap-2.5",
            expanded
              ? "font-medium text-neutral-900 dark:text-white"
              : "text-neutral-600 group-hover/sidebar:text-neutral-900 dark:text-neutral-300 dark:group-hover/sidebar:text-white",
          )}
        >
          {group.tone ? (
            <ToneChip tone={group.tone}>{group.icon}</ToneChip>
          ) : (
            <span className="grid size-5 shrink-0 place-items-center text-neutral-500 group-hover/sidebar:text-neutral-800 dark:text-neutral-400 dark:group-hover/sidebar:text-neutral-100 [&_svg]:size-4.5">
              {group.icon}
            </span>
          )}
          <SidebarLabel className="flex-1 text-left transition duration-150 group-hover/sidebar:translate-x-1">
            {group.label}
          </SidebarLabel>
          <SidebarLabel>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-neutral-400 transition-transform duration-200",
                expanded && "rotate-180",
              )}
            />
          </SidebarLabel>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {expanded && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="relative mt-0.5 ml-[1.1rem] flex flex-col gap-0.5 pl-2">
              <span className="absolute inset-y-1 left-0.5 w-px bg-linear-to-b from-neutral-300 via-neutral-200 to-transparent dark:from-neutral-700 dark:via-neutral-800" />
              {group.links.map((link) => (
                <SidebarLink key={link.label} link={{ ...link, iconClassName: link.iconClassName ?? group.accent }} nested />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
