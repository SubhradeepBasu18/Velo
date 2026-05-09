import { Parser } from "json2csv";

export const generateCSVBuffer = (
    recipients: {
        email: string;
        name?: string;
    }[]
): Buffer => {

    const parser = new Parser({
        fields: ["email", "name"],
    });

    const csv = parser.parse(recipients);

    return Buffer.from(csv);
};