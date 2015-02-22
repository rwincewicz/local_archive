exports.setup = function() {
    var connection = r.connect({
        host: '127.0.0.1',
        port: 28015
    });
    connection.then(function(conn) {
        r.dbList().run(conn, function(err, dbList) {
            if (err) throw err;
            console.log(dbList);
            if (dbList.indexOf('archivedb') == -1) {
                r.dbCreate('archivedb').run(conn, function(err, res) {
                    if (err) throw err;
                    console.log(res);
                });
            }
        });
        r.db('archivedb').tableList().run(conn, function(err, tableList) {
            if (err) throw err;
            console.log(tableList);
            if (tableList.indexOf('archives') == -1) {
                r.db('archivedb').tableCreate('archives').run(conn, function(err, res) {
                    if (err) throw err;
                    console.log(res);
                });
                r.db('archivedb').table('archives').indexCreate('url').run(conn, function(err, res) {
                    if (err) throw err;
                    console.log(res);
                });
            }
        });
    }).error(function(err) {
        console.log(err);
    });
}