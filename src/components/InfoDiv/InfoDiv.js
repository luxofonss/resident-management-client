import React from 'react';
import { Link } from 'react-router-dom';
import styles from './InfoDiv.module.sass';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function InfoDiv(params) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('field')}>{params.field}: </div>
            <div className={cx('value')}>{' ' + params.value}</div>
        </div>
    );
}

export default InfoDiv;
