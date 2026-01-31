import type { GenreType } from '@/types/GenreType';
import { useQueryClient } from '@tanstack/react-query';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import type { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

const GenreAddForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<GenreType>['onFinish'] = async (values) => {
        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/genre`, values);
            toast.success('Janr qo\'shildi');
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ['genres'] });
        } catch (err) {
            toast.error('Janrni qo\'shishda xatolik');
            console.error(err);
        }
    };

    const onFinishFailed: FormProps<GenreType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            layout='vertical'
            name="genre-form"
            style={{ maxWidth: 600 }}
            initialValues={{
                name: '',
                description: '',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<GenreType>
                label="Janr nomi"
                rules={[{ required: true, message: 'Janr nomini kiriting!' }]}
            >
                <Input placeholder="Janr nomi" />
            </Form.Item>

            <Form.Item<GenreType>
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

export default GenreAddForm;
