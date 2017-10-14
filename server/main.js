import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

Meteor.publish(null, function() {
  return Meteor.users.find({_id: this.userId}, { fields: { rankedList: 1 }});
});
  // code to run on server at startup
});
