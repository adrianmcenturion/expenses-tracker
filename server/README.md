# Expenses App 


## CATEGORY



 **VER TODAS LAS CATEGORIAS**
 
 

GET - https://expenses-app-nucba.herokuapp.com/api/categories

 **CREAR CATEGORIAS**

POST - https://expenses-app-nucba.herokuapp.com/api/categories/create

Ejemplo JSON Body: 
```
{
    "name": "articulos de limpieza"
}
```
 


## EXPENSES




 **CREAR GASTO**

POST - https://expenses-app-nucba.herokuapp.com/api/expenses/create

Ejemplo JSON Body: 
```
{
    "name": "detergente",
    "amount": 270,
    "category": 6
}
```

 **VER TODOS LOS GASTOS**

GET - https://expenses-app-nucba.herokuapp.com/api/expenses

 **BUSCAR GASTOS POR NOMBRE**

GET - https://expenses-app-nucba.herokuapp.com/api/expenses/search/name

Ejemplo JSON Body:
```
{
    "name": "detergente"
}
```
 **BUSCAR GASTOS POR CATEGORIA**

GET - https://expenses-app-nucba.herokuapp.com/api/expenses/search/category

Ejemplo JSON Body: 
```
{
    "category": 6
}
```
 **VER EL TOTAL DE GASTOS**

GET - https://expenses-app-nucba.herokuapp.com/api/expenses/total

 **VER EL TOTAL DE GASTOS POR CATEGORIA**

GET - https://expenses-app-nucba.herokuapp.com/api/expenses/total/category

Ejemplo JSON Body:
```
{
    "category": 6
}
```
