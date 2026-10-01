import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

interface Options {
  /**
   * Map of link label -> path relative to the site root.
   * Use "" for the home page (i.e. the index).
   */
  links: Record<string, string>
}

const defaultOptions: Options = {
  links: { Home: "" },
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const Navbar: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const slug = fileData.slug
    if (!slug) return null
    const root = pathToRoot(slug)

    return (
      <nav class={classNames(displayClass, "navbar")}>
        <ul>
          {Object.entries(opts.links).map(([label, target]) => (
            <li>
              <a href={target === "" ? root : joinSegments(root, target)}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  Navbar.css = `
.navbar {
  width: 100%;
}

.navbar ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navbar a {
  font-weight: 600;
}
`

  return Navbar
}) satisfies QuartzComponentConstructor<Partial<Options>>
