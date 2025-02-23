export interface GuestBookEntries {
  TimeStamp: string;
  Name: string;
  Linkedin: string;
  Message: string;
}

export function PostEntry(formData: FormData): Promise<Response> {
  // event.preventDefault();
  return fetch(
    `https://docs.google.com/forms/d/e/1FAIpQLSeZRfqcA39lPVfk363wukI2iwd2Ud5qJUJUqM37TcAKeE2tMQ/formResponse?usp=pp_url&entry.1964352140=${formData.get(
      'name',
    )}&entry.708731546=${formData.get(
      'linkedin',
    )}&entry.1290048304=${formData.get('message')}`,
    {
      method: 'POST',
      credentials: 'omit',
      mode: 'no-cors',
      headers: {'Access-Control-Allow-Origin': 'https://docs.google.com/'},
    },
  );
}

export function GetEntries(): Promise<Array<GuestBookEntries>> {
  return new Promise<Array<GuestBookEntries>>(resolve => {
    void FetchEntries().then(string => {
      resolve(
        string.split('\n').map<GuestBookEntries>(itemLine => {
          const itemLineSplited = itemLine.split(',');
          return {
            TimeStamp: itemLineSplited[0],
            Name: itemLineSplited[1],
            Linkedin: itemLineSplited[2],
            Message: itemLineSplited[3],
          };
        }),
      );
    });
  });
}

export function FetchEntries(): Promise<string> {
  return new Promise<string>(resolve => {
    void fetch(
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vS21jGYeFhM3EwbwY13OXo98UhrhOY9B6ZkyoBAuFM9foRjEJxKIyESL4nBYqA7kfRbvAUzHq-ij4_v/pub?output=csv',
    ).then(e => {
      resolve(e.text());
    });
  });
}
