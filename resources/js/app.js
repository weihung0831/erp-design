const bootErpDashboard = () => {
    const sidebar = document.querySelector('#erp-sidebar');
    const sidebarToggle = document.querySelector('#sidebar-toggle');
    const sidebarOverlay = document.querySelector('#sidebar-overlay');
    const notificationToggle = document.querySelector('#notification-toggle');
    const notificationPopover = document.querySelector('#notification-popover');
    const dateToggle = document.querySelector('#date-toggle');
    const datePopover = document.querySelector('#date-popover');
    const dateLabel = document.querySelector('#date-label');
    const toast = document.querySelector('#toast');
    const toastMessage = document.querySelector('#toast-message');
    let toastTimeout;

    const closePopover = (popover, toggle) => {
        if (!popover) {
            return;
        }

        popover.classList.add('hidden');
        toggle?.setAttribute('aria-expanded', 'false');
    };

    const openPopover = (popover, toggle) => {
        if (!popover) {
            return;
        }

        popover.classList.remove('hidden');
        toggle?.setAttribute('aria-expanded', 'true');
    };

    const closeAllPopovers = (except = null) => {
        [
            [notificationPopover, notificationToggle],
            [datePopover, dateToggle],
        ].forEach(([popover, toggle]) => {
            if (popover !== except) {
                closePopover(popover, toggle);
            }
        });
    };

    const setSidebar = (isOpen) => {
        sidebar?.classList.toggle('is-open', isOpen);
        sidebarOverlay?.classList.toggle('hidden', !isOpen);
        sidebarToggle?.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('overflow-hidden', isOpen);
    };

    sidebarToggle?.addEventListener('click', () => {
        setSidebar(!sidebar?.classList.contains('is-open'));
    });

    sidebarOverlay?.addEventListener('click', () => setSidebar(false));

    document.querySelectorAll('.sidebar-link').forEach((link) => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                setSidebar(false);
            }
        });
    });

    notificationToggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        const isHidden = notificationPopover?.classList.contains('hidden');
        closeAllPopovers(notificationPopover);

        if (isHidden) {
            openPopover(notificationPopover, notificationToggle);
        }
    });

    dateToggle?.addEventListener('click', (event) => {
        event.stopPropagation();
        const isHidden = datePopover?.classList.contains('hidden');
        closeAllPopovers(datePopover);

        if (isHidden) {
            openPopover(datePopover, dateToggle);
        }
    });

    document.querySelectorAll('[data-date-option]').forEach((option) => {
        option.addEventListener('click', () => {
            document.querySelectorAll('[data-date-option]').forEach((item) => {
                item.classList.remove('bg-[#eff7f3]', 'text-[#308d65]', 'font-semibold');
                item.classList.add('text-[#68758b]', 'font-medium');
            });

            option.classList.add('bg-[#eff7f3]', 'text-[#308d65]', 'font-semibold');
            option.classList.remove('text-[#68758b]', 'font-medium');
            dateLabel.textContent = option.textContent.trim();
            closePopover(datePopover, dateToggle);
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('#notification-popover, #notification-toggle')) {
            closePopover(notificationPopover, notificationToggle);
        }

        if (!event.target.closest('#date-popover, #date-toggle')) {
            closePopover(datePopover, dateToggle);
        }
    });

    const showToast = (message) => {
        if (!toast || !toastMessage) {
            return;
        }

        window.clearTimeout(toastTimeout);
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-2', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');
        });

        toastTimeout = window.setTimeout(() => {
            toast.classList.remove('translate-y-0', 'opacity-100');
            toast.classList.add('translate-y-2', 'opacity-0');
            window.setTimeout(() => toast.classList.add('hidden'), 300);
        }, 2600);
    };

    document.querySelectorAll('[data-toast]').forEach((element) => {
        element.addEventListener('click', () => showToast(element.dataset.toast));
    });

    document.querySelectorAll('[data-chart-range]').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('[data-chart-range]').forEach((item) => item.classList.remove('chart-range-active'));
            button.classList.add('chart-range-active');
            showToast(`已切換至${button.dataset.chartRange}視圖。`);
        });
    });

    const transactionRows = [...document.querySelectorAll('.transaction-row')];
    const transactionEmpty = document.querySelector('#transaction-empty');
    const globalSearch = document.querySelector('#global-search');
    let activeTransactionType = 'all';

    const updateTransactions = () => {
        const query = globalSearch?.value.trim().toLowerCase() ?? '';
        let visibleCount = 0;

        transactionRows.forEach((row) => {
            const matchesType = activeTransactionType === 'all' || row.dataset.type === activeTransactionType;
            const matchesSearch = !query || row.dataset.searchable.toLowerCase().includes(query);
            const isVisible = matchesType && matchesSearch;

            row.classList.toggle('hidden', !isVisible);
            visibleCount += isVisible ? 1 : 0;
        });

        transactionEmpty?.classList.toggle('hidden', visibleCount > 0);
    };

    globalSearch?.addEventListener('input', updateTransactions);

    document.querySelectorAll('[data-transaction-tab]').forEach((tab) => {
        tab.addEventListener('click', () => {
            activeTransactionType = tab.dataset.transactionTab;
            document.querySelectorAll('[data-transaction-tab]').forEach((item) => item.classList.remove('transaction-tab-active'));
            tab.classList.add('transaction-tab-active');
            updateTransactions();
        });
    });

    document.addEventListener('keydown', (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
            event.preventDefault();
            globalSearch?.focus();
        }

        if (event.key === 'Escape') {
            closeAllPopovers();
            setSidebar(false);
        }
    });

    const currentTime = document.querySelector('[data-current-time]');
    const updateCurrentTime = () => {
        if (!currentTime) {
            return;
        }

        currentTime.textContent = new Intl.DateTimeFormat('zh-TW', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(new Date()).replaceAll('-', '/');
    };

    updateCurrentTime();
    window.setInterval(updateCurrentTime, 60000);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootErpDashboard);
} else {
    bootErpDashboard();
}
