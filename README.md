# raw-dialogs

## Getting Started

- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Props](#props)
- [Styling](#Styling)

### Installation

```bash
$ npm i raw-dialogs --save
```

### Basic Usage

```javascript
const dialogs = require("raw-dialogs");

    //To create a simple alert set the props (JSON format) and pass it to createDialog() method
    let props = {
		type: "alert",
		titlebar: "Alerting Application",
		cssclass: "form-controls",
		message: >Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>",
		buttons: [ {
				label: "Ok",
				callbackfunction: alertMessage,
				cssclass: "btn, btn-primary",
			},	],
	};
	dialogs.createDialog(props);

	//To create a simple Prompt set the props (JSON format) and pass it to createDialog() method
	//An Input will be shown to get the input
	let props = {
		type: "prompt",
		titlebar: "Prompting Application",
		message:
			"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>",
		buttons: [ 	{
				label: "Enter your name and click proceed",
				callbackfunction: alertMessage,
			},	],
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
					},
					{
						type: "input",
						inputtype: "text",
						placeholder: "Placeholder that will be shown",
						cssclass: "form-controls",
					},
					{
						type: "label",
						caption: "Age",
					},
					{
						type: "select",
						options:
							"one, two, three, four, five, six, seven, eight, nine, ten",
						values: "1, 2, 3,4,5,6,7,8, 9, 10",
						cssclass: "form-controls, chosen-select",
					},
					{
						type: "label",
						caption: "Address",
					},
					{
						type: "textarea",
						rows: 5,
						placeholder: "Placeholder that will be shown",
						cssclass: "form-controls",
					},
				],
			},
			buttons: [
				{
					label: "Ok",
					callbackfunction: alertMessage,
					cssclass: "btn, btn-primary",
					focus: true,
				},
				{
					label: "Cancel",
					callbackfunction: alertMessage1,
					cssclass: "btn, btn-warning",
				},
			],
		};
		dialogs.createDialog(props);

```

### Props

| Prop                      |   Type    |                 Description                  | Default   |
| :------------------------ | :-------: | :------------------------------------------: | :-------- |
| type                      | `string`  |           Overlay, Prompt or Alert           | alert     |
| titlebar                  | `string`  |    Text shown in the title bar of dialog     | "Title"   |
| cssclass                  | `string`  |     css class that needs to be assigned      | -         |
| message                   | `string`  |           Message to be displayed            | "Message" |
| fullscreen                | `boolean` |    Does the dialog needs to be fullscreen    | false     |
| buttons                   |  `JSON`   |               JSON List array                | -         |
| buttons: label            | `string`  |             Label of the button              | "Ok"      |
| buttons: callbackfunction |  `func`   |        function to call when on click        | close     |
| buttons: focus            | `boolean` | The button to focus, when multiple last one  | false     |
| overlay: title            | `string`  |                   h3 title                   | "Title"   |
| overlay: help             | `string`  |             Help text in purple              | null      |
| overlay: form             |  `JSON`   |       Container of other form controls       | null      |
| form: type                | `string`  | Controls viz. label, input, select, textarea | -         |
| label: caption            | `string`  |             Caption of the label             | -         |
| input: placeholder        | `string`  |               Placeholder text               | null      |
| input: inputtype          | `string`  |       All acceptable HTML input types        | -         |
| textarea: rows            | `integer` |        Number of rows in the textarea        | -         |

### Styling

The class name can be passed as a string seperated by comma(,), either custom
CSS classes created or classes from other open-source CSS frameworks (bootstrap
etc...)

## Reachout for feedback and comments

Feel free to [Contact me](mailto:moses.terence@outlook.com) or
[Create an issue](https://github.com/raw-codes/raw-dialogs/issues/new)

## License

Released under the [Mit License](https://opensource.org/licenses/MIT)
