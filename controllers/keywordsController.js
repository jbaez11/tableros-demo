const controller = {};

controller.list = (req,res) => {
    req.conexion((err,conn) =>{
        conn.query('SELECT * FROM basekeywords',( err, keywords) =>{
            if(err){
                res.json(err)
            }
           
            res.render('keywords',{
                data:keywords
            });
        } );
    });
}
/*
controller.save = (req,res) => {
    const data = req.body;
    req.getConnection((err,conn)=>{
        conn.query('INSERT INTO basekeywords set ?', [data], (err,rows)=>{

            if (req.url.includes('/add')) {
                res.redirect('/');
               }      
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM basekeywords WHERE id = ?", [id], (err, rows) => {
        res.render('edit', {
          data: rows[0]
        })
      });
    });
  };
  
  controller.update = (req, res) => {
    const { id } = req.params;
    const newKeyword = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE basekeywords set ? where id = ?', [newKeyword, id], (err, rows) => {
      res.redirect('/');
      
    });
    });
  };

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM basekeywords WHERE id = ?', [id], (err, rows) => {
        res.redirect('/');
      });
    });
  }*/

module.exports =  controller;