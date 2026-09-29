import { format, parseISO } from 'date-fns';
import type { LucideIcon } from 'lucide-react';
import { CalendarDays, Check, Pencil, Plus, Trash2, X } from 'lucide-react';
import { motion } from 'motion/react';
import type { FormEvent, ReactNode } from 'react';
import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { zhTW } from 'react-day-picker/locale';
import { formatCurrency } from '@/components/approvals/approvals-data';
import { ACETERNITY_SHADOW } from '@/components/dashboard/panel';
import { PRODUCT_CATALOG } from '@/components/sales/quotations-data';
import type { SalesOrderLineItem } from '@/components/sales/sales-orders-data';
import { CLOSE_BUTTON_CLASS, lineItemsTotal, SECONDARY_BUTTON_CLASS, useModalDialog } from '@/components/sales/sales-shared';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const FIELD_CLASS =
    'h-10 w-full rounded-xl bg-neutral-50 px-3 text-sm ring-1 ring-black/8 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-(--admin-accent) dark:bg-neutral-900 dark:ring-white/10';

export const TEXTAREA_CLASS =
    'resize-none rounded-xl bg-neutral-50 p-3 text-sm ring-1 ring-black/8 outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-(--admin-accent) dark:bg-neutral-900 dark:ring-white/10';

const PICKER_TRIGGER_CLASS = 'cursor-pointer transition hover:bg-neutral-100 hover:ring-black/15 dark:hover:bg-neutral-800 dark:hover:ring-white/20';

const POPOVER_CLASS =
    'z-[110] rounded-xl bg-white p-1 shadow-xl shadow-black/15 ring-black/10 dark:bg-neutral-900 dark:shadow-black/50 dark:ring-white/15';

const ROW_ACTION_CLASS =
    'grid size-8 cursor-pointer place-items-center rounded-full text-neutral-400 transition outline-none focus-visible:ring-2 focus-visible:ring-(--admin-accent)';

export function addDays(date: string, days: number): string {
    return new Date(Date.parse(date) + days * 86_400_000).toISOString().slice(0, 10);
}

/**
 * Dropdowns portal into the modal's full-screen layer (inside the admin layout, so theme variables apply)
 * and stay within the scrollable fields area, so they never cover the header or footer.
 */
const DropdownLayerContext = createContext<{ container: HTMLElement | null; boundary: HTMLElement | null }>({ container: null, boundary: null });

export function Field({ id, label, className, children }: { id: string; label: string; className?: string; children: ReactNode }) {
    return (
        <div className={cn('flex flex-col gap-1.5', className)}>
            <label htmlFor={id} className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                {label}
            </label>
            {children}
        </div>
    );
}

export type SelectOption = { value: string; label: string; isDisabled?: boolean };

