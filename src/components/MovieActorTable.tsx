import { Button, Space, Table } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import type { MovieActorTyps } from '@/types/MovieActorTyps';

const MovieActorTable = ({ data }: { data?: MovieActorTyps[] }) => {
    const queryClient = useQueryClient();

    async function delitActirs(el: number | string) {
        if (!confirm('Siz rostdan ham o\'chirmoqchimisiz?')) return;
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/movie_actor/${el}`);
            toast.success('Qator o\'chirildi');
            queryClient.invalidateQueries({ queryKey: ['movie_actor'] });
        } catch (err) {
            toast.error('O\'chirishda xatolik');
            console.error(err);
        }
    }

    const columns: TableProps<MovieActorTyps>['columns'] = [
        {
            title: 'Kino nomi',
            dataIndex: 'movie_id',
            key: 'movie_id',
            render: (text: MovieActorTyps["movie_id"]) => <p>{text}</p>,
        },
        {
            title: 'Aktior nomi',
            dataIndex: 'actor_id',
            key: 'actor_id',
            render: (text: MovieActorTyps["actor_id"]) => <p>{text}</p>,
        },
        {
            title: "O'ynagan Ro'li",
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Amal',
            key: 'action',
            render: (_: unknown, record: MovieActorTyps) => (
                <Space size="middle">
                    <Button
                        onClick={() => delitActirs(record.id)}
                        type='primary'
                        danger>
                        O'chirish
                    </Button>
                </Space>
            ),
        },
    ];

    return <Table<MovieActorTyps> columns={columns} dataSource={data} rowKey="id" />;
};

export default MovieActorTable;