```markdown
---
type: manifest
subtype: assets
title: Asset Manifest
---

## Image Manifest

**Summary:** {{p08_extract_images.summary}}

**Images Found:** {{p08_extract_images.totalFound}} ({{p08_extract_images.highPriority}} high priority)

### Logos

{% if p08_extract_images.images|selectattr("purpose", "equalto", "logo")|list|length > 0 %}
{% for image in p08_extract_images.images|selectattr("purpose", "equalto", "logo")|list %}
- Name: {{ image.name }}
  Source URL: {{ image.url }}
  Purpose: Logo
  Priority: {{ image.priority }}
  Status: pending
{% endfor %}
{% else %}
_No logos found._
{% endif %}

### Heroes

{% if p08_extract_images.images|selectattr("purpose", "equalto", "hero")|list|length > 0 %}
{% for image in p08_extract_images.images|selectattr("purpose", "equalto", "hero")|list %}
- Name: {{ image.name }}
  Source URL: {{ image.url }}
  Purpose: Hero Image
  Priority: {{ image.priority }}
  Status: pending
{% endfor %}
{% else %}
_No hero images found._
{% endif %}

### Products

{% if p08_extract_images.images|selectattr("purpose", "equalto", "product")|list|length > 0 %}
{% for image in p08_extract_images.images|selectattr("purpose", "equalto", "product")|list %}
- Name: {{ image.name }}
  Source URL: {{ image.url }}
  Purpose: Product Image
  Priority: {{ image.priority }}
  Status: pending
{% endfor %}
{% else %}
_No product images found._
{% endif %}

### Icons

{% if p08_extract_images.images|selectattr("purpose", "equalto", "icon")|list|length > 0 %}
{% for image in p08_extract_images.images|selectattr("purpose", "equalto", "icon")|list %}
- Name: {{ image.name }}
  Source URL: {{ image.url }}
  Purpose: Icon
  Priority: {{ image.priority }}
  Status: pending
{% endfor %}
{% else %}
_No icons found._
{% endif %}

### Other

{% if p08_extract_images.images|selectattr("purpose", "equalto", "other")|list|length > 0 %}
{% for image in p08_extract_images.images|selectattr("purpose", "equalto", "other")|list %}
- Name: {{ image.name }}
  Source URL: {{ image.url }}
  Purpose: Other
  Priority: {{ image.priority }}
  Status: pending
{% endfor %}
{% else %}
_No other images found._
{% endif %}
```