export function FormSelect({
    id,
    value,
    onChange,
    options,
    placeholder,
    isRequired,
    isDisabled,
    ariaLabel,
}: {
    id: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    isRequired?: boolean;
    isDisabled?: boolean;
    ariaLabel?: string;
}) {
    const { container, boundary } = useContext(DropdownLayerContext);

    return (
        <Select value={value} onValueChange={onChange} required={isRequired} disabled={isDisabled}>
            <SelectTrigger
                id={id}
                aria-label={ariaLabel}
                className={cn(
                    FIELD_CLASS,
                    PICKER_TRIGGER_CLASS,
                    'justify-between border-0 pr-2.5 pl-3 data-placeholder:text-neutral-400 data-[size=default]:h-10',
                )}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent
                container={container}
                collisionBoundary={boundary}
                collisionPadding={8}
                position="popper"
                sideOffset={6}
                className={cn(POPOVER_CLASS, 'max-h-[min(18rem,var(--radix-select-content-available-height))]')}
            >
                {options.map((option) => (
                    <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.isDisabled}
                        className="cursor-pointer rounded-lg py-2 pl-2.5 transition-colors focus:bg-(--admin-accent)/10 focus:text-(--admin-accent-ink) data-[state=checked]:font-medium data-[state=checked]:text-(--admin-accent-ink)"
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

/** Calendar popover for a `yyyy-MM-dd` value; days before `minDate` cannot be picked. */
export function FormDatePicker({ id, value, onChange, minDate }: { id: string; value: string; onChange: (value: string) => void; minDate?: string }) {
    const { container, boundary } = useContext(DropdownLayerContext);
    const [isOpen, setIsOpen] = useState(false);
    const selected = parseISO(value);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger
                id={id}
                className={cn(
                    FIELD_CLASS,
                    PICKER_TRIGGER_CLASS,
                    'flex items-center justify-between gap-2 text-left tabular-nums data-[state=open]:ring-2 data-[state=open]:ring-(--admin-accent)',
                )}
            >
                {value}
                <CalendarDays className="size-4 shrink-0 text-neutral-400" />
            </PopoverTrigger>
            <PopoverContent
                container={container}
                collisionBoundary={boundary}
                collisionPadding={8}
                align="end"
                sideOffset={6}
                className={cn(POPOVER_CLASS, 'w-auto')}
            >
                <Calendar
                    mode="single"
                    locale={zhTW}
                    required
                    selected={selected}
                    defaultMonth={selected}
                    disabled={minDate ? { before: parseISO(minDate) } : undefined}
                    onSelect={(date) => {
                        onChange(format(date, 'yyyy-MM-dd'));
                        setIsOpen(false);
                    }}
                    className="[--cell-size:--spacing(8)] **:data-[selected-single=true]:bg-(--admin-accent) **:data-[selected-single=true]:text-white"
                />
            </PopoverContent>
        </Popover>
    );
}

export const EMPTY_LINE_ITEM: SalesOrderLineItem = { sku: '', name: '', quantity: 1, unitPrice: 0 };

/** Editable product lines priced from the catalog; each product can appear once. */
export function LineItemsEditor({
    idPrefix,
    lineItems,
    onChange,
}: {
    idPrefix: string;
    lineItems: SalesOrderLineItem[];
    onChange: (lineItems: SalesOrderLineItem[]) => void;
}) {
    const changeLine = (index: number, changes: Partial<SalesOrderLineItem>) =>
        onChange(lineItems.map((item, itemIndex) => (itemIndex === index ? { ...item, ...changes } : item)));
    const selectProduct = (index: number, sku: string) => {
        const product = PRODUCT_CATALOG.find((candidate) => candidate.sku === sku);
        changeLine(index, { sku, name: product?.name ?? '', unitPrice: product?.unitPrice ?? 0 });
    };

    return (
        <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">品項</legend>
            {lineItems.map((item, index) => (
                <div key={index} className="grid grid-cols-[1fr_5rem_6.5rem_2rem] items-center gap-2">
                    <FormSelect
                        id={`${idPrefix}-line-${index}-sku`}
                        ariaLabel={`第 ${index + 1} 項品項`}
                        isRequired
                        value={item.sku}
                        onChange={(sku) => selectProduct(index, sku)}
                        placeholder="請選擇品項"
                        options={PRODUCT_CATALOG.map((product) => ({
                            value: product.sku,
                            label: product.name,
                            isDisabled: product.sku !== item.sku && lineItems.some((line) => line.sku === product.sku),
                        }))}
                    />
                    <input
                        id={`${idPrefix}-line-${index}-quantity`}
                        aria-label={`第 ${index + 1} 項數量`}
                        type="number"
                        required
                        min={1}
                        value={item.quantity}
                        onChange={(event) => changeLine(index, { quantity: event.target.valueAsNumber || 0 })}
                        className={cn(FIELD_CLASS, 'tabular-nums')}
                    />
                    <input
                        id={`${idPrefix}-line-${index}-unit-price`}
                        aria-label={`第 ${index + 1} 項單價`}
                        type="number"
                        required
                        min={0}
                        value={item.unitPrice}
                        onChange={(event) => changeLine(index, { unitPrice: event.target.valueAsNumber || 0 })}
                        className={cn(FIELD_CLASS, 'tabular-nums')}
                    />
                    <button
                        type="button"
                        onClick={() => onChange(lineItems.filter((_, itemIndex) => itemIndex !== index))}
                        disabled={lineItems.length === 1}
                        aria-label={`移除第 ${index + 1} 項`}
                        className="grid size-8 cursor-pointer place-items-center rounded-full text-neutral-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-neutral-400 dark:hover:bg-rose-500/10"
                    >
                        <Trash2 className="size-4" />
                    </button>
                </div>
            ))}
            <div className="mt-1 flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => onChange([...lineItems, EMPTY_LINE_ITEM])}
                    disabled={lineItems.length >= PRODUCT_CATALOG.length}
                    className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-(--admin-accent-ink) transition hover:bg-(--admin-accent)/10 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Plus className="size-3.5" />
                    新增品項
                </button>
                <p className="text-sm">
                    <span className="mr-2 text-xs text-neutral-500 dark:text-neutral-400">合計（未稅）</span>
                    <span className="font-semibold tabular-nums">{formatCurrency(lineItemsTotal(lineItems))}</span>
                </p>
            </div>
        </fieldset>
    );
}

/** Create/edit form modal shared by the sales pages; `children` are the form fields. */
export function FormModal({
    titleId,
    title,
    icon: Icon,
    submitLabel,
    onClose,
    onSubmit,
    children,
}: {
    titleId: string;
    title: string;
    icon: LucideIcon;
    submitLabel: string;
    onClose: () => void;
    onSubmit: () => void;
    children: ReactNode;
}) {
    const cardRef = useRef<HTMLFormElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const [container, setContainer] = useState<HTMLDivElement | null>(null);
    const [boundary, setBoundary] = useState<HTMLDivElement | null>(null);
    useModalDialog(cardRef, closeButtonRef, onClose);

    const submit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit();
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm dark:bg-black/60"
            />
            <div ref={setContainer} className="fixed inset-0 z-[100] grid place-items-center p-4">
                <motion.form
                    ref={cardRef}
                    onSubmit={submit}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: 12 }}
                    className={cn(
                        'flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white dark:bg-neutral-950',
                        ACETERNITY_SHADOW,
                    )}
                >
                    <header className="flex items-center gap-4 border-b border-dashed border-neutral-200 px-5 py-4 md:px-6 dark:border-neutral-800">
                        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-linear-to-b from-sky-400 to-sky-600 text-white shadow-lg shadow-sky-500/30">
                            <Icon className="size-4.5" />
                        </span>
                        <h2 id={titleId} className="flex-1 truncate text-lg font-semibold tracking-tight text-neutral-900 dark:text-white">
                            {title}
                        </h2>
                        <button
                            ref={closeButtonRef}
                            type="button"
                            onClick={onClose}
                            aria-label="關閉"
                            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-neutral-500 ring-1 ring-black/5 transition hover:text-neutral-900 hover:ring-black/15 dark:text-neutral-400 dark:ring-white/10 dark:hover:text-white"
                        >
                            <X className="size-4" />
                        </button>
                    </header>

                    <DropdownLayerContext.Provider value={{ container, boundary }}>
                        <div ref={setBoundary} className="flex flex-col gap-5 overflow-y-auto px-5 py-5 md:px-6">
                            {children}
                        </div>
                    </DropdownLayerContext.Provider>

                    <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-neutral-200 bg-neutral-50/80 px-5 py-4 md:px-6 dark:border-neutral-800 dark:bg-neutral-900/60">
                        <button type="button" onClick={onClose} className={CLOSE_BUTTON_CLASS}>
                            取消
                        </button>
                        <button
                            type="submit"
                            className={cn(
                                SECONDARY_BUTTON_CLASS,
                                'bg-linear-to-b from-sky-400 to-(--admin-accent) text-white shadow-sm shadow-(--admin-accent)/30 hover:ring-2 hover:ring-(--admin-accent) hover:ring-offset-2 dark:ring-offset-neutral-900',
                            )}
                        >
                            {submitLabel}
                        </button>
                    </footer>
                </motion.form>
            </div>
        </>
    );
}

