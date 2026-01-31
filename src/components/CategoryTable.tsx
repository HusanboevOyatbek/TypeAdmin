import type { CategoryType } from '@/types/CategoryType';
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const CategoryTable = ({ data }: { data?: CategoryType[] }) => {
    const queryClient = useQueryClient();

    async function deleteCategory(el: number | string) {
        if (!confirm('Siz rostdan ham o\'chirmoqchimisiz?')) return;
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/category/${el}`);
            toast.success('Toifa o\'chirildi');
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        } catch (err) {
            toast.error('Toifani o\'chirishda xatolik');
            console.error(err);
        }
    }

    const columns: TableProps<CategoryType>['columns'] = [
        {
            title: 'Nomi',
            dataIndex: 'name_uz',
            key: 'name_uz',
            render: (text: string) => <p>{text}</p>,
        },
        {
            title: 'Tavsif',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Ochirish',
            key: 'action',
            render: (_: unknown, record: CategoryType) => (
                <Space size="middle">
                    <Button
                        onClick={() => deleteCategory(record.id)}
                        type='primary'
                        danger>
                        O'chirish
                    </Button>
                </Space>
            ),
        },
    ];

    return <Table<CategoryType> columns={columns} dataSource={data} rowKey="id" />;
};

export default CategoryTable;
