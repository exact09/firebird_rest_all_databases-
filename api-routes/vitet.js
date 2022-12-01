const { json } = require("body-parser");
//app.use("/", router);

module.exports=function (router,Firebird,options) {
 
            //i lexon krejt shenimet prej tabele
            
            router.get('/vitet', (err, res) => {    //fillimi i endpoint per shpallje ne web server '/'-> emri i funksionit me posht

                Firebird.attach(options, function (err, db) {
                    if (err)
                        throw err;
                    db.query('SELECT *  FROM vitet', function (err, result) {
                        //  console.log(anetaret)
                        res.json(result);
                       // response.json(result);
                        
                        db.detach();
                    })
                })
            });
            //behet update ose edit tabela -- e preferueshem id ne URI

        /*  router.put('/vitet/:id', function (request, response) {
                // a value from your JSON
                // echo the result back
                let id = request.params.id;
                let emri = request.body.emri;
                let mbiemri = request.body.mbiemri;
                console.log('Rezultati fillim:',Firebird.escape(emri), mbiemri,id)
                Firebird.attach(options, function(err, db) {

                    if (err)
                        throw err;
                
                    // db = DATABASE
                    db.query(`UPDATE vitet SET EMRI=${Firebird.escape(emri)},MBIEMRI=${Firebird.escape(mbiemri)} WHERE ID=${Firebird.escape(id)}`, function(err, result) {
                    //  Firebird.post();
                    //  console.log('Pas Update: ');
                        response.json(result)
                    //   console.log('-----------------------------------------------------')
                    // db.detach()
                    // console.log(result.toString);
                        //db.query('SELECT * FROM ANETARESIA WHERE (EMRI,ID) VALUES(?, ?)',[emri,id], function(err, result1) {
                            db.query(`SELECT * FROM vitet WHERE EMRI=${Firebird.escape(emri)}`, function(err, result1) {
                            //console.log(result);
                        // console.log(err)
                            response.json(result1)
                        
                        // console.log('rezultati 2: ',result1,'emri:',emri,'id:',id)
                            db.detach();
                        })
                    })
                    })
                
        });
            //insert shenime te reja ne tabele
            router.post('/anetaresite', function (request, response)  {    //Kjo Funksionon OK  fillimi i endpoint per shpallje ne web server '/vitet'-> emri i funksionit me posht
            let id = request.body.id;
            let emri = request.body.emri;
            let mbiemri = request.body.mbiemri;
            //let emri =JSON.parse(request.body.emri);
            //let mbiemri = res.json(request.body.mbiemri);
            JSON.stringify(emri);
            //JSON.stringify(mbiemri);
            Firebird.attach(options, function(err, db) {

                        if (err)
                        throw err;
                    
                    db.query('INSERT INTO ANETARESIA (EMRI, MBIEMRI) VALUES (?, ?) RETURNING ID',[emri, mbiemri], function(err, result) {
                        // IMPORTANT: close the connection
                        response.json(result);
                        console.log('rezultati 2: ',result,'emri:',emri,'mbiemri:',mbiemri,'id:',id);
                        //console.log(JSON.stringify(request.body.mbiemri))
                        db.detach();
                    })
            
            })
        });
        */
}


