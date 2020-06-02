# Custom CSS for Typora

Typora Releases - 0.9.9.29.2 - Version is working fine for now.

https://typora.io/dev_release.html





To customize styles in typora notes

**base.user.css.md**

```css
h1 {
    padding-bottom: .3em;
    font-size: 2.3em;
    line-height: 1.2;
    border-bottom: 5px solid #eee;
    font-weight: bold;
    margin-top: 0;
    font-weight: bold;
}
h2 {
    padding-bottom: .3em;
    font-size: 1.85em;
    line-height: 1.225;
    border-bottom: 3px solid #eee;
    color: rgb(255, 47, 146);
    margin-top: 1.8em;
    margin-bottom: 0.1em;
    font-weight: bold;
}
h3 {
    font-size: 1.55em;
    line-height: 1.43;
    color: rgb(148, 55, 255);
    margin-top: 1.8em;
    margin-bottom: 0.1em;
    font-weight: bold;
}
h4 {
    font-size: 1.35em;
    color: #ffa500;
    margin-top: 1.8em;
    margin-bottom: 0.1em;
    font-weight: bold;
}
h5 {
    font-size: 1.15em;
    color: #86c232;
    margin-top: 1.8em;
    margin-bottom: 0.1em;
    font-weight: bold;
}

h6 {
    font-size: 1em;
    color: #3399ff !important;
    margin-top: 1.8em;
    margin-bottom: 0.1em;
    font-weight: bold;
}

blockquote {
    margin-bottom: 10px !important ;
    padding: 5px 10px !important;
    background-color: #FFF8DC !important;
    border-left: 4px solid #ffeb8e !important;
}

h1 + h2, h1 + h3, h1 + h4, h1 + h5, h1 + h6,
h2 + h3, h2 + h4, h2 + h5, h2 + h6,
h3 + h4, h3 + h5, h3 + h6,
h4 + h5, h4 + h6,
h5 + h6 {
  margin-top: 5px !important;
}

img, code, .md-fences, blockquote {
    margin-left: 0em !important;
}

code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: #f7f7f9;
    border-radius: 3px;
}

html {
    font-size: 14px;
    text-align: justify;
}

#write {
    max-width: 70em;
}

li>ol,
li>ul {
    margin: 0 0;
}

li p.first {
    display: inline-block;
}
ul,
ol {
    padding-left: 30px;
    margin-top: 0;
    margin-bottom: 5px;
}
ul:first-child,
ol:first-child {
    margin-top: 0;
}
ul:last-child,
ol:last-child {
    margin-bottom: 0;
}

p, li>p{
    margin-top: 0;
    margin-bottom: 2px;
}

a[href=""] {
    color: #A16E83;
    text-decoration: none;
    font-weight: bold;
}

.md-fences {
    margin-bottom: 7px !important;
    margin-top: 5px important;
}
```







### Using SEO Tags

The SEO tag will respect any of the following if included in your site's `_config.yml` (and simply not include them if they're not defined):

- `title` - Your site's title (e.g., Ben's awesome site, The GitHub Blog, etc.), used as part of the title tag like 'page.title | title'.

- `tagline` - A short description (e.g., A blog dedicated to reviewing cat gifs), used as part of the title tag of the home page  like 'title | tagline'.

- `description` - A longer description used for the description meta tag. Also used as fallback for pages that don't provide their own `description` and as part of the home page title tag if `tagline` is not defined.

- `url` - The full URL to your site. Note: `site.github.url` will be used by default.

- `author` - global author information (see [Advanced usage](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/advanced-usage.md#author-information))

- `twitter` - The following properties are available:

  - `twitter:card` - The site's default card type
  - `twitter:username` - The site's Twitter handle. You'll want to describe it like so:

  ```
  twitter:
    username: benbalter
    card: summary
  ```

- `facebook` - The following properties are available:

  - `facebook:app_id` - a Facebook app ID for Facebook insights
  - `facebook:publisher` - a Facebook page URL or ID of the publishing entity
  - `facebook:admins` - a Facebook user ID for domain insights linked to a personal account

  You'll want to describe one or more like so:

  ```
  facebook:
    app_id: 1234
    publisher: 1234
    admins: 1234
  ```

- `logo` - URL to a site-wide logo (e.g., `/assets/your-company-logo.png`) - If you would like the "publisher" property to be present, you must  add this field to your site's configuration, during the validation of  the structured data by Google web master tools, if the `logo` field is not validated, you will find errors inherent to the publisher in the [structured datas test](https://search.google.com/structured-data/testing-tool/u/0/)

- `social` - For [specifying social profiles](https://developers.google.com/structured-data/customize/social-profiles). The following properties are available:

  - `name` - If the user or organization name differs from the site's name
  - `links` - An array of links to social media profiles.

  ```
  social:
    name: Ben Balter
    links:
      - https://twitter.com/BenBalter
      - https://www.facebook.com/ben.balter
      - https://www.linkedin.com/in/BenBalter
      - https://github.com/benbalter
      - https://keybase.io/benbalter
  ```

- `google_site_verification` for verifying ownership via Google webmaster tools

- Alternatively, verify ownership with several services at once using the following format:

```
webmaster_verifications:
  google: 1234
  bing: 1234
  alexa: 1234
  yandex: 1234
  baidu: 1234
```

- `lang` - The locale these tags are marked up in. Of the format `language_TERRITORY`. Default is `en_US`.

The SEO tag will respect the following YAML front matter if included in a post, page, or document:

- `title` - The title of the post, page, or document
- `description` - A short description of the page's content
- `image` - URL to an image associated with the post, page, or document (e.g., `/assets/page-pic.jpg`)
- `author` - Page-, post-, or document-specific author information (see [Advanced usage](https://github.com/jekyll/jekyll-seo-tag/blob/master/docs/advanced-usage.md#author-information))
- `lang` - Page-, post-, or document-specific language information

*Note:* Front matter defaults can be used for any of the above values as described in advanced usage with an image example.





----

https://y7kim.github.io/agency-jekyll-theme/#portfolioModal4 - Landing

https://jekyller.github.io/jasper2/tag/getting-started/