Meteor.publish('nonProfits', function () {
  return Users.find({ 'profile.userRole': 'organization' }, { fields: { profile: 1 } } , {
    fields: { secretInfo: 1 }
  });
});
