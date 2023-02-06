import classNames from 'classnames/bind';
import AppForm from '~/components/AppForm';
import styles from './AddHousehold.module.sass';
import AppInput from '~/components/AppInput';
import { Button, Modal, notification } from 'antd';
import { useEffect, useState } from 'react';
import AppButton from '~/components/AppButton/AppButton';
import { THEM_HK } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';
import useDebounceValue from '~/hooks/useDebounceValue';
import { LAY_NK } from '../../../Resident/redux/action';
import { REQUEST_STATE } from '~/app-configs';
import AppSelectApi from '~/components/AppSelectApi';

const cx = classNames.bind(styles);

function AddHousehold(props) {
    const [cccd, setCccd] = useState('');
    const nkInfo = useSelector((state) => state.resident.list);
    const themHK = useSelector((state) => state.household.themHK);
    const dispatch = useDispatch();
    const searchValue = useDebounceValue(cccd);

    let submitData = {};

    const onSubmit = (data) => {
        console.log('data', data);
        submitData.chu_ho_id = nkInfo?.data?.data[0].id;
        submitData.dia_chi = data.dia_chi;
        console.log(submitData);
        dispatch(THEM_HK(submitData));
    };

    useEffect(() => {
        dispatch(LAY_NK({ condition: { cccd: searchValue } }));
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
    }, [themHK?.state]);

    const onChange = (e) => {
        setCccd(e.target.value);
    };

    return (
        <div style={{ width: '40%', minWidth: '400px', margin: '0 auto' }}>
            <div className="page-header">Thêm hộ khẩu mới</div>
            <span>(*): Các trường bắt buộc nhập</span>
            <AppForm onSubmit={(data) => onSubmit(data)}>
                <AppInput onChange={(e) => onChange(e)} type="number" label="CCCD chủ hộ" required></AppInput>
                {/* <AppSelectApi apiURL = ''/> */}
                {nkInfo?.data?.data[0] && (
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
                )}
                <AppInput type="text" label="Địa chỉ" name="dia_chi" required></AppInput>
                <AppButton disabled={nkInfo?.data?.data[0] ? false : true} type="submit">
                    Thêm
                </AppButton>
            </AppForm>
        </div>
    );
}

export default AddHousehold;
