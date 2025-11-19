import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

export async function parseMarkdown(md: string) {
  const { content, data: frontmatter } = matter(md);

  let components: Record<string, React.ReactNode> = {};
  let id = 0;

  function newKey() {
    return `COMP_${id++}`;
  }

  const CopyIcon = () => (
    <svg
      fill="currentColor"
      height="14"
      width="14"
      viewBox="0 0 352.804 352.804"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          d="M318.54,57.282h-47.652V15c0-8.284-6.716-15-15-15H34.264c-8.284,0-15,6.716-15,15v265.522c0,8.284,6.716,15,15,15h47.651
        v42.281c0,8.284,6.716,15,15,15H318.54c8.284,0,15-6.716,15-15V72.282C333.54,63.998,326.824,57.282,318.54,57.282z
        M49.264,265.522V30h191.623v27.282H96.916c-8.284,0-15,6.716-15,15v193.24H49.264z M303.54,322.804H111.916V87.282H303.54V322.804
        z"
        />
      </g>
    </svg>
  );
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("copied");
    });
  };

  function preprocess(text: string) {
    const lines = text.split("\n");
    let insideCard = false;
    let cardBuffer: string[] = [];
    let out: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // ---------- TITLE ----------
      if (line.startsWith(":title:")) {
        frontmatter.title = line.replace(":title:", "").trim();
        continue;
      }

      // ---------- BUTTON ----------
      if (line.startsWith(":button:")) {
        const label = line.replace(":button:", "").trim();
        const key = newKey();

        components[key] = (
          <div className="flex justify-center items-center">
            <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
              {label}
            </button>
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }

      // ---------- ALERT ----------
      if (line.startsWith(":alert:")) {
        const msg = line.replace(":alert:", "").trim();
        const key = newKey();

        components[key] = (
          <div className="p-3 bg-red-100 text-red-800 rounded border border-red-300">
            {msg}
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }

      // ---------- NAVBAR (Tailwind v3 version) ----------
      if (line.startsWith(":navbar:")) {
        const raw = line.replace(":navbar:", "").trim();
        const items = raw.split(",").map((x) => x.trim());

        const key = newKey();

        // React JSX version stored in components
        components[key] = (
          <nav className="fixed top-0 left-0 w-full bg-black border-b border-gray-800 z-50">
            <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
              {/* Desktop menu */}
              <div className="hidden md:flex items-center space-x-6">
                {items.map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="px-3 py-2 text-gray-300 font-medium hover:text-white transition"
                  >
                    {item}
                  </a>
                ))}
              </div>

              {/* Search bar */}
              <div className="hidden md:block relative">
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="w-128 rounded bg-black text-gray-200 placeholder-gray-500 px-4 py-2 pr-14 border border-gray-700"
                />

                <div className="absolute right-2 top-1/2 -translate-y-1/2 transform flex items-center space-x-1 text-xs text-gray-400">
                  <kbd className="px-2 py-0.5 bg-black border border-gray-700 rounded">
                    Ctrl
                  </kbd>
                  <span>+</span>
                  <kbd className="px-2 py-0.5 bg-black border border-gray-700 rounded">
                    K
                  </kbd>
                </div>
              </div>

              {/* Mobile button */}
              <button
                className="md:hidden text-gray-300 hover:text-white focus:outline-none"
                onClick={() =>
                  document
                    .getElementById("mobileMenu")
                    ?.classList.toggle("hidden")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile menu */}
            <div
              id="mobileMenu"
              className="hidden md:hidden border-t border-gray-800 bg-black px-4 py-3 space-y-2"
            >
              {items.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="block px-3 py-2 text-gray-300 hover:text-white transition"
                >
                  {item}
                </a>
              ))}

              <input
                type="text"
                placeholder="Search..."
                className="w-full rounded bg-gray-900 text-gray-200 placeholder-gray-500 px-4 py-2 border border-gray-700 focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>
          </nav>
        );

        out.push(`<div data-comp="${key}"></div>`);
        out.push(`<div style="height: 80px"></div>`); // navbar offset
        continue;
      }

      // ---------- IMG ----------
      if (line.startsWith(":img:")) {
        const src = line.replace(":img:", "").trim();
        const key = newKey();

        components[key] = (
          <div className="flex justify-center my-6">
            <img
              src={src}
              alt="Image"
              loading="lazy"
              className="w-full max-w-3xl h-auto rounded-xl border border-neutral-800/50 shadow-sm hover:shadow-md transition-shadow duration-300"
            />
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }
      // ---------- SIDEBAR ----------
      if (line.startsWith(":sidebar:")) {
        const raw = line.replace(":sidebar:", "").trim();

        const sections = raw.split("|").map((s) => s.trim());
        const key = newKey();

        components[key] = (
          <div className="flex">
            {/* Sidebar */}
            <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-black border-r border-gray-800 p-4 overflow-y-auto hidden md:block">
              <nav className="space-y-2">
                {sections.map((section, idx) => {
                  const headerMatch = section.match(/\[(.*?)\]/);
                  const itemsMatch = section.match(/\{(.*?)\}/);

                  const header = headerMatch
                    ? headerMatch[1].trim()
                    : "Section";

                  const items = itemsMatch
                    ? itemsMatch[1]
                        .split(",")
                        .map((i) => i.trim())
                        .filter((i) => i.length > 0)
                    : [];

                  const hasChildren = items.length > 0;

                  return (
                    <div key={idx} className="group mt-8">
                      <button
                        className="w-full text-left px-4 py-2 text-gray-300 hover:text-white font-medium flex justify-between items-center"
                        onClick={(e) => {
                          if (!hasChildren) return;
                          const parent = (e.currentTarget as HTMLElement)
                            .parentElement;
                          parent?.classList.toggle("open");
                        }}
                      >
                        {header}

                        {hasChildren && (
                          <svg
                            className="w-4 h-4 text-gray-500 group-hover:text-gray-300 transition-transform duration-200 group-[.open]:rotate-90"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        )}
                      </button>

                      {hasChildren && (
                        <ul className="hidden group-[.open]:block border-l border-gray-800 ml-2">
                          {items.map((item, i) => (
                            <li
                              key={i}
                              className="pl-6 py-1 text-gray-400 hover:text-white cursor-pointer transition"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </nav>
            </aside>

            {/* Ensure right content shifts */}
            <div className="flex-1 ml-64 px-8" />
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }

      // ---------- ROUTE ----------
      if (line.startsWith(":route:")) {
        const raw = line.replace(":route:", "").trim();
        const [methodEndpoint, dataRaw] = raw.split("|").map((s) => s.trim());
        const [method, endpoint] = methodEndpoint
          .split(" ")
          .map((s) => s.trim());

        const parsePairs = (raw: string | undefined) => {
          if (!raw) return [];
          return raw.split(",").map((pair) => {
            const [k, v] = pair.split(":").map((s) => s.trim());
            return { key: k, value: v };
          });
        };

        const fields = parsePairs(dataRaw);

        const methodColors: Record<string, string> = {
          GET: "text-emerald-400 border border-emerald-700/40",
          POST: "text-sky-400 border border-sky-700/40",
          PUT: "text-amber-400 border border-amber-700/40",
          DELETE: "text-rose-400 border border-rose-700/40",
        };

        const colorClass =
          methodColors[method] || "text-gray-300 border border-gray-700/40";

        const key = newKey();

        components[key] = (
          <div className="flex justify-center items-center w-full">
            <div className="mb-3 mt-8 w-[80%] max-w-3xl border border-neutral-800 bg-black rounded-lg hover:border-neutral-700 transition-colors duration-200">
              {/* Header */}
              <div
                className="flex w-full items-center justify-between px-4 py-3 cursor-pointer select-none"
                onClick={(e) => {
                  const root = (e.currentTarget as HTMLElement).parentElement!;
                  const content = root.querySelector(
                    ".route-content"
                  ) as HTMLElement;
                  const icon = root.querySelector(".route-icon") as HTMLElement;

                  content.classList.toggle("hidden");
                  icon.classList.toggle("rotate-90");
                }}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-semibold font-mono uppercase ${colorClass}`}
                  >
                    {method}
                  </span>
                  <span className="font-mono text-gray-200 text-sm tracking-wide">
                    {endpoint}
                  </span>
                </div>

                <svg
                  className="route-icon w-4 h-4 text-gray-400 transition-transform duration-200 rotate-90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {/* Content */}
              <div className="route-content hidden px-4 pb-4 text-sm text-gray-300 space-y-3 animate-fadeIn">
                {/* GET response viewer */}
                {method === "GET" ? (
                  <div className="mt-2 p-3 bg-neutral-950 border border-neutral-800 rounded-md font-mono text-xs text-gray-400 overflow-x-auto">
                    <pre>
                      {dataRaw ||
                        `{"status": "ok", "message": "Example GET response"}`}
                    </pre>
                  </div>
                ) : (
                  <>
                    {fields.length > 0 ? (
                      fields.map((f, i) => (
                        <div key={i} className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder={f.key}
                            className="p-2 rounded-md bg-neutral-950 text-gray-100 border border-neutral-800 focus:border-neutral-600 outline-none transition-colors"
                          />
                          <input
                            type="text"
                            placeholder={f.value}
                            className="p-2 rounded-md bg-neutral-950 text-gray-100 border border-neutral-800 focus:border-neutral-600 outline-none transition-colors"
                          />
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-500">No parameters</p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Fade-in animation */}
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-in-out;
        }
      `}</style>
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }

      // ---------- ASSESSMENT ----------
      if (line.startsWith(":assessment:") || line.startsWith(":assesment:")) {
        const raw = line.replace(/:asses?ment:/, "").trim();

        const headerMatch = raw.match(/\[(.*?)\]/);
        const descMatch = raw.match(/\{(.*?)\}/);
        const idMatch = raw.match(/\<(.*?)\>/);
        const funcMatch = raw.match(/\((.*)\)\s*$/);

        const header = headerMatch ? headerMatch[1].trim() : "Assessment";
        const description = descMatch ? descMatch[1].trim() : "";

        const inputId = idMatch
          ? idMatch[1].trim()
          : `textfield-${Math.random().toString(36).slice(2)}`;

        const func = funcMatch ? funcMatch[1].trim() : "";

        const key = newKey();

        components[key] = (
          <div className="flex justify-center items-center py-16">
            <div className="w-full max-w-3xl bg-black border border-neutral-800 rounded-2xl shadow-lg p-8 transition hover:border-neutral-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                {header}
              </h3>
              <p className="text-gray-400 mb-6">{description}</p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  const input = (e.target as HTMLFormElement).querySelector(
                    `#${inputId}`
                  ) as HTMLInputElement;

                  const textfield = input.value;

                  try {
                    const run = new Function("textfield", func);
                    const result = run(textfield);

                    const res = document.getElementById(`${inputId}-id`);
                    if (res) {
                      res.classList.remove("opacity-0");

                      if (result) {
                        res.textContent = "Success!";
                        res.classList.remove("text-red-500");
                        res.classList.add("text-green-500");
                      } else {
                        res.textContent = "Wrong!";
                        res.classList.remove("text-green-500");
                        res.classList.add("text-red-500");
                      }
                    }
                  } catch (err) {
                    console.error("Assessment function error:", err);
                  }
                }}
                className="space-y-4"
              >
                <input
                  type="text"
                  id={inputId}
                  placeholder="Enter your answer..."
                  className="w-full px-4 py-2 bg-black border border-neutral-700 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
                />

                <button
                  type="submit"
                  className="w-full bg-white text-black font-medium py-2 rounded-md hover:bg-neutral-200 transition-colors"
                >
                  Submit
                </button>
              </form>

              <p
                id={`${inputId}-id`}
                className="mt-4 text-lg font-semibold text-center opacity-0 transition-opacity duration-300"
              ></p>
            </div>
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }

      // ---------- CARD ----------
      if (line.startsWith(":card:")) {
        const raw = line.replace(":card:", "").trim();
        const [header, details] = raw.split("|").map((s) => s.trim());

        const key = newKey();

        components[key] = (
          <div className="flex justify-center items-center py-16">
            <div className="w-full max-w-3xl bg-black border border-neutral-800 rounded-2xl shadow-lg p-8 hover:border-neutral-700">
              <h3 className="text-2xl font-semibold text-white mb-2">
                {header || "Card Title"}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {details || "Card description goes here."}
              </p>
            </div>
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }

      // ---------- CODE ----------
      if (line.startsWith(":code:")) {
        const raw = line.replace(":code:", "").trim();
        const matches = [...raw.matchAll(/\{([^}]+)\}/g)];

        const lines = matches.length
          ? matches.map((m) => m[1].trim())
          : ["Code Error"];
        const key = newKey();

        components[key] = (
          <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-3xl bg-[#0a0a0a] border border-neutral-800 rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-8 py-2 border-b border-neutral-800 bg-[#111]">
                <span className="text-[11px] text-gray-500 font-mono">
                  code snippet
                </span>
                <button
                  className="text-gray-400 hover:text-gray-200"
                  onClick={() => handleCopy(lines.join("\n"))}
                >
                  <CopyIcon />
                </button>
              </div>

              <pre className="px-5 py-4 text-[13px] leading-relaxed text-gray-200 font-mono overflow-x-auto whitespace-pre-wrap">
                {lines.map((line) => "  " + line).join("\n")}
              </pre>
            </div>
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }

      // ---------- BASH ----------
      if (line.startsWith(":bash:")) {
        const raw = line.replace(":bash:", "").trim();
        const matches = [...raw.matchAll(/\{([^}]+)\}/g)];

        const lines = matches.length
          ? matches.map((m) => m[1].trim())
          : ["Code Error"];
        const key = newKey();

        components[key] = (
          <div className="flex justify-center items-center py-10">
            <div className="w-full max-w-3xl bg-[#0a0a0a] border border-neutral-800 rounded-xl shadow-lg overflow-hidden">
              <div className="flex items-center justify-between px-8 py-2 bg-[#0a0a0a]">
                <span className="text-[11px] text-gray-500 font-mono">
                  bash
                </span>
                <button
                  className="text-gray-400 hover:text-gray-200"
                  onClick={() => handleCopy(lines.join("\n"))}
                >
                  <CopyIcon />
                </button>
              </div>

              <pre className="px-5 py-4 text-[13px] leading-relaxed text-gray-200 font-mono overflow-x-auto whitespace-pre-wrap">
                {lines.map((line) => "  " + line).join("\n")}
              </pre>
            </div>
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }

      // ---------- FOOTER ----------
      if (line.startsWith(":footer:")) {
        const raw = line.replace(":footer:", "").trim();
        const items = raw.split(",").map((i) => i.trim());

        const key = newKey();

        components[key] = (
          <footer className="w-full h-64 border-t border-neutral-800 bg-black text-gray-400 py-8 px-6 mt-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-500"></div>

              {/* Links */}
              <div className="flex flex-wrap justify-center text-sm font-medium space-x-3">
                {items.map((item, i) => (
                  <span key={i} className="flex items-center">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </a>
                    {i !== items.length - 1 && (
                      <span className="text-neutral-700 px-2">•</span>
                    )}
                  </span>
                ))}
              </div>

              {/* Copyright */}
              <p className="text-xs text-gray-600">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>
          </footer>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }

      // ---------- ALERT TYPES ----------
      if (
        line.startsWith(":info:") ||
        line.startsWith(":alert:") ||
        line.startsWith(":warning:") ||
        line.startsWith(":success:")
      ) {
        const typeMatch = line.match(
          /^:(info|alert|warning|success):\s*\{([^}]+)\}/
        );
        if (!typeMatch) continue;

        const [, type, message] = typeMatch;
        const key = newKey();

        const colors: Record<
          string,
          { bg: string; border: string; text: string }
        > = {
          info: {
            bg: "bg-blue-100",
            border: "border-blue-400",
            text: "text-blue-600",
          },
          alert: {
            bg: "bg-red-100",
            border: "border-red-400",
            text: "text-red-600",
          },
          warning: {
            bg: "bg-amber-100",
            border: "border-amber-400",
            text: "text-amber-600",
          },
          success: {
            bg: "bg-green-100",
            border: "border-green-400",
            text: "text-green-600",
          },
        };

        const color = colors[type];

        components[key] = (
          <div className="flex justify-center py-4">
            <div
              className={`w-full max-w-3xl ${color.border} ${color.bg} p-4 rounded-md`}
            >
              <p className={`font-medium ${color.text}`}>{message}</p>
            </div>
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);
        continue;
      }
      // ---------- DEFAULT / ENDDEFAULT ----------
      if (line.startsWith(":default:")) {
        let rawMarkdown = "";
        let j = i + 1;
        let endIndex = -1;

        // Collect lines until :enddefault:
        for (; j < lines.length; j++) {
          if (lines[j].trim().startsWith(":enddefault:")) {
            endIndex = j;
            break;
          }
          rawMarkdown += lines[j] + "\n";
        }

        const parsedContent = unified()
          .use(remarkParse)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(rehypeStringify, { allowDangerousHtml: true })
          .processSync(rawMarkdown);

        let parsedHtml = String(parsedContent);

        const headingClass =
          "text-2xl/7 font-bold text-white sm:truncate sm:text-3xl sm:tracking-tight";

        parsedHtml = parsedHtml.replace(
          /<h([1-6])([^>]*)>/g,
          `<h$1 class="${headingClass}" $2>`
        );

        const key = newKey();
        components[key] = (
          <div className="flex-1 md:ml-4 px-6 md:px-12 py-10">
            <div
              className="max-w-3xl mx-auto leading-12 text-gray-200 prose prose-invert prose-neutral prose-p:text-gray-300 prose-a:text-green-500 prose-code:text-green-400 prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800"
              dangerouslySetInnerHTML={{ __html: parsedHtml }}
            />
          </div>
        );

        out.push(`<div data-comp="${key}"></div>`);

        // Skip lines that were processed
        if (endIndex !== -1) i = endIndex;
        continue;
      }

      if (line.startsWith(":enddefault:")) {
        // Optional: just skip it since :default: already handled
        continue;
      }

      out.push(line);
    }

    return out.join("\n");
  }

  const preprocessed = preprocess(content);

  const html = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(preprocessed);

  return {
    html: String(html),
    frontmatter,
    components,
  };
}
