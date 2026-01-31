import type { MovieType } from '@/types/MovieType';
import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const MovieTable = ({ data }: { data?: MovieType[] }) => {
    const queryClient = useQueryClient();

    async function deleteMovie(el: number | string) {
        if (!confirm('Siz rostdan ham o\'chirmoqchimisiz?')) return;
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie/${el}`);
            toast.success('Kino o\'chirildi');
            queryClient.invalidateQueries({ queryKey: ['movies'] });
        } catch (err) {
            toast.error('Kinoni o\'chirishda xatolik');
            console.error(err);
        }
    }

    const columns: TableProps<MovieType>['columns'] = [
        {
            title: 'Nomi',
            dataIndex: 'title_uz',
            key: 'title_uz',
            render: (text: string) => <p>{text}</p>,
        },
        {
            title: 'Tavsif',
            dataIndex: 'description_uz',
            key: 'description_uz',
        },
        {
            title: 'Chiqarilgan yili',
            dataIndex: 'release_year',
            key: 'release_year',
        },
        {
            title: 'Davomiyligi',
            dataIndex: 'duration_minutes',
            key: 'duration_minutes',
        },
        {
            title: '',
            key: 'action',
            render: (_: unknown, record: MovieType) => (
                <Space size="middle">
                    <Button
                        onClick={() => deleteMovie(record.id)}
                        type='primary'
                        danger>
                        O'chirish
                    </Button>
                </Space>
            ),
        },
    ];

    return <Table<MovieType> columns={columns} dataSource={data} rowKey="id" />;
};

export default MovieTable;
