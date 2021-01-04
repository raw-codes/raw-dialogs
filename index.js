const electron = require("electron");

let cs, ov, ovb, frm;

exports.createDialog = function (
	props = {
		type: "alert",
		title: "Sample Title",
		help: "Sample help text",
		message: "Sample Message",
		buttons: [
			{
				label: "Ok",
				cssclass: "btn, btn-primary",
				callbackfunction: closeOverlay,
			},
		],
	}
) {
	console.log(props);

	//set defaults
	if (props.type === undefined) props.type = "alert";
	if (props.title === undefined) props.title = "Title";
	if (props.help === undefined) props.help = "Help";
	if (props.message === undefined) props.message = "Message";
	if (props.buttons === undefined) {
		props.buttons = [{}];
		but = {
			label: "Ok",
			cssclass: "btn, btn-primary",
			callbackfunction: closeOverlay,
		};
		props.buttons[0] = but;
	}

	cs = document.createElement("DIV");
	cs.setAttribute("id", "overlay-cover");
	cs.style.position = "fixed";
	cs.style.zIndex = "50";
	cs.style.top = "0px";
	cs.style.left = "0px";
	cs.style.height = "100%";
	cs.style.width = "100%";
	cs.style.background = "rgba(0, 0, 0, 0.5)";
	// cs.classList.add("cover-screen");
	if (props.fullscreen) {
		cs.style.backgroundColor = "white";
	}

	ov = document.createElement("DIV");
	ov.setAttribute("id", props.type.trim().toLowerCase());
	if (props.fullscreen) {
		cs.style.backgroundColor = "white";
	} else {
		ov.style.position = "absolute";
		ov.style.top = "50%";
		ov.style.left = "50%";
		ov.style.transform = "translate(-50%, -50%)";
		ov.style.border = "0px";
		ov.style.borderBottom = "5px solid #038ad8 !important";
		ov.style.backgroundColor = "white";
		ov.style.minWidth = "50vw";
		ov.style.minHeight =
			props.type.trim().toLowerCase() === "overlay" ? "50vh;" : "10vh";
		ov.style.boxShadow = "1px 1px 10px 0px black";
		ov.style.overflow = "hidden";
		// ov.classList.add(props.type === "overlay" ? "overlay" : "alert");
	}

	let ovc = document.createElement("DIV");
	ovc.setAttribute(
		"id",
		props.type.trim().toLowerCase() === "overlay"
			? "overlay"
			: "alert" + "-container"
	);

	if (props.titlebar !== undefined) {
		let ovtb = document.createElement("DIV");
		// ovtb.classList.add("overlay-title-bar", "noselect");
		ovtb.style.backgroundColor = "#b7b7b4";
		ovtb.style.color = "black";
		ovtb.style.padding = "2px";
		ovtb.style.paddingLeft = "10px";
		ovtb.style.height = "30px";
		ovtb.style.lineHeight = "30px";
		ovtb.style.textAlign = "center";
		ovtb.style.boxShadow = "0px 1px 2px 0px black";
		ovtb.innerHTML = props.titlebar;
		ovc.appendChild(ovtb);
	}

	let ttr = document.createElement("DIV");
	ttr.setAttribute("id", "triangle-top-right");
	// ttr.classList.add("triangle-top-right");
	ttr.style.width = "0px";
	ttr.style.borderTop = "30px solid orange";
	ttr.style.borderLeft = "40px solid transparent";
	ttr.style.top = "0px";
	ttr.style.right = "0px";
	ttr.style.position = "absolute";

	let xmlns = "http://www.w3.org/2000/svg";
	let svgElem = document.createElementNS(xmlns, "svg");
	svgElem.setAttributeNS(null, "viewBox", "0 0 350 350");
	// svgElem.classList.add("ov-close-x");
	svgElem.style.position = "fixed";
	svgElem.style.right = "5px";
	svgElem.style.top = "5px";
	svgElem.style.width = "10px";
	svgElem.style.height = "10px";
	svgElem.style.cursor = "pointer";
	let poly = document.createElementNS(xmlns, "polygon");
	poly.setAttributeNS(
		null,
		"points",
		"371.2 21.2 350 0 185.6 164.4 21.2 0 0 21.2 164.4 185.6 0 350 21.2 371.2 185.6 206.8 350 371.2 371.2 350 206.8 185.6 "
	);
	svgElem.appendChild(poly);
	svgElem.addEventListener("click", function (event) {
		closeOverlay();
	});
	ttr.appendChild(svgElem);

	ovc.appendChild(ttr);

	if (props.type.trim().toLowerCase() === "overlay") {
		let ovt = document.createElement("h3");
		ovt.setAttribute("id", "overlay-title");
		// ovt.classList.add("overlay-title", "noselect");
		//overlay-title
		ovt.style.padding = "0px 0px 0px 10px";
		ovt.style.borderBottom = "2px solid orange";
		ovt.style.fontFamily = "Calibri";
		ovt.style.width = "90%";
		ovt.innerHTML = props.title;

		//noselect
		ovt.style.userDelect = "none";
		ovc.appendChild(ovt);

		// let re = document.createElement("SPAN");
		// re.classList.add("roundedElement");
		// ovc.appendChild(re);

		let ovh = document.createElement("DIV");
		ovh.setAttribute("id", "overlay-help");
		// ovh.classList.add("overlay-help");
		ovh.style.fontStyle = "italic";
		ovh.style.fontSize = "x-small";
		ovh.style.marginLeft = "20px";
		ovh.style.color = "magenta";
		ovh.style.width = "70%";
		ovh.style.borderBottom = "1px dashed gray";

		// let infoIcon = document.createElement("I");
		// infoIcon.classList.add("fas", "fa-info-circle", "fa-fw");
		// infoIcon.style.color = "black";
		// infoIcon.style.marginRight = "5px";
		// ovh.appendChild(infoIcon);

		let textNode = document.createElement("TEXT");
		textNode.innerText = props.help;
		ovh.appendChild(textNode);
		if (props.help.trim() === "") {
			ovh.style.display = "none";
		}
		ovc.appendChild(ovh);

		if (props.form !== undefined) {
			let form = props.form;
			if (form.controls.length !== 0) {
				frm = document.createElement("FORM");
				if (form.cssclass !== undefined) {
					form.cssclass.trim() !== ""
						? form.cssclass.split(",").map((cc) => frm.classList.add(cc.trim()))
						: "";
				}
				// frm.style.padding = "20px";
				let frmC = props.form.controls;
				for (let i = 0; i < frmC.length; i++) {
					let nc = document.createElement(frmC[i].type.toUpperCase());
					switch (frmC[i].type.toLowerCase()) {
						case "label":
							nc.innerText = frmC[i].caption;
							break;
						case "input":
							nc.type = frmC[i].inputtype;
							nc.placeholder =
								frmC[i].placeholder !== undefined ? frmC[i].placeholder : "";
							break;
						case "select":
							if (frmC[i].options !== undefined) {
								if (frmC[i].options.trim() !== "") {
									let ov =
										frmC[i].values !== undefined
											? frmC[i].values.split(",")
											: "";
									frmC[i].options.split(",").map((cc, index) => {
										let opt = document.createElement("OPTION");
										opt.innerHTML = cc.trim();
										opt.value = ov[index] === undefined ? "" : ov[index].trim();
										nc.appendChild(opt);
									});
								}
							}
							break;
						case "textarea":
							nc.rows = frmC[i].rows;
							nc.placeholder = frmC[i].placeholder;
							break;
						default:
							console.error("unexpected control type");
					}
					if (frmC[i].cssclass !== undefined) {
						frmC[i].cssclass.trim() !== ""
							? frmC[i].cssclass
									.split(",")
									.map((cc) => nc.classList.add(cc.trim()))
							: "";
					}
					if (frmC[i].type.toLowerCase() !== "label") {
						nc.style.display = "block";
						nc.style.width = "100%";
						nc.style.padding = "2px 2px";
						nc.style.lineHeight = "1.5";
						nc.style.color = "#212529";
						nc.style.backgroundColor = "#fff";
						nc.style.border = "1px solid #ced4da";
						nc.style.transition =
							"border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out";
					}
					frm.appendChild(nc);
				}
				frm.style.marginBottom = "10px";
			}
		}
	}

	ovb = document.createElement("DIV");
	ovb.setAttribute("id", "overlay-body");
	// ovb.classList.add("overlay-body");
	ovb.style.padding = "10px";
	ovb.style.margin = "0px 2px 40px 10px";
	ovb.style.maxHeight = "80vh";
	ovb.style.overflow = "auto";
	ovb.innerHTML = props.message;

	if (props.type.trim().toLowerCase() === "prompt") {
		let ip = document.createElement("INPUT");
		ip.setAttribute("id", "prompt-value");
		// ip.classList.add("ov-form-controls");
		ip.style.display = "block";
		ip.style.width = "100%";
		ip.style.padding = "2px 2px";
		ip.style.lineHeight = "1.5";
		ovb.appendChild(ip);
	}

	if (props.type.trim().toLowerCase() === "overlay") {
		if (props.form !== undefined) {
			ovb.appendChild(frm);
		}
	}
	ovc.appendChild(ovb);

	let ovbc = document.createElement("DIV");
	ovbc.setAttribute("id", "ov-button-container");
	// ovbc.classList.add("ov-button-container");
	ovbc.style.display = "flex";
	ovbc.style.padding = "5px 0px 5px 0px";
	ovbc.style.bottom = "0px";
	ovbc.style.position = "fixed";
	ovbc.style.width = "100%";
	ovbc.style.boxShadow = "0px 1px 5px 0px black";
	ovbc.style.backgroundColor = "white";

	let btns = props.buttons;
	let focusbtn = "";
	//use this variable to capture the button that will need foucs.
	//If there are multiple flag, then the last one will be setfoucs
	for (let i = 0; i < btns.length; i++) {
		let btn = document.createElement("BUTTON");
		btn.setAttribute("id", "ov-button-" + btns[i].label);
		// btn.classList.add("ov-button");
		btn.style.minWidth = "50px";
		btn.style.lineHeight = "1.5";
		// btn.style.color = "black";
		// btn.style.backgroundColor = "#b7b7b4";
		// btn.style.border = "1px solid #b7b7b4";
		// btn.style.padding = "2px 10px 2px 10px";
		btn.style.margin = "1px 5px 1px 5px";
		// btn.style.boxShadow = "0px 1px 2px 0px";
		if (btns[i].cssclass !== undefined) {
			btns[i].cssclass.trim() !== ""
				? btns[i].cssclass.split(",").map((cc) => btn.classList.add(cc.trim()))
				: "";
		}
		btn.innerText = btns[i].label;
		btn.addEventListener("click", function (event) {
			btns[i].callbackfunction();
		});
		if (btns[i].focus) focusbtn = btn.id;
		ovbc.appendChild(btn);
	}
	ovc.appendChild(ovbc);
	ov.appendChild(ovc); //attach container to the overlay div
	cs.appendChild(ov); // attach the overlay to the div that covers the screen
	//atching an keydown event so the cancel keycode can be captured and close the overlay.
	//maybe later you should look to make a way to provide this to the users to customize this as well.
	cs.addEventListener("keydown", (event) => {
		if (event.keyCode === 27) {
			closeOverlay();
		}
	});

	document.body.appendChild(cs);
	if (props.type.trim().toLowerCase() === "prompt") {
		document.getElementById("prompt-value").focus();
	} else {
		document
			.getElementById(
				focusbtn === "" ? "ov-button-" + props.buttons[0].label : focusbtn
			)
			.focus();
	}
};

closeOverlay = function () {
	// alert("close overlay");
	document.getElementById("overlay-cover").remove();
};