/** The toolbar button that opens a create form. */
export function CreateButton({ label, onClick }: { label: string; onClick: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-full bg-linear-to-b from-sky-400 to-(--admin-accent) px-4 text-sm font-medium text-white shadow-sm shadow-(--admin-accent)/30 transition hover:ring-2 hover:ring-(--admin-accent) hover:ring-offset-2 dark:ring-offset-neutral-900"
        >
            <Plus className="size-4" />
            {label}
        </button>
    );
}

/** Delete asks for a second click; moving focus away cancels it. */
function useConfirmDelete(onDelete: () => void): { isConfirming: boolean; buttonProps: { onClick: () => void; onBlur: () => void } } {
    const [isConfirming, setIsConfirming] = useState(false);

    return {
        isConfirming,
        buttonProps: { onClick: () => (isConfirming ? onDelete() : setIsConfirming(true)), onBlur: () => setIsConfirming(false) },
    };
}

/** List-row edit/delete shortcuts; omit `onDelete` when the record cannot be deleted. */
export function RowActions({ id, onEdit, onDelete }: { id: string; onEdit: (id: string) => void; onDelete?: (id: string) => void }) {
    const { isConfirming, buttonProps } = useConfirmDelete(() => onDelete?.(id));

    return (
        <div className="flex items-center justify-end gap-1" onClick={(event) => event.stopPropagation()}>
            <button
                type="button"
                onClick={() => onEdit(id)}
                aria-label={`編輯 ${id}`}
                className={cn(ROW_ACTION_CLASS, 'hover:bg-(--admin-accent)/10 hover:text-(--admin-accent-ink)')}
            >
                <Pencil className="size-3.5" />
            </button>
            {onDelete && (
                <button
                    type="button"
                    {...buttonProps}
                    aria-label={isConfirming ? `確認刪除 ${id}` : `刪除 ${id}`}
                    title={isConfirming ? '再按一次確認刪除' : undefined}
                    className={cn(
                        ROW_ACTION_CLASS,
                        isConfirming
                            ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30 hover:bg-rose-700'
                            : 'hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10',
                    )}
                >
                    {isConfirming ? <Check className="size-3.5" /> : <Trash2 className="size-3.5" />}
                </button>
            )}
        </div>
    );
}

