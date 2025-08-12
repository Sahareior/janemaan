import React, { useState } from 'react';
import { Form, Input, Select, Button, DatePicker, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { useClaimsUpdateMutation, useGetClaimsQuery } from '../../../../../../../redux/slices/apiSlice';
import Swal from 'sweetalert2';

const STATUS_CHOICES = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'paid', label: 'Paid' },
];

const EditableClaims = ({ id }) => {
  const [form] = Form.useForm();
  const [claimsUpdate] = useClaimsUpdateMutation();
  const { refetch } = useGetClaimsQuery();

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      payout_date: values.payout_date ? dayjs(values.payout_date).toISOString() : null,
    };

    const data = {
      id,
      formData: formattedValues,
    };

    try {
      const res = await claimsUpdate(data).unwrap();
      Swal.fire({
        title: 'Updated!',
        text: 'Claim updated successfully.',
        icon: 'success',
        background: '#1e1e2f',
        color: '#fff',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update claim.',
        icon: 'error',
        background: '#1e1e2f',
        color: '#fff',
        confirmButtonColor: '#d33',
      });
    }
    refetch();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', color: 'white' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          {/* Status */}
          <Col span={24}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Status</span>}
              name="status"
              rules={[{ required: true, message: 'Please select status' }]}
            >
              <Select
                options={STATUS_CHOICES}
                style={{ color: 'white' }}
                defaultValue={"Select A Value"}
                dropdownStyle={{ color: 'black' }}
              />
            </Form.Item>
          </Col>

          {/* Payout Reference */}
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Payout Reference</span>}
              name="payout_reference"
            >
              <Input
                placeholder="Enter reference number"
                style={{
                  backgroundColor: '#000',
                  color: 'white',
                  borderColor: '#555',
                }}
              />
            </Form.Item>
          </Col>

          {/* Payout Date */}
          <Col span={12}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Payout Date</span>}
              name="payout_date"
            >
              <DatePicker
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>

          {/* Rejection Reason */}
          <Col span={24}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Rejection Reason</span>}
              name="rejection_reason"
            >
              <Input.TextArea
                rows={3}
                placeholder="Enter reason for rejection"
                style={{
                  backgroundColor: '#000',
                  color: 'white',
                  borderColor: '#555',
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditableClaims;
