// index.js

function TimeStringParser(str, fix) {

	var ms,
		secs,
		mins,
		hours,
		days,
		weeks,
		months,
		years

	var times = [];

	if (fix == undefined) fix_val = 2
	else if (fix == 0) fix_val = undefined
	else fix_val = fix

	if (!str) return console.error("no input");
	var _str1 = str.replace(/\s+/g, ' ').trim().split(" ");
	if (_str1.length == 4) {
		var _str2 = _str1.splice(2, 2);
		times = [_str1, _str2]
	}
	else if (_str1.length > 4 || _str1.length < 2) {
		return console.error("check arguments");
	}
	else {
		times = [_str1];
	}

	times.forEach((_str, index) => {

		var amnt = parseFloat(_str[0]);
		// if (typeof amnt !== "number") return console.error("check number")
		var unit = _str[1];

		if (unit.length > 1) {
			unit = unit.toLowerCase();
		};

		var unit_dict = [
			["hr", "hour"],
			["hrs", "hour"],
			["hour", "hour"],
			["hours", "hour"],
			["h", "hour"],
			["H", "hour"],
			["min", "minute"],
			["minute", "minute"],
			["minutes", "minute"],
			["mins", "minute"],
			["m", "minute"],
			["second", "second"],
			["seconds", "second"],
			["sec", "second"],
			["secs", "second"],
			["s", "second"],
			["S", "second"],
			["milliseconds", "milliseconds"],
			["millisecs", "milliseconds"],
			["ms", "milliseconds"],
			["millis", "milliseconds"],
			["day", "day"],
			["days", "day"],
			["D", "day"],
			["week", "week"],
			["weeks", "week"],
			["w", "week"],
			["wk", "week"],
			["wks", "week"],
			["W", "week"],
			["month", "month"],
			["months", "month"],
			["mon", "month"],
			["mons", "month"],
			["mo", "month"],
			["mos", "month"],
			["month", "month"],
			["M", "month"],
			["year", "year"],
			["years", "year"],
			["yrs", "year"],
			["Y", "year"],
			["y", "year"],
		];
		let normalize = new Map(unit_dict)

		if (normalize.get(_str[1]) == undefined) {
			return console.error("check unit");
		} else {
			this.amnt = amnt

			this.unit = normalize.get(_str[1]);
		};

		var ms_dict = [
			["milliseconds", 1],
			["second", 1000],
			["minute", 1000 * 60],
			["hour", 1000 * 60 * 60],
			["day", 1000 * 60 * 60 * 24],
			["week", 1000 * 60 * 60 * 24 * 7],
			["month", 1000 * 60 * 60 * 24 * 30],
			["year", 1000 * 60 * 60 * 24 * 365],
		];
		var ms_map = new Map(ms_dict);

		if (index == 0) {
			ms = convertToMilliseconds(this.unit, this.amnt);
			secs = convertToValue(ms, "second");
			mins = convertToValue(ms, "minute");
			hours = convertToValue(ms, "hour");
			days = convertToValue(ms, "day");
			weeks = convertToValue(ms, "week");
			months = convertToValue(ms, "month");
			years = convertToValue(ms, "year");
		} else {
			const msAdd = convertToMilliseconds(this.unit, this.amnt);
			ms += msAdd;
			secs += convertToValue(msAdd, "second");
			mins += convertToValue(msAdd, "minute");
			hours += convertToValue(msAdd, "hour");
			days += convertToValue(msAdd, "day");
			weeks += convertToValue(msAdd, "week");
			months += convertToValue(msAdd, "month");
			years += convertToValue(msAdd, "year");
		}

		function convertToMilliseconds(unit, amnt) {
			let x = ms_map.get(unit);
			let output = amnt * x;
			return output;
		};

		function convertToValue(ms, toValue) {
			let output = ms / ms_map.get(toValue);
			return output;
		}


	})

	secs = secs.toFixed(fix_val)
	mins = mins.toFixed(fix_val)
	hours = hours.toFixed(fix_val)
	days = days.toFixed(fix_val)
	weeks = weeks.toFixed(fix_val)
	months = months.toFixed(fix_val)
	years = years.toFixed(fix_val)

	return {
		ms,
		secs,
		mins,
		hours,
		days,
		weeks,
		months,
		years
	};

}; // END

module.exports = TimeStringParser