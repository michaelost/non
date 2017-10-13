import { Meteor } from 'meteor/meteor';

const UserSchema = new SimpleSchema({
  username: {
    type: String,
  },
  profile: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Meteor.users.attachSchema(UserSchema);
