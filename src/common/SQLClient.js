import SQLite from 'react-native-sqlite-storage';


class SQLClient {
    success = () => {
        console.log('open');
    };

    fail = (error) => {
        console.error(error);
    };


    ExecuteQuery = (sql, params = []) => {
        let db = SQLite.openDatabase({name: 'test.db'},
            this.success,
            this.fail,
        );
        return new Promise((resolve, reject) => {
            db.transaction((trans) => {
                trans.executeSql(sql, params, (trans, results) => {
                        resolve(results);
                    },
                    (error) => {
                        reject(error);
                    });
            });
        });
    };
}

export const sqlClient = new SQLClient();
