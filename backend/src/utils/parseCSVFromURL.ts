import axios from "axios";
import csv from "csv-parser";
import { Readable } from "stream";

export const parseCSVFromURL = async (
    url: string
): Promise<any[]> => {

    const response = await axios.get(url, {
        responseType: "text"
    });

    const recipients: any[] = [];

    return new Promise((resolve, reject) => {

        const stream = Readable.from(response.data);

        stream
            .pipe(csv())
            .on("data", (data) => {
                recipients.push(data);
            })
            .on("end", () => {
                resolve(recipients);
            })
            .on("error", reject);
    });
};