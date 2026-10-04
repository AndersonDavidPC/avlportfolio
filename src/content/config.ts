import { defineCollection, z } from 'astro:content';

const team = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    avatar: z.string(),
    status: z.enum(['published', 'draft']),
    order: z.number().default(99),
    headline: z.string().optional(),
    location: z.string().optional(),
    bio: z.string().optional(),
    summary: z.string().optional(),
    contact: z
      .object({
        email: z.string().optional(),
        linkedin: z.string().optional(),
        github: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
    highlights: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        })
      )
      .optional(),
    skills: z
      .array(
        z.object({
          category: z.string(),
          items: z.array(z.string()),
        })
      )
      .optional(),
    experience: z
      .array(
        z.object({
          company: z.string(),
          role: z.string(),
          location: z.string().optional(),
          period: z.string(),
          context: z.string().optional(),
          achievements: z.array(z.string()).default([]),
        })
      )
      .optional(),
    projects: z
      .array(
        z.object({
          name: z.string(),
          org: z.string().optional(),
          description: z.string(),
          stack: z.array(z.string()).default([]),
          metrics: z.array(z.string()).optional(),
          links: z
            .object({
              appStore: z.string().optional(),
              playStore: z.string().optional(),
              web: z.string().optional(),
              repo: z.string().optional(),
            })
            .optional(),
          featured: z.boolean().default(false),
        })
      )
      .optional(),
    education: z
      .array(
        z.object({
          institution: z.string(),
          degree: z.string(),
          location: z.string().optional(),
          period: z.string(),
          note: z.string().optional(),
        })
      )
      .optional(),
    certifications: z
      .array(
        z.object({
          name: z.string(),
          issuer: z.string(),
          year: z.string(),
        })
      )
      .optional(),
    languages: z
      .array(
        z.object({
          name: z.string(),
          level: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = { team };
