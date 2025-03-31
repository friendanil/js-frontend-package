// Data Type Constants

export const DATA_TYPES_RULES: { [key: string]: RegExp } = {
    number: /^\d+(\.\d+)?$/, // Matches integers or decimals
    text: /^[\s\S]*$/, // Matches any text
    textOnly: /^[A-Za-z\s]+$/, // Matches only letters and spaces, no numbers or special characters
    document: /\.(pdf|docx?|pptx?|xlsx?)$/i, // Matches common document file extensions
    sound: /\.(mp3|wav|ogg|flac)$/i, // Matches common sound file extensions
    image: /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i, // Matches common image file extensions
    video: /\.(mp4|avi|mov|mkv|flv|webm)$/i, // Matches common video file extensions
    url: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, // Matches standard URL format
    date: /^\d{4}-\d{2}-\d{2}$/, // Matches dates in the format YYYY-MM-DD
    time: /^(?:[01]\d|2[0-3]):[0-5]\d$/, // Matches 24-hour format times, HH:MM
    password: /^.{6,}$/, // Matches passwords with at least 6 characters; you can customize as needed
    ipaddress: /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4})$/, // Matches IPv4 or IPv6 formats
    uuid: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, // Matches UUID format
};

