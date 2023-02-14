import { Button, Col, Row, Table, Tag } from 'antd';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import AppDateInput from '~/components/AppDateInput';
import AppForm from '~/components/AppForm';
import AppInput from '~/components/AppInput';
import { isEmptyValue } from '~/helpers/check';
import { LAY_LOAI_TB, LAY_PHIEU_MUON } from '../../redux/action';
import styles from './EquipmentBorrowDetail.module.sass';

const cx = classNames.bind(styles);

function EquipmentBorrowDetail(props) {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState();
    const danhSachPhieuMuon = useSelector((state) => {
        console.log(state);
        return state.equipment?.layPhieuMuon;
    });

    const { id } = useParams();

    useEffect(() => {
        dispatch(LAY_PHIEU_MUON({ id: id }));
    }, []);

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => index + 1,
            key: 'id',
            width: 50,
        },
        {
            title: 'Loại tài nguyên',
            dataIndex: 'tai_nguyen_id',
            key: 'tai_nguyen_id',
            width: 130,
        },
        // {
        //     title: 'Mô tả',
        //     dataIndex: 'mo_ta',
        //     key: 'mo_ta',
        //     width: 200,
        // },
        {
            title: 'Ngày mượn',
            // dataIndex: 'ngay_muon',
            render: (_, record) => {
                return record.ngay_muon.slice(0, 10);
            },
            key: 'ngay_muon',
            width: 130,
        },
        {
            title: 'Ngày hẹn trả',
            render: (_, record) => {
                return record.ngay_hen_tra.slice(0, 10);
            },
            key: 'ngay_hen_tra',
            width: 130,
        },
        {
            title: 'Ngày trả',
            dataIndex: 'ngay_tra',
            key: 'ngay_tra',
            width: 100,
        },

        {
            title: 'Ghi chú',
            dataIndex: 'ghi_chu',
            key: 'ghi_chu',
        },
        {
            title: 'Trạng thái',
            key: 'trang_thai',
            dataIndex: 'trang_thai',
            width: 130,
            render: (_, { trang_thai }) => (
                <>
                    <Tag color={trang_thai === 'DONE' ? 'geekblue' : 'volcano'}>
                        {trang_thai === 'DONE' ? 'Đã trả' : 'Chưa trả'}
                    </Tag>
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Link to={`/equipment/back/${id}?${selected}`}>
                    <Button>Trả</Button>
                </Link>
            ),
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            let selectedChange = [];
            if (!isEmptyValue(selectedRows)) {
                selectedRows.forEach((selection) => {
                    selectedChange.push(selection.tai_nguyen_id);
                });
            } else {
                selectedChange = [];
            }
            const multiSelectHandler = (option) => {
                if (!isEmptyValue(option)) {
                }
                const details = option.selectedChange;
                let stringData;
                details?.forEach((value, index) => {
                    if (index !== 0) {
                        stringData = stringData + '&ids=' + value;
                    } else {
                        stringData = `ids=${value}`;
                    }
                });
                console.log(stringData);
                return stringData;
            };

            const params = multiSelectHandler({ selectedChange });
            setSelected(params);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    useEffect(() => {
        document.title = 'Chi tiết phiếu mượn';
    }, []);
    return (
        <div>
            <div className="page-header">Chi tiết phiếu mượn</div>
            {danhSachPhieuMuon.state === 'SUCCESS' && (
                <AppForm onSubmit={() => {}}>
                    <Row gutter={[24, 12]}>
                        <Col xs={6}>
                            <AppInput
                                label="Họ và tên"
                                name="name"
                                defaultValue={danhSachPhieuMuon.data[0].ho_va_ten}
                                disabled
                            />
                        </Col>
                        <Col xs={6}>
                            <AppInput label="CCCD" name="cccd" defaultValue={danhSachPhieuMuon.data[0].cccd} disabled />
                        </Col>
                        <Col xs={6}>
                            <AppInput
                                label="Số điện thoai"
                                defaultValue={danhSachPhieuMuon.data[0].so_dien_thoai}
                                disabled
                            />
                        </Col>
                        <Col xs={6}>
                            <AppInput label="Email" defaultValue={danhSachPhieuMuon.data[0].email} disabled />
                        </Col>
                        <Col xs={6}>
                            <AppInput label="Lý do" defaultValue={danhSachPhieuMuon.data[0].ly_do} disabled />
                        </Col>
                        <Col xs={6}>
                            <AppInput
                                label="Sao kê đăng ký"
                                defaultValue={danhSachPhieuMuon.data[0].sao_ke_dang_ki}
                                disabled
                            />
                        </Col>
                        <Col xs={6}>
                            <AppInput label="Sao kê trả" defaultValue={danhSachPhieuMuon.data[0].sao_ke_tra} disabled />
                        </Col>
                        <Col xs={6}>
                            <AppDateInput
                                label="Ngày duyệt"
                                name="ngay_phe_duyet"
                                defaultValue={danhSachPhieuMuon.data[0].ngay_phe_duyet}
                                disabled
                            />
                        </Col>
                    </Row>
                </AppForm>
            )}
            <div style={{ marginTop: '24[x' }}>
                {danhSachPhieuMuon.state === 'SUCCESS' && (
                    <Fragment>
                        <div className="second-header">Danh sách phiên sử dụng</div>
                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                ...rowSelection,
                            }}
                            dataSource={danhSachPhieuMuon.data[0].phien_su_dung}
                            columns={columns}
                        />
                    </Fragment>
                )}
            </div>
        </div>
    );
}

export default EquipmentBorrowDetail;
