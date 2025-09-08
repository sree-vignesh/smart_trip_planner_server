import { z } from "zod";

export const ItinerarySchema = z.object({
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  days: z.array(
    z.object({
      date: z.string(),
      summary: z.string(),
      items: z.array(
        z.object({
          time: z.string(),
          activity: z.string(),
          location: z.string(),
        })
      ),
    })
  ),
});

export type Itinerary = z.infer<typeof ItinerarySchema>;
