# Hooks Docs

*   ### [useFetch:](./useFetch.jsx) 
        Hook para hacer request http por medio de axios, el hook recibe 4 parametros (url = string, method=string, data=objeto, auth=booleano) y retorna un arreglo de dos objetos [response, error]. Por defecto el method es GET. y el parametro auth es false, por lo que para apis que requieran token hay que setear ese parametro en true.
