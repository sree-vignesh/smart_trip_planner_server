import { z } from "zod";
export declare const ItinerarySchema: z.ZodObject<{
    title: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    days: z.ZodArray<z.ZodObject<{
        date: z.ZodString;
        summary: z.ZodString;
        items: z.ZodArray<z.ZodObject<{
            time: z.ZodString;
            activity: z.ZodString;
            location: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type Itinerary = z.infer<typeof ItinerarySchema>;
//# sourceMappingURL=schema.d.ts.map