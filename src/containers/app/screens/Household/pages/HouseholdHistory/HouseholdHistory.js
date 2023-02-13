import { Button, Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TRACK_BACK_HK } from '../../redux/action';
import styles from './HouseholdHistory.module.sass';
import moment from 'moment';
import InfoDiv from '~/components/InfoDiv';
import { select } from 'redux-saga/effects';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppButton from '~/components/AppButton/AppButton';

const cx = classNames.bind(styles);

function HouseholdHistory(props) {
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const trackBackHK = useSelector((state) => state.household.trackBackHK);

    const { id } = useParams();

    useEffect(() => {
        dispatch(
            TRACK_BACK_HK({
                id: id,
                params: {
                    startDate: '2000-12-20',
                    endDate: moment(Date.now()).format('YYYY-MM-DD'),
                },
            }),
        );
    }, []);

    console.log('trackBack', trackBackHK);

    const onSubmit = (data) => {
        dispatch(
            TRACK_BACK_HK({
                id: id,
                params: {
                    startDate: data.startDate,
                    endDate: data.endDate,
                },
            }),
        );
    };

    const getType = (type) => {
        switch (type) {
            case 'don_dinh_chinh_so_ho_khau':
                return 'Đính chính sổ hộ khẩu';
            case 'don_chuyen_khau':
                return 'Chuyển khẩu';
            case 'don_tach_khau':
                return 'Tách khẩu';
            case 'don_nhap_khau':
                return 'Nhập khẩu';
            default:
                return 'Không xác định';
        }
    };

    useEffect(() => {
        document.title = 'Lịch sử thay đổi hộ khẩu';
    }, []);

    return (
        <div>
            <div className="page-header">Lịch sử thay đổi hộ khẩu</div>
            <div>
                <AppForm onSubmit={onSubmit}>
                    <Row gutter={24}>
                        <Col xs={6}>
                            <AppDateInput label="Từ ngày" name="startDate" defaultValue="2000-12-20" />
                        </Col>
                        <Col xs={6}>
                            <AppDateInput
                                label="Đến ngày"
                                name="endDate"
                                defaultValue={moment(Date.now()).format('YYYY-MM-DD')}
                            />
                        </Col>
                        <Col xs={4}>
                            <div className="bottom-right">
                                <AppButton type="submit">Tìm kiếm</AppButton>
                            </div>
                        </Col>
                    </Row>
                </AppForm>
            </div>
            <Row gutter={24}>
                <Col xs={6}>
                    <div className="second-header">Mốc thời gian</div>
                    {trackBackHK.state === 'SUCCESS' && (
                        <div>
                            {trackBackHK.data.map((trackBack, index) => {
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
                    {trackBackHK.state === 'SUCCESS' && (
                        <Fragment>
                            {trackBackHK?.data[selectedIndex] ? (
                                <Fragment>
                                    <div className="second-header">
                                        {getType(trackBackHK?.data[selectedIndex]?.type)}
                                    </div>
                                    <Row gutter={24}>
                                        <Col xs={12}>
                                            <div className="third-header">Thông tin cũ</div>
                                            <InfoDiv field="ID" value={trackBackHK?.data[selectedIndex]?.cu?.id} />
                                            <InfoDiv
                                                field="Chủ hộ"
                                                value={trackBackHK?.data[selectedIndex]?.cu?.ten_chu_ho}
                                            />
                                            <InfoDiv
                                                field="Địa chỉ"
                                                value={trackBackHK?.data[selectedIndex]?.cu?.dia_chi}
                                            />
                                            <div>
                                                <div style={{ marginTop: '12px' }} className="third-header">
                                                    Nhân khẩu
                                                </div>
                                                {trackBackHK?.data[selectedIndex]?.cu?.nhankhaus?.map((nk) => {
                                                    return (
                                                        <div className={cx('nk-wrapper')}>
                                                            <InfoDiv field="Tên" value={nk.ten} />
                                                            <InfoDiv field="CCCD" value={nk.cccd} />
                                                            <InfoDiv
                                                                field="Quan hệ với chủ hộ"
                                                                value={nk.quan_he_chu_ho}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                                {trackBackHK?.data[selectedIndex]?.cu?.nhanKhaus?.map((nk) => {
                                                    return (
                                                        <div className={cx('nk-wrapper')}>
                                                            <InfoDiv field="Tên" value={nk.ten} />
                                                            <InfoDiv field="CCCD" value={nk.cccd} />
                                                            <InfoDiv
                                                                field="Quan hệ với chủ hộ"
                                                                value={nk.quan_he_chu_ho}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </Col>
                                        <Col xs={12}>
                                            <div className="third-header">Thông tin mới</div>

                                            <InfoDiv field="ID" value={trackBackHK.data[selectedIndex]?.moi.id} />
                                            <InfoDiv
                                                field="Chủ hộ"
                                                value={trackBackHK.data[selectedIndex]?.moi.ten_chu_ho}
                                            />
                                            <InfoDiv
                                                field="Địa chỉ"
                                                value={trackBackHK.data[selectedIndex]?.moi.dia_chi}
                                            />
                                            <div>
                                                <div style={{ marginTop: '12px' }} className="third-header">
                                                    Nhân khẩu
                                                </div>
                                                {trackBackHK?.data[selectedIndex]?.moi?.nhankhaus?.map((nk) => {
                                                    return (
                                                        <div className={cx('nk-wrapper')}>
                                                            <InfoDiv field="Tên" value={nk.ten} />
                                                            <InfoDiv field="CCCD" value={nk.cccd} />
                                                            <InfoDiv
                                                                field="Quan hệ với chủ hộ"
                                                                value={nk.quan_he_chu_ho}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                                {trackBackHK?.data[selectedIndex]?.moi?.nhanKhaus?.map((nk) => {
                                                    return (
                                                        <div className={cx('nk-wrapper')}>
                                                            <InfoDiv field="Tên" value={nk.ten} />
                                                            <InfoDiv field="CCCD" value={nk.cccd} />
                                                            <InfoDiv
                                                                field="Quan hệ với chủ hộ"
                                                                value={nk.quan_he_chu_ho}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </Col>
                                    </Row>
                                </Fragment>
                            ) : (
                                <div className="second-header">Không có thay đổi trong khoảng thời gian đã chọn</div>
                            )}
                        </Fragment>
                    )}
                </Col>
            </Row>
        </div>
    );
}

export default HouseholdHistory;
