import { Meteor } from 'meteor/meteor';
import RankedList from '/imports/lib/collections/rankedList/rankedlist.js';

Meteor.publish('rankedList', function (userId) {
  return RankedList.find({ userId });
});
