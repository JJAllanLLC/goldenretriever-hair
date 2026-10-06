# Analytics event contract

Analytics events must not contain email addresses, names, full URLs, query
strings, or URL fragments.

## `affiliate_click`

Fires once when a visitor activates an `amzn.to` link. The global delegated
listener covers static JSX, MDX-rendered content, keyboard-generated clicks,
and pointer/touch-generated clicks without preventing navigation.

- `page_path`: pathname only, such as `/guides/golden-retriever-feeding-chart`
- `link_domain`: always `amzn.to`
- `affiliate_link_id`: the stable short-link code, without a query string
- `link_placement`: `article_link`, `product_title`, `product_cta`, or `site_link`
- `product_name`: present only where the product is already structured data
- `event_label`: product name when known; otherwise the short-link code

## `product_click`

Fires on a Products-page product-title link. It describes the product-card
interaction; the same activation also produces exactly one `affiliate_click`.
CTA links produce only `affiliate_click`.

## `sign_up`

Fires once only after `/api/newsletter` returns a successful response. This is
GA4's recommended signup event and means that the application accepted the
signup flow; it does not claim double-opt-in confirmation or inbox delivery.

- `method`: always `newsletter`
- `form_location`: `home_inline`, `site_footer`, or `golden_week`
- `page_path`: pathname only
- `event_label`: same value as `form_location`
