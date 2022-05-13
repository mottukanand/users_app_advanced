import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input, Checkbox, Row, Col } from "antd";

const UserModal = (props) => {
  const [user, setUser] = useState([
    {
      name: ["name"],
      value: "",
    },
    {
      name: ["email"],
      value: "",
    },
    {
      name: ["phone"],
      value: "",
    },
    {
      name: ["website"],
      value: "",
    },
  ]);

  useEffect(() => {
    let data = JSON.parse(JSON.stringify(props.selectedUser));
    let val = [
      {
        name: ["name"],
        value: data.name,
      },
      {
        name: ["email"],
        value: data.email,
      },
      {
        name: ["phone"],
        value: data.phone,
      },
      {
        name: ["website"],
        value: data.website,
      },
    ];
    setUser(val);
  }, [props.selectedUser]);

  const handleCancel = () => {
    props.setToggleModal(false);
  };
  const onFinish = (values) => {
    values.id = props.selectedUser.id;
    props.handleUsersChange(values);
    props.setToggleModal(false);
  };

  const onFinishFailed = (errorInfo) => {};

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onChange = (newFields) => {
    setUser(newFields);
  };
  return (
    <>
      <Modal
        title={"User Details"}
        visible={props.toggleModal}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          validateMessages={validateMessages}
          fields={user}
          onFieldsChange={(_, allFields) => {
            onChange(allFields);
          }}
        >
          <Form.Item
            name={"name"}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
              },
            ]}
          >
            <Input value={user.email} />
          </Form.Item>

          <Form.Item
            name={"phone"}
            label="Phone"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={user.phone} />
          </Form.Item>

          <Form.Item
            name={"website"}
            label="Website"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input value={user.website} />
          </Form.Item>

          <Row style={{ borderTop: "1px solid lightgray" }}>
            <Col span={24} style={{ textAlign: "right", marginTop: "1rem" }}>
              <Button style={{ margin: "0 8px" }} onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Ok
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default UserModal;
