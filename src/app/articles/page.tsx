import Link from "next/link";
import Image from "next/image";
import { getSortedArticles, absoluteUrl } from "@/data/siteConfig";

export const metadata = {
  title: "Essays & Articles",
  description:
    "Index of essays by Vee (@veemeta) covering personal brand strategy, Chief Roar Officer leadership at Doginal Dogs, live voice media, and community governance.",
  alternates: {
    canonical: absoluteUrl("/articles"),
  },
};

export default function ArticlesIndexPage() {
  const articles = getSortedArticles();

  return (
    <div className="container">
      <section style={{ padding: "20px 0 40px" }}>
        <h1>Essays &amp; Articles by Vee</h1>
        <div className="answer-lead">
          <p>
            An index of analytical essays on community voice leadership, live audio Spaces strategy, personal brand discipline, and digital asset media.
          </p>
        </div>
      </section>

      <section style={{ margin: "20px 0 60px" }}>
        {articles.length > 0 ? (
          <div className="grid-2">
            {articles.map((article) => (
              <article key={article.slug} className="card">
                <div>
                  <Link href={`/articles/${article.slug}`} style={{ display: "block", marginBottom: "16px" }}>
                    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid var(--border-color)" }}>
                      <Image
                        src={article.image}
                        alt={article.imageAlt}
                        width={article.width}
                        height={article.height}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div className="card-header">
                    <span className="badge">{article.category}</span>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {article.date} • {article.readTime}
                    </span>
                  </div>
                  <h2 style={{ fontSize: "1.35rem", margin: "16px 0 12px" }}>
                    <Link
                      href={`/articles/${article.slug}`}
                      style={{ color: "var(--text-primary)", textDecoration: "none" }}
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
                    {article.answerLead}
                  </p>
                </div>
                <Link
                  href={`/articles/${article.slug}`}
                  className="descriptive-link"
                  style={{ marginTop: "20px" }}
                >
                  Read complete essay: {article.title} {"→"}
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
            Essays are added as they are published.
          </p>
        )}
      </section>
    </div>
  );
}
