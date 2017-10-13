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
  } 
})
