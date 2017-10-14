import { Meteor } from 'meteor/meteor';

const UserSchema = new SimpleSchema({
  username: {
    type: String,
  },
  profile: {
    type: Object,
    optional: true,
    blackbox: true
  },
  createdAt: {
    type: Date,
  },
  services: {
    type: Object,
    blackbox: true
  },
  emails: {
    type: [Object],
    blackbox: true
  },
  rankedList: {
    type: String,
    optional: true,
  },
});

Meteor.users.attachSchema(UserSchema);
