import type { ActorDataType } from '@/types/ctorTpes';
import { Button, Image, Space, Table, } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';





const ActorTable = ({ data }: { data?: ActorDataType[] }) => {
    const queryClient = useQueryClient();

    async function delitActirs(el: number | string) {
        try {
            await axios.delete(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/actor/${el}`);
            toast.success('Actior Ochirildi');
            queryClient.invalidateQueries({ queryKey: ['actors'] });
        } catch (err) {
            toast.error('Failed to delete actor');
            console.error(err);
        }
    }
    const columns: TableProps<ActorDataType>['columns'] = [

        {
            title: 'Images',
            dataIndex: 'photo_url',
            key: 'name',
            render: (text: ActorDataType["photo_url"]) => <Image src={text} width={70} height={70} />
        },

        {
            title: 'full name',
            dataIndex: 'full_name',
            key: 'name',
            render: (text: ActorDataType["full_name"]) => <a>{text}</a>,
        },
        {
            title: 'Birth year',
            dataIndex: 'birth_year',
            key: 'birth_year',
        },

        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },

        {
            title: 'Biography',
            dataIndex: 'biography',
            key: 'biography',
        },

        {
            title: 'Action',
            key: 'action',
            render: (_: unknown, record: ActorDataType) => (
                <Space size="middle">
                    <Button
                        onClick={() => delitActirs(record.id)}
                        type='primary'
                        danger>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];


    return <Table<ActorDataType> columns={columns} dataSource={data} rowKey="id" />;

};

export default ActorTable;