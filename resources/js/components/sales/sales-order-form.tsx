import { ReceiptText } from 'lucide-react';
import { useState } from 'react';
import { CUSTOMERS } from '@/components/sales/customers-data';
import { SALESPEOPLE } from '@/components/sales/quotations-data';
import {
    addDays,
    EMPTY_LINE_ITEM,
    Field,
    FIELD_CLASS,
    FormDatePicker,
    FormModal,
    FormSelect,
    LineItemsEditor,
    TEXTAREA_CLASS,
} from '@/components/sales/sales-form';
import type { SalesOrder } from '@/components/sales/sales-orders-data';
import { PAYMENT_TERMS, TODAY } from '@/components/sales/sales-orders-data';

export type SalesOrderFormValues = Pick<
    SalesOrder,
    'customer' | 'contact' | 'salesperson' | 'orderDate' | 'deliveryDate' | 'paymentTerm' | 'note' | 'lineItems'
>;

const DEFAULT_LEAD_DAYS = 7;

function emptyValues(): SalesOrderFormValues {
    return {
        customer: '',
        contact: '',
        salesperson: SALESPEOPLE[0],
        orderDate: TODAY,
        deliveryDate: addDays(TODAY, DEFAULT_LEAD_DAYS),
        paymentTerm: PAYMENT_TERMS[1],
        note: '',
        lineItems: [EMPTY_LINE_ITEM],
    };
}

/** Create or edit a sales order; pass `order` to edit a pending one. */
export default function SalesOrderForm({
    order,
    onClose,
    onSubmit,
}: {
    order?: SalesOrder;
    onClose: () => void;
    onSubmit: (values: SalesOrderFormValues) => void;
}) {
    const [values, setValues] = useState<SalesOrderFormValues>(() => (order ? { ...order } : emptyValues()));
    const change = (changes: Partial<SalesOrderFormValues>) => setValues((current) => ({ ...current, ...changes }));

    const selectCustomer = (name: string) => {
        const customer = CUSTOMERS.find((candidate) => candidate.name === name);
        change(
            customer
                ? {
                      customer: name,
                      contact: `${customer.contact} ${customer.phone}`,
                      salesperson: customer.salesperson,
                      paymentTerm: customer.paymentTerm,
                  }
                : { customer: name },
        );
    };

    return (
        <FormModal
            titleId="order-form-title"
            title={order ? `編輯銷貨訂單 ${order.id}` : '新增銷貨訂單'}
            icon={ReceiptText}
            submitLabel={order ? '儲存變更' : '建立訂單'}
            onClose={onClose}
            onSubmit={() => onSubmit(values)}
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="order-customer" label="客戶">
                    <FormSelect
                        id="order-customer"
                        isRequired
                        value={values.customer}
                        onChange={selectCustomer}
                        placeholder="請選擇客戶"
                        options={CUSTOMERS.map((customer) => ({ value: customer.name, label: customer.name }))}
                    />
                </Field>
                <Field id="order-contact" label="聯絡人">
                    <input
                        id="order-contact"
                        value={values.contact}
                        onChange={(event) => change({ contact: event.target.value })}
                        placeholder="請輸入聯絡人"
                        className={FIELD_CLASS}
                    />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                    <Field id="order-salesperson" label="業務">
                        <FormSelect
                            id="order-salesperson"
                            value={values.salesperson}
                            onChange={(salesperson) => change({ salesperson })}
                            options={SALESPEOPLE.map((salesperson) => ({ value: salesperson, label: salesperson }))}
                        />
                    </Field>
                    <Field id="order-payment-term" label="付款條件">
                        <FormSelect
                            id="order-payment-term"
                            value={values.paymentTerm}
                            onChange={(paymentTerm) => change({ paymentTerm })}
                            options={PAYMENT_TERMS.map((paymentTerm) => ({ value: paymentTerm, label: paymentTerm }))}
                        />
                    </Field>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Field id="order-order-date" label="訂單日期">
                        <FormDatePicker
                            id="order-order-date"
                            value={values.orderDate}
                            onChange={(orderDate) =>
                                change({ orderDate, deliveryDate: values.deliveryDate < orderDate ? orderDate : values.deliveryDate })
                            }
                        />
                    </Field>
                    <Field id="order-delivery-date" label="預計交期">
                        <FormDatePicker
                            id="order-delivery-date"
                            value={values.deliveryDate}
                            onChange={(deliveryDate) => change({ deliveryDate })}
                            minDate={values.orderDate}
                        />
                    </Field>
                </div>
            </div>

            <LineItemsEditor idPrefix="order" lineItems={values.lineItems} onChange={(lineItems) => change({ lineItems })} />

            <Field id="order-note" label="備註">
                <textarea
                    id="order-note"
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
