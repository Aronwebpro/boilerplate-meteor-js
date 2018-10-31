import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
//Api
import { logIn } from '../../../api/login';

//Antd
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

//Styles
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
    outerWrapper: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ececec'
    },
    innerWrapper: {
        maxWidth: 400,
        width: '100%',
        marginLeft: 10,
        marginRight: 10
    },
    title: {
        marginBottom: 20,
        textAlign: 'center'
    },
    loginButton: {
        width: '100%'
    }
});

class AdminCreateForm extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.createAdminAccount}>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder="Email"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className={css(styles.loginButton)}>
                        Create Admin Account
                    </Button>
                </FormItem>
            </Form>
        );
    }

    createAdminAccount = (e) => {
        const { setAdminCreated } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email } = values;
                Meteor.call('/admin/users/createAdmin', email, (e, r) => {
                    if (e) {
                        console.log(e);
                    } else {
                        setAdminCreated();
                    }
                });
            }
        });
    };
}

AdminCreateForm.propTypes = {
    form: PropTypes.object.isRequired,
    setAdminCreated: PropTypes.func.isRequired,
};

class NormalLoginForm extends React.Component {
    state = {
        redirect: false,
    };

    render() {
        const { redirect } = this.state;
        const { getFieldDecorator } = this.props.form;
        return redirect ? (
            <Redirect to="/dashboard"/>
        ) : (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }}/>} placeholder="Email"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password" placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className={css(styles.loginButton)}>
                        Log in
                    </Button>
                </FormItem>
            </Form>
        );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email, password } = values;
                logIn({ email, password }, () => this.setState({ redirect: true }));
            }
        });
    };
}

NormalLoginForm.propTypes = {
    form: PropTypes.object.isRequired,
};

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
const WrappedAdminCreateForm = Form.create()(AdminCreateForm);

class Login extends React.Component {
    state = {
        isFirstUser: false,
        adminCreated: false
    };

    render() {
        return (
            <div className={css(styles.outerWrapper)}>
                <div className={css(styles.innerWrapper)}>
                    <h1 className={css(styles.title)}>Central Parks</h1>
                    {this.state.isFirstUser ? (
                        this.state.adminCreated ? (
                            <div style={{ textAlign: 'center' }}>Check your email to continue registration</div>
                        ) : (
                            <WrappedAdminCreateForm setAdminCreated={() => this.setState({ adminCreated: true })}/>
                        )
                    ) : (
                        <WrappedNormalLoginForm/>
                    )}
                </div>
            </div>
        );
    }

    componentDidMount() {
        Meteor.call('/admin/users/isFirstUser', (e, isFirstUser) => this.setState({ isFirstUser }));
    }
}

export default Login;