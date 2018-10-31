import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

//Ant Design
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
const FormItem = Form.Item;

//Styles
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        maxWidth: '400px',
        padding: '10px',
    },
    submitButton: {
        width: '100%'
    },
});

class ManagePassword extends React.Component {
    state = {
        isComplete: false,
        isAdmin: false,
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { isComplete, isAdmin } = this.state;
        return (
            <div className={css(styles.content)}>
                {!isComplete ? (
                    <div className={css(styles.formContainer)}>
                        <div>
                            {this.props.firstPassword ? (
                                <h2>Create You Password</h2>
                            ) : (
                                <h2>Reset Your Password</h2>
                            )}
                        </div>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please enter a password.' }, { validator: this.validateToNextPassword }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password" placeholder="Password"/>
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('confirm', {
                                    rules: [{ required: true, message: 'Please confirm your password.' }, { validator: this.compareToFirstPassword }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ fontSize: 13 }}/>} type="password" placeholder="Re-Enter Password"/>
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className={css(styles.submitButton)}>
                                    {this.props.firstPassword ? (
                                        'Create Password'
                                    ) : (
                                        'Reset Password'
                                    )}
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                ) : (
                    <div>
                        {isAdmin ? (
                            <div>
                                <div>
                                    <div>
                                        <h1>
                                            Account Created Successfully
                                        </h1>
                                    </div>
                                    <div>
                                        <Button
                                            onClick={this.navigateTo.bind(this, '/dashboard')}
                                            type="primary"
                                            htmlType='button'
                                            className={css(styles.button)}
                                        >
                                            Go To Dashboard
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <div>
                                        <h1>Account Created Successfully</h1>
                                        <p>Now you can close this window</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    navigateTo = (path) => this.props.history.push(path);

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { password } = values;
                Accounts.resetPassword(this.props.token, password, (err) => {
                    if (err) {
                        message.error(err.reason || 'Something went wrong..');
                        console.log(err);
                    } else {
                        if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
                            this.setState({ isComplete: true, isAdmin: true });
                        } else {
                            this.setState({ isComplete: true });
                        }
                    }
                });
            }
        });
    };
}

ManagePassword.propTypes = {
    firstPassword: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
};

const ManagePasswordPage = withRouter(Form.create()(ManagePassword));

export default ManagePasswordPage;