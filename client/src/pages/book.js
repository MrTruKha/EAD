import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table, Space, Button, Modal, Input, Divider } from "antd";
import "../assets/styles/book.css";
import axios from "axios";
import ColumnGroup from "antd/lib/table/ColumnGroup";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TextArea from "antd/lib/input/TextArea";

Book.propTypes = {};

const ACTION_TYPE = {
    POST: "POST",
    PUT: "PUT"
}
function Book(props) {
    const [data, setData] = useState([]);
    const [item, setItem] = useState({});
    const [isShowModalPostPut, setIsShowModalPostPut] = useState(false);
    const [actionType, setActionType] = useState("");

    const { confirm } = Modal;

    function showConfirmDelete(item) {
        confirm({
            title: 'Ban muon xoa?',
            icon: <ExclamationCircleOutlined />,
            content: item.name,
            onOk() {
                rqDeleteItem(item.id);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Button type="default" className="btn-edit" onClick={() => {onClickEditItem(record)}}>Sửa</Button> <Button type="danger" danger className="btn-delete" onClick={ () => showConfirmDelete(record) }>Xóa</Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        rqGetData();
    }, []);

    function onClickEditItem(item) {
        setItem(item);
        setActionType(ACTION_TYPE.PUT);
        setIsShowModalPostPut(true);
    }

    function rqGetData() {
        axios
            .get(`http://localhost:9090/api/v1/books`)
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => console.log(error));
    }

    function rqDeleteItem(id) {
        axios
            .delete(`http://localhost:9090/api/v1/books/` + id)
            .then((res) => {
                rqGetData();
            })
            .catch((error) => console.log(error));
    }

    function rqPostItem() {
        axios
            .post(`http://localhost:9090/api/v1/books`, JSON.stringify(item), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                rqGetData();
                setIsShowModalPostPut(false);

            })
            .catch((error) => showModalError());
    }

    function rqPutItem() {
        axios
            .put(`http://localhost:9090/api/v1/books/` + item.id, JSON.stringify(item), {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                rqGetData();
                setIsShowModalPostPut(false);

            })
            .catch((error) => showModalError());
    }


    const onPostPutItem = function () {
        if (actionType === ACTION_TYPE.POST) {
            rqPostItem();
        }
        if (actionType === ACTION_TYPE.PUT) {
            rqPutItem();
        }
    }

    const handleCancelPostPutItem = function () {
        setIsShowModalPostPut(false);
    }

    function showModalError() {
        Modal.error({
            title: 'Thông báo',
            content: 'Đã xảy ra lỗi !',
        });
    }

    return (
        <div>
            <div className="page-body">
                <Button type="primary" primary onClick={ () => { setIsShowModalPostPut(true); setActionType(ACTION_TYPE.POST); setItem({}) } }>Thêm mới</Button>
                <Table columns={ columns } dataSource={ data } rowKey={ "id" } />
            </div>
            <Modal
                title={ actionType === ACTION_TYPE.PUT ? "Chỉnh sửa" : "Thêm mới" }
                visible={ isShowModalPostPut }
                onOk={ onPostPutItem }
                onCancel={ handleCancelPostPutItem }
            >
                <span className="label">Name</span>
                <Input autoFocus={true} value={item.name} onChange={ e => {
                    setItem({ ...item, name: e.target.value })
                } } />
                <span className="label">Address</span>
                <Input value={item.price} onChange={ e => {
                    setItem({ ...item, address: e.target.value })
                } } />
            </Modal>
        </div>
    );
}

export default Book;
