import { check, Match } from 'meteor/check';

Meteor.methods({
    '/admin/users/isFirstUser': function () {
        console.log('isFirstUser', Meteor.users.find().count());
        return Meteor.users.find().count() === 0;
    },
    '/admin/users/createAdmin': function (email) {
        check(email, String);
        if (Meteor.users.find().count() > 0) {
            throw new Meteor.Error(403, 'An admin already exists');
        }
        const userId = Accounts.createUser({ email });
        return Accounts.sendEnrollmentEmail(userId);
    },
    '/admin/users/createUser': function (email) {
        check(email, String);
        if (!this.userId) {
            throw new Meteor.Error(403, 'You must be logged in to create a user');
        }
        const userId = Accounts.createUser({ email });
        return Accounts.sendEnrollmentEmail(userId);
    },
    '/admin/users/deleteUser': function (userId) {
        check(userId, String);
        if (!this.userId) {
            throw new Meteor.Error(403, 'You must be logged in to delete a user');
        }
        if (userId === this.userId) {
            throw new Meteor.Error(403, 'You can\'t delete yourself');
        }
        Meteor.users.remove({ _id: userId });
    },
});