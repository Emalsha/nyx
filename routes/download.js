/**
 * Created by emalsha on 4/15/17.
 */

const express = require('express');
const router = express.Router();
const debug = require('debug')('nyx:router');

let Download = require('../model/Download');

router.post('/request',function(req,res){

    let newDownload = new Download({
        link:req.body.link,
        request_date:new Date(),
        request_user:req.user.username,
        state:'pending',
    });

    newDownload.save(function(err){
        if(err){ debug(err) };
        res.contentType('json');
        res.send({data:JSON.stringify(true)});

    })

});

router.post('/approve',function(req,res){

    Download.findById(req.body.download_id,function(err,download){
        if(err) {
            debug(err);
        }

        if(req.body.new_tags){
            let st = req.body.new_tags;
            let tags_array = st.split(',');
            download.tags = download.tags.concat(tags_array);
        }

        if(req.body.priority){
            download.priority = req.body.priority;
        }

        if(req.body.admin_note){
            download.admin_note = req.body.admin_note;
        }

        if(req.body.availability == 'true'){
            download.availability = 'public';
        }else{
            download.availability = 'private';
        }

        download.admin = req.user.username;
        download.admin_decision = true;
        download.admin_decision_date = new Date();
        download.state = 'approved';

        debug(download);
        download.save(function (err) {
            if(err){
                debug(err);
            }

            res.send('yeh');
        });

    })

});

// router.get('/getall',function (req, res) {
//     Download.find({},(err,downloads)=>{
//         if(err){
//             debug(err);
//         }
//         res.contentType('json');
//         res.send(downloads);
//     })
// });

module.exports = router;