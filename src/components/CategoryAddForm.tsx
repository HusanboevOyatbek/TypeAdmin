import type { CategoryType } from '@/types/CategoryType';
import { useQueryClient } from '@tanstack/react-query';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import type { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

const CategoryAddForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<CategoryType>['onFinish'] = async (values) => {
        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/category`, values);
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        } catch (err) {
            toast.error('Toifani qo\'shishda xatolik');
            console.error(err);
        }
    };

    const onFinishFailed: FormProps<CategoryType>['onFinishFailed'] = (errorInfo) => {
        console.log(errorInfo);
    };

    return (
        <Form
            layout='vertical'
            name="category-form"
            style={{ maxWidth: 600 }}
            initialValues={{
                name: '',
                description: '',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<CategoryType>
                label="Toifa nomi"
                rules={[{ required: true, message: 'Toifa nomini kiriting!' }]}
            >
                <Input placeholder="Toifa nomi" />
            </Form.Item>

            <Form.Item<CategoryType>
                label="Tavsif"
                rules={[{ required: true, message: 'Tavsifni kiriting!' }]}
            >
                <Input.TextArea rows={4} placeholder="Tavsif" />
            </Form.Item>

            <Form.Item label={null}>
                <Button block type="primary" htmlType="submit">
                    Qo'shish
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CategoryAddForm;
