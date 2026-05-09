import csv from "csv-parser";
import { Readable } from "stream";

export const parseCSVBuffer = async (
    buffer: Buffer
): Promise<any[]> => {

    const recipients: any[] = [];

    return new Promise((resolve, reject) => {

        const stream =
            Readable.from(buffer);

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