// HTML Global Attribute Utilities
// Copyright (C) DeRemee Systems, IXE Electronics LLC
// Portions copyright IXE Electronics LLC, Republic Robotics, FemtoLaunch, FemtoSat, FemtoTrack, Weland
// This work is made available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.

class HTMLGlobalAttrib{
	constructor(){
		this._AccessKey = "";
		this._ClassName = "";
		this._DataTag = "";
		this._DataString = "";
		this._Draggable = false;
		this._DropAction = "";
		this._Editable = false;
		this._Hidden = false;
		this._ID = "";
		this._Language = "";
		this._SpellCheck = false;
		this._TabIndex = "";
		this._TextDirection = "";
		this._Title = "";
		this._Translate = false;
	}
	get HTML(){
		var _HTML = "";
		if(this._AccessKey != ""){
			_HTML += ' accesskey = "' + this._AccessKey + '"';
		}
		if(this._ClassName != ""){
			_HTML += ' class = "' + this._ClassName + '"';
		}
		if(this._DataTag != ""){
			_HTML += ' data-' + this._DataTag + '"' + this._DataString + '"';
		}
		if(this._Draggable != false){
			_HTML += ' draggable = "true"';
		}
		if(this._DropAction != ""){
			_HTML += ' dropzone = "' + this._DropAction + '"';
		}
		if(this._Editable != false){
			_HTML += ' contenteditable = "true"';
		}
		if(this._Hidden != false){
			_HTML += ' hidden';
		}
		if(this._ID != ""){
			_HTML += ' ID = "' + this._ID + '"';
		}
		if(this._Language != ""){
			_HTML += ' lang = "' + this._Language + '"';
		}
		if(this._SpellCheck != false){
			_HTML += ' spellcheck = "true"';
		}
		if(this._TabIndex != ""){
			_HTML += ' tabindex = "' + this._TabIndex + '"';
		}
		if(this._TextDirection != ""){
			_HTML += ' dir = "' + this._TextDirection + '"';
		}
		if(this._Title != ""){
			_HTML += ' title = "' + this._Title + '"';
		}
		if(this._Translate != false){
			_HTML += ' translate = "yes"';
		}
		return _HTML;
	}
	set AccessKey(Key){
		this._AccessKey = Key;
	}
	set ClassName(Name){
		this._ClassName = Name;
	}
	set Data(DataString){
		this._DataString = DataString;
	}
	set Data(DataTag){
		this._DataString = DataString;
	}
	set Draggable(Flag){
		this._Draggable = FlagValue(Flag);
	}
	set DropAction(Action){
		this._DropAction = Action;
	}
	set Editable(Flag){
		this._Editable = FlagValue(Flag);
	}
	set Hidden(Flag){
		this._Hidden = FlagValue(Flag);
	}
	set ID(ID){
		this._ID = ID;
	}
	set Language(Language){
		this._Language = Language;
	}
	set SpellCheck(Flag){
		this._SpellCheck = FlagValue(Flag);
	}
	set TabIndex(Index){
		this._TabIndex = Index;
	}
	set TextDirection(Direction){
		this._TextDirection = Direction;
	}
	set Title(Title){
		this._Title = Title;
	}
	set Translate(Flag){
		this._Translate = FlagValue(Flag);
	}
}
