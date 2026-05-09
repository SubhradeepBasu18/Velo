export const mergeRecipients = (
    csvRecipients: any[] = [],
    manualRecipients: any[] = []
) => {

    const combined = [
        ...csvRecipients,
        ...manualRecipients,
    ];

    const uniqueMap = new Map();

    for (const recipient of combined) {

        const email = recipient.email
            ?.trim()
            ?.toLowerCase();

        if (!email) continue;

        if (!uniqueMap.has(email)) {

            uniqueMap.set(email, {
                email,
                name: recipient.name || "",
            });
        }
    }

    return Array.from(uniqueMap.values());
};