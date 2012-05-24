dojo.provide('bench.storage.QueryAssembler');

dojo.require('bench.Loggable');

dojo.declare('bench.storage.QueryAssembler', bench.Loggable, {

    constructor:function() {},

    assembleSelect:function(table, obj) {
        let q = "SELECT * FROM " + table + ' WHERE ';
        for (let p in obj) {
            q += p + '=' + this.prepValue(obj[p]) + ' AND ';
        }
        q = q.substring(0, q.length - 5) + ';';

        return q;
    },

    assembleInsert:function(table, obj) {
        let q = "INSERT into " + table;
        let columns = ' (';
        let values = ' VALUES(';
        for (let p in obj) {
            columns += p + ',';
            values += this.prepValue(obj[p]) + ',';
        }

        columns = columns.substring(0, columns.length - 1) + ')';
        values = values.substring(0, values.length - 1) + ')';

        q += columns + values + ';';
        return q;
    },

    assembleDelete:function(table, obj) {
        let q = "DELETE FROM " + table + ' WHERE ';
        for (let p in obj) {
            q += p + '=' + this.prepValue(obj[p]) + ' AND ';
        }
        q = q.substring(0, q.length - 5) + ';';

        return q;
    },

    assembleUpdate:function(table, idField, obj) {
        let q = "UPDATE " + table + ' SET ';
        for (let p in obj) {
            if (p != idField) {
                q += p + '=' + this.prepValue(obj[p]) + ', ';
            }
        }
        q = q.substring(0, q.length - 2) + ' WHERE ' + idField + '=' + this.prepValue(obj[idField]) + ';';

        return q;
    },

    prepValue:function(val) {
        if (typeof val === 'string') {
            val = "'" + val + "'";
        }

        return val;
    }
});