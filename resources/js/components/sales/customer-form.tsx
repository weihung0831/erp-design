import { Building2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { Customer } from '@/components/sales/customers-data';
import { CUSTOMER_TIERS } from '@/components/sales/customers-data';
import { SALESPEOPLE } from '@/components/sales/quotations-data';
import { Field, FIELD_CLASS, FormModal, FormSelect } from '@/components/sales/sales-form';
import { PAYMENT_TERMS } from '@/components/sales/sales-orders-data';
import { cn } from '@/lib/utils';

export type CustomerFormValues = Omit<Customer, 'id' | 'receivable' | 'since'>;

function emptyValues(): CustomerFormValues {
    return {
        name: '',
        industry: '',
        tier: 'C',
        taxId: '',
        contact: '',
        phone: '',
        email: '',
        address: '',
        salesperson: SALESPEOPLE[0],
        paymentTerm: PAYMENT_TERMS[1],
        creditLimit: 0,
    };
}

/** Create or edit a customer; receivables and trading history are not editable here. */
export default function CustomerForm({
    customer,
    onClose,
    onSubmit,
}: {
    customer?: Customer;
    onClose: () => void;
    onSubmit: (values: CustomerFormValues) => void;
}) {
    const [values, setValues] = useState<CustomerFormValues>(() => (customer ? { ...customer } : emptyValues()));
    const change = (changes: Partial<CustomerFormValues>) => setValues((current) => ({ ...current, ...changes }));

    const textField = (
        id: string,
        label: string,
        field: 'name' | 'industry' | 'taxId' | 'contact' | 'phone' | 'email' | 'address',
        options: { isRequired?: boolean; type?: string; pattern?: string; title?: string; className?: string } = {},
    ): ReactNode => (
        <Field id={id} label={label} className={options.className}>
            <input
                id={id}
                type={options.type ?? 'text'}
                required={options.isRequired}
                pattern={options.pattern}
                title={options.title}
                value={values[field]}
                onChange={(event) => change({ [field]: event.target.value })}
                placeholder={`請輸入${label}`}
                className={FIELD_CLASS}
            />
        </Field>
    );

    return (
        <FormModal
            titleId="customer-form-title"
            title={customer ? `編輯客戶 ${customer.id}` : '新增客戶'}
            icon={Building2}
            submitLabel={customer ? '儲存變更' : '建立客戶'}
            onClose={onClose}
            onSubmit={() => onSubmit(values)}
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {textField('customer-name', '客戶名稱', 'name', { isRequired: true, className: 'sm:col-span-2' })}
                {textField('customer-tax-id', '統一編號', 'taxId', { isRequired: true, pattern: '\\d{8}', title: '統一編號為 8 碼數字' })}
                <div className="grid grid-cols-[1fr_6rem] gap-4">
                    {textField('customer-industry', '產業', 'industry')}
                    <Field id="customer-tier" label="等級">
                        <FormSelect
                            id="customer-tier"
                            value={values.tier}
                            onChange={(tier) => change({ tier: tier as Customer['tier'] })}
                            options={CUSTOMER_TIERS.map((tier) => ({ value: tier, label: `${tier} 級` }))}
                        />
                    </Field>
                </div>
                {textField('customer-contact', '聯絡人', 'contact', { isRequired: true })}
                {textField('customer-phone', '電話', 'phone', { isRequired: true, type: 'tel' })}
                {textField('customer-email', 'Email', 'email', { type: 'email', className: 'sm:col-span-2' })}
                {textField('customer-address', '地址', 'address', { className: 'sm:col-span-2' })}
                <Field id="customer-salesperson" label="業務">
                    <FormSelect
                        id="customer-salesperson"
                        value={values.salesperson}
                        onChange={(salesperson) => change({ salesperson })}
                        options={SALESPEOPLE.map((salesperson) => ({ value: salesperson, label: salesperson }))}
                    />
                </Field>
                <div className="grid grid-cols-2 gap-4">
                    <Field id="customer-payment-term" label="付款條件">
                        <FormSelect
                            id="customer-payment-term"
                            value={values.paymentTerm}
                            onChange={(paymentTerm) => change({ paymentTerm })}
                            options={PAYMENT_TERMS.map((paymentTerm) => ({ value: paymentTerm, label: paymentTerm }))}
                        />
                    </Field>
                    <Field id="customer-credit-limit" label="信用額度">
                        <input
                            id="customer-credit-limit"
                            type="number"
                            required
                            min={0}
                            step={1000}
                            value={values.creditLimit}
                            onChange={(event) => change({ creditLimit: event.target.valueAsNumber || 0 })}
                            className={cn(FIELD_CLASS, 'tabular-nums')}
                        />
                    </Field>
                </div>
            </div>
        </FormModal>
    );
}
