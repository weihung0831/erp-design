import { Head } from '@inertiajs/react';
import { useState } from 'react';
import {
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    NavBody,
    Navbar,
    NavItems,
} from '@/components/ui/resizable-navbar';
import BackToTop from '@/components/back-to-top';
import ThemeToggle from '@/components/theme-toggle';
import CtaSection from '@/components/welcome/cta-section';
import DashboardPreview from '@/components/welcome/dashboard-preview';
import FaqSection from '@/components/welcome/faq-section';
import FeatureBento from '@/components/welcome/feature-bento';
import LogoCloud from '@/components/welcome/logo-cloud';
import ModuleHubHero, { HubGlyph } from '@/components/welcome/module-hub-hero';
import { PillLink } from '@/components/welcome/pill-link';
import PricingSection from '@/components/welcome/pricing-section';
import SiteFooter from '@/components/welcome/site-footer';
import StatsSection from '@/components/welcome/stats-section';
import WorkflowSteps from '@/components/welcome/workflow-steps';

const navItems = [
    { name: '平台特色', link: '#features' },
    { name: '功能模組', link: '#modules' },
    { name: '導入流程', link: '#workflow' },
    { name: '方案價格', link: '#pricing' },
    { name: '常見問題', link: '#faq' },
];

function Logo() {
    return (
        <a href="#top" className="relative z-20 flex items-center gap-2 px-2 py-1">
            <span className="grid size-7 place-items-center rounded-lg bg-linear-to-b from-[#6d8bff] to-(--hub-blue)">
                <HubGlyph className="size-4" />
            </span>
            <span className="text-sm font-medium text-(--hub-ink)">ERP Design</span>
        </a>
    );
}

export default function Welcome() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="首頁" />
            <div className="relative min-h-dvh w-full bg-(--hub-paper) text-(--hub-ink) antialiased [--hub-blue:#4b6bfb] [--hub-card:#ffffff] [--hub-ink:#1a1a1a] [--hub-line:#cfcfc8] [--hub-muted:#5f5f5b] [--hub-paper:#fafaf7] selection:bg-(--hub-blue)/15 dark:[--hub-card:#1c1c1a] dark:[--hub-ink:#f4f4f0] dark:[--hub-line:#3f3f3a] dark:[--hub-muted:#a8a89f] dark:[--hub-paper:#0e0e0c]">
                <Navbar className="fixed top-4">
                    <NavBody>
                        <Logo />
                        <NavItems items={navItems} />
                        <div className="relative z-20 flex items-center gap-2">
                            <ThemeToggle />
                            <PillLink href="#features" variant="solid">
                                開始使用
                            </PillLink>
                        </div>
                    </NavBody>
                    <MobileNav>
                        <MobileNavHeader>
                            <Logo />
                            <div className="flex items-center gap-3">
                                <ThemeToggle />
                                <MobileNavToggle
                                    isOpen={isMobileMenuOpen}
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                />
                            </div>
                        </MobileNavHeader>
                        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
                            {navItems.map((item) => (
                                <a
                                    key={item.link}
                                    href={item.link}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-neutral-600 dark:text-neutral-300"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <PillLink
                                href="#features"
                                variant="solid"
                                className="w-full"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                開始使用
                            </PillLink>
                        </MobileNavMenu>
                    </MobileNav>
                </Navbar>

                <main>
                    <ModuleHubHero />
                    <LogoCloud />
                    <DashboardPreview />
                    <StatsSection />
                    <FeatureBento />
                    <WorkflowSteps />
                    <PricingSection />
                    <FaqSection />
                    <CtaSection />
                </main>

                <SiteFooter />
                <BackToTop />
            </div>
        </>
    );
}
