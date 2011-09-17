# A Simple TODO list using HTML5 WebDatabases
# HTML5 WebDatabases를 이용한 간단한 할일 목록 만들기.

## 개요
> Web Databases are new in HTML5. Web Databases are hosted and persisted inside a user's browser. By allowing developers to create applications with rich query abilities it is envisioned that a new breed of web applications will emerge that have the ability to work online and off-line.

[Web Databases](http://dev.w3.org/html5/webdatabase)는 HTML5의 새로운 기능이며, 사용자 브라우저안에서 제공되고 지속적으로 유지되는 Database이다. 개발자가 어플리케이션 개발을 고급 조회 기법을 동원해서 만들 수 있게 됨으로써, 새로운 유형의 웹 어플리케이션은 온라인과 오프라인 작업이 모두 가능한 형태로 발전할 것라는 사실이 예견됐다. 

> On November 18, 2010, the W3C announced that Web SQL database is a deprecated specification. This is a recommendation for web developers to no longer use the technology as effectively the spec will receive no new updates and browser vendors aren't encouraged to support this technology. Many major browsers including Chrome, Safari, Opera and nearly all Webkit based mobile devices support WebSQL and will likely maintain support for the foreseeable future. 

하지만, 2010년 11월 18일, W3C는 Web SQL database가 표준안에서 제외시켰다. 이것은 실제로 이 스펙의 새 업데이트를 받아볼 수 없으므로, 웹 개발자가 이 기술을 더 이상 사용하지 않기를 권하는 것이고, 웹 브라우저 벤더들에게 이 기술 지원을 장려하지 않는다는 것이다. 아직까지는 크롬, 사파리, 오페라와 거의 모든 웹킷기반의 모바일 장비들은 WebSLQ를 지원한다. 그리고 근 미래까지는 아마 유지될 것이다. 

> This tutorial is also available written using "IndexedDB", the replacement offline storage technology. 

이 튜토리얼은 W3C의 오프라인 스토리지 대채 기술인 'IndexedDB'를 이용해서도 작성가능하다. 

> This example code demonstrates how to create a very simple todo list manager. It is a very high level tour of some of the features available in HTML5. 

이 예제는 어떻게 하면 간단한 할일 목록 관리 앱을 만들 수 있는지를 보여준다. 이건 HTML5에서 가능한 몇가지 기능의 고 레벨 투어다. (음??)


## 사전 준비 작업(Pre-requisites)
>This sample uses a namespace to encapsulate the database logic.

이 샘플은 데이터베이스 로직을 캡슐화 하기위해 네임스페이스를 사용한다. 

    var html5rocks = {};
    html5rocks.webdb = {};

## 비 동기 전송과 트랜젝션(Asynchronous and Transactional)

> In the majority of cases where you are using Web Database support you will be using the Asynchronous API. The Asynchronous API is a non-blocking system and as such will not get data through return values, but rather will get data delivered to a defined callback function. 

Web Dababases가 사용되는 대부분의 경우는 비동기(Asynchronous) API를 사용할 것이다. 비동기 API는 non-blocking 시스템이다. 그래서 반환 값에서 데이터를 가져오지 않고, 콜백 함수가 건네주는 데이터를 가져온다. 

>The Web Database support through HTML is transactional. It is not possible to execute SQL statements outside of a transaction. There are two types of transactions: read/write transactions (transaction()) and read only transactions (readTransaction()). Please note, read/write will lock the entire database. 

Web Database는 HTML를 통해서 트랜젝션을 지원한다. 트랜젝션없이 SQL 구문을 실행하는 것은 불가능하다. 트랙젝션에는 두가지 타입이 있는데 transaction() 메서드의 읽기/쓰기 트랜젝션과 readTransaction() 메서드의 읽기 전용 트랜젝션이다. transaction()는 데이터베이스 전체를 잠가버리니, 부디 주의해서 사용하라. 

## 1단계. 데이터베이스 오픈. (Step 1. Opening the database)
> The database needs to be opened before it can be accessed. You need to define the name, version, description and the size of the database. 

데이터베이스는 접근하기 전에 먼저 오픈이 되야 한다. 데이터베이즈의 이름, 버전, 부연설명, 사이즈를 정의해야 한다. 

    html5rocks.webdb.db = null;

    html5rocks.webdb.open = function(){
        var dbsize = 5 * 1024 * 1024; 		// 5MB
        html5rocks.webdb.db = openDatabase( 'Todo', '1.0', 'todo manager', dbSize );
    }

    html5rocks.webdb.onError = function(tx, e){
        alert( 'Something unexpected happened: ' + e.message );
    }

    html5rocks.webdb.onSuccess = function(tx, r){
        // 모든 데이터를 다시 렌더링 한다. 
        // getAllTodoItem()는 4단계에서 정의한다.
        html5rocks.webdb.getAllTodoItems(loadTodoItems);
    }

## 2단계. 테이블 생성 (Step 2. Creating a table)
> You can only create a table by executing a CREATE TABLE SQL statement inside a transaction. 

테이블은 오직 트랜젝션 안에서 CREATE TABLE SQL 구문 실행을 통해서만 생성할 수 있다. 

> We have defined a function that will create a table in the body onload event. If the table doesn't already exist, a table will be created. The table is called todo and has 3 columns. 

body의 onload 이벤트에서 테이블을 생성할 함수를 정의한다. 같은 이름의 테이블이 존재하지 않는다면, 생성될 것이다. 테이블 명은 todo이고 컬럼을 3개 가진다. 

* ID - 순차 증가형 ID 컬럼
* todo - 할일 항목의 내용을 담은 텍스트 컬럼
* added_on - 할일 항목이 생성된 시간 컬럼

```javascript
    html5rocks.webdb.createTable = function(){
        html5rocks.webdb.db.transaction(function(tx){
            tx.executeSql( 'CREATE TABLE IF NOT EXIST ' +
                        ' todo( ID INTIGER PRIMARY KEY ASC, todo	 text, added_on DATETIME )', [] );
        });
    }
```

## 3단계. 테이블에 데이터 추가하기 (Step 3. Adding data to a table)
> We are building a todo list manager so it is pretty important that we are able to add todo items in to the database. 

지금 우린 할일 목록 관리자를 만들고 있고, 당연한 이야기지만 할일 항목을 데이터베이스에 추가할 수 있어야 한다. 

> A transaction is created, inside the transaction an INSERT into the todo table is performed. 

트랜젝션이 생성되고 그 안에서 todo 테이블에 INSERT를 수행한다. 

> executeSql takes several parameters, the SQL to execute and the parameters values to bind the query. 

executeSql 메서드는 몇가지 파라미터가 필요한데, 실행할 SQL 쿼리문과 쿼리문에 전달할 파라미터 값들이다. 

```javascript
html5rocsk.webdb.addTodo = function(todoText){
    html5rocks.webdb.db.transaction(function(tx){
        var addedOn = new Date();
        tx.executeSql( ' 	INSERT INTO todo(todo, added_on) VALUES ( ?, ? ) ' ,
                [todoText, addedOn],
                html5rocks.webdb.onSuccess,
                html5rocks.webdb.onError
        );
    });
}
```

## 4단계. 테이블에서 데이터 Select하기 (Step 4. Selecting data from a table)

## 5단계. 테이블에서 데이터 지우기 (Step 5. Deleting data from a table)

## 6단계. 메서드 사용하기 (Step 6. Hooking it all up)

## 결과물 (The final product)
[Demo](http://www.html5rocks.com/en/tutorials/webdatabase/todo/#toc-final)

## content licensed
original http://www.html5rocks.com/en/tutorials/webdatabase/todo/


