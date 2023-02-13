import React, { useState, useEffect } from 'react';
import { notification, Spin } from 'antd';
import { REQUEST_STATE } from '~/app-configs';
import { LOGIN } from '~/redux/actions/user';
// import { LOGIN, SIGNUP } from '~/redux/actions/user';
import styles from './Login.module.sass';
import classNames from 'classnames/bind';
import { Col, Row } from 'antd';
import { Eye, EyeSlash, FbIcon, GoogleIcon, TwitterIcon } from '~/assets/svgs';
import { getEmailValidationRegex, getPhoneNumberValidationRegex } from '~/helpers/validator';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppButton from '~/components/AppButton/AppButton';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
// import images from '~/assets/images';

const cx = classNames.bind(styles);

function Login({ authAction = 'login' }) {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [action, setAction] = useState(authAction);

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        dispatch(LOGIN(data));
    };

    const onSignUp = (data) => {
        // dispatch(SIGNUP(data));
    };

    useEffect(() => {
        if (user.authState == REQUEST_STATE.SUCCESS) {
            history.push('/');
        }
        if (user?.authState === REQUEST_STATE.ERROR && action === 'login') {
            notification.error({
                message: 'Fail',
                description: 'Email or password is incorrect!',
            });
        }
        if (user?.authState === REQUEST_STATE.ERROR && action === 'sign up') {
            notification.error({
                message: 'Fail',
                description: 'Email or phone number has been used!',
            });
        }
    }, [user?.authState]);

    return (
        <div className={cx('login-wrapper')}>
            <Row className={cx('login-main', 'mt-0  gx-5')}>
                <Col className={cx('login')} xs={12}>
                    <div className={cx('header-nav', 'mt-2', 'd-flex justify-content-between')}>
                        <div
                            className={cx(
                                'nav-item',
                                'd-flex justify-content-center',
                                'fs-4',
                                action === 'login' ? 'active' : '',
                            )}
                            onClick={() => {
                                setAction('login');
                            }}
                        >
                            Sign in
                        </div>
                        {/* <div
                            className={cx(
                                'nav-item',
                                'd-flex justify-content-center',
                                'fs-4',
                                action !== 'login' ? 'active' : '',
                            )}
                            onClick={() => {
                                setAction('sign up');
                            }}
                        >
                            Sign up
                        </div> */}
                        <div className={cx('slider-tab')}></div>
                    </div>
                    {action === 'login' && (
                        <Form onSubmit={handleSubmit(onSubmit)} className={cx('sign-form')}>
                            <Form.Group className="mb-4" controlId="formEmail">
                                <Form.Label className={cx('input-label')}>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                    autoComplete="false"
                                    {...register('username', {
                                        required: true,
                                        // pattern: getEmailValidationRegex(),
                                    })}
                                />
                                {errors.email?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                                {errors.email?.type === 'pattern' && (
                                    <div className={cx('auth__error')}>Email is not valid!</div>
                                )}
                            </Form.Group>
                            <Form.Group className={cx('password-input', 'mb-4')} controlId="formPassword">
                                <Form.Label className={cx('input-label')}>Password</Form.Label>
                                <div
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className={cx('eye-icon', show === true ? '' : 'hidden')}
                                >
                                    <Eye />
                                </div>
                                <div
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className={cx('eye-icon', show === false ? '' : 'hidden')}
                                >
                                    <EyeSlash />
                                </div>
                                <Form.Control
                                    type={show ? 'text' : 'password'}
                                    {...register('password', { required: true })}
                                    className="effect effect__pw"
                                    placeholder="Enter your password"
                                    autoComplete="false"
                                />
                                {errors.password?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                                {/* <button className="auth__box is-flex al-center ju-center">
                                    {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : 'Đăng nhập'}
                                </button> */}
                                <div className={cx('bottom-login')}>
                                    <div className={cx('remember-box')}>
                                        <input
                                            id="remember-login"
                                            type="checkbox"
                                            name="remember-login"
                                            // {...register('remember-login', { required: false })}
                                        />
                                        <label htmlFor="remember-login">Remember me</label>
                                    </div>
                                    <div className={cx('forget-password')}>
                                        <Link to="#">Forgot password?</Link>
                                    </div>
                                </div>
                            </Form.Group>
                            <div className={cx('submit-btn', 'btn-wrapper')}>
                                {/* <Button className={cx('submit')}>
                                    {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : 'Sign in'}
                                </Button> */}
                                <AppButton type="sumit">
                                    {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : 'Sign in'}
                                </AppButton>
                            </div>
                        </Form>
                    )}

                    {action === 'login' && (
                        <div className={cx('social-login d-flex align-items-center flex-column mt-4')}>
                            <div className={cx('social-login-heading mb-3')}>Or login with</div>
                            <div className={cx('social')}>
                                <FbIcon />
                                <TwitterIcon />
                                <GoogleIcon />
                            </div>
                        </div>
                    )}
                    {action !== 'login' && (
                        <Form onSubmit={handleSubmit(onSignUp)} className={cx('sign-form mt-5')}>
                            <Row>
                                <Col xs={24}>
                                    <Form.Group className="mb-1" controlId="full_name">
                                        <Form.Label className={cx('input-label')}>Full name*</Form.Label>
                                        <Form.Control
                                            {...register('full_name', {
                                                required: true,
                                            })}
                                            name="full_name"
                                            type="text"
                                            placeholder="Full name"
                                        />
                                        {errors.full_name?.type === 'required' && (
                                            <div className={cx('auth__error')}>This field is required!</div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-1" controlId="phone_num">
                                <Form.Label className={cx('input-label')}>Phone number*</Form.Label>
                                <Form.Control
                                    {...register('phone_num', {
                                        required: true,
                                        pattern: getPhoneNumberValidationRegex(),
                                    })}
                                    name="phone_num"
                                    type="text"
                                    placeholder="Enter your phone number"
                                />
                                {errors.phone_num?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                                {errors.phone_num?.type === 'pattern' && (
                                    <div className={cx('auth__error')}>Phone number is not valid!</div>
                                )}
                            </Form.Group>
                            <Form.Group className="mb-1" controlId="email">
                                <Form.Label className={cx('input-label')}>Email address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                    autoComplete="false"
                                    {...register('email', {
                                        required: true,
                                        pattern: getEmailValidationRegex(),
                                    })}
                                    name="email"
                                />
                            </Form.Group>
                            {errors.email?.type === 'required' && (
                                <div className={cx('auth__error')}>This field is required!</div>
                            )}
                            <Form.Group className="mb-1" controlId="address">
                                <Form.Label className={cx('input-label')}>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter email"
                                    autoComplete="false"
                                    {...register('address', {
                                        required: true,
                                    })}
                                    name="address"
                                />
                                {errors.address?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                            </Form.Group>
                            <Form.Group className={cx('password-input', 'mb-1')} controlId="formPassword">
                                <Form.Label className={cx('input-label')}>Password</Form.Label>
                                <div
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className={cx('eye-icon', show === true ? '' : 'hidden')}
                                >
                                    <Eye />
                                </div>
                                <div
                                    onClick={() => {
                                        setShow(!show);
                                    }}
                                    className={cx('eye-icon', show === false ? '' : 'hidden')}
                                >
                                    <EyeSlash />
                                </div>
                                <Form.Control
                                    type={show ? 'text' : 'password'}
                                    {...register('password', { required: true })}
                                    className="effect effect__pw"
                                    autoComplete="false"
                                    name="password"
                                    placeholder="Enter your password"
                                />
                                {errors.password?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )}
                                {/* {errors.password?.type === 'required' && (
                                    <div className={cx('auth__error')}>This field is required!</div>
                                )} */}
                            </Form.Group>
                            <div className={cx('mx-auto', 'btn-wrapper')}>
                                <AppButton>
                                    {user?.authState === REQUEST_STATE.REQUEST ? <Spin /> : 'Sign up'}
                                </AppButton>
                            </div>
                        </Form>
                    )}
                </Col>
                <Col className={cx('auth-right')} xs={12}>
                    {action === 'login' && (
                        <div
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundSize: 'cover',
                                backgroundImage:
                                    'url(https://img.freepik.com/premium-vector/happy-new-year-2023-chinese-new-year-year-cat-happy-lunar-new-year-2023-cat-illustration_692630-157.jpg?w=2000)',
                            }}
                        ></div>
                    )}
                    {/* {action !== 'login' && (
                        <div className={cx('sign-up-right')}>
                            <div className={cx('mt-5 text-center mb-3')}> or Sign Up via</div>
                            <div
                                className={cx('button-white', 'mb-3 d-flex justify-content-center align-items-center')}
                            >
                                <div className={cx('logo-social-signup')}>
                                    <FbIcon />
                                </div>
                                <div>Facebook</div>
                            </div>
                            <div
                                className={cx('button-white', 'mb-3 d-flex justify-content-center align-items-center')}
                            >
                                <div className={cx('logo-social-signup')}>
                                    <TwitterIcon />
                                </div>
                                <div>Twitter</div>
                            </div>
                            <div
                                className={cx('button-white', 'mb-3 d-flex justify-content-center align-items-center')}
                            >
                                <div className={cx('logo-social-signup')}>
                                    <GoogleIcon />
                                </div>
                                <div>Google</div>
                            </div>
                            <span>
                                by clicking submit you agree to the
                                <a href="/"> Terms </a>
                                and
                                <a href="/"> Conditions </a>
                            </span>
                            <div
                                className={cx('mt-4 text-center')}
                                style={{
                                    width: '40%',
                                    height: '130px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundImage:
                                        'url("https://assets.stickpng.com/images/5842951fa6515b1e0ad75ad0.png")',
                                }}
                            ></div>
                        </div>
                    )} */}
                </Col>
            </Row>
        </div>
    );
}

export default Login;
