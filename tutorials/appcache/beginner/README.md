A Begginer's Guide to Using the Application Cache
==============
초보자 App Cache 사용 가이드
======
*Eric Bidelman - Developer Relations, Google* <br/>
*June 18.2010*

## Index
* Intorduction
* The cache manifest file
    * Referencing a manifest file
    * Structure of a manifest file
* Updating the cache
    * Cache status
    * AppCache Event
* References

Intorduction
----
> It's becoming increasingly important for web-based applications to be accessible offline. Yes, all browsers have caching mechanisms, but they're unreliable and don't always work as you might expect. HTML5 addresses some of the annoyances of being offline with the ApplicationCache interface. 

웹 기반 어플리케이션의 오프라인에 대한 가능성이 갈수록 중요해지고 있다. 물론 모든 브라우저에는 캐싱 메카니즘이 있다. 하지만 신뢰도가 낮고 항상 기대처럼 움직이진 않는다. HTML5에는 [ApplicatonCache](http://www.whatwg.org/specs/web-apps/current-work/#applicationcache) 인터페이스로 몇가지 오프라인상의 비동기 처리를 다룬다. 

> Using the cache interface gives your application three advantages: 

이런 캐시 인터페이스 사용은 여러분에게 다음 세가지 이점을 제공한다. 

> * Offline browsing - users can navigate your full site when they're offline
* Speed - cached resources are local, and therefore load faster.
* Reduced server load - the browser will only download resources from the server that have changed.

* 오프라인 브라우징 - 사용자는 오프라인에서도 여러분 사이트 전체를 돌아다닐 수 있다. 
* 속도 - 캐시된 리소스는 로컬에 있으므로 더 빨리 불러온다.
* 서버부하 감소 - 브라우저는 오직 변경된 리소스만 서버에서 받아온다. 

> The Application Cache (or AppCache) allows a developer to specify which files the browser should cache and make available to offline users. Your app will load and work correctly, even if the user presses the refresh button while they're offline. 

개발자는 Application Cache(이하 AppCache)로 브라우저가 캐시해야 하고 오프라인 사용자가 접근하게 만들 파일들을 명시할 수 있다. 그러면 사용자가 오프라인에서 새로고침을 눌러도, 여러분의 앱은 로드되고 작동할 것이다. 

The cache manifest file
----
### Referencing a manifest file
### Structure of a manifest file
Updating the cache
----
### Cache status
### AppCache Event
References
----
