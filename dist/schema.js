"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItinerarySchema = void 0;
const zod_1 = require("zod");
exports.ItinerarySchema = zod_1.z.object({
    title: zod_1.z.string(),
    startDate: zod_1.z.string(),
    endDate: zod_1.z.string(),
    days: zod_1.z.array(zod_1.z.object({
        date: zod_1.z.string(),
        summary: zod_1.z.string(),
        items: zod_1.z.array(zod_1.z.object({
            time: zod_1.z.string(),
            activity: zod_1.z.string(),
            location: zod_1.z.string(),
        })),
    })),
});
//# sourceMappingURL=schema.js.map