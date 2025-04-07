 const formatDateWithAmPm = (datetime: string): string => {
    if (!datetime) return "";
  
    const date = new Date(datetime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
  
    const formattedHours = isPM ? hours % 12 || 12 : hours;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const amPm = isPM ? "PM" : "AM";
  
    const formattedDate = date.toLocaleDateString("en-CA"); // Keeps the YYYY-MM-DD format
    return `${formattedDate} ${formattedHours}:${formattedMinutes} ${amPm}`;
  };
  
export  {formatDateWithAmPm};