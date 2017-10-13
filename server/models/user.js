import { Meteor } from 'meteor/meteor';

const UserSchema = new SimpleSchema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  selectedIcon: {
    type: String,
    optional: true,
  },
  userRole: {
    type: String,
  },
  companyName: {
    type: String,
    optional: true,
  }
});

Meteor.users.attachSchema(UserSchema);
