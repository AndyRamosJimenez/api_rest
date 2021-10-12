const express = require('express');
const router = express.Router();

router.get('/users' , (req, res)=>{
  const{ limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    })
  }else{
    res.json('na hay parametros')
  }
})

module.exports = router;

