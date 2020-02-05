const criminals = new Map();
criminals.set("Paul White", "Roger Night, Peter Llong Jr.");
criminals.set("Roger Fedexer", "Rob Ford, Pete Lord, Roger McWire");
criminals.set("Paul White Jr.", null);
criminals.set("Red Fortress", "Roger Rabbit, Ross Winter");
criminals.set("Redford Fort", "Red Strong, Red Fort");

function findCriminal(name) {
    let name_partial_match = null,
        name_full_match = null,
        alias_partial_match = null,
        alias_full_match = null;
    name = name.toLowerCase();

    criminals.forEach((value, key, map) => {
        if (key.toLowerCase() == name) {
            name_full_match = key + ': ' + map.get(key);
        } else if (key.toLowerCase().includes(name)) {
            name_partial_match = key + ': ' + map.get(key);
        } else {
            if (!value) {
                return;
            }
            value = value.toLowerCase();
            let aliases = value.split(', ');
            if (aliases.some(val => val == name)) {
                alias_full_match = key + ': ' + map.get(key);
            } else if (aliases.some(val => val.includes(name))) {
                alias_partial_match = key + ': ' + map.get(key);
            }
        }
    });

    return name_full_match || name_partial_match || alias_full_match || alias_partial_match || 'No match';
}

const test1 = findCriminal('paul White');
console.log(test1);
const test2 = findCriminal('Roger');
console.log(test2);
const test3 = findCriminal('Ross');
console.log(test3);
const test4 = findCriminal('white jr.');
console.log(test4);