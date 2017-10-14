import { Meteor } from 'meteor/meteor';

Meteor.publish('nonProfits', function () {
  return Meteor.users.find({ 'profile.userRole': 'organization' }, { fields: { profile: 1 } });
});
