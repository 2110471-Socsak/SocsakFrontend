export const getTimeByTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);

    // Get hours, minutes, and period (AM/PM) from the date object
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const period: string = hours >= 12 ? 'PM' : 'AM';

    // Convert hours from 24-hour format to 12-hour format
    const formattedHours: number = hours % 12 || 12;

    // Format minutes to have leading zero if needed (e.g., '5' -> '05')
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : minutes.toString();

    // Construct the desired time format (XX.XX PM/AM)
    const formattedTime: string = `${formattedHours}:${formattedMinutes} ${period}`;

    // Return the formatted time string
    return formattedTime;
};

export function isDayChange(dateStr1: string, dateStr2: string): boolean {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    // Extract year, month, and day from both dates
    const year1 = date1.getFullYear();
    const month1 = date1.getMonth();
    const day1 = date1.getDate();

    const year2 = date2.getFullYear();
    const month2 = date2.getMonth();
    const day2 = date2.getDate();

    // Compare the dates' year, month, and day
    return year1 !== year2 || month1 !== month2 || day1 !== day2;
}

export function getDate(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();

    // Set time to midnight for comparison purposes
    now.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const day = date.getDate();
    const year = date.getFullYear();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const month = monthNames[date.getMonth()];

    // Convert dates to timestamps and calculate the difference in days
    const dayDiff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    // Determine if the date is today, yesterday, or another day
    if (dayDiff === 0) {
        return "Today";
    } else if (dayDiff === -1) {
        return "Yesterday";
    } else {
        return `${day} ${month} ${year}`;
    }
}

