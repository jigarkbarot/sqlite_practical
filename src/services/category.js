import {sqlClient} from '@app/common/SQLClient';


// Create Table
export const CreateCategoryTable = async () => {
    let Table = await sqlClient.ExecuteQuery('CREATE TABLE IF NOT EXISTS tblCategory (id INTEGER PRIMARY KEY AUTOINCREMENT, category_name VARCHAR(100), is_deleted INTEGER)', []);
    return Table;
};

export const InsertCategory = async (body) => {

    let singleInsert = Boolean(body.id) ?
        await sqlClient.ExecuteQuery('Update tblCategory set category_name=? where id=?',
            [body.category_name, body.id])
        :await sqlClient.ExecuteQuery('INSERT INTO tblCategory(category_name, is_deleted) VALUES (?,?)',
        [body.category_name, 0])

    return singleInsert;

};


export const deleteCategory = async (body) => {

    let deleteItem = await sqlClient.ExecuteQuery('UPDATE tblCategory set is_deleted=? where id=?',
        [1, body.id]);

    return deleteItem;

};

export const getAllCategory = async () => {

    let selectQuery = await sqlClient.ExecuteQuery("SELECT * FROM tblCategory where is_deleted = ?",[0]);

    let rows = selectQuery.rows;
    let temp=[]
    for (let i = 0; i < rows.length; i++) {
        let item = rows.item(i);
        temp.push(item)
    }

    return {success:true, categories: temp};

};


