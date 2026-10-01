import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

/**
 * Renders a full-width image above the page title, with an optional caption.
 *
 * Driven by frontmatter, so any page can have a banner:
 *   banner: banner.jpg
 *   bannerAlt: "Description of the image"
 *   bannerCaption: "Shown beneath the image"
 *
 * Renders nothing on pages that don't set `banner`.
 */
const Banner: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const banner = fileData.frontmatter?.banner as string | undefined
  const slug = fileData.slug
  if (!banner || !slug) return null

  const src = joinSegments(pathToRoot(slug), banner)
  const alt = (fileData.frontmatter?.bannerAlt as string | undefined) ?? ""
  const caption = fileData.frontmatter?.bannerCaption as string | undefined

  return (
    <figure class={classNames(displayClass, "banner")}>
      <img src={src} alt={alt} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

Banner.css = `
.banner {
  margin: 0 0 1.5rem 0;
}

.banner img {
  display: block;
  width: 100%;
  height: auto;
}

.banner figcaption {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--darkgray);
}
`

export default (() => Banner) satisfies QuartzComponentConstructor
