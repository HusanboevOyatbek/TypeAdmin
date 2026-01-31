import type { DirectorType } from '@/types/DirectorType';
import { useQueryClient } from '@tanstack/react-query';
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

const DirectorAddForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<DirectorType>['onFinish'] = async (values) => {
        const payload = {
            ...values,
            birth_year: values.birth_year ? values.birth_year.year() : null,
        };

        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/director`, payload);
            toast.success('Rejissyor qo\'shildi');
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ['directors'] });
        } catch (err) {
            toast.error('Rejissyorni qo\'shishda xatolik');
            console.error(err);
        }
    };

    const onFinishFailed: FormProps<DirectorType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            layout='vertical'
            name="director-form"
            style={{ maxWidth: 600 }}
            initialValues={{
                full_name: '',
                photo_url: '',
                birth_year: dayjs(),
                biography: '',
                country: '',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<DirectorType>
                label="Ismi"
                name="full_name"
                rules={[{ required: true, message: 'Rejissyorning ismini kiriting!' }]}
            >
                <Input placeholder="Rejissyorning ismi" />
            </Form.Item>

            <Form.Item<DirectorType>
                label="Rasmi URL"
                rules={[{ required: true, message: 'Rasm URL kiriting!' }]}
            >
                <Input placeholder="Rasm URL" />
            </Form.Item>

            <Form.Item<DirectorType>
                label="Biografiya"
                name="biography"
                rules={[{ required: true, message: 'Biografiyani kiriting!' }]}
            >
                <Input.TextArea rows={4} placeholder="Biografiya" />
            </Form.Item>

            <Form.Item<DirectorType>
                label="Davlati"
                name="country"
                rules={[{ required: true, message: 'Davlatni kiriting!' }]}
            >
                <Input placeholder="Davlati" />
            </Form.Item>

            <Form.Item<DirectorType>
                label="Tugilgan yili"
                name="birth_year"
                rules={[{ required: true, message: 'Tugilgan yilni kiriting!' }]}
            >
                <DatePicker picker='year' />
            </Form.Item>

            <Form.Item label={null}>
                <Button block type="primary" htmlType="submit">
                    Qo'shish
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DirectorAddForm;
