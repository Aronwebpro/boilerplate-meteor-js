import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

//Antd
import message from 'antd/lib/message';

/**
 * Meteor Login Handler
 * @param email
 * @param password
 * @param callback
 * @return Callback -> Function
 */
const logIn = ({ email, password }, callback) => {
    check(email, String);
    check(password, String);
    Meteor.loginWithPassword({ email }, password, (e, r) => {
        if (e) {
            alert(e.reason);
        } else {
            message.success('Login successful');
            if (callback) {
                return callback();
            }
        }
    });
};

export {
    logIn
};