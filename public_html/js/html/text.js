// HTML Text Utilities
// Copyright (C) DeRemee Systems, IXE Electronics LLC
// Portions copyright IXE Electronics LLC, Republic Robotics, FemtoLaunch, FemtoSat, FemtoTrack, Weland
// This work is made available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.

class HTMLText{
	constructor(Text){
		if(Text != null && Text != ""){
			this._Text = Text;
		} else {
			this._Text = "";
		}
	}
	get HTML(){
		var _HTML = "";
		if(this._Bold){
			_HTML += "<b>";
		}
		if(this._Deleted){
			_HTML += "<del>";
		}
		if(this._Emphasized){
			_HTML += "<em>";
		}
		if(this._Italic){
			_HTML += "<i>";
		}
		if(this._Inserted){
			_HTML += "<ins>";
		}
		if(this._Marked){
			_HTML += "<mark>";
		}
		if(this._Small){
			_HTML += "<small>";
		}
		if(this._Strong){
			_HTML += "<strong>";
		}
		if(this._Subscript){
			_HTML += "<sub>";
		}
		if(this._Superscript){
			_HTML += "<sup>";
		}
		_HTML += this._Text;
		if(this._Bold){
			_HTML += "</b>";
		}
		if(this._Deleted){
			_HTML += "</del>";
		}
		if(this._Emphasized){
			_HTML += "</em>";
		}
		if(this._Italic){
			_HTML += "</i>";
		}
		if(this._Inserted){
			_HTML += "</ins>";
		}
		if(this._Marked){
			_HTML += "</mark>";
		}
		if(this._Small){
			_HTML += "</small>";
		}
		if(this._Strong){
			_HTML += "</strong>";
		}
		if(this._Subscript){
			_HTML += "</sub>";
		}
		if(this._Superscript){
			_HTML += "</sup>";
		}
        return _HTML;
	}
	set Append(TextString){
		this._Text += TextString;
	}
	set Text(TextString){
		this._Text = TextString;
	}
	set Bold(Flag){
		this._Bold = FlagValue(Flag);
	}
	set Deleted(Flag){
		this._Deleted = FlagValue(Flag);
	}
	set Emphasized(Flag){
		this._Emphasized = FlagValue(Flag);
	}
	set Italic(Flag){
		this._Italic = FlagValue(Flag);
	}
	set Inserted(Flag){
		this._Inserted = FlagValue(Flag);
	}
	set Marked(Flag){
		this._Marked = FlagValue(Flag);
	}
	set Small(Flag){
		this._Small = FlagValue(Flag);
	}
	set Strong(Flag){
		this._Strong = FlagValue(Flag);
	}
	set Subscript(Flag){
		this._Subscript = FlagValue(Flag);
	}
	set Superscript(Flag){
		this._Superscript = FlagValue(Flag);
	}
}
