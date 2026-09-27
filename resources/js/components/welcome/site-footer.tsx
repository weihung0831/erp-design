import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone } from "lucide-react";
import { GridLineHorizontal } from "@/components/welcome/dashed-grid-line";
import { HubGlyph } from "@/components/welcome/module-hub-hero";

const pages = [
  { title: "平台特色", href: "#features" },
  { title: "功能模組", href: "#modules" },
  { title: "導入流程", href: "#workflow" },
  { title: "常見問題", href: "#faq" },
  { title: "隱私權政策", href: "#" },
  { title: "服務條款", href: "#" },
];

const contacts: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "寄信給我們", href: "#", icon: Mail },
  { label: "客服專線", href: "#", icon: Phone },
  { label: "公司地址", href: "#", icon: MapPin },
];

export default function SiteFooter() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-black/6 bg-(--hub-card) px-8 py-20 dark:border-white/8">
      <div className="mx-auto max-w-6xl text-sm text-(--hub-muted) md:px-8">
        <div className="relative flex w-full flex-col items-center justify-center">
          <a href="#top" className="mb-6 flex items-center gap-2 px-2 py-1">
            <span className="grid size-7 place-items-center rounded-lg bg-linear-to-b from-[#6d8bff] to-(--hub-blue)">
              <HubGlyph className="size-4" />
            </span>
            <span className="font-medium text-(--hub-ink)">ERP Design</span>
          </a>

          <ul className="flex list-none flex-wrap justify-center gap-x-6 gap-y-3">
            {pages.map((page) => (
              <li key={page.title}>
                <a
                  className="transition-colors hover:text-(--hub-ink)"
                  href={page.href}
                >
                  {page.title}
                </a>
              </li>
            ))}
          </ul>

          <GridLineHorizontal
            className="relative left-auto mx-auto mt-8"
            offset="0px"
          />
        </div>
        <div className="mt-8 flex w-full flex-col items-center justify-between gap-6 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} ERP Design. All rights reserved.</p>
          <div className="flex gap-4">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                aria-label={contact.label}
                className="transition-colors hover:text-(--hub-ink)"
              >
                <contact.icon className="size-5" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
