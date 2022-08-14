const express = require("express");

const multer = require('multer');

const Case = require('../model/Case');

const router = express.Router();

var fs = require('fs');



const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });
console.log("upload.single('image')",upload.single('image'))
router.post('/addcase', upload.single('image'), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    try {
        let imageUrl =await `/uploads/${req.file.filename}`;
        
        const obj = await JSON.parse(req.body.localisation);

        let dataToInsert = {
            "image":imageUrl,
            "localisation":obj,
            "route":req.body.route.toUpperCase(),
            "caseType":req.body.caseType,
            "caseDet":req.body.caseDet,
            "gouve":req.body.gouve,
            "detail":req.body.detail
        }
        const newCase = new Case(dataToInsert);
        await newCase.save()
        await res.status(201).json({ msg: 'case added succesfuly' })   
    } catch (error) {
        console.log(error)
    }
});

router.get('/getallcases',async(req,res)=>{
    try{
        const allCases = await Case.find();
        await res.status(201).json(allCases);
    }catch(err){
        console.error("getting cases failed", err);
        res.status(401).json({ msg: `getting cases Failed` })
    }
})
router.get('/getcases/:type',async(req,res)=>{
    let reType = req.params.type.toLocaleUpperCase()
    try{
        const allCases = await Case.find({"caseType":reType});
        await res.status(201).json(allCases);
    }catch(err){
        console.error("getting cases failed", err);
        res.status(401).json({ msg: `getting cases Failed` })
    }
})
router.get('/getcases/gouve/:gov',async(req,res)=>{
    let reGouve = req.params.gov.toLocaleUpperCase()
   
    try{
        const allCases = await Case.find({"gouve":reGouve});
        await res.status(201).json(allCases);
    }catch(err){
        console.error("getting cases failed", err);
        res.status(401).json({ msg: `getting cases Failed` })
    }
})

router.get('/getcases/route/:rr',async(req,res)=>{
    let reRR = req.params.rr.toLocaleUpperCase()
    try{
        const allCases = await Case.find({"route":reRR});
        await res.status(201).json(allCases);
    }catch(err){
        console.error("getting cases failed", err);
        res.status(401).json({ msg: `getting cases Failed` })
    }
})


router.delete('/deleteall',async(req,res)=>{
    try {
        await Case.remove();
        await res.status(201).json("data deleted all");
    } catch (error) {
        console.error("delete cases failed", err);
        res.status(401).json({ msg: `delete cases Failed` })
    }
   
})



module.exports = router;