export type ICalEvent = {
  id: string;
  datetime: Date;
  createdOn: Date;
  updatedOn: Date;
  name: string;
  projectName: string;
};

const dateToICalString = (date: Date) =>
  date
    .toISOString()
    .replace(/\.\d+/, "")
    .replaceAll("-", "")
    .replaceAll(":", "");

export const generateICal = (events: ICalEvent[], name = "Grah") => {
  const strings = [
    "BEGIN:VCALENDAR",
    "PRODID:-//Grah//Grah Calendar 1.0//EN",
    "VERSION:1.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${name}`,
    "X-WR-TIMEZONE:UTC",
    `X-WR-CALDESC:Displays your events for ${name}.\n\nDon't add events to this calendar - use your personal calendar instead.`,
  ];

  const addEvent = (event: ICalEvent) => {
    strings.push(
      "BEGIN:VEVENT",
      `DTSTART:${dateToICalString(event.datetime)}`,
      `DTSTAMP:${dateToICalString(
        new Date(event.datetime.getTime() + 5 * 60 * 1000)
      )}`,
      `UID:${event.id}@grah.com`,
      `CREATED:${dateToICalString(event.createdOn)}`,
      `LAST-MODIFIED:${dateToICalString(event.updatedOn)}`,
      "SEQUENCE:0",
      "STATUS:CONFIRMED",
      `SUMMARY:${event.projectName}: ${event.name}`,
      "TRANSP:OPAQUE",
      "END:VEVENT"
    );
  };

  events.forEach(addEvent);

  strings.push("END:VCALENDAR");

  return strings.join("\n");
};
