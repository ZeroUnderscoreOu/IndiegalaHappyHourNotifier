// ==UserScript==
// @name        Indiegala Happy Hour Notifier
// @author      ZeroUnderscoreOu
// @version     2.0.1
// @icon        
// @description Simple checker for any Indiegala bundles being on Happy Hour
// @namespace   https://github.com/ZeroUnderscoreOu/
// @match       *://www.indiegala.com/bundle/*
// @run-at      document-idle
// @grant       none
// ==/UserScript==

if (!localStorage.getItem("IGHHNInit")) { // one-time initialization
	Notification.requestPermission();
	localStorage.setItem("IGHHNSeen",["List of already seen bundles"]);
	localStorage.setItem("IGHHNInit",true);
};

Array.from(document.getElementsByClassName("bundle-page-other-bundles-extra-info")).forEach((Div)=>{
	if (Div.textContent.includes("happy hour")) {
		Div = Div.parentElement;
		let A = Div.firstElementChild;
		let Name = A.title;
		let Check = localStorage.getItem("IGHHNSeen").split(",");
		if (!Check.includes(Name)) { // checking if bundle was already opened
			let N = new Notification("Indiegala Happy Hour",{
				icon: "https://www.indiegala.com/favicon.ico",
				body: `Happy hour is on for ${Name}`,
				data: A.href,
				requireInteraction: true,
				renotify: true,
				tag: "IGHHN"
			});
			N.addEventListener("click",(Data)=>{ // setting the action to open bundle page
				window.open(A.href,"_blank");
			});
			Check.push(Name);
			localStorage.setItem("IGHHNSeen",Check); // storing the bundle to not open again
		};
	};
});

setTimeout(()=>{ // if nothing is opened
	window.location.reload(); // reloading; can't call reload() directly for some reason
},30*60*1000); // 30 mins
