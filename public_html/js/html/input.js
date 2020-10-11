// HTML Input Utilities
// Copyright (C) DeRemee Systems, IXE Electronics LLC
// Portions copyright IXE Electronics LLC, Republic Robotics, FemtoLaunch, FemtoSat, FemtoTrack, Weland
// This work is made available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.

class HTMLInput{
	constructor(){
		this._AltText = "";
		this._AutoComplete = false;
		this._AutoFocus = false;
		this._ButtonImage = "";
		this._Checked = false;
		this._Disabled = false;
		this._DisplaySize = "";
		this._EncodingType = "";
		this._EventTarget = "";
		this._EventType = "";
		this._Form = "";
		this._FileFilter = [];
		this._GlobalAttribs = "";
		this._ID = "";
		this._ImageHeight = "";
		this._ImageSource = "";
		this._ImageWidth = "";
		this._InputStep = "";
		this._LengthMax = "";
		this._List = "";
		this._MultipleEnable = false;
		this._Name = "";
		this._Parent = "";
		this._PixelWidth = "";
		this._Placeholder = "";
		this._ReadOnly = false;
		this._RegEx = "";
		this._Required = false;
		this._SubmitMethod = "";
		this._SubmitURL = "";
		this._Target = "";
		this._TextDirection = false;
		this._Type = "";
		this._Validate = false;
		this._Value = "";
		this._ValueMax = "";
		this._ValueMin = "";
	}
	append(){
		if(this._Parent != "" && this._Type != ""){
			var Input = document.createElement("input");
			if(this._ID != ""){
				Input.setAttribute("id", this._ID);
			}
			Input.setAttribute("type", this._Type);
			if(this._Type === "file"){
				//Write the file filter
				if(this._FileFilter.length != 0){
					var FileList = "";
					for(i = 0; i < this._FileFilter.length; i++){
						if(i === 0){
							FileList += this._FileFilter[0];
						} else {
							FileList += ", " + this._FileFilter[i];
						}
					}
					Input.setAttribute("accept", FileList);
				}
			}
			if(this._Type === "email" || this._Type === "file"){
				if(this._MultipleEnable === true){
					Input.setAttribute("multiple", "multiple");
				}
			}
			if(this._Type === "image"){
				//Write image attributes
				if(this._AltText != ""){
					Input.setAttribute("alt", this.AltText);
				}
				if(this._ImageHeight != ""){
					Input.setAttribute("height", this.ImageHeight);
				}
				if(this._ImageSource != ""){
					Input.setAttribute("src", this.ImageSource);
				}
				if(this._ImageWidth != ""){
					Input.setAttribute("width", this.ImageWidth);
				}
			}
			//Write autocomplete attributes
			if(this._Type === "color" ||
				this._Type === "date" ||
				this._Type === "datetime-local" ||
				this._Type === "email" ||
				this._Type === "password" ||
				this._Type === "range" ||
				this._Type === "search" ||
				this._Type === "tel" ||
				this._Type === "text" ||
				this._Type === "url"){
				if(this._AutoComplete === true){
					Input.setAttribute("autocomplete", "on");
				} else {
					Input.setAttribute("autocomplete", "off");
				}
			}
			//Write min/max value attributes
			if(this._Type === "date" ||
				this._Type === "datetime" ||
				this._Type === "datetime-local" ||
				this._Type === "month" ||
				this._Type === "number" ||
				this._Type === "range" ||
				this._Type === "time" ||
				this._Type === "week"){
				if(this._InputStep != ""){
					Input.setAttribute("step", this._InputStep);
				}
				if(this._ValueMin != ""){
					Input.setAttribute("min", this._ValueMin);
				}
				if(this._ValueMax != ""){
					Input.setAttribute("max", this._ValueMax);
				}
			}
			//Write submit/image attributes
			if(this._Type === "image" || this._Type === "submit"){
				if(this._SubmitMethod != ""){
					Input.setAttribute("formmethod", this._SubmitMethod);
				}
				if(this._SubmitURL != ""){
					Input.setAttribute("formaction", this._SubmitURL);
				}
				if(this._EncodingType != ""){
					Input.setAttribute("formenctype", this._EncodingType);
				}
				if(this._Target != ""){
					Input.setAttribute("formtarget", this._Target);
				}
			}
			if(this._Type === "checkbox" || this._Type === "radio"){
				if(this._Checked != false){
					Input.setAttribute("checked", "checked");
				}
			}
			//Write remaining attributes
			if(this._AutoFocus === true){
				Input.setAttribute("autofocus", "autofocus");
			}
			if(this._Name != ""){
				Input.setAttribute("name", this._Name);
				if(this._TextDirection === true){
					Input.setAttribute("dirname", this._Name + ".dir");
				}
			}
			if(this._Disabled === true){
				Input.setAttribute("disabled", "disabled");
			}
			if(this._Form != "") {
				Input.setAttribute("form", this._Form);
			}
			if(this._List != ""){
				Input.setAttribute("list", this._List);
			}
			if(this._Type === "date" || this._Type === "email" || this._Type === "password" || this._Type === "search" || this._Type === "tel" || this._Type === "text" || this._Type === "url"){
				if(this._RegEx != ""){
					Input.setAttribute("pattern", this._RegEx);
				}
			}
			if(this._Type === "email" || this._Type === "password" || this._Type === "search" || this._Type === "tel" || this._Type === "text" || this._Type === "url"){
				if(this._Placeholder != ""){
					Input.setAttribute("placeholder", this._Placeholder);
				}
			}
			if(this._ReadOnly === true){
				Input.setAttribute("readonly", "readonly");
			}
			if(this._Type === "checkbox" ||
				this._Type === "date" ||
				this._Type === "datetime-local" ||
				this._Type === "email" ||
				this._Type === "file" ||
				this._Type === "password" ||
				this._Type === "radio" ||
				this._Type === "search" ||
				this._Type === "tel" ||
				this._Type === "text" ||
				this._Type === "url"){
				if(this._Required === true){
					Input.setAttribute("required", "required");
				}
			}
			if(this._Type != "file" && this._Value != ""){
				Input.setAttribute("value", this._Value);
			}
			if(this._EventType != "" && this._EventTarget != ""){
				Input.setAttribute(this._EventType, this._EventTarget);
			}
			this._Parent.appendChild(Input);
		}
	}
	get HTML(){
		var _HTML = "";
		if(this._Type != ""){
			_HTML += '<input type = "' + this._Type;
			if(this._ID != ""){
				_HTML += ' id = "' + this._ID + '"';
			}
			if(this._Type === "file"){
				//Write the file filter
				if(this._FileFilter.length != 0){
					_HTML += ' accept = "';
					for(i = 0; i < this._FileFilter.length; i++){
						if(i === 0){
							_HTML += this._FileFilter[0];
						} else {
							_HTML += ", " + this._FileFilter[i];
						}
					}
					_HTML += '"';
				}
			}
			if(this._Type === "email" || this._Type === "file"){
				if(this._MultipleEnable === true){
					_HTML += " multiple";
				}
			}
			if(this._Type === "image"){
				//Write image attributes
				if(this._AltText != ""){
					_HTML += ' alt = "' + this.AltText + '"';
				}
				if(this._ImageHeight != ""){
					_HTML += ' height = "' + this.ImageHeight + '"';
				}
				if(this._ImageSource != ""){
					_HTML += ' src = "' + this.ImageSource + '"';
				}
				if(this._ImageWidth != ""){
					_HTML += ' width = "' + this.ImageWidth + '"';
				}
			}
			//Write autocomplete attributes
			if(this._Type === "color" ||
				this._Type === "date" ||
				this._Type === "datetime-local" ||
				this._Type === "email" ||
				this._Type === "password" ||
				this._Type === "range" ||
				this._Type === "search" ||
				this._Type === "tel" ||
				this._Type === "text" ||
				this._Type === "url"){
				if(this._AutoComplete === true){
					HTML += ' autocomplete = "on"';
				} else {
					HTML += ' autocomplete = "off"';
				}
			}
			//Write min/max value attributes
			if(this._Type === "date" ||
				this._Type === "datetime" ||
				this._Type === "datetime-local" ||
				this._Type === "month" ||
				this._Type === "number" ||
				this._Type === "range" ||
				this._Type === "time" ||
				this._Type === "week"){
				if(this._InputStep != ""){
					HTML += ' step = "' + this._InputStep + '"';
				}
				if(this._ValueMin != ""){
					HTML += ' min = "' + this._ValueMin + '"';
				}
				if(this._ValueMax != ""){
					HTML += ' max = "' + this._ValueMax + '"';
				}
			}
			//Write submit/image attributes
			if(this._Type === "image" || this._Type === "submit"){
				if(this._SubmitMethod != ""){
					_HTML += ' formmethod ="' + this._SubmitMethod + '"';
				}
				if(this._SubmitURL != ""){
					_HTML += ' formaction ="' + this._SubmitURL + '"';
				}
				if(this._EncodingType != ""){
					_HTML += ' formenctype ="' + this._EncodingType + '"';
				}
				if(this._Target != ""){
					_HTML += ' formtarget ="' + this._Target + '"';
				}
			}
			if(this._Type === "checkbox" || this._Type === "radio"){
				if(this._Checked != false){
					_HTML += " checked";
				}
			}
			//Write remaining attributes
			if(this._AutoFocus === true){
				_HTML += " autofocus";
			}
			if(this._Name != ""){
				_HTML += ' name ="' + this._Name + '"';
				if(this._TextDirection === true){
					_HTML += ' dirname = "' + this._Name + '.dir"'; 
				}
			}
			if(this._Disabled === false){
				_HTML += " disabled";
			}
			if(this._Form != "") {
				_HTML += ' form = "' + this._Form + '"';
			}
			if(this._List != ""){
				_HTML += ' list = "' + this._List + '"';
			}
			if(this._Type === "date" || this._Type === "email" || this._Type === "password" || this._Type === "search" || this._Type === "tel" || this._Type === "text" || this._Type === "url"){
				if(this._RegEx != ""){
					_HTML += ' pattern = "' + this._RegEx + '"';
				}
			}
			if(this._Type === "email" || this._Type === "password" || this._Type === "search" || this._Type === "tel" || this._Type === "text" || this._Type === "url"){
				if(this._Placeholder != ""){
					_HTML += ' placeholder = "' + this._Placeholder + '"';
				}
			}
			if(this.ReadOnly === true){
				_HTML += " readonly";
			}
			if(this._Type === "checkbox" ||
				this._Type === "date" ||
				this._Type === "datetime-local" ||
				this._Type === "email" ||
				this._Type === "file" ||
				this._Type === "password" ||
				this._Type === "radio" ||
				this._Type === "search" ||
				this._Type === "tel" ||
				this._Type === "text" ||
				this._Type === "url"){
				if(this._Required === true){
					_HTML += " required";
				}
			}
			if(this._Type != "file" && this._Value != ""){
				_HTML += ' value = "' + this._Value + '"';
			}
			if(this._EventType != "" && this._EventTarget != ""){
				_HTML += " " + this._EventType + ' = "' + this._EventTarget + '"';
			}
		}
		return _HTML;
	}
	set AltText(Text){
		this._AltText = Text;
	}
	AutoCompleteDisable(){
		this._AutoComplete = false;
	}
	AutoCompleteEnable(){
		this._AutoComplete = true;
	}
	AutoFocusDisable(){
		this._AutoFocus = false;
	}
	AutoFocusEnable(){
		this._AutoFocus = true;
	}
	setButtonImage(URL){
		this._ButtonImage = URL;
	}
	Checked(){
		this._Checked = true;
	}
	Disable(){
		this._Disabled = true;
	}
	Enable(){
		this._Disabled = false;
	}
	set DisplaySize(Value){
		this._DisplaySize = Value;
	}
	EncodingTypeApplication(){
		this._EncodingType = "application/x-www-form-urlencoded";
	}
	EncodingTypeMultipart(){
		this._EncodingType = "multipart/form-data";
	}
	EncodingTypeText(){
		this._EncodingType = "text/plain";
	}
	set EventTarget(Handler){
		this._EventTarget = Handler;
	}
	set EventType(Event){
		this._EventType = Event;
	}
	set Form(ID){
		this._Form = ID;
	}
	FileFilterAdd(Extension){
		if(Extension != ""){
			for(i = 0; i < this._FileFilter.length; i++){
				if(this._FileFilter === Extension){
					return;
				}
			}
			this._FileFilter.push(Extension);
		}
	}
	FileFilterClear(){
		this._FileFilter = [];
	}
	FileFilterDelete(Extension){
		if(Extension != ""){
			for(i = 0; i < this._FileFilter.length; i++){
				if(this._FileFilter === Extension){
					this._FileFilter.splice[i, 1];
				}
			}
		}
	}
	set GlobalAttribs(Object){
		this._GlobalAttribs = Object;
	}
	set ID(ID){
		this._ID = ID;
	}
	set ImageHeight(Value){
		this._ImageHeight = Value;
	}
	set ImageWidth(Value){
		this._ImageWidth = Value;
	}
	set InputStep(Value){
		this._InputStep = Value;
	}
	set LengthMax(Value){
		this._LengthMax = Value;
	}
	set List(ID){
		this._List = ID;
	}
	MultipleDisable(){
		this._MultipleEnable = false;
	}
	MultipleEnable(){
		this._MultipleEnable = false;
	}
	set Name(Name){
		this._Name = Name;
	}
	NotRequired(){
		this._Required = false;
	}
	set Parent(Object){
		this._Parent = Object;
	}
	set PixelWidth(Value){
		this._PixelWidth = Value;
	}
	set PlaceHolder(Text){
		this._Placeholder = Text;
	}
	ReadOnly(){
		this._ReadOnly = true;
	}
	ReadWrite(){
		this._ReadOnly = false;
	}
	set RegEx(Expression){
		this._RegEx = Expression;
	}
	Required(){
		this._Required = true;
	}
	SubmitMethodGet(){
		this._SubmitMethod = "get";
	}
	SubmitMethodPost(){
		this._SubmitMethod = "post";
	}
	set SubmitURL(URL){
		this._SubmitURL = URL;
	}
	set Target(Frame){
		this._Target = Frame;
	}
	TargetBlank(){
		this._Target = "_blank";
	}
	TargetParent(){
		this._Target = "_parent";
	}
	TargetSelf(){
		this._Target = "_self";
	}
	TargetTop(){
		this._Target = "_top";
	}
	TextDirectionDisable(){
		this._TextDirection = false;
	}
	TextDirectionEnable(){
		this._TextDirection = true;
	}
	set ButtonImageURL(URL){
		this._ButtonImageURL = URL;
	}
	TypeButton(){
		this._Type = "button";
	}
	TypeCheckbox(){
		this._Type = "checkbox";
	}
	TypeColor(){
		this._Type = "color";
	}
	TypeDate(){
		this._Type = "date";
	}
	TypeDateTime(){
		this._Type = "datetime-local";
	}
	TypeEmail(){
		this._Type = "email";
	}
	TypeFile(){
		this._Type = "file";
	}
	TypeHidden(){
		this._Type = "hidden";
	}
	TypeImage(){
		this._Type = "image";
	}
	TypeMonth(){
		this._Type = "month";
	}
	TypeNumber(){
		this._Type = "number";
	}
	TypePassword(){
		this._Type = "password";
	}
	TypeRadio(){
		this._Type = "radio";
	}
	TypeRange(){
		this._Type = "range";
	}
	TypeReset(){
		this._Type = "reset";
	}
	TypeSearch(){
		this._Type = "search";
	}
	TypeSubmit(){
		this._Type = "submit";
	}
	TypeTelephone(){
		this._Type = "tel";
	}
	TypeText(){
		this._Type = "text";
	}
	TypeTime(){
		this._Type = "time";
	}
	TypeURL(){
		this._Type = "url";
	}
	TypeWeek(){
		this._Type = "week";
	}
	Unchecked(){
		this._Checked = false;
	}
	ValidateDisable(){
		this._Validate = false;
	}
	ValidateEnable(){
		this._Validate = true;
	}
	set Value(Value){
		this._Value = Value;
	}
	set ValueMax(Value){
		this._ValueMax = Value;
	}
	set ValueMin(Value){
		this._ValueMin = Value;
	}
}
