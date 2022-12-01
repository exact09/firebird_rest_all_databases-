var options = {};
options.host = "localhost";
options.port = 3050;
options.database = "D:/IdrisJavScript_Pojects_OK/DB/SHPALLJE1.FDB";
options.user = "SYSDBA";
options.password = "masterkey";
options.lowercase_keys = false; // set to true to lowercase keys
options.role = null; // default
options.pageSize = 4096; // default when creating database
options.retryConnectionInterval = 1000; // reconnect interval in case of connection drop

module.exports = options; // export qe te perdoret ne file tjera
