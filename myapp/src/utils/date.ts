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
