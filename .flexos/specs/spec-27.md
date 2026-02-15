---
type: doc
subtype: database
title: Relationship Map
---

This document outlines the relationships between the different collections in the database. Understanding these connections is crucial for querying data and maintaining data integrity.

### 1. `Service` <> `Certification`

*   **Type:** Many-to-Many
*   **Description:** A single service can be associated with multiple certifications, and a single certification can be relevant to multiple services.
*   **Implementation:** The `Service` collection has a field `related_certifications` that can hold an array of references to entries in the `Certification` collection.

### 2. `CaseStudy` <> `Service`

*   **Type:** Many-to-Many
*   **Description:** A case study can showcase the implementation of several services, and a service can be featured in multiple case studies.
*   **Implementation:** The `CaseStudy` collection has a field `related_services` that can hold an array of references to entries in the `Service` collection.

### 3. `CaseStudy` -> `Testimonial`

*   **Type:** Many-to-One
*   **Description:** A case study can feature one specific testimonial from that client. A single testimonial is unlikely to be associated with more than one case study, but the structure allows for it.
*   **Implementation:** The `CaseStudy` collection has a field `testimonial` that holds a single reference to an entry in the `Testimonial` collection.

### 4. `Post` -> `TeamMember`

*   **Type:** Many-to-One
*   **Description:** A blog post is written by a single author. A team member can be the author of many blog posts.
*   **Implementation:** The `Post` collection has a field `author` that holds a single reference to an entry in the `TeamMember` collection. Note: The `TeamMember` collection is inferred from this relationship requirement.