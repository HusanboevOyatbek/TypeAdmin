import type { MovieType } from '@/types/MovieType';
import { useQueryClient } from '@tanstack/react-query';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import type { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

const MovieAddForm = ({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const queryClient = useQueryClient();

    const onFinish: FormProps<MovieType>['onFinish'] = async (values) => {
        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie`, values);
            toast.success('Kino qo\'shildi');
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ['movies'] });
        } catch (err) {
            toast.error('Kinoni qo\'shishda xatolik');
            console.error(err);
        }
    };

    const onFinishFailed: FormProps<MovieType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            layout='vertical'
            name="movie-form"
            style={{ maxWidth: 600 }}
            initialValues={{
                title: '',
                description: '',
                release_year: new Date().getFullYear(),
                duration: 0,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<MovieType>
                label="Kino nomi"
                rules={[{ required: true, message: 'Kino nomini kiriting!' }]}
            >
                <Input placeholder="Kino nomi" />
            </Form.Item>

            <Form.Item<MovieType>
                label="Tavsif"
                rules={[{ required: true, message: 'Tavsifni kiriting!' }]}
            >
                <Input.TextArea rows={4} placeholder="Tavsif" />
            </Form.Item>

            <Form.Item<MovieType>
                label="Chiqarilgan yili"
                name="release_year"
                rules={[{ required: true, message: 'Chiqarilgan yilni kiriting!' }]}
            >
                <Input type="number" placeholder="Chiqarilgan yili" />
            </Form.Item>

            <Form.Item<MovieType>
                label="Davomiyligi (minutlarda)"
                rules={[{ required: true, message: 'Davomiyligi kiriting!' }]}
            >
                <Input type="number" placeholder="Davomiyligi" />
            </Form.Item>

            <Form.Item label={null}>
                <Button block type="primary" htmlType="submit">
                    Qo'shish
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MovieAddForm;
