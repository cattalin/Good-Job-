const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('../models/user');
const Video = require('../models/video');
const Voters=require('../models/voter');

// Update user class, will be triggered by the frontend (idea: can be changed to be triggered once per minute)
module.exports.updateUserClass = function(userId, callback){
    
    User.getUserById(userId._id,(err,user)=>{
        if(err) throw err;
        console.log("the result is "+user);
         let q = {
                sort:   '_id',
                select: user.username,
                limit:  null,
                skip:   0,
                from:   null,
                to:     null
            };
            Video.getVideos(q,(err1,videos)=>{
                if (err1) throw err1;
                let newUserClassValue=0;//incepe formula
                videos.forEach(function (element) {
                    newUserClassValue+=element.rating;
                   }, this);
                if(videos.length==0)
                    newUserClassValue=0;    
                else newUserClassValue=newUserClassValue/videos.length;//aici se termina formula
                console.log( newUserClassValue +" "+videos.length);
                let newUserClass='X';
                if(newUserClassValue<=1 || videos.length<=1)//treshhold
                    newUserClass='A';
                else if(newUserClassValue<=2 ||videos.length<=2)
                    newUserClass='B';
                    else if(newUserClassValue<=3|| videos.length<=3)
                        newUserClass='C';
                        else if(newUserClassValue<=4 || videos.length<=4)
                             newUserClass='D';
                            else newUserClass='E';
                if(!(newUserClass.indexOf(user.class)>-1))//daca s-a schimbat clasa acestui user
                    User.updateUserClass({id: user._id , class: newUserClass},(erro,us)=>{
                        if(erro)
                            throw erro;
                    });
                console.log("vechea clasa : "+user.class+" , "+"noua clasa : "+ newUserClass);
                callback(null,{oldClass : user.class , newClass : newUserClass });//trimit catre frontend vechea si noua clasa                    
            })
    })
}