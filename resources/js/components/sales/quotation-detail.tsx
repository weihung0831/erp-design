import { Link } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import type { Quotation, QuotationValidity } from '@/components/sales/quotations-data';
import { isEditableQuotation, QUOTATION_STATUS_STYLES, quotationAmount, quotationValidity } from '@/components/sales/quotations-data';
import {
    afterSuccess,
    CurrencyHeadline,
    DetailCard,
    DetailFields,
    DetailNote,
    LineItemsTable,
    PRIMARY_BUTTON_CLASS,
    SECONDARY_BUTTON_CLASS,
    STATUS_BADGE_CLASS,
    StatusDot,
} from '@/components/sales/sales-shared';
import { DetailActions } from '@/components/sales/sales-form';
import { Button as StatefulButton } from '@/components/ui/stateful-button';
import { cn } from '@/lib/utils';

export const VALIDITY_BADGES: Record<Exclude<QuotationValidity, 'valid'>, { label: string; className: string }> = {
    expiring: { label: '即將到期', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400' },
    expired: { label: '已過期', className: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
};

export default function QuotationDetail({
    quotation,
    onClose,
    onUpdate,
    onConvert,
    onEdit,
    onDelete,
}: {
    quotation: Quotation;
    onClose: () => void;
    onUpdate: (id: string, changes: Partial<Quotation>) => void;
    onConvert: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    const validity = quotationValidity(quotation);
    const validityBadge = validity === 'valid' ? null : VALIDITY_BADGES[validity];

    const extendValidity = () => {
        const extended = new Date(Date.parse(quotation.validUntil) + 14 * 86_400_000);
        onUpdate(quotation.id, { validUntil: extended.toISOString().slice(0, 10) });
    };

    return (
        <DetailCard
            layoutPrefix="quotation"
            id={quotation.id}
            icon={FileText}
            title={quotation.customer}
            badges={
                <>
                    <StatusDot label={quotation.status} style={QUOTATION_STATUS_STYLES[quotation.status]} />
                    {validityBadge && <span className={cn(STATUS_BADGE_CLASS, validityBadge.className)}>{validityBadge.label}</span>}
                </>
            }
            headline={{ label: '報價金額（未稅）', value: <CurrencyHeadline amount={quotationAmount(quotation)} /> }}
            onClose={onClose}
            footer={
                <>
                    {isEditableQuotation(quotation) && <DetailActions onEdit={() => onEdit(quotation.id)} onDelete={() => onDelete(quotation.id)} />}
                    {quotation.status === '已送出' && (
                        <button
                            type="button"
                            onClick={() => onUpdate(quotation.id, { status: '已婉拒' })}
                            className={cn(
                                SECONDARY_BUTTON_CLASS,
                                'bg-white text-rose-600 ring-1 ring-rose-200 hover:bg-rose-50 dark:bg-transparent dark:text-rose-300 dark:ring-rose-500/30 dark:hover:bg-rose-500/10',
                            )}
                        >
                            客戶婉拒
                        </button>
                    )}
                    {validity === 'expired' ? (
                        <button
                            type="button"
                            onClick={extendValidity}
                            className={cn(
                                SECONDARY_BUTTON_CLASS,
                                'bg-white text-neutral-700 ring-1 ring-black/10 hover:bg-neutral-50 dark:bg-transparent dark:text-neutral-200 dark:ring-white/15 dark:hover:bg-white/5',
                            )}
                        >
                            展延 14 天
                        </button>
                    ) : (
                        <>
                            {quotation.status === '草稿' && (
                                <StatefulButton
                                    key="send"
                                    onClick={afterSuccess(() => onUpdate(quotation.id, { status: '已送出' }))}
                                    className={PRIMARY_BUTTON_CLASS}
                                >
                                    送出報價
                                </StatefulButton>
                            )}
                            {quotation.status === '已送出' && (
                                <StatefulButton
                                    key="accept"
                                    onClick={afterSuccess(() => onUpdate(quotation.id, { status: '已接受' }))}
                                    className={PRIMARY_BUTTON_CLASS}
                                >
                                    客戶接受
                                </StatefulButton>
                            )}
                        </>
                    )}
                    {quotation.status === '已接受' &&
                        (quotation.convertedOrderId ? (
                            <Link
                                href="/dashboard/sales/orders"
                                className={cn(
                                    SECONDARY_BUTTON_CLASS,
                                    'bg-linear-to-b from-sky-400 to-(--admin-accent) text-white shadow-sm shadow-(--admin-accent)/30',
                                )}
                            >
                                查看銷貨訂單 →
                            </Link>
                        ) : (
                            <StatefulButton key="convert" onClick={afterSuccess(() => onConvert(quotation.id))} className={PRIMARY_BUTTON_CLASS}>
                                轉銷貨訂單
                            </StatefulButton>
                        ))}
                </>
            }
        >
            <DetailFields
                fields={[
                    { label: '聯絡人', value: quotation.contact },
                    { label: '業務', value: quotation.salesperson },
                    { label: '報價日期', value: quotation.issuedDate },
                    { label: '有效期限', value: quotation.validUntil, isAlert: validity !== 'valid' },
                    { label: '轉入訂單', value: quotation.convertedOrderId ?? '—', isWide: true },
                ]}
            />
            {quotation.note && <DetailNote>{quotation.note}</DetailNote>}
            <LineItemsTable lineItems={quotation.lineItems} />
        </DetailCard>
    );
}
