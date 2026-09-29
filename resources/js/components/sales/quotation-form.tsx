import { FilePlus2 } from 'lucide-react';
import { useState } from 'react';
import { CUSTOMERS } from '@/components/sales/customers-data';
import type { Quotation } from '@/components/sales/quotations-data';
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
import { TODAY } from '@/components/sales/sales-orders-data';

export type QuotationFormValues = Pick<Quotation, 'customer' | 'contact' | 'salesperson' | 'issuedDate' | 'validUntil' | 'note' | 'lineItems'>;

const DEFAULT_VALIDITY_DAYS = 14;

function emptyValues(): QuotationFormValues {
    return {
        customer: '',
        contact: '',
        salesperson: SALESPEOPLE[0],
        issuedDate: TODAY,
        validUntil: addDays(TODAY, DEFAULT_VALIDITY_DAYS),
        note: '',
        lineItems: [EMPTY_LINE_ITEM],
    };
}

/** Create or edit a quotation; pass `quotation` to edit an existing draft. */
export default function QuotationForm({
    quotation,
    onClose,
    onSubmit,
}: {
    quotation?: Quotation;
    onClose: () => void;
    onSubmit: (values: QuotationFormValues) => void;
}) {
    const [values, setValues] = useState<QuotationFormValues>(() => (quotation ? { ...quotation } : emptyValues()));
    const change = (changes: Partial<QuotationFormValues>) => setValues((current) => ({ ...current, ...changes }));

    const selectCustomer = (name: string) => {
        const customer = CUSTOMERS.find((candidate) => candidate.name === name);
        change(
            customer ? { customer: name, contact: `${customer.contact} ${customer.phone}`, salesperson: customer.salesperson } : { customer: name },
        );
    };

    return (
        <FormModal
            titleId="quotation-form-title"
            title={quotation ? `編輯報價單 ${quotation.id}` : '新增報價單'}
            icon={FilePlus2}
            submitLabel={quotation ? '儲存變更' : '建立報價單'}
            onClose={onClose}
            onSubmit={() => onSubmit(values)}
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="quotation-customer" label="客戶">
                    <FormSelect
                        id="quotation-customer"
                        isRequired
                        value={values.customer}
                        onChange={selectCustomer}
                        placeholder="請選擇客戶"
                        options={CUSTOMERS.map((customer) => ({ value: customer.name, label: customer.name }))}
                    />
                </Field>
                <Field id="quotation-contact" label="聯絡人">
                    <input
                        id="quotation-contact"
                        value={values.contact}
                        onChange={(event) => change({ contact: event.target.value })}
                        placeholder="請輸入聯絡人"
                        className={FIELD_CLASS}
                    />
                </Field>
                <Field id="quotation-salesperson" label="業務">
                    <FormSelect
                        id="quotation-salesperson"
                        value={values.salesperson}
                        onChange={(salesperson) => change({ salesperson })}
                        options={SALESPEOPLE.map((salesperson) => ({ value: salesperson, label: salesperson }))}
                    />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                    <Field id="quotation-issued-date" label="報價日期">
                        <FormDatePicker
                            id="quotation-issued-date"
                            value={values.issuedDate}
                            onChange={(issuedDate) =>
                                change({ issuedDate, validUntil: values.validUntil < issuedDate ? issuedDate : values.validUntil })
                            }
                        />
                    </Field>
                    <Field id="quotation-valid-until" label="有效期限">
                        <FormDatePicker
                            id="quotation-valid-until"
                            value={values.validUntil}
                            onChange={(validUntil) => change({ validUntil })}
                            minDate={values.issuedDate}
                        />
                    </Field>
                </div>
            </div>

            <LineItemsEditor idPrefix="quotation" lineItems={values.lineItems} onChange={(lineItems) => change({ lineItems })} />

            <Field id="quotation-note" label="備註">
                <textarea
                    id="quotation-note"
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
