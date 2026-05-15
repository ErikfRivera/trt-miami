"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

export type NavLeaf = {
  readonly href: string;
  readonly label: string;
};

export type NavGroup = {
  readonly label: string;
  readonly href?: string;
  readonly children?: ReadonlyArray<NavLeaf>;
};

type NavMenuProps = {
  readonly items: ReadonlyArray<NavGroup>;
  readonly localeHref: string;
  readonly localeLabel: string;
};

export function NavMenu({ items, localeHref, localeLabel }: NavMenuProps) {
  return (
    <>
      <DesktopNav items={items} localeHref={localeHref} localeLabel={localeLabel} />
      <MobileNav items={items} localeHref={localeHref} localeLabel={localeLabel} />
    </>
  );
}

function DesktopNav({ items, localeHref, localeLabel }: NavMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenIndex(null), 120);
  }, [cancelClose]);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (!navRef.current) return;
      if (e.target instanceof Node && !navRef.current.contains(e.target)) {
        setOpenIndex(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => cancelClose, [cancelClose]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className="ml-auto hidden flex-1 justify-end lg:flex"
    >
      <ul className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-zinc-600 dark:text-zinc-300">
        {items.map((item, index) => {
          const hasChildren = !!item.children && item.children.length > 0;
          if (!hasChildren) {
            return (
              <li key={item.label}>
                <Link
                  href={item.href ?? "#"}
                  className="inline-flex items-center px-2 py-1 underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-100"
                >
                  {item.label}
                </Link>
              </li>
            );
          }
          return (
            <DesktopNavItem
              key={item.label}
              item={item}
              isOpen={openIndex === index}
              onOpen={() => {
                cancelClose();
                setOpenIndex(index);
              }}
              onScheduleClose={scheduleClose}
              onCloseImmediate={() => {
                cancelClose();
                setOpenIndex(null);
              }}
            />
          );
        })}
        <li>
          <Link
            href={localeHref}
            hrefLang="es"
            className="inline-flex items-center px-2 py-1 underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-100"
          >
            {localeLabel}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

type DesktopNavItemProps = {
  readonly item: NavGroup;
  readonly isOpen: boolean;
  readonly onOpen: () => void;
  readonly onScheduleClose: () => void;
  readonly onCloseImmediate: () => void;
};

function DesktopNavItem({
  item,
  isOpen,
  onOpen,
  onScheduleClose,
  onCloseImmediate,
}: DesktopNavItemProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const submenuId = useId();

  const focusItem = useCallback((idx: number) => {
    const list = listRef.current;
    if (!list) return;
    const links = list.querySelectorAll<HTMLAnchorElement>("a");
    if (links.length === 0) return;
    const i = (idx + links.length) % links.length;
    links[i]?.focus();
  }, []);

  function onButtonKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
      requestAnimationFrame(() => focusItem(0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onOpen();
      requestAnimationFrame(() => focusItem(-1));
    } else if (e.key === "Escape") {
      onCloseImmediate();
    }
  }

  function onSubmenuKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const list = listRef.current;
    if (!list) return;
    const links = Array.from(list.querySelectorAll<HTMLAnchorElement>("a"));
    const currentIndex = links.findIndex((el) => el === document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      focusItem(currentIndex + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      focusItem(currentIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      focusItem(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusItem(links.length - 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCloseImmediate();
      buttonRef.current?.focus();
    } else if (e.key === "Tab") {
      onCloseImmediate();
    }
  }

  return (
    <li
      className="relative"
      onPointerEnter={onOpen}
      onPointerLeave={onScheduleClose}
      onFocus={onOpen}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          onScheduleClose();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={submenuId}
        onClick={() => (isOpen ? onCloseImmediate() : onOpen())}
        onKeyDown={onButtonKeyDown}
        className="inline-flex items-center gap-1 px-2 py-1 underline-offset-4 hover:text-zinc-900 hover:underline focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:hover:text-zinc-50 dark:focus-visible:outline-zinc-100"
      >
        {item.label}
        <Chevron open={isOpen} />
      </button>
      <ul
        ref={listRef}
        id={submenuId}
        role="menu"
        aria-label={item.label}
        onKeyDown={onSubmenuKeyDown}
        className={
          (isOpen ? "block" : "hidden") +
          " absolute right-0 top-full z-50 mt-2 min-w-56 rounded-md border border-zinc-200 bg-white p-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
        }
      >
        {item.href ? (
          <li role="none">
            <Link
              role="menuitem"
              href={item.href}
              className="block rounded px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:outline-none dark:text-zinc-50 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900"
            >
              {item.label} overview
            </Link>
          </li>
        ) : null}
        {item.children?.map((child) => (
          <li key={child.href} role="none">
            <Link
              role="menuitem"
              href={child.href}
              className="block rounded px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 focus-visible:bg-zinc-100 focus-visible:outline-none dark:text-zinc-300 dark:hover:bg-zinc-900 dark:focus-visible:bg-zinc-900"
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function MobileNav({ items, localeHref, localeLabel }: NavMenuProps) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const firstItemRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  useEffect(() => {
    setOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="ml-auto lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-primary-nav"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 text-zinc-700 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:focus-visible:outline-zinc-100"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open ? (
        <div
          id="mobile-primary-nav"
          className="fixed inset-0 top-[var(--mobile-nav-offset,3.5rem)] z-40 overflow-y-auto bg-white pb-32 dark:bg-zinc-950"
        >
          <nav aria-label="Primary mobile" className="px-4 py-4 sm:px-6">
            <ul className="flex flex-col gap-1">
              {items.map((item, idx) => {
                const hasChildren = !!item.children && item.children.length > 0;
                const isExpanded = expanded === item.label;
                if (!hasChildren) {
                  return (
                    <li key={item.label}>
                      <Link
                        ref={idx === 0 ? (firstItemRef as React.Ref<HTMLAnchorElement>) : undefined}
                        href={item.href ?? "#"}
                        className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900"
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                }
                const panelId = `mobile-submenu-${idx}`;
                return (
                  <li key={item.label}>
                    <button
                      type="button"
                      ref={idx === 0 ? (firstItemRef as React.Ref<HTMLButtonElement>) : undefined}
                      aria-expanded={isExpanded}
                      aria-controls={panelId}
                      onClick={() => setExpanded(isExpanded ? null : item.label)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-medium text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900"
                    >
                      <span>{item.label}</span>
                      <Chevron open={isExpanded} />
                    </button>
                    {isExpanded ? (
                      <ul id={panelId} className="ml-2 mt-1 flex flex-col border-l border-zinc-200 pl-3 dark:border-zinc-800">
                        {item.href ? (
                          <li>
                            <Link
                              href={item.href}
                              className="block rounded-md px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900"
                            >
                              {item.label} overview
                            </Link>
                          </li>
                        ) : null}
                        {item.children?.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
              <li>
                <Link
                  href={localeHref}
                  hrefLang="es"
                  className="flex items-center justify-between rounded-md px-3 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-900"
                >
                  {localeLabel}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className={"transition-transform " + (open ? "rotate-180" : "rotate-0")}
    >
      <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <path d="M3 5h12M3 9h12M3 13h12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
      <path d="M4 4l10 10M14 4L4 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}
