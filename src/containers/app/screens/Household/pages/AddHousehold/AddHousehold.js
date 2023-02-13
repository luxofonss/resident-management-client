import classNames from 'classnames/bind';
import AppForm from '~/components/AppForm';
import styles from './AddHousehold.module.sass';
import AppInput from '~/components/AppInput';
import { Button, Col, Modal, notification, Row } from 'antd';
import { useEffect, useState } from 'react';
import AppButton from '~/components/AppButton/AppButton';
import { LAY_HK_FAIL, LAY_HK_RESET, THEM_HK, THEM_HK_FAIL, THEM_HK_RESET } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import useDebounceValue from '~/hooks/useDebounceValue';
import { LAY_NK, LAY_NK_FAIL } from '../../../Resident/redux/action';
import { REQUEST_STATE } from '~/app-configs';
import AppSelectApi from '~/components/AppSelectApi';
import AppInputSearch from '~/components/AppInputSearch';

const cx = classNames.bind(styles);

function AddHousehold(props) {
    const [cccd, setCccd] = useState('');
    const nkInfo = useSelector((state) => state.resident.list);
    const themHK = useSelector((state) => state.household.themHK);
    const dispatch = useDispatch();
    const searchValue = useDebounceValue(cccd, 1000);

    let submitData = {};

    const onSubmit = (data) => {
        console.log('data', data);
        submitData.chu_ho_id = nkInfo?.data?.data[0].id;
        submitData.dia_chi = data.dia_chi;
        console.log(submitData);
        dispatch(THEM_HK(submitData));
    };

    useEffect(() => {
        dispatch(LAY_HK_RESET());
    }, []);

    useEffect(() => {
        console.log('searchValue', searchValue);
        if (searchValue !== '') dispatch(LAY_NK({ cccd: searchValue }));
        else {
            dispatch(LAY_NK_FAIL());
        }
    }, [searchValue]);

    useEffect(() => {
        if (themHK.state == REQUEST_STATE.SUCCESS) {
            notification.success({
                message: 'Success',
                description: 'Thêm hộ khẩu thành công!',
            });
        }
        if (themHK?.state === REQUEST_STATE.ERROR) {
            notification.error({
                message: 'Error',
                description: 'Thêm hộ khẩu thất bại!',
            });
        }
        dispatch(THEM_HK_RESET());
    }, [themHK?.state]);

    const onChange = (e) => {
        console.log(e.target.value);
        setCccd(e.target.value);
    };

    console.log('nkInfo', nkInfo);

    return (
        <div style={{ width: '40%', minWidth: '400px', margin: '0 auto' }}>
            <div className={cx('page-header')}>Thêm hộ khẩu mới</div>
            <span>(*): Các trường bắt buộc nhập</span>
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <Row gutter={[0, 12]}>
                    <Col xs={24}>
                        <AppInputSearch onChange={onChange} type="number" label="CCCD chủ hộ" required></AppInputSearch>
                    </Col>
                    {nkInfo?.state === 'SUCCESS' && nkInfo?.data?.data.length > 0 && (
                        <Col xs={24}>
                            <AppInput
                                type="text"
                                label="Chủ hộ"
                                defaultValue={
                                    nkInfo?.data?.data[0].ho +
                                    ' ' +
                                    nkInfo?.data?.data[0].ten_dem +
                                    ' ' +
                                    nkInfo?.data?.data[0].ten
                                }
                                disabled
                            ></AppInput>
                        </Col>
                    )}
                    <Col xs={24}>
                        <AppInput type="text" label="Địa chỉ" name="dia_chi" required></AppInput>
                    </Col>
                    <Col xs={24}>
                        <AppButton
                            style={{ width: '100%', marginTop: '24px' }}
                            disabled={nkInfo?.data?.data[0] ? false : true}
                            type="submit"
                        >
                            Thêm
                        </AppButton>
                    </Col>
                </Row>
            </AppForm>
        </div>
    );
}

export default AddHousehold;
