import {sqlClient} from '@app/common/SQLClient';


export const CreateContactTable = async () => {
    let Table = await sqlClient.ExecuteQuery('CREATE TABLE IF NOT EXISTS tblContact (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name VARCHAR(100), last_name VARCHAR(100), mobile VARCHAR(100), email VARCHAR(100),profile_image VARCHAR(1000), category_id INTEGER, is_deleted INTEGER)', []);
    return Table;
};

export const InsertContact = async (body) => {

    let singleInsert = Boolean(body.id) ?
        await sqlClient.ExecuteQuery('Update tblContact set first_name=?,last_name=?, mobile=?, email=?, profile_image=?, category_id=?  where id=?',
            [body.first_name, body.last_name, body.mobile, body.email, body.profile_image, body.category_id, body.id])

        :
        await sqlClient.ExecuteQuery('INSERT INTO tblContact (first_name, last_name, mobile, email, profile_image, category_id, is_deleted) VALUES (?,?,?,?,?,?,?)',
            [body.first_name, body.last_name, body.mobile, body.email, body.profile_image, body.category_id, 0]);

    return singleInsert;

};


export const deleteContact = async (body) => {

    let deleteItem = await sqlClient.ExecuteQuery('UPDATE tblContact set is_deleted=? where id=?',
        [1, body.id]);

    return deleteItem;

};

export const getAllContact = async () => {

    let selectQuery = await sqlClient.ExecuteQuery('SELECT * FROM tblContact as cont  where cont.is_deleted = 0 ', [0]);

    let rows = selectQuery.rows;
    let temp = [];
    for (let i = 0; i < rows.length; i++) {
        let item = rows.item(i);
        temp.push(item);
    }

    return {success: true, contact: temp};

};
