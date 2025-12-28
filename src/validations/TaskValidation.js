    // import {z} from "zod";

    // export const createTaskSchema = z.object({
    //     body: z.object({
    //         title: z
    //           .string()
    //           .min(3, "Title must be at least 3 characters"),
    //         description: z
    //           .string()
    //           .max(500, "Description too long")
    //           .optional(),
    //         completed: z.boolean().optional(),
    //       }),
    // })\\\


    import { z } from "zod";

    export const createTaskSchema = z.object({
      body: z.object({
        title: z
          .string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
          })
          .min(3, "Title must be at least 3 characters"),
    
        description: z
          .string({
            required_error: "Description must be a string",
            invalid_type_error: "Description must be a string",
          })
          .max(500, "Description too long")
          .refine((val) => val.trim().length > 0, {
            message: "Description cannot be empty",
          })
          .optional(),
    
        completed: z.boolean({
          invalid_type_error: "Completed must be a boolean",
        }).optional(),

        priority: z.enum(["low", "medium", "high"]).optional(), 
      }),
    });
    