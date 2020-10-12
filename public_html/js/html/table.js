// HTML Table Utilities
// Copyright (C) DeRemee Systems, IXE Electronics LLC
// Portions copyright IXE Electronics LLC, Republic Robotics, FemtoLaunch, FemtoSat, FemtoTrack, Weland
// This work is made available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.

class HTMLTable{
	constructor(){
		this._ColumnCount = 0;
		this._GlobalAttribs = "";
		this._Parent = "";
		this._Row = [];
		this._RowCount = 0;
	}
	append(){
	    
	}
	set CellContents(CellObject){
	        this._Row[CellObject.Row][CellObject.Column].Contents = CellObject.Text;
	}
	set ColumnCount(Count){
	    if(Count > -1){
	        this._ColumnCount = Count;
	    }
	}
	set Dimensions(DimensionObject){
	    this._ColumnCount = DimensionObject.ColumnCount;
	    this._RowCount = DimensionObject.RowCount;
	    this._Row = [];
	    for(var i = 0; i < this._RowCount; i++){
	        this._Row.push(Array(this._ColumnCount).fill(new HTMLTD()));
	    }
	}
	set RowCount(Count){
	    if(Count > -1){
	        this._RowCount = Count;
	    }
	}
}

class TableCellObject{
    constructor(){
        this._Column = 0;
        this._Contents = "";
        this._Row = 0;
    }
    get Column(){
        return this._Column;
    }
    get Contents(){
        return this._Contents;
    }
    get Row(){
        return this._Row;
    }
    set AppendContents(Text){
        this._Contents += Text;
    }
    set Column(Column){
        if(Column > -1){
            this._Column = Column;
        }
    }
    set Contents(Text){
        this._Contents = Text;
    }
    set Row(Row){
        if(Row > -1){
            this._Row = Row;
        }
    }
}

class TableDimensionObject{
    constructor(){
        this._ColumnCount = 0;
        this._RowCount = 0;
    }
    get ColumnCount(){
        return this._ColumnCount;
    }
    get RowCount(){
        return this._RowCount;
    }
    set ColumnCount(ColumnCount){
        if(ColumnCount > -1){
            this._ColumnCount = ColumnCount;
        }
    }
    set RowCount(RowCount){
        if(RowCount > -1){
            this._RowCount = RowCount;
        }
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
		this._RowSpan = "";
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
			if(this._RowSpan != ""){
				TD.setAttribute("rowspan",  this._RowSpan);
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
	set AppendContents(Text){
	    this._Contents += Text;
	}
	set ColumnSpan(ColumnCount){
		this._ColumnSpan = ColumnCount;
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
	set RowSpan(RowCount){
		this._RowSpan = RowCount;
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
		var _HTML = "<th";
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
		_HTML += "</th>";
		return _HTML;
	}
	set Abbreviation(Abbreviation){
		this._Abbreviaton = Abbreviation;
	}
	set AppendContents(Text){
	    this._Contents += Text;
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
			_HTML += ' ' + this._GlobalAttribs.HTML;
		}
		_HTML += ">";
		//Write contents
		_HTML += this._Contents;
		//Write closing tr
		_HTML += "</tr>";
		return _HTML;
	}
	set AppendContents(Text){
	    this._Contents += Text;
	}
	set Contents(Text){
		this._Contents = Text;
	}
	set GlobalAttribs(Attribs){
		this._GlobalAttribs = Attribs;
	}
}
