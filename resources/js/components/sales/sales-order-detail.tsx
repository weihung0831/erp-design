import { ReceiptText } from 'lucide-react';
import { ORDER_STATUS_STYLES } from '@/components/dashboard/recent-orders';
import type { SalesOrder } from '@/components/sales/sales-orders-data';
import { DetailActions } from '@/components/sales/sales-form';
import { isDeliveryOverdue, isEditableOrder, NEXT_STEP_LABELS, ORDER_FLOW, orderAmount } from '@/components/sales/sales-orders-data';
import {
    afterSuccess,
    CurrencyHeadline,
    DetailCard,
    DetailFields,
    DetailNote,
    LineItemsTable,
    PRIMARY_BUTTON_CLASS,
    STATUS_BADGE_CLASS,
    StatusDot,
    StepProgress,
} from '@/components/sales/sales-shared';
import { Button as StatefulButton } from '@/components/ui/stateful-button';
import { cn } from '@/lib/utils';

export default function SalesOrderDetail({
    order,
    onClose,
    onAdvance,
    onEdit,
    onDelete,
}: {
    order: SalesOrder;
    onClose: () => void;
    onAdvance: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    const nextStepLabel = NEXT_STEP_LABELS[order.status];
    const isOverdue = isDeliveryOverdue(order);

    return (
        <DetailCard
            layoutPrefix="order"
            id={order.id}
            icon={ReceiptText}
            title={order.customer}
            badges={
                <>
                    <StatusDot label={order.status} style={ORDER_STATUS_STYLES[order.status]} />
                    {isOverdue && <span className={cn(STATUS_BADGE_CLASS, 'bg-rose-500/10 text-rose-600 dark:text-rose-400')}>逾期未出貨</span>}
                </>
            }
            headline={{ label: '訂單金額（未稅）', value: <CurrencyHeadline amount={orderAmount(order)} /> }}
            onClose={onClose}
            footer={
                <>
                    {isEditableOrder(order) && <DetailActions onEdit={() => onEdit(order.id)} onDelete={() => onDelete(order.id)} />}
                    {nextStepLabel && (
                        <StatefulButton key={order.status} onClick={afterSuccess(() => onAdvance(order.id))} className={PRIMARY_BUTTON_CLASS}>
                            {nextStepLabel}
                        </StatefulButton>
                    )}
                </>
            }
        >
            <StepProgress steps={ORDER_FLOW} current={order.status} label="訂單進度" />
            <DetailFields
                fields={[
                    { label: '聯絡人', value: order.contact },
                    { label: '業務', value: order.salesperson },
                    { label: '付款條件', value: order.paymentTerm },
                    { label: '訂單日期', value: order.orderDate },
                    { label: '預計交期', value: order.deliveryDate, isAlert: isOverdue, isWide: true },
                ]}
            />
            {order.note && <DetailNote>{order.note}</DetailNote>}
            <LineItemsTable lineItems={order.lineItems} />
        </DetailCard>
    );
}
