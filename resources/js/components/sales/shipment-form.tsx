import { Truck } from 'lucide-react';
import { useState } from 'react';
import { CUSTOMERS } from '@/components/sales/customers-data';
import { Field, FIELD_CLASS, FormDatePicker, FormModal, FormSelect, TEXTAREA_CLASS } from '@/components/sales/sales-form';
import { SALES_ORDERS, TODAY } from '@/components/sales/sales-orders-data';
import { LineItemsTable } from '@/components/sales/sales-shared';
import type { Shipment } from '@/components/sales/shipments-data';
import { CARRIERS } from '@/components/sales/shipments-data';

export type ShipmentFormValues = Pick<Shipment, 'orderId' | 'customer' | 'address' | 'receiver' | 'carrier' | 'scheduledDate' | 'note' | 'lineItems'>;

/** Only orders being prepared can ship; an order may ship in several batches. */
const SHIPPABLE_ORDERS = SALES_ORDERS.filter((order) => order.status === '備貨中');

function emptyValues(): ShipmentFormValues {
    return { orderId: '', customer: '', address: '', receiver: '', carrier: CARRIERS[0], scheduledDate: TODAY, note: '', lineItems: [] };
}

/** Create a shipment from an order, or edit one waiting to be picked; the source order cannot change. */
export default function ShipmentForm({
    shipment,
    onClose,
    onSubmit,
}: {
    shipment?: Shipment;
    onClose: () => void;
    onSubmit: (values: ShipmentFormValues) => void;
}) {
    const [values, setValues] = useState<ShipmentFormValues>(() => (shipment ? { ...shipment } : emptyValues()));
    const change = (changes: Partial<ShipmentFormValues>) => setValues((current) => ({ ...current, ...changes }));

    const selectOrder = (orderId: string) => {
        const order = SHIPPABLE_ORDERS.find((candidate) => candidate.id === orderId);
        if (!order) {
            return;
        }
        const customer = CUSTOMERS.find((candidate) => candidate.name === order.customer);
        change({ orderId, customer: order.customer, receiver: order.contact, address: customer?.address ?? '', lineItems: order.lineItems });
    };

    return (
        <FormModal
            titleId="shipment-form-title"
            title={shipment ? `編輯出貨單 ${shipment.id}` : '新增出貨單'}
            icon={Truck}
            submitLabel={shipment ? '儲存變更' : '建立出貨單'}
            onClose={onClose}
            onSubmit={() => onSubmit(values)}
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="shipment-order" label="來源訂單">
                    <FormSelect
                        id="shipment-order"
                        isRequired
                        isDisabled={shipment !== undefined}
                        value={values.orderId}
                        onChange={selectOrder}
                        placeholder="請選擇備貨中的訂單"
                        options={
                            shipment
                                ? [{ value: shipment.orderId, label: `${shipment.orderId} ${shipment.customer}` }]
                                : SHIPPABLE_ORDERS.map((order) => ({ value: order.id, label: `${order.id} ${order.customer}` }))
                        }
                    />
                </Field>
                <Field id="shipment-receiver" label="收貨人">
                    <input
                        id="shipment-receiver"
                        required
                        value={values.receiver}
                        onChange={(event) => change({ receiver: event.target.value })}
                        placeholder="請輸入收貨人"
                        className={FIELD_CLASS}
                    />
                </Field>
                <Field id="shipment-carrier" label="物流商">
                    <FormSelect
                        id="shipment-carrier"
                        value={values.carrier}
                        onChange={(carrier) => change({ carrier })}
                        options={CARRIERS.map((carrier) => ({ value: carrier, label: carrier }))}
                    />
                </Field>
                <Field id="shipment-scheduled-date" label="預定出貨">
                    <FormDatePicker
                        id="shipment-scheduled-date"
                        value={values.scheduledDate}
                        onChange={(scheduledDate) => change({ scheduledDate })}
                    />
                </Field>
                <Field id="shipment-address" label="送貨地址" className="sm:col-span-2">
                    <input
                        id="shipment-address"
                        required
                        value={values.address}
                        onChange={(event) => change({ address: event.target.value })}
                        placeholder="請輸入送貨地址"
                        className={FIELD_CLASS}
                    />
                </Field>
            </div>

            {values.lineItems.length > 0 && <LineItemsTable lineItems={values.lineItems} />}

            <Field id="shipment-note" label="備註">
                <textarea
                    id="shipment-note"
                    rows={3}
                    value={values.note}
                    onChange={(event) => change({ note: event.target.value })}
                    placeholder="請輸入備註"
                    className={TEXTAREA_CLASS}
                />
            </Field>
        </FormModal>
    );
}
