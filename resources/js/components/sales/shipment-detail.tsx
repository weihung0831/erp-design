import { Truck } from 'lucide-react';
import { DetailActions } from '@/components/sales/sales-form';
import {
    afterSuccess,
    DetailCard,
    DetailFields,
    DetailNote,
    LineItemsTable,
    PRIMARY_BUTTON_CLASS,
    STATUS_BADGE_CLASS,
    StatusDot,
    StepProgress,
} from '@/components/sales/sales-shared';
import type { Shipment } from '@/components/sales/shipments-data';
import {
    isEditableShipment,
    isShipmentDelayed,
    SHIPMENT_FLOW,
    SHIPMENT_NEXT_STEP_LABELS,
    SHIPMENT_STATUS_STYLES,
    shipmentQuantity,
} from '@/components/sales/shipments-data';
import { Button as StatefulButton } from '@/components/ui/stateful-button';
import { cn } from '@/lib/utils';

export default function ShipmentDetail({
    shipment,
    onClose,
    onAdvance,
    onEdit,
    onDelete,
}: {
    shipment: Shipment;
    onClose: () => void;
    onAdvance: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}) {
    const nextStepLabel = SHIPMENT_NEXT_STEP_LABELS[shipment.status];
    const isDelayed = isShipmentDelayed(shipment);

    return (
        <DetailCard
            layoutPrefix="shipment"
            id={shipment.id}
            icon={Truck}
            title={shipment.customer}
            badges={
                <>
                    <StatusDot label={shipment.status} style={SHIPMENT_STATUS_STYLES[shipment.status]} />
                    {isDelayed && <span className={cn(STATUS_BADGE_CLASS, 'bg-rose-500/10 text-rose-600 dark:text-rose-400')}>延遲出貨</span>}
                </>
            }
            headline={{
                label: '出貨數量',
                value: (
                    <>
                        {shipmentQuantity(shipment).toLocaleString('zh-TW')}
                        <span className="ml-1 text-lg font-semibold text-neutral-400 dark:text-neutral-500">件</span>
                    </>
                ),
            }}
            onClose={onClose}
            footer={
                <>
                    {isEditableShipment(shipment) && <DetailActions onEdit={() => onEdit(shipment.id)} onDelete={() => onDelete(shipment.id)} />}
                    {nextStepLabel && (
                        <StatefulButton key={shipment.status} onClick={afterSuccess(() => onAdvance(shipment.id))} className={PRIMARY_BUTTON_CLASS}>
                            {nextStepLabel}
                        </StatefulButton>
                    )}
                </>
            }
        >
            <StepProgress steps={SHIPMENT_FLOW} current={shipment.status} label="出貨進度" />
            <DetailFields
                fields={[
                    { label: '來源訂單', value: <span className="font-mono">{shipment.orderId}</span> },
                    { label: '收貨人', value: shipment.receiver },
                    { label: '物流商', value: shipment.carrier },
                    { label: '追蹤碼', value: shipment.trackingNo ? <span className="font-mono">{shipment.trackingNo}</span> : '出車後產生' },
                    { label: '預定出貨', value: shipment.scheduledDate, isAlert: isDelayed },
                    { label: '送達日期', value: shipment.deliveredDate ?? '—' },
                    { label: '送貨地址', value: shipment.address, isFullRow: true },
                ]}
            />
            {shipment.note && <DetailNote>{shipment.note}</DetailNote>}
            <LineItemsTable lineItems={shipment.lineItems} />
        </DetailCard>
    );
}
