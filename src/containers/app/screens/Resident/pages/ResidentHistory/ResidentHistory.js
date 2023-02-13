import { Button, Col, Row } from 'antd';
import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { TRACK_BACK_NK } from '../../redux/action';
import styles from './ResidentHistory.module.sass';
import moment from 'moment';
import InfoDiv from '~/components/InfoDiv';
import { select } from 'redux-saga/effects';
import AppForm from '~/components/AppForm';
import AppDateInput from '~/components/AppDateInput';
import AppButton from '~/components/AppButton/AppButton';

const cx = classNames.bind(styles);

function ResidentHistory(props) {
    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const trackBackNK = useSelector((state) => state.resident.trackBackNK);

    const { id } = useParams();

    useEffect(() => {
        dispatch(
            TRACK_BACK_NK({
                id: id,
                params: {
                    startDate: '2000-12-20',
                    endDate: moment(Date.now()).format('YYYY-MM-DD'),
                },
            }),
        );
    }, []);

    console.log('trackBack', trackBackNK);

    const onSubmit = (data) => {
        dispatch(
            TRACK_BACK_NK({
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
            case 'don_dinh_chinh_nhan_khau':
                return 'Đính chính nhân khẩu';
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
                    {trackBackNK.state === 'SUCCESS' && (
                        <div>
                            {trackBackNK.data.map((trackBack, index) => {
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
                    {trackBackNK.state === 'SUCCESS' && (
                        <Fragment>
                            {trackBackNK?.data[selectedIndex] ? (
                                <Fragment>
                                    <div className="second-header">
                                        {getType(trackBackNK?.data[selectedIndex]?.type)}
                                    </div>
                                    <Row gutter={24}>
                                        <Col xs={12}>
                                            <div className="third-header">Thông tin cũ</div>
                                            {/* <InfoDiv field="ID" value={trackBackNK?.data[selectedIndex]?.cu?.id} />
                                            <InfoDiv
                                                field="Chủ hộ"
                                                value={trackBackNK?.data[selectedIndex]?.cu?.ten_chu_ho}
                                            />
                                            <InfoDiv
                                                field="Địa chỉ"
                                                value={trackBackNK?.data[selectedIndex]?.cu?.dia_chi}
                                            /> */}
                                            <InfoDiv
                                                field="Ngày sinh"
                                                value={trackBackNK?.data[selectedIndex]?.cu.ngay_sinh}
                                            />
                                            <InfoDiv field="CCCD" value={trackBackNK?.data[selectedIndex]?.cu.cccd} />
                                            <InfoDiv
                                                field="Nơi cấp CCCD"
                                                value={trackBackNK?.data[selectedIndex]?.cu.cccd_noi_cap}
                                            />
                                            <InfoDiv
                                                field="Ngày cấp CCCD"
                                                value={trackBackNK?.data[selectedIndex]?.cu.cccd_ngay_cap}
                                            />
                                            <InfoDiv
                                                field="Dân tộc"
                                                value={trackBackNK?.data[selectedIndex]?.cu.dan_toc}
                                            />
                                            <InfoDiv field="Email" value={trackBackNK?.data[selectedIndex]?.cu.email} />
                                            <InfoDiv
                                                field="Bí danh"
                                                value={trackBackNK?.data[selectedIndex]?.cu.bi_danh}
                                            />
                                            <InfoDiv
                                                field="Nghề nghiệp"
                                                value={trackBackNK?.data[selectedIndex]?.cu.nghe_nhiep}
                                            />
                                            <InfoDiv
                                                field="Nghề nghiệp"
                                                value={trackBackNK?.data[selectedIndex]?.cu.nghe_nhiep}
                                            />
                                            <InfoDiv
                                                field="Nguyên quán"
                                                value={trackBackNK?.data[selectedIndex]?.cu.nguyen_quan}
                                            />
                                            <InfoDiv
                                                field="Nơi làm việc"
                                                value={trackBackNK?.data[selectedIndex]?.cu.noi_lam_viec}
                                            />
                                            <InfoDiv
                                                field="Nơi sinh"
                                                value={trackBackNK?.data[selectedIndex]?.cu.noi_sinh}
                                            />
                                            <InfoDiv
                                                field="Nơi sinh"
                                                value={trackBackNK?.data[selectedIndex]?.cu.noi_sinh}
                                            />
                                            <InfoDiv
                                                field="Số điện thoại"
                                                value={trackBackNK?.data[selectedIndex]?.cu.so_dien_thoai}
                                            />
                                            <InfoDiv
                                                field="Tôn giáo"
                                                value={trackBackNK?.data[selectedIndex]?.cu.ton_giao}
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <div className="third-header">Thông tin mới</div>

                                            {/* <InfoDiv field="ID" value={trackBackNK.data[selectedIndex]?.moi.id} />
                                            <InfoDiv
                                                field="Chủ hộ"
                                                value={trackBackNK.data[selectedIndex]?.moi.ten_chu_ho}
                                            />
                                            <InfoDiv
                                                field="Địa chỉ"
                                                value={trackBackNK.data[selectedIndex]?.moi.dia_chi}
                                            /> */}
                                            <InfoDiv
                                                field="Ngày sinh"
                                                value={trackBackNK.data[selectedIndex]?.moi.ngay_sinh}
                                            />
                                            <InfoDiv field="CCCD" value={trackBackNK.data[selectedIndex]?.moi.cccd} />
                                            <InfoDiv
                                                field="Nơi cấp CCCD"
                                                value={trackBackNK.data[selectedIndex]?.moi.cccd_noi_cap}
                                            />
                                            <InfoDiv
                                                field="Ngày cấp CCCD"
                                                value={trackBackNK.data[selectedIndex]?.moi.cccd_ngay_cap}
                                            />
                                            <InfoDiv
                                                field="Dân tộc"
                                                value={trackBackNK.data[selectedIndex]?.moi.dan_toc}
                                            />
                                            <InfoDiv field="Email" value={trackBackNK.data[selectedIndex]?.moi.email} />
                                            <InfoDiv
                                                field="Bí danh"
                                                value={trackBackNK.data[selectedIndex]?.moi.bi_danh}
                                            />
                                            <InfoDiv
                                                field="Nghề nghiệp"
                                                value={trackBackNK.data[selectedIndex]?.moi.nghe_nhiep}
                                            />
                                            <InfoDiv
                                                field="Nghề nghiệp"
                                                value={trackBackNK.data[selectedIndex]?.moi.nghe_nhiep}
                                            />
                                            <InfoDiv
                                                field="Nguyên quán"
                                                value={trackBackNK.data[selectedIndex]?.moi.nguyen_quan}
                                            />
                                            <InfoDiv
                                                field="Nơi làm việc"
                                                value={trackBackNK.data[selectedIndex]?.moi.noi_lam_viec}
                                            />
                                            <InfoDiv
                                                field="Nơi sinh"
                                                value={trackBackNK.data[selectedIndex]?.moi.noi_sinh}
                                            />
                                            <InfoDiv
                                                field="Nơi sinh"
                                                value={trackBackNK.data[selectedIndex]?.moi.noi_sinh}
                                            />
                                            <InfoDiv
                                                field="Số điện thoại"
                                                value={trackBackNK.data[selectedIndex]?.moi.so_dien_thoai}
                                            />
                                            <InfoDiv
                                                field="Tôn giáo"
                                                value={trackBackNK.data[selectedIndex]?.moi.ton_giao}
                                            />
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

export default ResidentHistory;
