// Karnaugh Map Tool
// Copyright (C) DeRemee Systems, IXE Electronics LLC
// Portions copyright IXE Electronics LLC, Republic Robotics, FemtoLaunch, FemtoSat, FemtoTrack, Weland
// This work is made available under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/4.0/.


//HTML Creation Functions




class HTMLStyle{

}





function FlagValue(Flag){
	if(Flag === "true" || Flag === "True" || Flag === "TRUE" || Flag === "1" || Flag === 1 || Flag === true){
		return true;
	} else {
		return false;
	}
}

	// Constants
	MaxInputCount = 8;								
	MaxOutputCount = 3;
	BitOrder = new Array(0, 1, 3, 2, 6, 7, 5, 4, 12, 13, 15, 14, 10, 11, 9, 8);		// bits across and down Kmap
	BackgroundColor = "white";
	AllowDontCare = false;						// true doesn't guarantee a minimal solution
	DontCare = "X";

	// Variables (initialized here)
	InputName = new Array("A", "B", "C", "D", "E", "F", "G", "H");
	OutputName = new Array("X", "Y", "Z");
	InputCount = 5;							//1..4
	TruthTable = new Array();					// truth table structure[row][variable]
	KMap = new Array();							// KMap[across][down]
	FunctionText = "";							// F(ABC)= 
	EquationHighlightColor = "yellow";			// 0xFFFF00;
	Heavy = 20;

	Equation = new Array();						// solution results 
	for (i = 0; i < Math.pow(2, MaxInputCount); i++){
		Equation[i] = new Array();					// for each term in result function
		Equation[i].ButtonUIName = "EQ" + i;		// used to generate HTML IDs
		Equation[i].Expression = "";				// HTML text for term 
		Equation[i].Rect = null;					// 'rect' for term 
		Equation.UsedLength = 0;						// # of terms in current result function
	}
	Equation.UsedLength = 1;
	Equation[0].Expression = "0";

	// initialize the truth table and kmap structure for the given number of variables
	function InitializeTables(VarCount){
		TruthTable = new Array();
		KMap = new Array();							

		InputCount = VarCount;
		KMap.Width = Math.pow(2, Math.round(InputCount / 2));
		KMap.Height = Math.pow(2, InputCount) / KMap.Width;
		//Generate each row
		for (i = 0; i < Math.pow(2, InputCount); i++){
			TruthTable[i] = new Array();
			TruthTable[i].Index = i;
			TruthTable[i].Name = i.toString(2);
			TruthTable[i].ButtonUIName = "TT" + TruthTable[i].Name;
			TruthTable[i].TTROWUIName = "TTROW" + TruthTable[i].Name;
			//Generate each colum within the row
			for (j = 0; j < InputCount; j++){
				TruthTable[i][j] = new Array();
				TruthTable[i][j].Variable = (i & (1 << (InputCount - (j + 1)))?1:0)?true:false;
				TruthTable[i][j].Name = InputName[j];
				TruthTable[i][j].KMapEntry = null;
			}
		}

		KMap.XVariables = Math.log2(KMap.Width);
		KMap.YVariables = Math.log2(KMap.Height);
		for (w = 0; w < KMap.Width; w++){
			KMap[w] = new Array();
			for (h = 0; h < KMap.Height; h++){
				KMap[w][h] = new Array();
				KMap[w][h].Value = false;
				mapstr = BinaryString(BitOrder[w], KMap.XVariables) + BinaryString(BitOrder[h], KMap.YVariables);
				mapval = parseInt(mapstr, 2);
				KMap[w][h].TruthTableEntry = TruthTable[mapval];
				KMap[w][h].TruthTableEntry.KMapEntry = KMap[w][h];
				KMap[w][h].ButtonUIName = "KM" + KMap[w][h].TruthTableEntry.Name;
				KMap[w][h].TDUIName = "TD" + KMap[w][h].TruthTableEntry.Name;
				KMap[w][h].Covered = false;
				KMap[w][h].Variable = new Array();
				for (i = 0; i < InputCount; i++){
					KMap[w][h].Variable[i] = KMap[w][h].TruthTableEntry[i].Variable;
				}
			}
		}

		FunctionText = "F(";
		for (i = 0; i < InputCount; i++){
			FunctionText += InputName[i];
		}
		FunctionText += ")";

	}

	InitializeTables(InputCount);

	// returns a color to use for the backround for a given boolean value 
	// Value is expected to be "1", "0", or "X"
	function HighlightColor(Value){
		switch(Value){
			case "0":
				return "lightgreen";
				break;
			case "1":
				return "red";
				break;
			default:
				return "gray";
		}
	}

	// returns a color to use for rollover highlighting 
	//    Value is expected to be "1", "0", or "X"
	function RectHighlightColor( Value ){
		return EquationHighlightColor;
	}

	// init code (setup display according to query parameters)
	function Load(){
		//Generate controls for selecting number of inputs
		ElementArgSel = document.getElementById("ArgumentCountSelects");
		for(i = 2; i <= MaxInputCount; i++){
			TD = new HTMLTD;
			TD.Parent = ElementArgSel;
			TD.Contents = NumberToWords(i) + " Variables";
			TD.append();
			RB = new HTMLInput;
			RB.Parent = TD;
			RB.TypeRadio();
			RB.EventType = "onclick";
			RB.EventTarget = "ChangeInputCount(" + i + ");";
			RB.ID = NumberToWords(i) + "VariableRB";
			RB.append();
		}
		//Generate controls for selecting number of outputs

		//select default number of inputs
		if(InputCount > 1 && InputCount <= MaxInputCount){
			ChangeInputCount(InputCount);
		}else{
			ChangeInputCount(2);
		}
		if(GetElement("AllowDontCareCB").checked === true){
			ToggleDontCare();
		}
		//Generate the truth table, K-map, and equation
		document.getElementById("TruthTableDiv").innerHTML = GenerateTruthTableHTML();
		document.getElementById("KarnoMapDiv").innerHTML = GenerateKarnoMapHTML();
		document.getElementById("EquationDiv").innerHTML = GenerateEquationHTML();
	}

	// constructs a Rect type
	function CreateRect(x, y, w, h){
		var Obj = new Array();
		Obj.x = x;
		Obj.y = y;
		Obj.w = w;
		Obj.h = h;
		return Obj;
	}

	// Comparison of two trinary 'boolean' values (a boolean value or don't care)
	function Compare( Value1, Value2 ){
		if ( (Value1 == Value2) || (Value1 == DontCare) || (Value2 == DontCare) ){
			return true;
		}
		else{
			return false;
		}
	}

	// Determines if a Rect with a given value fits on the KMap: it 'fits' if every square of the Rect
	// matches (copmares with) the TestValue.
	// Assumes top left of Rect is within the KMap.
	// Assumes Rect is not larger than KMap
	function TestRect( Rect, TestValue ){
		var dx=0;
		var dy=0;
		for (dx=0; dx<Rect.w; dx++){
			for (dy=0; dy<Rect.h; dy++)
	{
				var Test = KMap[(Rect.x+dx)%KMap.Width][(Rect.y+dy)%KMap.Height].Value;
				if (!Compare(TestValue,Test)){
					return false;
				}
			}
		}
		return true;
	}

	// Returns true if for every square of the Rect in the KMap, the .Covered flag is set
	//    or the value of the square is don't care.
	function IsCovered( Rect ){
		var dx=0;
		var dy=0;
		for (dx=0; dx<Rect.w; dx++){
			for (dy=0; dy<Rect.h; dy++){
				if (!KMap[(Rect.x+dx)%KMap.Width][(Rect.y+dy)%KMap.Height].Covered) {
					//treat dont care's as already covered
					if (!(KMap[(Rect.x+dx)%KMap.Width][(Rect.y+dy)%KMap.Height].Value==DontCare)){
						return false;
					}
				}
			}
		}
		return true;
	}

	// Sets the .Covered flag for every square of the Rect in the KMap
	function Cover( Rect, IsCovered ){
		var dx=0;
		var dy=0;
		for (dx=0; dx<Rect.w; dx++){
			for (dy=0; dy<Rect.h; dy++){
				KMap[(Rect.x+dx)%KMap.Width][(Rect.y+dy)%KMap.Height].Covered = IsCovered;
			}
		}
	}

	// Tries every x,y location in the KMap to see if the given rect size (w,h) will fit there
	//   (matches in value).  For each location that fits, creates a rect and adds it to the Found 
	//   array.  If DoCover is true, also sets the KMap .Cover flag for the rects that fit.
	function SearchRect( w,h, TestValue, Found, DoCover ){
		if ((w>KMap.Width) || (h>KMap.Height)){
			return;  // rect is too large
		}
			
		var x=0;
		var y=0;
		var across = (KMap.Width==w) ?1:KMap.Width;
		var down   = (KMap.Height==h)?1:KMap.Height;
		for (x=0; x<across; x++){
			for (y=0; y<down; y++){
				var Rect = CreateRect(x,y,w,h);
				if (TestRect(Rect,TestValue)){
					if (!IsCovered(Rect)){
						Found[Found.length]=Rect;
						if (DoCover) Cover(Rect, true);
					}
				}
			}
		}
	}

	// Iterates through an array of Rects (in order) to determine which of them
	//  cover something in the KMap and which don't (because previous ones already
	//  have covered enough).  Adds rects that do cover something to the Used array.
	function TryRects(Rects,Used){
		var j = 0;
		for (j = 0; j < Rects.length; j++){
			var Rect = Rects[j];
			if (TestRect(Rect, true)){
				if (!IsCovered(Rect)){
					Used[Used.length] = Rect;
					Cover(Rect, true);
				}
			}
		}
	}

	// Adds the given Weight to every element of the Weights map that corresponds to the Rect.
	function AddRectWeight(Weights, Rect, Weight){
		var dx = 0;
		var dy = 0;
		for (dx = 0; dx < Rect.w; dx++){
			for (dy = 0; dy < Rect.h; dy++){
				Weights[(Rect.x + dx) % KMap.Width][(Rect.y + dy) % KMap.Height] += Weight;
			}
		}
	}


	// Retrieves a weight value of a rect, by summing the weight of each square in the Weights
	// map that correspond to the Rect
	function GetRectWeight(Weights, Rect){
		var dx = 0;
		var dy = 0;
		var W = 0;
		for (dx = 0; dx < Rect.w; dx++){
			for (dy = 0; dy < Rect.h; dy++){
				W += Weights[(Rect.x + dx) % KMap.Width][(Rect.y + dy) % KMap.Height];
			}
		}
		return W;
	}


	// Used for the array sorting function to sort objects by each object's .Weight member 
	function SortByWeight(a, b){
		if (a.Weight < b.Weight) return -1;
		else if (a.Weight > b.Weight) return 1;
		else return 0;
	}

	// Returns true if two Rects overlap (share any squares)
	function OverlappingRects(R1,R2){
		if ( (R1.x+R1.w>R2.x) && 
			 ((R2.x+R2.w)>(R1.x)) &&
			 (R1.y+R1.h>R2.y) && 
			 ((R2.y+R2.h)>(R1.y))
			)
			return true;
		return false;
	}

	// Sorts a list of Rects that cover squares of the KMap, and returns a minimal
	// subset of those Rects that cover the same squares
	function FindBestCoverage(Rects,AllRects){
		// create a 'Weight' map
		var Weights = new Array();
		for (w = 0; w < KMap.Width; w++){
			Weights[w] = new Array();
			for (h = 0; h < KMap.Height; h++){   // initial weight is 0 if not already covered, high if already covered
				Weights[w][h] = (KMap[w][h].Covered)?Heavy:0;
			}
		}
		// seed the weight map with 1 for every square covered by every Rect
		var i = 0;
		for (i = 0; i < Rects.length; i++){
			AddRectWeight(Weights, Rects[i], 1);
		}

		// generate a set of rects sorted by weight - but  after selecting each minimal
		// weighted rect, re-weight the map for the next selection.  Re-weight by
		// making the squares of the selected Rect very heavy, but reduce the
		// weight of any squares for Rects that overlap the selected Rect.  This has the
		// effect of pushing the rects that duplicate KMap coverage to the back of the list, 
		// while bubbling non-overlapping maximal covering rects to the front.
		var SortedRects = new Array();
		while (Rects.length>0){
			var j=0;
			for (j = 0; j < Rects.length; j++){   // get the weight for the remaining Rects
				Rects[j].Weight = GetRectWeight(Weights, Rects[j]);
			}
			// Sort the array to find a Rect with minimal weight
			Rects.sort(SortByWeight);
			SortedRects.push(Rects[0]);
			if (Rects.length == 1){   // just found the last Rect, break out
				break;
			}
			// Make the weight map very heavy for the selected Rect's squares
			AddRectWeight(Weights, Rects[0], Heavy);
			
			// Reduce the weight for Rects that overlap the selected Rect
			for (j=0; j< Rects.length; j++){
				if (OverlappingRects(Rects[0], Rects[j])){
					AddRectWeight(Weights, Rects[j], -1);
				}
			}
			// continue processing with all the Rects but the first one
			Rects = Rects.slice(1);
		}
		
		// determine which of the sorted array of Rects are actually needed
		TryRects(SortedRects, AllRects);
	}
		
	//Finds the minimized equation for the current KMap.
	function Search(){
		var Rects = new Array();
		Cover(CreateRect(0, 0, KMap.Width, KMap.Height), false);

		// Find the (larger) rectangles that cover just the quares in the KMap
		//  and search for smaller and smaller rects
		SearchRect(16, 16, true, Rects, true);
		SearchRect(16, 8, true, Rects, true);
		SearchRect(8, 16, true, Rects, true);
		SearchRect(16, 4, true, Rects, true);
		SearchRect(4, 16, true, Rects, true);
		SearchRect(16, 2, true, Rects, true);
		SearchRect(2, 16, true, Rects, true);
		SearchRect(16, 1, true, Rects, true);
		SearchRect(1, 16, true, Rects, true);
		
		SearchRect(8, 8, true, Rects, true);
		SearchRect(8, 4, true, Rects, true);
		SearchRect(4, 8, true, Rects, true);
		SearchRect(8, 2, true, Rects, true);
		SearchRect(2, 8, true, Rects, true);
		SearchRect(8, 1, true, Rects, true);
		SearchRect(1, 8, true, Rects, true);
		
		SearchRect(4, 4, true, Rects, true);
		SearchRect(4, 2, true, Rects, true);
		SearchRect(2, 4, true, Rects, true);
		SearchRect(1, 4, true, Rects, true);
		SearchRect(4, 1, true, Rects, true);
		
		SearchRect(2, 2, true, Rects, true);

		// 2x1 sized rects  - These have to be handled specially in order to find a 
		//  minimized solution.  
		var Rects2x1 = new Array();
		SearchRect(2, 1, true, Rects2x1, false);
		SearchRect(1, 2, true, Rects2x1, false);
		FindBestCoverage(Rects2x1, Rects);

		// add the 1x1 rects
		SearchRect(1, 1, true, Rects, true);

		//check to see if any sets of (necessary) smaller rects fully cover larger ones (if so, the larger one is no longer needed)
		Cover(CreateRect(0, 0, KMap.Width, KMap.Height), false);
		for (i = Rects.length - 1; i >= 0; i--){
			if (IsCovered(Rects[i])){
				Rects[i] = null;
			}
			else{
				Cover(Rects[i], true);
			}
		}
		
		ClearEquation();	
		for (i=0;i<Rects.length; i++){
			if (Rects[i]!=null){
				RectToEquation(Rects[i]);
			}
		}
		if (Equation.UsedLength==0){
			Equation.UsedLength=1;
			Equation[0].Expression="0";
			Equation[0].Rect = CreateRect(0,0,KMap.Width,KMap.Height);
		}
	}

	function ClearEquation(){
		for (i=0; i<Equation.length; i++){
			Equation[i].Rect	= null;
		}
		Equation.UsedLength=0;
	}

	// returns true if the rect is entirely within a singel given variable 
	function IsConstantVariable( Rect, Variable ){
		var dx=0;
		var dy=0;
		var topleft = KMap[Rect.x][Rect.y].Variable[Variable];
		for (dx=0; dx<Rect.w; dx++){
			for (dy=0; dy<Rect.h; dy++){
				test = KMap[(Rect.x+dx)%KMap.Width][(Rect.y+dy)%KMap.Height].Variable[Variable];
				if (test!=topleft){
					return false;
				}
			}
		}
		return true;
	}

	// Turns a rectangle into a text minterm (in HTML)
	function RectToEquation( Rect ){
		var Text = "";
		var i=0;
		for (i=0; i<InputCount; i++){
			if (IsConstantVariable( Rect, i)){
			//	Text += InputName[i];
			//	if (!KMap[Rect.x][Rect.y].Variable[i])
			//	{
			//		Text += "'";
			//	}
				if (!KMap[Rect.x][Rect.y].Variable[i]){
					Text += "<span style='text-decoration: overline'>"+InputName[i]+"</span> ";
				}
				else{
					Text += InputName[i] + " ";
				}
			}
		}
		if (Text.length==0){
			Text="1";
		}
		Equation[Equation.UsedLength].Rect  = Rect;
		Equation[Equation.UsedLength].Expression = Text;
		Equation.UsedLength++;
		
		return Text;
	}
		

	// turns a boolean into a display value  true->"1"  false->"0"
	function DisplayValue( bool ){
		if (bool==true){
			return "1";
		}
		else if (bool==false){
			return "0";
		}
		else return DontCare;
	}

	// Turns a number into binary in text (prepends 0's to length 'bits')
	function BinaryString(value, bits){
		var str = value.toString(2);
		var i = 0;
		for (i = 0; i < bits; i++){
			if(str.length < bits){
				str = "0" + str;
			}
		}
		return str;
	}

	// redraws UI (with no highlights)
	function UpdateUI(){
		var i = 0;
		for (i = 0; i < TruthTable.length; i++){
			var Val = DisplayValue(TruthTable[i].KMapEntry.Value);
			//Truth Table
			SetValue(TruthTable[i].ButtonUIName, Val);
			SetBackgroundColor(TruthTable[i].ButtonUIName, HighlightColor(Val));
			SetBackgroundColor(TruthTable[i].TTROWUIName, HighlightColor(Val));
			//KMap
			SetValue(TruthTable[i].KMapEntry.ButtonUIName, Val);
			SetBackgroundColor(TruthTable[i].KMapEntry.ButtonUIName, HighlightColor(Val));
			SetBackgroundColor(TruthTable[i].KMapEntry.TDUIName, HighlightColor(Val));
		}
		SetInnerHTML("EquationDiv", GenerateEquationHTML());
	}
		
	function ToggleValue( Value ){
		if (AllowDontCare){
			if (Value==true){
				return DontCare;
			}
			else if (Value==DontCare){
				return false;
			}
			else if (Value==false){
				return true;
			}
		}
		else{
			return !Value;
		}
	}

	function ToggleTTEntry( TTEntry ){
		TTEntry.KMapEntry.Value = ToggleValue(TTEntry.KMapEntry.Value);
		RefreshUI();
	}

	function ToggleKMEntry( KMEntry ){
		KMEntry.Value = ToggleValue(KMEntry.Value);
		RefreshUI();
	}

	function RefreshUI(){
		ClearEquation();
		Search();
		UpdateUI();
	}

	// redraws UI with the given equation highlighted
	function SetShowRect( EquationEntry, EquationIndex ){	
		if (EquationEntry==null){
			UpdateUI();
			return;
		}
		else{
			var ShowRect = EquationEntry.Rect;

			var dx = 0;
			var dy = 0;
			for (dx = 0; dx < ShowRect.w; dx++){
				for (dy = 0; dy < ShowRect.h; dy++){
					var KMEntry = KMap[(ShowRect.x + dx) % KMap.Width][(ShowRect.y + dy) % KMap.Height];
					var Val = DisplayValue(TruthTable[i].KMapEntry.Value);
					//KMap
					SetBackgroundColor(KMEntry.ButtonUIName, RectHighlightColor(Val));
					SetBackgroundColor(KMEntry.TDUIName, RectHighlightColor(Val));
					//Truth Table
					SetBackgroundColor(KMEntry.TruthTableEntry.ButtonUIName, RectHighlightColor(Val));
					SetBackgroundColor(KMEntry.TruthTableEntry.TTROWUIName, RectHighlightColor(Val));
				}
			}
		}
		SetBackgroundColor(Equation[EquationIndex].ButtonUIName,EquationHighlightColor);
	}

	function GetElement(Name){
		if (document.getElementById){
			return document.getElementById(Name);
		}
		else if (document.all){
			return document.all[Name];
		}
		else if (document.layers){
			//not sure this works in all browsers... element.style would be document.layers[Name];
		}
	}

	function SetInnerHTML(Name,Text){
		GetElement(Name).innerHTML = Text
	}

	function SetBackgroundColor(Name,Color){
		GetElement(Name).style.backgroundColor = Color;
	}

	function SetValue(Name,Value){
		GetElement(Name).value = Value;
	}

	function GenerateTruthTableHTML(){
		TableTitle = new HTMLText("Truth Table");
		TableTitle.Bold = true;
		Text = "<center>" + TableTitle.HTML + "<br></center><table ID=\"TruthTableID\" border=1>";
		{
			Text = Text + "<tr>";
			i = 0;
			//Generate table column names using variable names stored in the InputName array
			for (i = 0; i < InputCount; i++){
				Text = Text + "<th position:fixed onClick = VariableNameChange(this);>" + InputName[i] + "</th>"
			}
			Text = Text + "<th>" + FunctionText + "</th></tr>";
			//Generate each row of the truth table
			for (i = 0; i < TruthTable.length; i++){
				Text += "<tr ID='" + TruthTable[i].TTROWUIName + "';>";  
				j = 0;
				//Generate entries for each variable
				for (j = 0; j<InputCount; j++){
					Text = Text + "<td title = " + InputName[j] + ">"+DisplayValue(TruthTable[i][j].Variable)+"</td>";
				}
				Text = Text
					+ "<td><input ID="+TruthTable[i].ButtonUIName +" name="+TruthTable[i].ButtonUIName +" type='button'; style='width:100%'; value='"+DisplayValue(TruthTable[i].KMapEntry.Value)+"'; onClick=ToggleTTEntry(TruthTable["+i+"]); ></td>" 
					+ "</tr>";
			}
		}
		Text = Text + "</table>";
		return Text;
	}

	function GenerateKarnoMapHTML(){
		TableTitle = new HTMLText("Karnaugh Map");
		TableTitle.Bold = true;
		var Text = "<table ><tr><th><center>" + TableTitle.HTML + "</center></th></tr><tr><td>";
		Text = Text + "<table border=1 cellpadding=0>";
		var h,w;
		Text = Text + "<tr><th></th><th></th><th colspan=" + (KMap.Width) + ">";
		for (i = 0; i < KMap.XVariables; i++){
			Text += InputName[i];
		}
		Text += "</th></tr>";
		Text += "<tr>";
		Text += "<th></th><th></th>";
		for (i = 0; i < KMap.Width; i++){
			Text += "<th>" + BinaryString(BitOrder[i], KMap.XVariables) + "</th>";
		}
		Text+="</tr>";
		
		for (h=0; h<KMap.Height; h++){
			Text = Text + "<tr>";
			if (h==0){
				Text += "<th rowspan="+(KMap.Height)+">";
				for (i=0; i<KMap.YVariables; i++){
					Text += InputName[i+KMap.XVariables];
				}
			}
			Text += "<th>"+BinaryString(BitOrder[h],KMap.YVariables)+"</th>";

			for (w=0; w<KMap.Width; w++){
				Text += "<td  ID='"+KMap[w][h].TDUIName+"'; style='background-color:0xFF'>"
						+ "<input ID="+KMap[w][h].ButtonUIName +" name="+KMap[w][h].ButtonUIName +" type='button'  value='"+DisplayValue(KMap[w][h].Value)+"'; onClick=ToggleKMEntry(KMap["+w+"]["+h+"]);>"
						+ "</td>";
			}
			Text += "</tr>";
		}
		Text += "</table>";
		Text+="</td></tr></table>";
		return Text;
	}

	function GenerateEquationHTML(){
		var j;
		var Text = "<p><p>";
		var i;
		for (i = 0; i<Equation.UsedLength; ){
		Text += "<table>";
		for (j = 0; (j < InputCount) && (i < Equation.UsedLength); j++){
			if (i == 0) Text += "<td><b>" + FunctionText + " = </td>";
			if (i == InputCount) Text += "<td width = 75></td>";
			Text += "<td ID=" + Equation[i].ButtonUIName;
			Text += " onMouseOver = SetShowRect(Equation[" + i + "]," + i + "); onMouseOut = SetShowRect(null); ";
			Text += "><b>" + Equation[i].Expression + "</td>";
			if (i < Equation.UsedLength - 1) Text += "<td> + </td>";
			i++;
		}	
		Text += "</table>";
		}
		return Text;
	}

	function ChangeInputCount(Num){
		InitializeTables(Num);
		ClearEquation();
		SetInnerHTML("TruthTableDiv", GenerateTruthTableHTML());
		SetInnerHTML("KarnoMapDiv", GenerateKarnoMapHTML());
		SetInnerHTML("EquationDiv", GenerateEquationHTML());
		for(i = 2; i <= MaxInputCount; i++){
			if(i == Num){
				GetElement(NumberToWords(i) + "VariableRB").checked = true;
			} else {
				GetElement(NumberToWords(i) + "VariableRB").checked = false;
			}
		}
		Search();
		UpdateUI();
	}
	
	function ChangeOutputCount(Num){
	
	}

	function ToggleDontCare(){
		AllowDontCare =! AllowDontCare;
		var i = 0;
		for (i = 0; i < TruthTable.length; i++){
			if (TruthTable[i].KMapEntry.Value === DontCare){
				TruthTable[i].KMapEntry.Value = false;
			}
		}
		ChangeInputCount(InputCount);
		GetElement("AllowDontCareCB").checked = GetElement("AllowDontCareCB").checked;
	}



	function UtilTable(){
		function Create(){
		
		}
	}

	function VariableNameChange(th){
		if (th.firstChild && th.firstChild.tagName == "INPUT"){
			return;
		}
		oldText = th.innerHTML.trim();
		var input = document.createElement("input");
		input.value = oldText;
		th.innerHTML = "";
		th.insertBefore(input, th.firstChild);
		input.select();
		input.onblur = function () { InputNameubmit(this); };
	}

	function InputNameubmit(input){
		if(!input.value){
			input.value = oldText;
		}
		var th = input.parentNode;
		th.removeChild(th.firstChild);
		th.innerHTML = input.value;
		for(i = 0; i < InputCount; i++){
			if(InputName[i] == input.value){
				InputName[i] = input.value;
				UpdateUI;
				return;
			}
		}
	}
	
	function NumberToWords(NumberIn){
		var ones=['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine'];
		var tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
		var teens=['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];

		if (NumberIn==0) return "zero";
		else return convert_millions(NumberIn);
		
		function convert_millions(num){
			if (num >= 1000000){
				return convert_millions(Math.floor(num/1000000))+" million "+convert_thousands(num%1000000);
			}
			else {
				return convert_thousands(num);
			}
		}

		function convert_thousands(num){
			if (num>=1000){
				return convert_hundreds(Math.floor(num/1000))+" thousand "+convert_hundreds(num%1000);
			}
			else{
				return convert_hundreds(num);
			}
		}

		function convert_hundreds(num){
			if (num>99){
				return ones[Math.floor(num/100)]+" hundred "+convert_tens(num%100);
			}
			else{
				return convert_tens(num);
			}
		}

		function convert_tens(num){
			if (num<10) return ones[num];
			else if (num>=10 && num<20) return teens[num-10];
			else{
				return tens[Math.floor(num/10)]+" "+ones[num%10];
			}
		}

		function convert(num){
			if (num==0) return "zero";
			else return convert_millions(num);
		}
	}
