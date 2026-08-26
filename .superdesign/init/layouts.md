# Shared layouts

## Public shell
- `app/layout.tsx`: root metadata, `SiteHeader`, route theme, public content, `SiteFooter`, links modal and Google Analytics.
- `components/site-header.tsx`: legacy black/gold navigation and logo.
- `components/site-footer.tsx`: locator and footer.

## CMS shell
- `app/admin/layout.tsx`: admin-only shell with sidebar and top bar.
- `components/admin/admin-shell.tsx`: navigation, user session actions and content frame.

