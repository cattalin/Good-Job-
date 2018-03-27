const mongoose = require('mongoose');
const config = require('../config/database');
const classrules=require('../config/classrules');
const User = require('../models/user');
const Follow = require('../models/follow');
const Video = require('../models/video');
const Voters=require('../models/voter');

// Update user class, will be triggered by the frontend (idea: can be changed to be triggered once per minute)

GetProcentage=function(rules){
    let procentage=0.0;
    if(rules.nrOfVideos>=classrules[rules._class].nrOfVideos)
        procentage+=0.2;
    else if(rules.nrOfVideos!=0)
        procentage+=classrules[rules._class].nrOfVideos/rules.nrOfVideos*0.2;
    if(rules.nrOfFollowers>=classrules[rules._class].nrOfFollowers)
        procentage+=0.2;
    else if(rules.nrOfFollowers!=0)
        procentage+=classrules[rules._class].nrOfFollowers/rules.nrOfFollowers*0.2;
    if(rules.nrOfGoodVids>=classrules[rules._class].nrOfGoodVids)
        procentage+=0.2;
    else if(rules.nrOfGoodVids!=0)
        procentage+=classrules[rules._class].nrOfGoodVids/rules.nrOfGoodVids *0.2;
    if(rules.nrOfDecentVids>=classrules[rules._class].nrOfDecentVids)
        procentage+=0.2;
    else if(rules.nrOfDecentVids!=0)
        procentage+=classrules[rules._class].nrOfDecentVids/rules.nrOfDecentVids*0.2;
    if(rules.rateOfDecentVideos>=classrules[rules._class].rateOfDecentVideos)
        procentage+=0.2;
    else if(rules.rateOfDecentVideos!=0)
        procentage+=classrules[rules._class].rateOfDecentVideos/rules.rateOfDecentVideos*0.2;
    return procentage.toFixed(2);
}

module.exports.updateUserClass = function(userId, callback){
    let rules = {
        nrOfVideos: 0,
        nrOfFollowers: 0,
        nrOfGoodVids: 0,
        nrOfDecentVids: 0,
        rateOfDecentVideos:0,
        _class:"A"
    }
    User.getUserById(userId._id,(err,user)=>{
        if(err) throw err;
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
                    if(element.rating>=4)
                        rules.nrOfGoodVids++;
                   }, this);
                rules.nrOfVideos=videos.length;
                if(rules.nrOfVideos!=0)
                    rules.rateOfDecentVideos=rules.nrOfDecentVids/rules.nrOfVideos;
                else rules.rateOfDecentVideos=0;

                Follow.countFollowers({followedId: userId._id}, (err, nrOfFollowers) => {
                // verificam cate nivele a crescut baiatu
                rules.nrOfFollowers=nrOfFollowers;
                let procentage=0.0;
                rules._class=user.class;
                do {
                    if(rules._class.indexOf("top")>-1)//daca are cel mai mare nivel posibil
                        procentage=-1;
                    else{
                        procentage=GetProcentage(rules);
                        if(procentage==1)
                            rules._class=classrules[rules._class].nameOfnextRank;
                    }
                }while(procentage==1);
                if(!(rules._class.indexOf(user.class)>-1))//daca s-a schimbat clasa acestui user
                    User.updateUserClass({id: user._id , class: classrules[classrules[rules._class].nameOfpreviosRank ].nameInDatabase},(erro,us)=>{
                        if(erro)
                            throw erro;
                    });
                callback(null,{ oldClass:user.class , 
                                newClass:classrules[classrules[rules._class].nameOfpreviosRank ].nameInDatabase,
                                previous:classrules[classrules[rules._class].nameOfpreviosRank ], 
                                progress:rules ,goal:classrules[rules._class] });//trimit catre frontend vechea si noua clasa                    
            })
        })
    })
}