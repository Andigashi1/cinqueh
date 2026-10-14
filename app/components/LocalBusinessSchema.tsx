export default function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "5H — Cinque H",
    url: "https://www.cinqueh.com",
    description:
      "Elettricisti e carpentieri per il settore civile, navale e industriale in tutta Italia.",
    areaServed: { "@type": "Country", name: "Italia" },
    // address: still pending the office — add once confirmed:
    // address: {
    //   "@type": "PostalAddress",
    //   streetAddress: "",
    //   addressLocality: "",
    //   postalCode: "",
    //   addressRegion: "Veneto",
    //   addressCountry: "IT",
    // },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}