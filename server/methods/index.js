import { Meteor } from 'meteor/meteor';
import fs from 'fs';

Meteor.methods({
  'icons.getIconNames'() {
     console.log(process.env.PWD);
     const iconsPath = `${process.env.PWD}/public/icons/`;
     return new Promise(function(resolve, reject) {
       fs.readdir(iconsPath, function(err, items) {
         if (err) resolve(null);
         console.log(items)
         resolve(items);
       });       
     });
  },
  'registerNewUser'({ userRole, companyName, selectedIcon, password, email }) {
     new SimpleSchema({
       companyName: { type: String, optional: true },
       selectedIcon: { type: String, optional: true },
       userRole: { type: String },
       password: { type: String },
       email: { type: String },
     }).validate({ userRole, companyName, selectedIcon, password, email });
     const user = Meteor.users.findOne({ email })
     if (user) throw new Meteor.Error('error', `user with email ${email} already exists`);
     const userObj = { userRole, companyName, selectedIcon, password, email };
     const newUser = Meteor.users.insert(userObj);
     if (newUser) return true; 
  }
})
