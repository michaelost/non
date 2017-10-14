import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const RankedListSchema = new SimpleSchema({
  userId: {
    type: String,
  },
  list: {
    type: [String],
    blackbox: true,
  }
  });

const RankedList = new Mongo.Collection('rankedList');

RankedList.attachSchema(RankedListSchema);

export default RankedList;
