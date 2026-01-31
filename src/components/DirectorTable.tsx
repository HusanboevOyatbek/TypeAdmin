import type { DirectorType } from '@/types/DirectorType';
import { Button, Image, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const DirectorTable = ({ data }: { data?: DirectorType[] }) => {
    const queryClient = useQueryClient();

    async function deleteDirector(el: number | string) {
        if (!confirm('Siz rostdan ham o\'chirmoqchimisiz?')) return;
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/director/${el}`);
            toast.success('Rejissyor o\'chirildi');
            queryClient.invalidateQueries({ queryKey: ['directors'] });
        } catch (err) {
            toast.error('Rejissyorni o\'chirishda xatolik');
            console.error(err);
        }
    }

    const columns: TableProps<DirectorType>['columns'] = [
        {
            title: 'Rasmi',
            dataIndex: 'photo_url',
            key: 'photo_url',
            render: (text: string) => text ? <Image src={text} width={70} height={70} /> : <span>-</span>,
        },
        {
            title: 'Ismi',
            dataIndex: 'full_name',
            key: 'full_name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Faollik holati',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (text: boolean) => <span>{text ? 'Faol' : 'Faol emas'}</span>,
        },
        {
            title: 'Davlati',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Biografiya',
            dataIndex: 'biography',
            key: 'biography',
        },
        {
            title: 'Amal',
            key: 'action',
            render: (_: unknown, record: DirectorType) => (
                <Space size="middle">
                    <Button
                        onClick={() => deleteDirector(record.id)}
                        type='primary'
                        danger>
                        O'chirish
                    </Button>
                </Space>
            ),
        },
    ];

    return <Table<DirectorType> columns={columns} dataSource={data} rowKey="id" />;
};

export default DirectorTable;
