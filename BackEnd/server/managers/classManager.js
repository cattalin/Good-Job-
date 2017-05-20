const mongoose = require('mongoose');
const config = require('../config/database');
const classrules=require('../config/classrules');
const User = require('../models/user');
const Follow = require('../models/follow');
const Video = require('../models/video');
const Voters=require('../models/voter');

// Update user class, will be triggered by the frontend (idea: can be changed to be triggered once per minute)

GetProcentage=function(rules){
    //console.log(rules);
    let procentage=0.0;
    if(rules.nrOfVideos>=classrules[rules._class].nrOfVideos)
        procentage+=0.2;
    else if(rules.nrOfVideos!=0)
        procentage+=classrules[rules._class].nrOfVideos/rules.nrOfVideos*0.2;
    //console.log(procentage);
    if(rules.nrOfFollowers>=classrules[rules._class].nrOfFollowers)
        procentage+=0.2;
    else if(rules.nrOfFollowers!=0)
        procentage+=classrules[rules._class].nrOfFollowers/rules.nrOfFollowers*0.2;
    //console.log(procentage);
    if(rules.nrOfGoodVids>=classrules[rules._class].nrOfGoodVids)
        procentage+=0.2;
    else if(rules.nrOfGoodVids!=0)
        procentage+=classrules[rules._class].nrOfGoodVids/rules.nrOfGoodVids *0.2;
       //console.log(procentage); 
    if(rules.nrOfDecentVids>=classrules[rules._class].nrOfDecentVids)
        procentage+=0.2;
    else if(rules.nrOfDecentVids!=0)
        procentage+=classrules[rules._class].nrOfDecentVids/rules.nrOfDecentVids*0.2;
    //console.log(procentage);
    if(rules.rateOfDecentVideos>=classrules[rules._class].rateOfDecentVideos)
        procentage+=0.2;
    else if(rules.rateOfDecentVideos!=0)
        procentage+=classrules[rules._class].rateOfDecentVideos/rules.rateOfDecentVideos*0.2;
        //console.log(procentage);
        //console.log(procentage.toFixed(2));
        //console.log("deasupra");
    return procentage.toFixed(2);
}

module.exports.updateUserClass = function(userId, callback){
    let rules = {
        nrOfVideos: 0,
        nrOfFollowers: 0,
        nrOfGoodVids: 0,
        nrOfDecentVids: 0,
        rateOfDecentVideos:0,
        nrOfVotes:1,
        _class:"A"
    }
    User.getUserById(userId._id,(err,user)=>{
        if(err) throw err;
        //console.log("the result is "+user);
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
                //obtinem valorile importante
                videos.forEach(function (element) {
                    if(element.rating>3)
                        rules.nrOfDecentVids++;
                    if(element>=4)
                        rules.nrOfGoodVids++;
                   }, this);
                rules.nrOfVideos=videos.length;
                if(rules.nrOfVideos!=0)
                    rules.rateOfDecentVideos=rules.nrOfDecentVids/rules.nrOfVideos;
                else rules.rateOfDecentVideos=0;
                Follow.countFollowers(userId, (err, nrOfFollowers) => {
                // verificam cate nivele a crescut baiatu
                rules.nrOfFollowers=nrOfFollowers;
                let procentage=0.0;
                rules._class=user.class;
                do {//console.log(procentage);
                    if(rules._class.indexOf("top")>-1)//daca are cel mai mare nivel posibil
                        procentage=-1;
                    else{
                        procentage=GetProcentage(rules);
                        if(procentage==1)
                            rules._class=classrules[rules._class].nameOfnextRank;
                    }
                }while(procentage==1);
                //console.log(procentage+rules);
                if(!(rules._class.indexOf(user.class)>-1))//daca s-a schimbat clasa acestui user
                    User.updateUserClass({id: user._id , class: rules._class},(erro,us)=>{
                        if(erro)
                            throw erro;
                    });
                //console.log("vechea clasa : "+user.class+" , "+"noua clasa : "+ rules._class);
                callback(null,{oldClass : user.class , newClass : rules._class, progress:rules ,goal:classrules[rules._class] });//trimit catre frontend vechea si noua clasa                    
            })
        })
    })
}