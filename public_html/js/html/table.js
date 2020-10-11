// HTML Table Utilities
// Copyright (C) DeRemee Systems, IXE Electronics LLC
// Portions copyright IXE Electronics LLC, Republic Robotics, FemtoLaunch, FemtoSat, FemtoTrack, Weland
// This work is made available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.

class HTMLTable{
	constructor(){
		
	}
}

class HTMLTD{
	constructor(){
		this._ColumnSpan = "";
		this._Contents = "";
		this._EventTarget = "";
		this._EventType = "";
		this._GlobalAttribs = "";
		this._Header = "";
		this._Parent = "";
	}
	append(){
		if(this._Parent != ""){
			//Create TD element
			TD = document.createElement("td");
			if(this._GlobalAttribs != ""){
				TD.innerHTML += " " + this._GlobalAttribs.HTML;
			}
			if(this._ColumnSpan != ""){
				TD.setAttribute("colspan",  this._ColumnSpan);
			}
			if(this._EventType != "" && this._EventTarget != ""){
				TD.setAttribute(this._EventType, this._EventTarget);
			}
			if(this._Header != ""){
				TD.setAttribute("headers", this._Header);
			}
			if(this._Contents != ""){
				TD.innerHTML = this._Contents;
			}
			this._Parent.appendChild(TD);
		}
	}
	get HTML(){
		//Write opening td
		var _HTML = "<td";
		if(this._GlobalAttribs != ""){
			_HTML += " " + this._GlobalAttribs.HTML;
		}
		if(this._ColumnSpan != ""){
			_HTML += ' colspan = "' + this._ColumnSpan + '"';
		}
		if(this._EventType != "" && this._EventTarget != ""){
			TD.innerHTML += " " + this._EventType + ' = "' + this._EventTarget + '"';
		}
		if(this._Header != ""){
			_HTML += ' headers = "' + this._Header + '"';
		}
		_HTML += ">";
		//Write contents
		_HTML += this._Contents;
		//Write closing td
		_HTML += "</td>";
		return _HTML;
	}
	set ColumnSpan(Columns){
		this._ColumnSpan = Columns;
	}
	set Contents(Text){
		this._Contents = Text;
	}
	set Header(ID){
		this._Header = ID;
	}
	set GlobalAttribs(Object){
		this._GlobalAttribs = Object;
	}
	set Parent(Parent){
		this._Parent = Parent;
	}
}

class HTMLTH{
	constructor(){
		this._Abbreviation = "";
		this._ColumnSpan = "";
		this._Contents = "";
		this._GlobalAttribs = "";
		this._Header = "";
		this._RowSpan = "";
		this._Scope = "";
	}
	get HTML(){
		//Write opening th
		_HTML = "<th";
		if(this._GlobalAttribs != ""){
			_HTML += ' ' + this._GlobalAttribs;
		}
		if(this._Abbreviation != ""){
			_HTML += ' abbr = "' + this._Abbreviation + '"';
		}
		if(this._ColumnSpan != ""){
			_HTML += ' colspan = "' + this._ColumnSpan + '"';
		}
		if(this._Header != ""){
			_HTML += ' headers = "' + this._Header + '"';
		}
		if(this._RowSpan != ""){
			_HTML += ' rowspan = "' + this._RowSpan + '"';
		}
		if(this._Scope != ""){
			_HTML += ' scope = "' + this._Scope + '"';
		}
		_HTML += ">";
		//Write contents
		_HTML += this._Contents;
		//Write closing th
		_HMTL += "</th>";
	}
	set Abbreviation(Abbreviation){
		this._Abbreviaton = Abbreviation;
	}
	set ColumnSpan(Columns){
		this._ColumnSpan = Columns;
	}
	set Header(ID){
		this._Header = ID;
	}
	set RowSpan(Rows){
		this._RowSpan = Rows;
	}
	ScopeClear(){
		this._Scope = "";
	}
	ScopeColumn(){
		this._Scope = "col";
	}
	ScopeColumnGroup(){
		this._Scope = "colgroup";
	}
	ScopeRow(){
		this._Scope = "row";
	}
	ScopeRowGroup(){
		this._Scope = "rowgroup";
	}
	set Contents(Text){
		this._Contents = Text;
	}
	set GlobalAttribs(Attribs){
		this._GlobalAttribs = Attribs;
	}
}

class HTMLTR{
	constructor(){
		this._Contents = "";
		this._GlobalAttribs = "";
	}
	get HTML(){
		//Write opening tr
		var _HTML = "<tr";
		if(this._GlobalAttribs != ""){
			_HTML += ' ' + this._GlobalAttribs;
		}
		_HTML += ">";
		//Write contents
		_HTML += this._Contents;
		//Write closing tr
		_HMTL += "</tr>";
	}
	set Contents(Text){
		this._Contents = Text;
	}
	set GlobalAttribs(Attribs){
		this._GlobalAttribs = Attribs;
	}
}
