import { z } from "zod";

export const optionalStringToNullWithMessage = (message: string) =>
  z
    .string({ required_error: message, invalid_type_error: message })
    .trim()
    .transform((val) => (val.trim() === "" ? null : val))
    .nullable()
    .optional();

export const optionalNumberToNullWithMessage = (message: string) =>
  z
    .preprocess(
      (val) => {
        if (val === "" || val === undefined || val === null) return null;
        if (typeof val === "string" && val.trim() === "") return null;
        return val;
      },
      z
        .number({ required_error: message, invalid_type_error: message })
        .nullable(),
    )
    .optional();

export const optionalSelectNumberField = (message: string) =>
  z.preprocess(
    (val) => {
      console.log(val);
      if (val === "" || val === "null") return null; // If empty string, convert to null
      const num = Number(val); // Convert value to number
      return isNaN(num) ? undefined : num; // If not a valid number, return undefined (fails validation)
    },
    z.number({ invalid_type_error: message }).nullable(),
  );
