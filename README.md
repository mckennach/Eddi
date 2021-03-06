[![Build Status](https://travis-ci.org/Shopify/starter-theme.svg?branch=master)](https://travis-ci.org/Shopify/starter-theme)

# Eddi Theme

Sitemap: https://eddi-soap.myshopify.com/sitemap.xml
Admin: https://eddi-soap.myshopify.com/admin


## Navigation

- Online Store > Navigation
- **Shop:** Navigate to the [Main menu](https://eddi-soap.myshopify.com/admin/menus/179140722881) page and under Shop add collections
  - **Shop Dropdown Image:** Navigate to `Theme Settings` in the `Customizer`. Add images to `Navigation Images`
- Other menu items are a bit more basic. Just add a link and it will populate.
- **Mobile Footer Menu:** In the [Mobile footer menu](https://eddi-soap.myshopify.com/admin/menus/188398043329), you'll see `Column 1`, `Column 2`, etc. This splits the menu items into groups. If you add a new column, make sure to style it the same way otherwise it won't show up.


## Customizer

- When making changes to the Theme
  - Admin > Themes > Live Theme > Actions > **Duplicate**
    - This will be useful when drafting Copy/images
  - Once changes are made and good to go
    - *Drafted Theme* > Actions > Publish

## Materials page  

**When adding a new material:**

1. Material > Add Block
2. Material
  - Add Image with width of `1200px`. **Use one of the existing images as a guide.**
  - I did it this way so the shadows would display properly
3. Material Descriptor will then follow this image. *If you add it before the correct image, it will show up there*
4. Make sure to align the dot with the Coordinate Slider. Should be able to see where it will be located.


Template Image:
![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Untitled-3_1200x800_f05a9cb1-520b-41f8-9fb5-8cc05dc1c807_1200x800.png?v=1627337643 "Refill Content")




## Create Your Own 4-Pack

**Variants:** If you decide to anymore options to the customer builder, make sure to make the SKU alphabetical.
This way, the sorting function will be able to create the custom bundles.

**Example:**
```
  HHPS: Happy Hour - Happy Hour - Park Day - Sunday Drive
```

## Default Product

- Image Dimensions: 1000 ?? 1413px
- Each variant will be a group of 5. Make sure to upload all 5 at the same time at the end of the `Media Library`, and attach the *first* image to the variant it belongs to.
  - If everything is out of order, the image grouping might be word

## Refills

-  Make sure to add `Refills` to Product Type


## Custom Fields

- Product > *Select Product* > More Actions > *Edit Custom Fields*


**Refill Content:**

- Select `Full Width Image` to make it stretch across the screen
- Select `Check to show full width video` to use video, and then add video ID from vimeo

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-02_at_11.33.23_PM.png?v=1627972423 "Refill Content")


**Upsell Container:**

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-02_at_11.34.29_PM.png?v=1627972480 "Upsell Content")


**Icon List:**

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-02_at_11.35.29_PM.png?v=1627972549 "Icon List")

- Add Ico


**Accordion:**

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-02_at_11.36.33_PM.png?v=1627972617 "Icon List")


**Notes:**

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-02_at_11.38.48_PM.png?v=1627972745 "Icon List")


**Full Width + Image:**

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-02_at_11.39.59_PM.png?v=1627972820 "Icon List")

**Flagrance Section:**

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-02_at_11.17.22_PM_69540da2-5927-44f0-af64-dac824a715c9.png?v=1628006631 "Icon List")

**Natural Scent:**

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-02_at_11.17.32_PM.png?v=1628006611 "Icon List")

**Highlighted Notes:**

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-03_at_9.05.23_AM.png?v=1628006739 "Icon List")


**Weekend Collection:**

![alt text](https://cdn.shopify.com/s/files/1/0545/0137/6193/files/Screen_Shot_2021-08-02_at_11.17.03_PM.png?v=1628006777 "Icon List")


## Recharge

**Docs:** https://support.rechargepayments.com/hc/en-us/articles/360008829993-Recharge-API-


## Links & Guide

***Links to reference for shop maintenance/management***

**General Help Center:**
- https://help.shopify.com/en/manual/intro-to-shopify

**Set up packing slip:**
- https://help.shopify.com/en/manual/orders/packing-slips

**Email template:**
- https://help.shopify.com/en/manual/sell-online/notifications/edit-template,

**Shipping:**
- https://help.shopify.com/en/manual/shipping,
- https://muskoka-living-ca-dev.myshopify.com/admin/settings/shipping

**Taxes:**
- https://help.shopify.com/en/manual/taxes,

**Getting paid:**
- https://help.shopify.com/en/manual/payments/getting-paid#how-you-get-paid,
- https://help.shopify.com/en/manual/payments

**Banking info:**
- https://help.shopify.com/en/manual/payments/shopify-payments/setting-up-shopify-payments

**Test orders:**
- https://help.shopify.com/en/manual/checkout-settings/test-orders

**Connect to QB:**
- https://www.webgility.com/integrations/shopify,
- https://apps.shopify.com/ecc-quickbooks-integration-for-shopify?surface_detail=quickbooks&surface_inter_position=1&surface_intra_position=5&surface_type=search or
- https://apps.shopify.com/ecc-cloud-quickbooks-online-integration?surface_detail=quickbooks&surface_inter_position=1&surface_intra_position=11&surface_type=search
