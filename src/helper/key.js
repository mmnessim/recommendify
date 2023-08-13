export function keyDisplay(details) {
    switch (details.key) {
        case 0:
            details.key = 'C';
            break;
        case 1:
            details.key = 'C#/Db';
            break;
        case 2:
            details.key = 'D';
            break;
        case 3:
            details.key = 'D#/Eb';
            break;
        case 4:
            details.key = 'E';
            break;
        case 5:
            details.key = 'F';
            break;
        case 6:
            details.key = 'F#/Gb';
            break;
        case 7:
            details.key = 'G';
            break;
        case 8:
            details.key = 'G#/Ab';
            break;
        case 9:
            details.key = 'A';
            break;
        case 10:
            details.key = 'A#/Bb';
            break;
        case 11:
            details.key = 'B';
            break;
        default:
            details.key = 'N/A';
    }
    console.log(details.key)
    return details.key;
}
