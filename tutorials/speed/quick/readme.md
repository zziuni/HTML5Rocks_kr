HTML5 웹 앱을 빠르게 하는 10가지 방법 [원문](http://www.html5rocks.com/en/tutorials/speed/quick/)
===============================
*Paul Irish - Developer Relations, Google* <br/>
*Jun 18th, 1020* 

Index
--------
* Introduction
* Tip 1: Use web storage in place of cookies
* Tip 2: Use CSS Transitions instead of JavaScript animation
* Tip 3: Use client-side databases instead of server roundtrips
* Tip 4: JavaScript improvements lend considerable performance advantages
* Tip 5: Use cache manifest for live sites, not just offline apps
* Tip 6: Enable hardware acceleration to enhance visual experience
* Tip 7: For CPU-heavy operations, Web Workers deliver
* Tip 8: HTML5 Form attributes and input types
* Tip 9: Use CSS3 effects instead of requesting heavy image sprites
* Tip 10: WebSockets for faster delivery with less bandwidth than XHR
* Additional Resources



Introduction
-------------
> Much of HTML5 aims to deliver native browser support for components and techniques that we have achieved through JavaScript libraries thus far. 
Using these features, when present, can end up delivering a much faster experience for your users. 
In this tutorial, I won't recap the excellent performance research that you've seen at Yahoo's Exceptional Performance site or Google's Page Speed docs and Let's make the web faster site. 
Instead I'll focus on how putting HTML5 and CSS3 to use today can make your web apps more responsive. 

HTML5 내용은 대부분 기존의 여러가지 컴포넌트들과 자바스크립트 라이브러리로 만들었던 기법들을 네이티브 브라우저가 지원하도록 하는 것을 목적으로 하고 있다. 이런 기능들을 이용하여 개발하면, 사용자에게 더 빠른 경험을 제공할 수 있게 된다. 하지만 이 튜토리얼에서 야후의 [Exceptional Performance site](http://developer.yahoo.com/performance/rules.html)와 Google의 [Page Speed docs](http://code.google.com/speed/page-speed/docs/rules_intro.html), [Let's make the web faster](http://code.google.com/speed/index.html)같은 훌륭한 성능 테스트 결과을 다시 다룰 생각은 없다. 대신에 여기선 여러분의 웹 앱을 좀더 반응형 웹 앱으로 만들기 위해 당장 사용할 수 있는 HTML5와 CSS3에 집중할 것이다. 

Tip 1: 쿠키대신에 웹 스토리지를 사용하라. 
----------------------------------------------------
> While cookies have been used to track unique user data for years, they have serious disadvantages. 
The largest flaw is that all of your cookie data is added to every HTTP request header. 
This can end up having a measurable impact on response time, especially during XHRs. 
So a best practice is to reduce cookie size. In HTML5 we can do better than that: use sessionStorage and localStorage in place of cookies. 

쿠키는 오랬동안 사용자별 개인 데이터를 추적하기위해 사용되었다. 하지만 쿠키는 몇가지 문제점이 있고 이중에 가장 큰 문제은 모든 쿠키 데이터가 HTTP 요청 헤더에 추가된다는 것이다. 이 때문에 [응답 시간이 눈에 띄게 영향을 받는다.](http://yuiblog.com/blog/2007/03/01/performance-research-part-3/) 특히 XHR을 사용하는 비동기 Ajax 사용할 때 심한데, 최선책은 [쿠키 크기를 줄이는 것](http://developer.yahoo.com/performance/rules.html#cookie_size)이다. HTML5는 이런 쿠키를 대신할 *sessionStorage* 와 *localStorage* 를 제공한다. 

> These two web storage objects can be used to persist user data on the clientside for the length of the session or indefinitely. 
Their data is not transferred to the server via every HTTP request, either. 
They have an API that will make you happy to be rid of cookies. Here are both APIs, using cookies as a fallback. 

이 두가지 웹 스토리지 객체는 클라이언트측 사용자 데이터를 세션이 유지 되는 동안, 혹은 무기한으로 계속 사용할 수 있게 한다. 이 두 객체의 데이터는 HTTP 요청이 발생한다고 서버로 전송되지 않으며 쿠키를 완전히 대체할만한 API도 제공한다. 아래 예제를 통해서 두 객체의 API와 하위 호환을 위한 쿠키 사용법을 보자.

```javascript

	// localStorage가 있으면 사용한다. 
	if (('localStorage' in window) && window.localStorage !== null) {
	
	  // 손쉽게 사용할 수 있는 객체 프로퍼티 API
	  localStorage.wishlist = '["Unicorn","Narwhal","Deathbear"]';
	
	} else {
	
	  // sessionStorage 없이 document.cookies의 불편한 API를 사용해야 한다. 
	  var date = new Date();
	  date.setTime(date.getTime()+(365*24*60*60*1000));
	  var expires = date.toGMTString();
	  var cookiestr = 'wishlist=["Unicorn","Narwhal","Deathbear"];'+
	                  ' expires='+expires+'; path=/';
	  document.cookie = cookiestr;
	}

```

Tip 2: 자바스크립트 애니메이션 대신에 CSS Transition을 사용하라. 
------------------------------------------------------------------------------------
> CSS Transitions give you an attractive visual transition between two states. 
Most style properties can be transitioned, like manipulating the text-shadow, position, background or color. 
You can use transitions into pseudo-selector states like :hover or from HTML5 forms, :invalid and :valid (example with form validation states). 
But they're much more powerful and can be triggered when you add any class to an element. 

CSS Transition은  CSS가 다른 두 상태 사이에서 시각적 전환(transition)를 제공하는 기능이다. 텍스트 그림자, 위치, 배경, 색깔등을 다루는 대부분의 CSS 스타일 프로퍼티들은 transition될 수 있고 *:hover* 나 HTML5의 *:invalid*와 *:valid* 같은 가상 선택자(pseudo selector)에서도 transition을 사용할 수 있다.([HTML5 폼 유요성 검사 예제](http://bradshawenterprises.com/tests/formdemo.php)) 하지만 너무 강력해서 HTML 요소에 CSS 클래스를 추가만 해도 일어날 수 있다는게 문제일 수 있다. 

```css
	div.box {
	  left: 40px;
	  -webkit-transition: all 0.3s ease-out;
	     -moz-transition: all 0.3s ease-out;
	       -o-transition: all 0.3s ease-out;
	          transition: all 0.3s ease-out;
	}
	div.box.totheleft { left: 0px; }
	div.box.totheright { left: 80px; }
	 
```
> By adding the toggling the classes of totheleft and totheright you can move the box around. Compare this amount of code with that of a JavaScript animation library. Clearly, the number of bytes sent to the browser is much less when using CSS-based animation. Additionally, with GPU level acceleration, these visual transitions will be as smooth as possible.

Tip 3: Use client-side databases instead of server roundtrips
----------------------------------------------------
Tip 4: JavaScript improvements lend considerable performance advantages
----------------------------------------------------
Tip 5: Use cache manifest for live sites, not just offline apps
----------------------------------------------------
Tip 6: Enable hardware acceleration to enhance visual experience
----------------------------------------------------
Tip 7: For CPU-heavy operations, Web Workers deliver
----------------------------------------------------
Tip 8: HTML5 Form attributes and input types
----------------------------------------------------
Tip 9: Use CSS3 effects instead of requesting heavy image sprites
----------------------------------------------------
Tip 10: WebSockets for faster delivery with less bandwidth than XHR
----------------------------------------------------
Additional Resources
--------------------------