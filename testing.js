function calculateDaysBetweenDates(begin, end) {
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const millisecondsBetween = end - begin;
    return Math.floor(millisecondsBetween / millisecondsPerDay);
    }