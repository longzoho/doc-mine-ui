import React, {useEffect, useRef} from 'react'
import {Button, Form, Input, message, Modal, ModalProps} from "antd";
import Title from "../custom/Title";
import {UserDocument} from "../../types";
import Paragraph from "../custom/Paragraph";
import {useAuthPost} from "../../hook/useAuthPost";
import {FormInstance} from "antd/es/form/hooks/useForm";


interface CreateProfileModalProps extends ModalProps {
  selectedRow?: UserDocument[]
  setIsModalOpen: (isOpen: boolean) => void
  open: boolean
}

interface FormValues {
  name: string
  description: string
}

const CreateProfileModall = (props: CreateProfileModalProps) => {
  const {selectedRow, children, open, setIsModalOpen, ..._props} = props;
  const [hashNames, setHashNames] = React.useState<string[]>([]);
  const {post} = useAuthPost('/api/profile/create');
  const ref = useRef<FormInstance<FormValues>>(null);
  useEffect(() => {
    if (!selectedRow) {
      setHashNames([]);
      return;
    }
    setHashNames(selectedRow.map((document) => document.hash_name));
  }, [selectedRow]);

  const onSubmit = (values: any) => {
    post({...values, hash_names: hashNames}, {
      onSuccess: () => {
        message.success('Create profile successfully');
        setIsModalOpen(false);
      }, onError: () => {
        message.error('Create profile failed');
      }
    });
    ref.current?.resetFields();
  }
  return <Modal title="Create new profile" open={open} {..._props}
                centered
                footer={null}
                onCancel={() => {
                  setIsModalOpen(false);
                  ref?.current?.resetFields();
                }}>
    <Form onFinish={onSubmit} ref={ref}>
      <Form.Item label={'Name'} name={'name'} rules={[{required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item label={'Description'} name={'description'} rules={[{required: true}]}>
        <Input.TextArea/>
      </Form.Item>
      <Form.Item>
        <Title level={5} align={'left'}>Selected documents</Title>
        {selectedRow?.map((document: UserDocument) => <Paragraph
          key={document.hash_name}>{document.name}</Paragraph>)}
      </Form.Item>
      <Form.Item>
        <Button type={'primary'} htmlType={'submit'}>Create</Button>
      </Form.Item>
    </Form>
  </Modal>

}
export default CreateProfileModall;