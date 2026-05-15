type JsonLdProps = {
  data: object;
};

export function JsonLd({ data }: JsonLdProps) {
  // `<` escape prevents `</script>` injection if any string field contains `<`.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
