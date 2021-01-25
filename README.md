# raw-dialogs

<p align="center" align-items="middle">	
	<img width="25%" src="https://github.com/raw-codes/raw-dialogs/blob/master/images/alert.png" />
	<img width="25%" src="https://github.com/raw-codes/raw-dialogs/blob/master/images/prompt.png" />
	<br />
	<img width="25%" src="https://github.com/raw-codes/raw-dialogs/blob/master/images/overlay.png" />
	
</p>

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props](#props)
- [Styling](#styling)
- [Screen Shots](#screen-shots)
- [Example](#example)

### Installation

```bash
$ npm i raw-dialogs --save
```

### Basic Usage

```javascript
const dialogs = require("raw-dialogs");

//***NEW Methods ****
//Creates a simple alert with message,
dialog.alert("message"); 				//unmovable alert.
dialog.alert("message", "titlebar"); 	//alert movable.
dialog.alert("message", "titlebar", "button-label"); //label the button.
dialog.alert("message", "titlebar", callbackfunction); //function to be called when button clicked.
dialog.alert("message", "titlebar", "button-label", callbackfunction); //label the button and call function.

//Creates prompt
dialog.prompt("message"); 				//unmovable alert.
dialog.prompt("message", "titlebar"); 	//alert movable.
dialog.prompt("message", "titlebar", "button-label"); //label the button.
dialog.prompt("message", "titlebar", callbackfunction); //function to be called when button clicked.
dialog.prompt("message", "titlebar", "button-label", callbackfunction); //label the button and call function.


//To create alert set the props (JSON format) and pass it to createDialog() method
let props = {
	type: "alert",
	titlebar: "Alerting Application",
	message: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>",
	defaultvalue: "Default Value",
	buttons: [
		{
			label: "Enter your name and click proceed",
			callbackfunction: [
				{ name: "alertMessage", params: ["param1", "param2"] },
				{ name: "alertMessage1" }
			]
		}
	]
}
dialogs.createDialog(props);

/*To create a simple Prompt set the props (JSON format) and pass it to createDialog() method
An Input will be shown to get the input*/
let props = {
	type: "prompt",
	titlebar: "Prompting Application",
	message: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>",
	defaultvalue: "Default Value",
	buttons: [
		{
			label: "Enter your name and click proceed",
			callbackfunction: [
				{ name: "alertMessage", params: ["param1", "param2"] },
				{ name: "alertMessage1" }
			]
		}
	]
};
dialogs.createDialog(props);

/*To create an overlay set the props (JSON format) and pass it to createDialog() method
This option is to allow us to create a lot complex forms.
*/
let props = {
	type: "overlay",
	titlebar: "Overlaying Application",
	title: "Add New Client Information",
	fullscreen: false,
	help: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
	message: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>",
	form: {
		cssclass: "form",
		controls: [
			{
				type: "label",
				caption: "Name",
				style: "color: red; font-weight: bold",
			},
			{
				type: "input",
				inputtype: "text",
				placeholder: "Placeholder that will be shown",
				cssclass: "form-controls", //CSS from Bootstrap
			},
			{
				type: "label",
				caption: "Age",
				style: "color: blue; font-weight: bold",
			},
			{
				type: "select",
				options: "< 15, 15-30, 31-45, 46-60, 61-75, > 75",
				values: "1, 2, 3,4,5,6 ",
				defaultvalue: "31-45",
				cssclass: "form-controls, chosen-select", //CSS from Bootstrap
			},
			{
				type: "label",
				caption: "Address",
				style: "color: gray; font-weight: bold",
			},
			{
				type: "textarea",
				rows: 5,
				placeholder: "Placeholder that will be shown",
				cssclass: "form-controls", //CSS from Bootstrap
			},
		],
	},
	buttons: [
		{
			label: "Ok",
			callbackfunction: [{name: alertMessage}],
			cssclass: "btn, btn-primary", //Button CSS from Bootstrap
			focus: true,
		},
		{
			label: "Cancel",
			callbackfunction: [
				{name: alertMessage1, params: [param1, param2],
				{name: alertMessage}
			],
			cssclass: "btn, btn-warning", //Button CSS from Bootstrap
		},
	],
};
dialogs.createDialog(props);
```

### Props

| Prop                                                                              |   Type    |                 Description                  | Default   | Version |
| :-------------------------------------------------------------------------------- | :-------: | :------------------------------------------: | :-------- | :------ |
| type                                                                              | `string`  |           Overlay, Prompt or Alert           | alert     | v1.0.1  |
| id                                                                                | `string`  |                DOM Element ID                | alert     | v1.0.7  |
| titlebar                                                                          | `string`  |    Text shown in the title bar of dialog     | "Title"   | v1.0.1  |
| cssclass                                                                          | `string`  |     css class that needs to be assigned      | -         | v1.0.1  |
| style                                                                             | `string`  |   inline style string separated by commas    | -         | v1.0.7  |
| message                                                                           | `string`  |           Message to be displayed            | "Message" | v1.0.1  |
| defaultvalue                                                                      | `string`  |    Default value assigned to the control     | -         | v1.0.4  |
| fullscreen                                                                        | `boolean` |    Does the dialog needs to be fullscreen    | false     | v1.0.1  |
| buttons                                                                           |  `JSON`   |               JSON List array                | -         | v1.0.1  |
| buttons: label                                                                    | `string`  |             Label of the button              | "Ok"      | v1.0.1  |
| buttons: callbackfunction [{name: functionname, {params: [param1, ...,paramX] } } |  `array`  |   array of functions to call when on click   | close     | v1.0.7  |
| buttons: focus                                                                    | `boolean` | The button to focus, when multiple last one  | false     | v1.0.1  |
| overlay: title                                                                    | `string`  |                   h3 title                   | "Title"   | v1.0.1  |
| overlay: help                                                                     | `string`  |             Help text in purple              | null      | v1.0.1  |
| overlay: form                                                                     |  `JSON`   |       Container of other form controls       | null      | v1.0.1  |
| form: type                                                                        | `string`  | Controls viz. label, input, select, textarea | -         | v1.0.1  |
| label: caption                                                                    | `string`  |             Caption of the label             | -         | v1.0.1  |
| input: placeholder                                                                | `string`  |               Placeholder text               | null      | v1.0.1  |
| input: inputtype                                                                  | `string`  |       All acceptable HTML input types        | -         | v1.0.1  |
| textarea: rows                                                                    | `integer` |        Number of rows in the textarea        | -         | v1.0.1  |

### Styling

The class name can be passed as a string seperated by comma(,), either custom
CSS classes created or classes from other open-source CSS frameworks (bootstrap
etc...).

v1.0.7 Introduces the inline styling. Pass the style parameters separated by
semi colon for overlay:form controls.

eg. style: "color:red; font-weight: bold"

## Reachout for feedback and comments

Feel free to [Contact me](mailto:moses.terence@outlook.com) or
[Create an issue](https://github.com/raw-codes/raw-dialogs/issues/new)

## License

Released under the [Mit License](https://opensource.org/licenses/MIT)

## Screen-shots

<p align="center">
	<img src="https://github.com/raw-codes/raw-dialogs/blob/master/images/raw-dialogs.gif" />
</p>

## Example

https://github.com/raw-codes/raw-dialogs/tree/master/example
