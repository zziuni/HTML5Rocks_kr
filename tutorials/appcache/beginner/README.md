A Begginer's Guide to Using the Application Cache
==============
초보자 App Cache 사용 가이드 [원문](http://www.html5rocks.com/en/tutorials/appcache/beginner/#toc-updating-cache)
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

캐시 메니페스트(manifest) 파일
----------------------------------
> The cache manifest file is a simple text file that lists the resources the browser should cache for offline access. 

캐시 메니페스트 파일은 단순한 텍스트 파일이며, 브라우저가 오프라인 상태에서 접근하기 위해 캐시해야 하는 리소스 목록이 담겨 있다. 

### 메니페스트 파일 참조하기
> To enable the application cache for an app, include the manifest attribute on the document's html tag: 

앱에서 application cache를 가능하게 하기위해서는 문서의 html 태그에 manifest 속성을 넣어야 한다.

    <html manifest="example.appcache">
      ...
    </html>

> The manifest attribute should be included on every page of your web application that you want cached. The browser does not cache a page if it does not contain the manifest attribute (unless it is explicitly listed in the manifest file itself. This means that any page the user navigates to that include a manifest will be implicitly added to the application cache. Thus, there's no need to list every page in your manifest. 

웹 어플리케이션에서 캐시하고자 하는 모든 페이지는 *manifest* 속성을 가지고있어야 한다. *manifest* 속성을 지정하지 않으면 페이지는 캐시 되지 않는다. (메니페스트 파일안에 그 페이지가 명확하게 들어있지 않는한 말이다.) 이 말은 사용자가 *manifest* 속성이 지정된 페이지에 접근하면 그 페이지는 메니페스트 파일 안에 명시적으로 포함되어있지 않아도 암묵적으로 application cache에 추가된다는 것이다. 따라서 메니페스트 파일에 모든 접근 페이지를 포함시킬 필요는 없다. 

> The manifest attribute can point to an absolute URL or relative path, but an absolute URL must be under the same origin as the web application. A manifest file can have any file extension, but needs to be served with the correct mime-type (see below). 

*manifest* 속성에는 상대주소와 절대 주소 모두 쓸 수 있다. 하지만 절대 주소는 웹 어플리케이션에서 동일 원본 정책하에서만 가능하다. 메니페스트 파일의 확장자는 뭐든 가능하지만 서버에서 mime-type 지정이 필요하다. 다음을 보라.

	<html manifest="http://www.example.com/example.mf">
	  ...
	</html>

> A manifest file must be served with the mime-type text/cache-manifest. You may need to add a custom file type to your web server or .htaccess configuration. 

메니페스트 파일은 반드시 *text/cache-manifest* mime-type으로 제공되야 한다. 그러므로 웹서버나 *.htaccess*에서 커스텀 파일 타입을 추가해야 할 지도 모른다. 

> For example, to serve this mime-type in Apache, add this line to your config file:

다음은 이를 위해서 아파치 설정 파일에 설정을 추가하는 경우다. 

	AddType text/cache-manifest .appcache

> Or, in your app.yaml file in Google App Engine:

또는, Google App Engine의 app.yaml 파일 설정이다. 

	- url: /mystaticdir/(.*\.appcache)
	  static_files: mystaticdir/\1
	  mime_type: text/cache-manifest
	  upload: mystaticdir/(.*\.appcache)

### 메니페스트 파일의 구조. 

> A simple manifest may look something like this:

간단한 메니페스트 파일을 보자. 

	CACHE MANIFEST
	index.html
	stylesheet.css
	images/logo.png
	scripts/main.js

> This example will cache four files on the page that specifies this manifest file.

위 메니페스트 파일을 지정한 페이지에서 4개 파일을 캐시할 것이다. 

> There are a couple of things to note:

몇가지 주의사항이 있다. 

> * The CACHE MANIFEST string is the first line and is required.
* Sites are limited to 5MB worth of cached data. However, if you are writing an app for the Chrome Web Store, using the unlimitedStorage removes that restriction.
* If the manifest file or a resource specified in it fails to download, the entire cache update process fails. The browser will keep using the old application cache in the event of failure.

* **CACHE MANIFEST** 문자열이 첫줄에 있어야 한다. 필수사항.
* 사이트의 캐시된 데이터의 한계는 5메가다. 그러나 [Chrome Web Store](http://code.google.com/chrome/apps/docs/developers_guide.html)용 앱을 짜는 거라면, unlimitedStorage를 사용하여 제한을 풀 수 있다. 
* 메니페스트 파일이나 그 안에 정의된 리소스 다운로드에 실패하면, 캐시 전체가 업데이트에 실패한다. 이런 실패로 브라우저는 이전 application cache를 사용하게 될 것이다.  

> Lets take a look at a more complex example:

여기 좀 더 복잡한 예제가 있다. 

    CACHE MANIFEST
    # 2010-06-18:v2
    
    # Explicitly cached 'master entries'.
    CACHE:
    /favicon.ico
    index.html
    stylesheet.css
    images/logo.png
    scripts/main.js
    
    # Resources that require the user to be online.
    NETWORK:
    login.php
    /myapi
    http://api.twitter.com
    
    # static.html will be served if main.py is inaccessible
    # offline.jpg will be served in place of all images in images/large/
    # offline.html will be served in place of all other .html files
    FALLBACK:
    /main.py /static.html
    images/large/ images/offline.jpg
    *.html /offline.html

> Lines starting with a '#' are comment lines, but can also serve another purpose. An application's cache is only updated when its manifest file changes. So for example, if you edit an image resource or change a javascript function, those changes will not be re-cached. You must modify the manifest file itself to inform the browser to refresh cached files. Creating a comment line with a generated version number, hash of your files, or timestamp is one way to ensure users have the latest version of your software. You can also programmatically update the cache once a new version is ready as discussed in the Updating the cache section. 

'#'로 시작하는 줄은 주석이다. 하지만 다른 목적으로도 쓰인다. App Cache는 메니페스트 파일이 변경될때만 업데이트 된다. 예를 들어 여러분이 이미지를 수정하거나 자바스크립트 함수를 변경한다고, 캐시를 갱신 되진 않는다. 그러므로 **브라우저가 캐시된 파일을 갱신할 수 있도록 메니페스트 파일을 수정해야한다. ** 주석을 버전, 파일 해시 값, 타임스템프를 포함해서 생성하는 것이 사용자가 마지막 버전을 갖도록 하는 확실한 방법이다. [캐시 갱신]() 절에서 다루어서 새버전이 준비되면, 여러분은 캐시를 프로그램해서 업데이트 할 수 도 있다. 

> A manifest can have three distinct sections: CACHE, NETWORK, and FALLBACK.

메니페스트 파일은 세 섹션으로 나뉜다. CACHE와 NETWORK 그리고 FALLBACK.

> CACHE:<br/>
This is the default section for entries. Files listed under this header (or immediately after the CACHE MANIFEST) will be explicitly cached after they're downloaded for the first time.

*CACHE:*<br/>
전체중 기본 섹션이다. 이 헤더 밑(아니면, CACHEMANIFEST 바로 아래)의 파일 목록은 첫 다운로드 후에 확실하게 캐시될 것이다. 

> NETWORK:<br/>
Files listed under this section are white-listed resources that require a connection to the server. All requests to these resources bypass the cache, even if the user is offline. Wildcards may be used.

NEWWORK:<br/>
이 섹션의 파일 목록은 무조건 서버연결을 필요한 리소스 리스트다. 사용자가 오프라인이라 할지라도 이 리소스 목록의 요청은 모두 캐시는 그냥 통과한다. 와일드카드(*)가 사용될 수 있다. 

> FALLBACK:<br/>
An optional section specifying fallback pages if a resource is inaccessible. The first URI is the resource, the second is the fallback. Both URIs must be relative and from the same origin as the manifest file. Wildcards may be used.

FALLBack:<br/>
리소스에 접근할 없을때 필요한 폴백(fallback, 대안)를 정의하는 섹션이다. 필수세션은 아니다. 첫 URI는 리소스고 두번째가 폴백이다. 두 URI는 반드시 동일 종류여야 하고 메니페스트 파일과 동일 원본이여야 한다. 와일드카드(*)가 사용될 수 있다. 

> Note: These sections can be listed in any order and each section can appear more than one in a single manifest.

**주의**: 이 세션들은 정해진 순서가 없고 한 메니페스트 파일에 같은 섹션이 여러개 있을 수 있다. 

> The following manifest defines a "catch-all" page (offline.html) that will be displayed when the user tries to access the root of the site while offline. It also declares that all other resources (e.g. those on remote a site) require an internet connection.

다음 메니페스는 사용자가 오프라인에서 사이트의 루트를 접근하려 할때 출력될 페이지, 즉 몽땅 캐시된 페이지(offline.html)를 정의한다. 다른 모든 리소스는 인터넷 접속이 필요하다는 선언도 있다. 

    CACHE MANIFEST
    # 2010-06-18:v3
    
    # Explicitly cached entries
    index.html
    css/style.css
    
    # offline.html will be displayed if the user is offline
    FALLBACK:
    / /offline.html
    
    # All other resources (e.g. sites) require the user to be online. 
    NETWORK:
    *
    
    # Additional resources to cache
    CACHE:
    images/logo1.png
    images/logo2.png
    images/logo3.png

> Note: The HTML file that references your manifest file is automatically cached. There's no need to include it in your manifest, however it is encouraged to do so.

**주의**: 메니페스트 파일을 참조하는 HTML 파일은 자동으로 캐시된다. 메니페스트 파일에 포함시킬 필요없다. 하지만 명시적으로 적기를 권장한다.  

> Note: HTTP cache headers and the caching restrictions imposed on pages served over SSL are overridden by cache manifests. Thus, pages served over https can be made to work offline.

**주의**: SSL로 제공되는 페이지에 부과되는 HTTP cache header와 그 캐시 제한은 캐시 메니페스트로 덥어진다. 그래서 https로 제공된 페이지는 오프라인 작업이 가능하다. 

Updating the cache
----
### Cache status
### AppCache Event
References
----