/** Detail-card footer edit/delete buttons; omit `onDelete` when the record cannot be deleted. */
export function DetailActions({ onEdit, onDelete }: { onEdit: () => void; onDelete?: () => void }) {
    const { isConfirming, buttonProps } = useConfirmDelete(() => onDelete?.());

    return (
        <>
            {onDelete && (
                <button
                    type="button"
                    {...buttonProps}
                    className={cn(
                        SECONDARY_BUTTON_CLASS,
                        'mr-auto inline-flex items-center gap-1.5',
                        isConfirming
                            ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30 hover:bg-rose-700'
                            : 'text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10',
                    )}
                >
                    <Trash2 className="size-3.5" />
                    {isConfirming ? '確認刪除' : '刪除'}
                </button>
            )}
            <button
                type="button"
                onClick={onEdit}
                className={cn(
                    SECONDARY_BUTTON_CLASS,
                    'inline-flex items-center gap-1.5 bg-white text-neutral-700 ring-1 ring-black/10 hover:bg-neutral-50 dark:bg-transparent dark:text-neutral-200 dark:ring-white/15 dark:hover:bg-white/5',
                )}
            >
                <Pencil className="size-3.5" />
                編輯
            </button>
        </>
    );
}

/**
 * Which create/edit form is open. Dismissing a form goes back to where it was opened (detail card or list);
 * saving an edit shows the saved record's detail.
 */
export function useRecordForm(setActiveId: (id: string | null) => void) {
    const [formTarget, setFormTarget] = useState<{ recordId?: string; returnsToDetail?: boolean } | null>(null);

    const openCreate = useCallback(() => setFormTarget({}), []);
    const openEdit = useCallback((id: string) => setFormTarget({ recordId: id }), []);
    const openEditFromDetail = useCallback(
        (id: string) => {
            setActiveId(null);
            setFormTarget({ recordId: id, returnsToDetail: true });
        },
        [setActiveId],
    );
    const closeForm = useCallback(() => {
        setActiveId(formTarget?.returnsToDetail ? (formTarget.recordId ?? null) : null);
        setFormTarget(null);
    }, [formTarget, setActiveId]);
    const finishForm = useCallback(
        (savedId: string | null) => {
            setActiveId(savedId);
            setFormTarget(null);
        },
        [setActiveId],
    );

    return { isFormOpen: formTarget !== null, editingId: formTarget?.recordId, openCreate, openEdit, openEditFromDetail, closeForm, finishForm };
}

/** Mock record numbering (`SO-1883`, `C-0053`, ...); the backend assigns real numbers. */
export function useIdSequence(prefix: string, firstNumber: number): () => string {
    const nextNumber = useRef(firstNumber);

    return () => `${prefix}${String(nextNumber.current++).padStart(4, '0')}`;
}
