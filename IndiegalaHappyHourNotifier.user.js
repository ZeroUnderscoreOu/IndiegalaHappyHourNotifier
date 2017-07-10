// ==UserScript==
// @name        Indiegala Happy Hour Notifier
// @author      ZeroUnderscoreOu
// @version     1.0.0
// @icon        
// @description Simple checker for any Indiegala bundles being on Happy Hour
// @namespace   https://github.com/ZeroUnderscoreOu/
// @match       *://www.indiegala.com/
// @run-at      document-idle
// @grant       none
// ==/UserScript==

Array.from(document.querySelectorAll("Div.homebundle-type")).forEach((Div)=>{
	if (Div.textContent.includes("happy hour")) {
		Div = Div.parentElement;
		let Name = Div.querySelector("Img.imgbig").alt;
		let Check = localStorage.getItem(Name); // checking if bundle was already opened
		if (!Check) {
			let Time = Div.querySelector("Span.timeend").textContent;
			Notification.requestPermission().then(()=>{
				new Notification("Indiegala Happy Hour",{
					icon: "https://www.indiegala.com/favicon.ico",
					body: `Happy hour is on for ${Name}\r\n${Time} left`,
					requireInteraction: true
				});
			});
			localStorage.setItem(Name,Date.now()); // storing the bundle to not open again
			window.location.href = Div.querySelector("A.bundle-link").href; // opening the bundle
		};
	};
});
setTimeout(()=>{ // if nothing is opened
	window.location.reload(); // reloading; can't call reload() directly for some reason
},30*60*1000); // 30 mins