```typescript
import { defineCollection, z, reference } from 'astro:content';

const serviceCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    icon: z.string(),
    summary: z.string(),
    hero_image: image().optional(),
    related_certifications: z.array(reference('certifications')).optional(),
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
  }),
});

const testimonialCollection = defineCollection({
  type: 'content',
  schema: z.object({
    quote: z.string(),
    author_name: z.string(),
    author_company: z.string().optional(),
    source: z.enum(['Google', 'Facebook', 'Direct']),
    rating: z.number().min(1).max(5).optional(),
    is_featured: z.boolean().default(false),
  }),
});

const certificationCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    partner_name: z.string(),
    level: z.string(),
    logo: image(),
    partner_url: z.string().url().optional(),
    display_order: z.number().optional(),
  }),
});

const caseStudyCollection = defineCollection({
  type: 'content',
  schema: z.object({
    client_name: z.string(),
    title: z.string(),
    publish_date: z.date(),
    summary: z.string(),
    problem: z.string(),
    solution: z.string(),
    result: z.string(),
    testimonial: reference('testimonials').optional(),
    related_services: z.array(reference('services')).optional(),
  }),
});

const postCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    publish_date: z.date(),
    author: reference('teamMembers'),
    summary: z.string(),
    featured_image: image().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const teamMemberCollection = defineCollection({
    type: 'content',
    schema: ({ image }) => z.object({
        name: z.string(),
        role: z.string().optional(),
        photo: image().optional(),
    }),
});

const globalSettingsCollection = defineCollection({
    type: 'data',
    schema: z.object({
        company_name: z.string(),
        phone_number: z.string(),
        email_address: z.string().email(),
        address: z.string(),
        google_maps_url: z.string().url(),
        facebook_url: z.string().url().optional(),
    }),
});


export const collections = {
  'services': serviceCollection,
  'testimonials': testimonialCollection,
  'certifications': certificationCollection,
  'case-studies': caseStudyCollection,
  'posts': postCollection,
  'teamMembers': teamMemberCollection,
  'global': globalSettingsCollection,
};
```