import type { ActorDataType } from '@/types/ctorTpes';
import { useQueryClient } from '@tanstack/react-query';
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';





const ActorAddForm = ({ setOpen}:{ setOpen:Dispatch<SetStateAction<boolean>>;}) =>{
    const qureyClint = useQueryClient()


    const onFinish: FormProps<ActorDataType>['onFinish'] = async (values) => {
        const payload = {
            ...values,
            birth_year: values.birth_year.year(),
        }



        try {
            await axios.post(`https://x8ki-letl-twmt.n7.xano.io/api:j6hO02gL/actor`, payload);
            toast.success("Qoshildi")
            setOpen(false)
            qureyClint.invalidateQueries({
                queryKey: ["actors"]
            });




        } catch (err) {
            toast.error("Hatolik yuzberdi!")

            console.log(err);

        }


    };

    const onFinishFailed: FormProps<ActorDataType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return(
    <Form
        layout='vertical'
        name="basic"
        labelCol={{ span: 32 }}
        wrapperCol={{ span: 32 }}
        style={{ maxWidth: 600 }}
        initialValues={{
            full_name: "",
            photo_url: "",
            birth_year: dayjs(0),
            biography: "",
            country: "",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item<ActorDataType>
                label="Full name"
                name="full_name"
                rules={[{ required: true, message: "Actor ismini kiriting!" }]}
            >
                <Input placeholder="Iltimos Actor ismini kiriting" />
            </Form.Item>

            <Form.Item<ActorDataType>
                label="Photo URL"
                name="photo_url"
                rules={[
                    { required: true, message: "Rasm URL kiriting!" },
                    // { type: "url", message: "To‘g‘ri URL kiriting!" },
                ]}
            >
                <Input placeholder="Iltimos Rasimni URL yolini kiriting" />
            </Form.Item>

            

            <Form.Item<ActorDataType>
                label="Biography"
                name="biography"
                rules={[{ required: true, message: "Biografiya kiriting!" }]}
            >
                <Input.TextArea rows={5} placeholder="Biografiya" />
            </Form.Item>

            


            <div className="flex flex-col ">
                <Form.Item<ActorDataType>
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: "Davlat nomini kiriting!" }]}
                >
                    <Input placeholder="Davlat" />
                </Form.Item>


                <Form.Item
                 label="Birth year"
                 name="birth_year"
                 rules={[{required:true , message:"Iltimos tugilgan yilingizni kiriting"}]}
                 >
                    
                    <DatePicker picker='year' />
                </Form.Item>
                
                
            </div>
        </div>






        <Form.Item label={null}>
            <Button block type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
);}

export default ActorAddForm;