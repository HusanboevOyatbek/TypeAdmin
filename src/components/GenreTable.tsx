import type { GenreType } from '@/types/GenreType';
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const GenreTable = ({ data }: { data?: GenreType[] }) => {
    const queryClient = useQueryClient();

    async function deleteGenre(el: number | string) {
        if (!confirm('Siz rostdan ham o\'chirmoqchimisiz?')) return;
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/genre/${el}`);
            toast.success('Janr o\'chirildi');
            queryClient.invalidateQueries({ queryKey: ['genres'] });
        } catch (err) {
            toast.error('Janrni o\'chirishda xatolik');
            console.error(err);
        }
    }

    const columns: TableProps<GenreType>['columns'] = [
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
            title: 'Ochirsh',
            key: 'action',
            render: (_: unknown, record: GenreType) => (
                <Space size="middle">
                    <Button
                        onClick={() => deleteGenre(record.id)}
                        type='primary'
                        danger>
                        O'chirish
                    </Button>
                </Space>
            ),
        },
    ];

    return <Table<GenreType> columns={columns} dataSource={data} rowKey="id" />;
};

export default GenreTable;
