import { Button, Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './EquipmentHistory.module.sass';
import moment from 'moment';
import InfoDiv from '~/components/InfoDiv';
import { select } from 'redux-saga/effects';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppButton from '~/components/AppButton/AppButton';
import { LAY_LOAI_TB, LAY_TAI_NGUYEN, TRACK_BACK_TN } from '../../redux/action';
import AppInput from '~/components/AppInput';

const cx = classNames.bind(styles);

function EquipmentHistory(props) {
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const trackBackTN = useSelector((state) => state.equipment.trackBackTN);
    const taiNguyenType = useSelector((state) => state.equipment.danhSachLoaiThietBi);

    const { id } = useParams();

    useEffect(() => {
        dispatch(LAY_LOAI_TB({ id: id }));
        const now = new Date();
        dispatch(
            TRACK_BACK_TN({
                id: id,
                params: {
                    startDate: '2000-12-20',

                    endDate:
                        moment(Date.now()).format('YYYY-MM-DD') +
                        'T' +
                        ('0' + now.getHours()).slice(-2) +
                        ':' +
                        ('0' + now.getMinutes()).slice(-2) +
                        ':' +
                        ('0' + now.getSeconds()).slice(-2) +
                        '.000Z',

                    // endDate: now,
                },
            }),
        );
    }, []);

    console.log('trackBack', trackBackTN);

    const onSubmit = (data) => {
        dispatch(
            TRACK_BACK_TN({
                id: id,
                params: {
                    startDate: data.startDate,
                    endDate: data.endDate,
                },
            }),
        );
    };

    useEffect(() => {
        document.title = 'L???ch s??? m?????n t??i nguy??n';
    }, []);

    return (
        <div>
            <div className="page-header">L???ch s??? m?????n t??i nguy??n</div>
            <div>
                <AppForm onSubmit={onSubmit}>
                    <Row gutter={24}>
                        <Col xs={6}>
                            <AppDateInput label="T??? ng??y" name="startDate" defaultValue="2000-12-20" />
                        </Col>
                        <Col xs={6}>
                            <AppDateInput
                                label="?????n ng??y"
                                name="endDate"
                                defaultValue={moment(Date.now()).format('YYYY-MM-DD')}
                            />
                        </Col>
                        <Col xs={4}>
                            <div className="bottom-right">
                                <AppButton type="submit">T??m ki???m</AppButton>
                            </div>
                        </Col>
                    </Row>
                </AppForm>
            </div>
            <Row gutter={24}>
                <Col xs={6}>
                    <div className="second-header">M???c th???i gian</div>
                    {trackBackTN.state === 'SUCCESS' && (
                        <div>
                            {trackBackTN.data.map((trackBack, index) => {
                                return (
                                    <div className={cx('time-wraper')} onClick={() => setSelectedIndex(index)}>
                                        <div
                                            style={index === selectedIndex ? { backgroundColor: '#4d55fa' } : {}}
                                            className={cx('dot')}
                                        ></div>
                                        <div className={cx('time')}>{trackBack.date.slice(0, 10)}</div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Col>
                <Col xs={18}>
                    {trackBackTN.state === 'SUCCESS' && (
                        <Fragment>
                            {trackBackTN?.data[selectedIndex] ? (
                                <Fragment>
                                    {taiNguyenType.state === 'SUCCESS' && (
                                        <div className="second-header">
                                            M?????n {taiNguyenType?.data[0]?.name.toLowerCase()}
                                        </div>
                                    )}
                                    <Row gutter={24}>
                                        <Col xs={12}>
                                            <div className="third-header">Tr?????c khi m?????n</div>

                                            <AppForm onSubmit={() => {}}>
                                                <AppInput
                                                    label="M?? t???"
                                                    value={trackBackTN?.data[selectedIndex]?.cu?.mo_ta}
                                                />
                                                <AppInput
                                                    label="T??nh tr???ng"
                                                    value={trackBackTN?.data[selectedIndex]?.cu?.tinh_trang + '/10'}
                                                />
                                                <AppDateInput
                                                    label="Ng??y th??m"
                                                    disabled
                                                    name="test"
                                                    defaultValue={trackBackTN?.data[selectedIndex]?.cu?.ngay_them.slice(
                                                        0,
                                                        10,
                                                    )}
                                                />
                                                <AppInput
                                                    label="Ghi ch??"
                                                    value={trackBackTN?.data[selectedIndex]?.cu?.ghi_chu}
                                                />
                                            </AppForm>
                                        </Col>
                                        <Col xs={12}>
                                            <div className="third-header">Sau khi m?????n</div>

                                            <AppForm onSubmit={() => {}}>
                                                <AppInput
                                                    label="M?? t???"
                                                    value={trackBackTN?.data[selectedIndex]?.moi?.mo_ta}
                                                />
                                                <AppInput
                                                    label="T??nh tr???ng"
                                                    value={trackBackTN?.data[selectedIndex]?.moi?.tinh_trang + '/10'}
                                                />
                                                <AppDateInput
                                                    name="test"
                                                    label="Ng??y th??m"
                                                    disabled
                                                    defaultValue={trackBackTN?.data[
                                                        selectedIndex
                                                    ]?.moi?.ngay_them?.slice(0, 10)}
                                                />
                                                <AppInput
                                                    label="Ghi ch??"
                                                    value={trackBackTN?.data[selectedIndex]?.moi?.ghi_chu}
                                                />
                                            </AppForm>
                                        </Col>
                                    </Row>
                                </Fragment>
                            ) : (
                                <div className="second-header">Kh??ng c?? thay ?????i trong kho???ng th???i gian ???? ch???n</div>
                            )}
                        </Fragment>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default EquipmentHistory;
